$ErrorActionPreference = 'Stop'
$path = 'c:\Users\gboku\OneDrive\Desktop\Swift Site\swift-auto-import\src\app\contact\page.tsx'
[string]$content = Get-Content -LiteralPath $path -Raw -Encoding UTF8

# Extract the first three FAQ <details> with their <summary> and <p> text
$detRe = [regex]'(?s)<details>\s*<summary>(.*?)</summary>\s*<p>(.*?)</p>\s*</details>'
$matches = $detRe.Matches($content)
if ($matches.Count -ge 3) {
  $q1 = $matches[0].Groups[1].Value
  $a1 = $matches[0].Groups[2].Value
  $q2 = $matches[1].Groups[1].Value
  $a2 = $matches[1].Groups[2].Value
  $q3 = $matches[2].Groups[1].Value
  $a3 = $matches[2].Groups[2].Value

  # Escape single quotes in values for JS string literals
  $esc = { param($s) return $s -replace "'", "\\'" }
  $q1 = & $esc $q1; $a1 = & $esc $a1
  $q2 = & $esc $q2; $a2 = & $esc $a2
  $q3 = & $esc $q3; $a3 = & $esc $a3

  $replacement = @"
      <Script
        id="faq-schema-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: '$q1',
                acceptedAnswer: { '@type': 'Answer', text: '$a1' }
              },
              {
                '@type': 'Question',
                name: '$q2',
                acceptedAnswer: { '@type': 'Answer', text: '$a2' }
              },
              {
                '@type': 'Question',
                name: '$q3',
                acceptedAnswer: { '@type': 'Answer', text: '$a3' }
              }
            ]
          })
        }}
      />
"@

  # Replace the entire existing faq-schema-contact Script block
  $scriptRe = [regex]'(?s)<Script[\s\S]*?id=\"faq-schema-contact\"[\s\S]*?/\s*>'
  $content = $scriptRe.Replace($content, [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $replacement }, 1)
}

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Host 'FAQ JSON-LD rebuilt from details.'
