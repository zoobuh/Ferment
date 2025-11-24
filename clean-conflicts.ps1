$files = @(
    "src/pages/Settings.jsx",
    "src/layouts/Nav.jsx",
    "src/components/Logo.jsx",
    "src/components/Settings.jsx",
    "src/components/settings/components/Button.jsx",
    "src/components/settings/components/Switch.jsx",
    "src/components/settings/components/Input.jsx",
    "src/components/settings/components/ContainerItem.jsx",
    "src/components/settings/components/Combobox.jsx"
)

foreach ($file in $files) {
    $content = Get-Content $file -Raw
    
    # Remove conflict markers - keep HEAD version
    $pattern = '(?s)<<<<<<< HEAD\r?\n(.*?)\r?\n=======\r?\n.*?\r?\n>>>>>>> [^\r\n]+\r?\n'
    $content = $content -replace $pattern, '$1'
    
    # Write back
    [System.IO.File]::WriteAllText((Join-Path $PWD $file), $content)
}

Write-Host "Cleaned conflict markers from all files"
