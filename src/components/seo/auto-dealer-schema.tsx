export function AutoDealerSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    'name': 'Swift Auto Import',
    'description': 'პროფესიონალური ავტო იმპორტი ამერიკიდან საქართველოში. მანქანების ჩამოყვანა აუქციონებიდან, გადაზიდვა და განბაჟება თბილისში.',
    'url': 'https://swiftautoimport.ge',
    'telephone': '+995577908080',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'თბილისი',
      'addressCountry': 'GE'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '41.7151',
      'longitude': '44.8271'
    },
    'sameAs': [
      'https://facebook.com/swiftautoimport',
      'https://instagram.com/swiftautoimport'
    ],
    'openingHours': 'Mo,Tu,We,Th,Fr,Sa 10:00-19:00',
    'priceRange': '$$',
    'areaServed': {
      '@type': 'Country',
      'name': 'Georgia'
    },
    'makesOffer': [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'ამერიკის ავტო აუქციონი',
          'description': 'მანქანების ჩამოყვანა ამერიკიდან საქართველოში'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'მანქანების იმპორტი',
          'description': 'ავტო იმპორტი ამერიკიდან, მეორადი მანქანების ყიდვა და ჩამოყვანა'
        }
      }
    ]
  }
}
