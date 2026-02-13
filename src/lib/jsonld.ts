import type { ToolDefinition } from './tools/types'

interface JsonLdSoftwareApp {
  '@context': string
  '@type': string
  name: string
  description: string
  url: string
  applicationCategory: string
  operatingSystem: string
  offers: { '@type': string; price: string; priceCurrency: string }
}

export function buildToolJsonLd(tool: ToolDefinition, baseUrl: string): JsonLdSoftwareApp {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: `${baseUrl}/t/${tool.id}/`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}

export function injectJsonLd(data: JsonLdSoftwareApp): void {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}
