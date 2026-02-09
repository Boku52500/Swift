export type BlogPostMeta = {
  slug: string
  title: string
  excerpt: string
  date: string
  image: string
  keywords: string[]
}

export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'ra-ghirs-manqanis-chamoyvana-amerikidan-sakartveloshi',
    title: 'რა ღირს მანქანის ჩამოყვანა ამერიკიდან საქართველოში',
    excerpt: 'სრული გზამკვლევი მანქანის ჩამოყვანის ხარჯებზე: აუქციონის ფასი, საკომისიოები, ტრანსპორტირება, დაზღვევა, განბაჟება და დამატებითი ხარჯები.',
    date: '2026-02-07',
    image: '/images/blog/import-cost.jpg',
    keywords: ['მანქანის იმპორტი', 'მანქანის ჩამოყვანა ამერიკიდან', 'განბაჟება', 'ტრანსპორტირება', 'Copart', 'IAAI', 'საკომისიო', 'VIN']
  },
  {
    slug: 'rogor-avarchiot-pirveli-manqana-amerikis-auqcionze',
    title: 'როგორ ავარჩიოთ პირველი მანქანა ამერიკის აუქციონზე',
    excerpt: 'დასაწყისისთვის აუცილებელი რჩევები: VIN-ის შემოწმება, ზიანი/ტიტული, ბიუჯეტი, ბიდინგის სტრატეგია, ინსპექცია და რისკების მართვა.',
    date: '2026-01-04',
    image: '/images/blog/first-car.jpg',
    keywords: ['ამერიკის აუქციონი', 'პირველი მანქანა', 'VIN', 'ბიდინგი', 'Copart', 'IAAI', 'სათაური (title)', 'ინსპექცია']
  },
  {
    slug: 'romeli-manqanebi-aris-kvelaze-momgebiani-sakartveloshi',
    title: 'რომელი მანქანების ჩამოყვანა არის ყველაზე მომგებიანი საქართველოში',
    excerpt: 'ბაზრის ანალიზი და კატეგორიები: ეკონომ-კლასი, ჰიბრიდები, SUV/ქროსოვერები, ბიზნეს-კლასი — რა და რატომაა ყველაზე მომგებიანი.',
    date: '2025-06-11',
    image: '/images/blog/profitable-cars.webp',
    keywords: ['მომგებიანი მანქანები', 'ჰიბრიდი', 'SUV', 'ეკონომ მანქანა', 'საქართველო ბაზარი', 'მანქანის იმპორტი']
  },
  {
    slug: 'copart-tu-iaai-romeli-auqcioni-sjobs-manqanis-chamosakvanad',
    title: 'Copart თუ IAAI – რომელი აუქციონი სჯობს მანქანის ჩამოსაყვანად?',
    excerpt: 'ორი ლიდერი პლატფორმის შედარება: საფასო პოლიტიკა, დაზიანების ტიპები, ბიდინგი, მიწოდების ვადები და საუკეთესო პრაქტიკები.',
    date: '2025-05-17',
    image: '/images/blog/copart-vs-iaai.webp',
    keywords: ['Copart', 'IAAI', 'აუქციონი', 'ბიდინგი', 'მანქანის იმპორტი', 'ტრანსპორტირება']
  },
  {
    slug: 'kvelaze-khshiri-shetsdomebi-manqanis-chamoyvanisas-amerikidan',
    title: 'ყველაზე ხშირი შეცდომები მანქანის ჩამოყვანისას ამერიკიდან',
    excerpt: 'რა უნდა ავირიდოთ: გაუმართავი ბიუჯეტი, VIN-ის არასწორი შემოწმება, ტრანსპორტირების/დაზღვევის იგნორი, დოკუმენტების დაგვიანება.',
    date: '2025-02-07',
    image: '/images/blog/common-mistakes.webp',
    keywords: ['შეცდომები', 'მანქანის ჩამოყვანა', 'ამერიკიდან', 'დაზღვევა', 'ტრანსპორტირება', 'განბაჟება', 'VIN']
  },
]
