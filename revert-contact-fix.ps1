$ErrorActionPreference = 'Stop'
$path = 'c:\Users\gboku\OneDrive\Desktop\Swift Site\swift-auto-import\src\app\contact\page.tsx'
[string]$content = Get-Content -LiteralPath $path -Raw -Encoding UTF8

# 1) Remove all <details> blocks beyond the first 3 anywhere in the file
$detailsRe = [regex]'(?s)<details>.*?</details>'
$matches = $detailsRe.Matches($content)
if ($matches.Count -gt 3) {
  for ($i = $matches.Count - 1; $i -ge 3; $i--) {
    $m = $matches[$i]
    $content = $content.Remove($m.Index, $m.Length)
  }
}

# 2) Fix the FAQ JSON-LD mainEntity to only include 3 objects, rebuilding inner array
$faqId = 'id="faq-schema-contact"'
$faqIdx = $content.IndexOf($faqId)
if ($faqIdx -ge 0) {
  $scriptStart = $content.LastIndexOf('<Script', $faqIdx)
  $scriptEnd = $content.IndexOf('/>', $faqIdx)
  if ($scriptStart -ge 0 -and $scriptEnd -ge 0) {
    $scriptEnd = $scriptEnd + 2
    $block = $content.Substring($scriptStart, $scriptEnd - $scriptStart)
    $mainIdx = $block.IndexOf('mainEntity')
    if ($mainIdx -ge 0) {
      $brOpen = $block.IndexOf('[', $mainIdx)
      $brClose = $block.IndexOf(']', $brOpen)
      if ($brOpen -ge 0 -and $brClose -gt $brOpen) {
        $inner = $block.Substring($brOpen + 1, $brClose - $brOpen - 1)
        $objRe = [regex]'(?s)\{.*?\}(?=\s*,\s*\{|\s*$)'
        $objs = $objRe.Matches($inner)
        if ($objs.Count -ge 3) {
          $newInner = $objs[0].Value + ",`n              " + $objs[1].Value + ",`n              " + $objs[2].Value
          $newBlock = $block.Substring(0, $brOpen + 1) + $newInner + $block.Substring($brClose)
          $content = $content.Remove($scriptStart, $scriptEnd - $scriptStart)
          $content = $content.Insert($scriptStart, $newBlock)
        }
      }
    }
  }
}

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Host 'Revert fixes applied.'
