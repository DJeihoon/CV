#!/usr/bin/env node
/**
 * Generate SRI integrity hashes for CDN scripts
 * Run: node scripts/gen-sri.js
 * Use output to add integrity="" to script/link tags
 */
const https = require('https');
const crypto = require('crypto');

const urls = [
  'https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.js',
  'https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/l10n/fa.min.js',
  'https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/l10n/ar.min.js',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11.16.1/dist/sweetalert2.all.min.js',
  'https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.css',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11.16.1/dist/sweetalert2.min.css',
];

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function sha384(data) {
  return 'sha384-' + crypto.createHash('sha384').update(data).digest('base64');
}

(async () => {
  console.log('SRI hashes for CDN resources:\n');
  for (const url of urls) {
    try {
      const content = await fetch(url);
      const hash = sha384(content);
      const tag = url.endsWith('.css') ? 'link' : 'script';
      console.log(`${tag} src="${url}"`);
      console.log(`  integrity="${hash}"\n`);
    } catch (e) {
      console.error(`Failed ${url}:`, e.message);
    }
  }
})();
