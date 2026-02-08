$ErrorActionPreference = 'Stop'
$path = 'c:\Users\gboku\OneDrive\Desktop\Swift Site\swift-auto-import\src\app\contact\page.tsx'
[string]$content = Get-Content -LiteralPath $path -Raw -Encoding UTF8

# 1) Remove the first neutral-50 section (the extra quote section)
$secMarker = '<section className="py-12 bg-neutral-50">'
$firstSec = $content.IndexOf($secMarker)
if ($firstSec -ge 0) {
  $end = $content.IndexOf('</section>', $firstSec)
  if ($end -ge 0) {
    $end = $end + 10
    $content = $content.Remove($firstSec, $end - $firstSec)
  }
}

# 2) In the remaining neutral-50 (FAQ) section, keep only the first 3 <details>
$faqSec = $content.IndexOf($secMarker)
if ($faqSec -ge 0) {
  $faqEnd = $content.IndexOf('</section>', $faqSec)
  if ($faqEnd -ge 0) {
    $sectionHtml = $content.Substring($faqSec, $faqEnd + 10 - $faqSec)
    $detailsRe = [regex]'(?s)<details>.*?</details>'
    $ms = $detailsRe.Matches($sectionHtml)
    if ($ms.Count -gt 3) {
      $headLen = $ms[0].Index
      $tailStart = $ms[2].Index + $ms[2].Length
      $head = $sectionHtml.Substring(0, $headLen)
      $keep = $ms[0].Value + $ms[1].Value + $ms[2].Value
      $tail = $sectionHtml.Substring($tailStart)
      $sectionNew = $head + $keep + $tail
      $content = $content.Remove($faqSec, $faqEnd + 10 - $faqSec)
      $content = $content.Insert($faqSec, $sectionNew)
    }
  }
}

# 3) Trim FAQ JSON-LD (faq-schema-contact) to first 3 items by editing in-place
$faqId = 'id="faq-schema-contact"'
$faqIdx = $content.IndexOf($faqId)
if ($faqIdx -ge 0) {
  $scriptStart = $content.LastIndexOf('<Script', $faqIdx)
  $scriptEnd = $content.IndexOf('/>', $faqIdx)
  if ($scriptStart -ge 0 -and $scriptEnd -ge 0) {
    $scriptEnd += 2
    $block = $content.Substring($scriptStart, $scriptEnd - $scriptStart)
    $mainIdx = $block.IndexOf('mainEntity:')
    if ($mainIdx -ge 0) {
      $brOpen = $block.IndexOf('[', $mainIdx)
      $brClose = $block.IndexOf(']', $brOpen)
      if ($brOpen -ge 0 -and $brClose -gt $brOpen) {
        $inner = $block.Substring($brOpen + 1, $brClose - $brOpen - 1)
        $objRe = [regex]'(?s)\{.*?\}(?=\s*,\s*\{|\s*$)'
        $objs = $objRe.Matches($inner)
        if ($objs.Count -ge 3) {
          $delim = "`,n              "
          $newInner = $objs[0].Value + ",$delim" + $objs[1].Value + ",$delim" + $objs[2].Value
          $newBlock = $block.Substring(0, $brOpen + 1) + $newInner + $block.Substring($brClose)
          $content = $content.Remove($scriptStart, $scriptEnd - $scriptStart)
          $content = $content.Insert($scriptStart, $newBlock)
        }
      }
    }
  }
}

# 4) Remove HowTo and Breadcrumb JSON-LD scripts by id
foreach ($id in @('howto-contact-quote','breadcrumb-contact')) {
  $mk = 'id="' + $id + '"'
  $idx = $content.IndexOf($mk)
  if ($idx -ge 0) {
    $s = $content.LastIndexOf('<Script', $idx)
    $e = $content.IndexOf('/>', $idx)
    if ($s -ge 0 -and $e -ge 0) {
      $e = $e + 2
      $content = $content.Remove($s, $e - $s)
    }
  }
}

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Host 'Revert applied.'
