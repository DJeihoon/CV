import { spawn } from 'node:child_process';
import { mkdtemp, rm, stat } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

function run(cmd, args, { cwd } = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { cwd, stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '';
    let err = '';
    p.stdout.on('data', (d) => (out += d.toString()));
    p.stderr.on('data', (d) => (err += d.toString()));
    p.on('error', reject);
    p.on('close', (code) => {
      if (code === 0) return resolve({ out, err });
      const e = new Error(`${cmd} ${args.join(' ')} failed (${code})`);
      e.out = out;
      e.err = err;
      reject(e);
    });
  });
}

async function countPdfPages(pdfPath) {
  const py = `
import sys
from pypdf import PdfReader
r = PdfReader(sys.argv[1])
print(len(r.pages))
`.trim();
  const { out } = await run('python3', ['-c', py, pdfPath]);
  return Number(out.trim());
}

async function main() {
  const root = process.cwd();
  const tmp = await mkdtemp(path.join(os.tmpdir(), 'cv-print-'));

  // Serve static files with python (no npm deps).
  const port = 3101;
  const server = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  // Wait for server.
  await new Promise((r) => setTimeout(r, 800));

  const chrome = process.env.CHROME_BIN || 'google-chrome';

  const results = [];
  const langs = ['fa', 'en', 'ar'];
  for (const lang of langs) {
    const pdfPath = path.join(tmp, `cv-${lang}.pdf`);
    const url = `http://127.0.0.1:${port}/print/?lang=${lang}`;
    const prof = await mkdtemp(path.join(tmp, `chrome-${lang}-`));
    try {
      // In this environment Chrome doesn't always exit after printing; use a hard timeout.
      // Accept timeout exit code as long as PDF was written.
      try {
        await run('timeout', [
          '45s',
          chrome,
          '--headless=new',
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--no-first-run',
          '--no-default-browser-check',
          '--disable-background-networking',
          '--disable-extensions',
          '--remote-debugging-port=0',
          `--user-data-dir=${prof}`,
          '--virtual-time-budget=12000',
          '--print-to-pdf-no-header',
          `--print-to-pdf=${pdfPath}`,
          url,
        ]);
      } catch (e) {
        // Timeout returns exit code 124.
        // If a PDF exists, proceed; otherwise rethrow.
        try {
          const st = await stat(pdfPath);
          if (!st || st.size < 5000) throw e;
        } catch {
          throw e;
        }
      }
    } finally {
      await rm(prof, { recursive: true, force: true });
    }
    const pages = await countPdfPages(pdfPath);
    results.push({ lang, pages });
  }

  server.kill('SIGTERM');
  if (!process.env.KEEP_TMP) {
    await rm(tmp, { recursive: true, force: true });
  } else {
    process.stdout.write(`PDF output kept at: ${tmp}\n`);
  }

  for (const r of results) process.stdout.write(`${r.lang}: ${r.pages} pages\n`);
  if (results.some((r) => r.pages !== 2)) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e?.err || e?.message || e);
  process.exitCode = 1;
});

