import { test, expect } from '@playwright/test'

const toolIds = [
  'mathjs-evaluate',
  'mathjs-unit-convert',
  'mathjs-simplify',
  'formula-parser',
  'basic-math',
  'chart-generator',
  'stat-distribution',
]

test.describe('Static assets', () => {
  test('GET /llms.txt returns 200 and contains mathjs_evaluate', async ({ request }) => {
    const res = await request.get('/llms.txt')
    expect(res.status()).toBe(200)
    const body = await res.text()
    expect(body).toContain('mathjs_evaluate')
  })

  test('GET /robots.txt returns 200', async ({ request }) => {
    const res = await request.get('/robots.txt')
    expect(res.status()).toBe(200)
  })

  test('GET /sitemap.xml returns 200 and contains all 7 tool URLs', async ({ request }) => {
    const res = await request.get('/sitemap.xml')
    expect(res.status()).toBe(200)
    const body = await res.text()
    for (const id of toolIds) {
      expect(body).toContain(`/t/${id}/`)
    }
  })

  for (const id of toolIds) {
    test(`GET /tools/${id}.md returns 200`, async ({ request }) => {
      const res = await request.get(`/tools/${id}.md`)
      expect(res.status()).toBe(200)
    })
  }
})
