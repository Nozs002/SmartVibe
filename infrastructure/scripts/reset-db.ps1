Set-Location "$PSScriptRoot/../docker"
docker compose down -v
docker compose up -d
