import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('title contains ibea.ai', async ({ page }) => {
    await expect(page).toHaveTitle(/ibea\.ai/)
  })

  test('header navigation links exist', async ({ page }) => {
    const header = page.locator('header')
    await expect(header.getByRole('link', { name: 'Tools' })).toBeVisible()
    await expect(header.getByRole('link', { name: 'llms.txt' })).toBeVisible()
  })

  test('renders 7 tool cards with name and description', async ({ page }) => {
    const cards = page.locator('.tool-card')
    await expect(cards).toHaveCount(7)

    for (let i = 0; i < 7; i++) {
      const card = cards.nth(i)
      await expect(card.locator('h2')).not.toBeEmpty()
      await expect(card.locator('p')).not.toBeEmpty()
    }
  })

  test('clicking a tool card navigates to /t/{tool-id}/', async ({ page }) => {
    const firstCard = page.locator('.tool-card').first()
    const href = await firstCard.getAttribute('href')
    expect(href).toMatch(/^\/t\/[\w-]+\/$/)

    await firstCard.click()
    await expect(page).toHaveURL(new RegExp(`/t/[\\w-]+/`))
  })

  test('footer exists', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible()
  })
})
