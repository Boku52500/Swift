$ErrorActionPreference = 'Stop'
$path = 'c:\Users\gboku\OneDrive\Desktop\Swift Site\swift-auto-import\src\app\contact\page.tsx'
[string]$content = Get-Content -LiteralPath $path -Raw -Encoding UTF8

# 1) Remove the section containing the specific H2 heading
$h2 = '<h2>როგორ მივიღო ზუსტი კოტირება</h2>'
$h2Idx = $content.IndexOf($h2)
if ($h2Idx -ge 0) {
  $secStart = $content.LastIndexOf('<section', $h2Idx)
  if ($secStart -ge 0) {
    $secEnd = $content.IndexOf('</section>', $h2Idx)
    if ($secEnd -ge 0) {
      $secEnd = $secEnd + 10
      $content = $content.Remove($secStart, $secEnd - $secStart)
    }
  }
}

# 2) Remove the last three FAQ <details> entries by unique <summary> text
$removeSummaries = @(
  '<summary>რა ინფორმაციას გავუგზავნო სწრაფი კოტირებისთვის?</summary>',
  '<summary>მუშაობთ სამუშაო საათების გარეთ?</summary>',
  '<summary>რამდენ ხანში მოვალ შემოთავაზებული ვარიანტებით?</summary>'
)
foreach ($sum in $removeSummaries) {
  $idx = $content.IndexOf($sum)
  if ($idx -ge 0) {
    $ds = $content.LastIndexOf('<details>', $idx)
    $de = $content.IndexOf('</details>', $idx)
    if ($ds -ge 0 -and $de -ge 0) {
      $de = $de + 10
      $content = $content.Remove($ds, $de - $ds)
    }
  }
}

# 3) Replace FAQ JSON-LD to only include the original 3 questions
$faqMarker = 'id="faq-schema-contact"'
$mi = $content.IndexOf($faqMarker)
if ($mi -ge 0) {
  $ss = $content.LastIndexOf('<Script', $mi)
  $ee = $content.IndexOf('/>', $mi)
  if ($ss -ge 0 -and $ee -ge 0) {
    $ee = $ee + 2
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
"@
    $content = $content.Remove($ss, $ee - $ss)
    $content = $content.Insert($ss, $replacement)
  }
}

# 4) Remove HowTo and Breadcrumb JSON-LD scripts
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
Write-Host 'Revert complete.'
