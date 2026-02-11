import { Metadata } from 'next'
import { siteConfig } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'სერვისები | Swift Auto Import',
  description: 'Swift Auto Import-ის სრული მომსახურება: ავტო იმპორტი, აუქციონზე დახმარება, ტრანსპორტირება და განბაჟება. ✓ პროფესიონალური მომსახურება ✓ 24/7 მხარდაჭერა',
  keywords: 'ავტო იმპორტი, აუქციონზე დახმარება, ტრანსპორტირება, განბაჟება, მანქანების იმპორტი, სერვისები',
  alternates: {
    canonical: `${siteConfig.url}/servisebi`,
    languages: {
      'x-default': `${siteConfig.url}/servisebi`,
      'ka-GE': `${siteConfig.url}/servisebi`,
      'en-US': `${siteConfig.url}/en/services`,
      'ru-RU': `${siteConfig.url}/ru/uslugi`,
    }
  }
}
