$ErrorActionPreference = 'Stop'
$path = 'c:\Users\gboku\OneDrive\Desktop\Swift Site\swift-auto-import\src\app\contact\page.tsx'
[string]$content = Get-Content -LiteralPath $path -Raw -Encoding UTF8

# Replace the entire FAQ JSON-LD block with a clean 3-item version
$pattern = '<Script\s*id="faq-schema-contact"[\s\S]*?/>'
$replacement = @'
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
                name: 'რამდენ დროში მივიღებ პასუხს?',
                acceptedAnswer: { '@type': 'Answer', text: 'ჩვეულებრივ 15-60 წუთში სამუშაო საათებში.' }
              },
              {
                '@type': 'Question',
                name: 'რომელ ენებზე ვიკომუნიკირებთ?',
                acceptedAnswer: { '@type': 'Answer', text: 'ქართულად, ინგლისურად და რუსულად.' }
              },
              {
                '@type': 'Question',
                name: 'შეიძლება პირადი შეხვედრა?',
                acceptedAnswer: { '@type': 'Answer', text: 'დიახ, ოფისში ვიზიტი შესაძლებელია წინასწარი შეთანხმებით.' }
              }
            ]
          })
        }}
      />
'@

$content = [regex]::Replace($content, $pattern, [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $replacement })

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Host 'FAQ JSON-LD cleaned.'
