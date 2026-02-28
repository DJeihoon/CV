# Generate SRI hashes for CDN resources (PowerShell fallback when Node unavailable)
$urls = @(
  'https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.js',
  'https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/l10n/fa.min.js',
  'https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/l10n/ar.min.js',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11.16.1/dist/sweetalert2.all.min.js',
  'https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.css',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11.16.1/dist/sweetalert2.min.css'
)
foreach ($url in $urls) {
  try {
    $content = (Invoke-WebRequest -Uri $url -UseBasicParsing).Content
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($content)
    $sha = [System.Security.Cryptography.SHA384]::Create().ComputeHash($bytes)
    $b64 = [Convert]::ToBase64String($sha)
    $tag = if ($url -match '\.css$') { 'link' } else { 'script' }
    Write-Host "${tag} src=`"$url`""
    Write-Host "  integrity=`"sha384-$b64`"`n"
  } catch { Write-Host "Failed $url : $_" }
}
