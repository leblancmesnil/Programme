param(
    [string]$InFile = "Readme.md",
    [string]$OutFile = "Readme.docx"
)

if (-not (Test-Path $InFile)){
    Write-Host "Input file not found: $InFile"
    exit 2
}

if (-not (Get-Command pandoc -ErrorAction SilentlyContinue)){
    Write-Host "Pandoc not found. Install Pandoc (https://pandoc.org/installing.html) and re-run this script."
    exit 3
}

$refDoc = "reference.docx"
if (-not (Test-Path $refDoc)){
    Write-Host "reference.docx not found. Attempting to generate with Python script..."
    if (Get-Command python -ErrorAction SilentlyContinue){
        python "./scripts/generate-reference.py" -o $refDoc
        if (Test-Path $refDoc){
            Write-Host "Generated $refDoc"
        } else {
            Write-Host "Python ran but $refDoc was not created. Continuing without reference doc."
            $refDoc = $null
        }
    } else {
        Write-Host "Python not found. Skipping reference.docx generation."
        $refDoc = $null
    }
}

Write-Host "Converting $InFile -> $OutFile"
$pandocArgs = @($InFile,'-o',$OutFile,'--standalone','--toc','--number-sections','--from','markdown+yaml_metadata_block+footnotes','--highlight-style=tango')
if ($refDoc){ $pandocArgs += @('--reference-doc',$refDoc) }
pandoc @pandocArgs

if (Test-Path $OutFile){
    Write-Host "Created $OutFile"
    exit 0
} else {
    Write-Host "Conversion failed. Check pandoc output above for errors."
    exit 4
}
