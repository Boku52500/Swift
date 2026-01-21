interface BreadcrumbItem {
  name: string
  item: string
}

interface BreadcrumbsSchemaProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbsSchema({ items }: BreadcrumbsSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://swiftautoimport.ge${item.item}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
