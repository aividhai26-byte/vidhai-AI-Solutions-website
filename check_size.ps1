$files = Get-ChildItem -Recurse -File | Where-Object { $_.FullName -notmatch '\.git' }
$total = ($files | Measure-Object -Property Length -Sum).Sum
Write-Host ("Total project size: " + [math]::Round($total / 1MB, 1) + " MB across " + $files.Count + " files")

# Show top 10 largest files
Write-Host ""
Write-Host "Top 10 largest files:"
$files | Sort-Object Length -Descending | Select-Object -First 10 | ForEach-Object {
    Write-Host ("  " + [math]::Round($_.Length / 1MB, 2) + " MB  " + $_.FullName.Replace((Resolve-Path '.').Path + '\', ''))
}
