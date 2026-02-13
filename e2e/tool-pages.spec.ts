import { test, expect } from '@playwright/test'

const tools = [
  { id: 'mathjs-evaluate', name: 'Math Expression Evaluator' },
  { id: 'mathjs-unit-convert', name: 'Unit Converter' },
  { id: 'mathjs-simplify', name: 'Expression Simplifier' },
  { id: 'formula-parser', name: 'Formula Parser' },
  { id: 'basic-math', name: 'Basic Math' },
  { id: 'chart-generator', name: 'Chart Generator' },
  { id: 'stat-distribution', name: 'Statistical Distribution Calculator' },
]

for (const tool of tools) {
  test.describe(`Tool page: ${tool.name}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/t/${tool.id}/`)
    })

    test('title contains tool name', async ({ page }) => {
      await expect(page).toHaveTitle(new RegExp(tool.name))
    })

    test('header and footer exist', async ({ page }) => {
      await expect(page.locator('header')).toBeVisible()
      await expect(page.locator('footer')).toBeVisible()
    })

    test('execute button exists', async ({ page }) => {
      await expect(page.locator('#execute-btn')).toBeVisible()
    })

    if (tool.id !== 'chart-generator') {
      test('output shows default placeholder text', async ({ page }) => {
        await expect(page.locator('#output')).toHaveText('Result will appear here...')
      })

      test('copy button is initially hidden', async ({ page }) => {
        await expect(page.locator('#copy-btn')).toBeHidden()
      })
    }

    test('JSON-LD script exists', async ({ page }) => {
      const jsonLd = page.locator('script[type="application/ld+json"]')
      await expect(jsonLd).toBeAttached()
    })
  })
}
