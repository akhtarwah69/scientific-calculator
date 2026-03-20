# Enhanced Local Server Script
# 1. Finds your local IP address
# 2. Starts a server
# 3. Shows you exactly what to type on your phone

$ip = (Get-NetIPAddress | Where-Object { $_.AddressFamily -eq 'IPv4' -and $_.InterfaceAlias -notlike '*Loopback*' -and $_.IPAddress -notlike '169.*' } | Select-Object -First 1).IPAddress

Write-Host "----------------------------------------------------" -ForegroundColor Cyan
Write-Host "PWA LOCAL SERVER STARTED" -ForegroundColor Green
Write-Host "----------------------------------------------------"
Write-Host "To install on your Android phone:"
Write-Host "1. Ensure your phone and PC are on the same Wi-Fi."
Write-Host "2. Open Chrome on your phone."
Write-Host "3. Type this URL: http://$($ip):8000" -ForegroundColor Yellow
Write-Host "----------------------------------------------------"
Write-Host "Press Ctrl+C to stop the server."

python -m http.server 8000
