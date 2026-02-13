import { test, expect } from '@playwright/test'

test.describe('Tool execution', () => {
  test('mathjs-evaluate: 2^10 = 1024', async ({ page }) => {
    await page.goto('/t/mathjs-evaluate/')
    await page.locator('#param-expression').fill('2^10')
    await page.locator('#execute-btn').click()
    await expect(page.locator('#output')).toContainText('1024')
  })

  test('mathjs-unit-convert: 100 celsius to fahrenheit ≈ 212', async ({ page }) => {
    await page.goto('/t/mathjs-unit-convert/')
    await page.locator('#param-value').fill('100')
    await page.locator('#param-from').fill('celsius')
    await page.locator('#param-to').fill('fahrenheit')
    await page.locator('#execute-btn').click()
    const output = page.locator('#output')
    await expect(output).toContainText('fahrenheit')
    await expect(output).toContainText('211.99')
  })

  test('mathjs-simplify: 2x + 3x = 5 * x', async ({ page }) => {
    await page.goto('/t/mathjs-simplify/')
    await page.locator('#param-expression').fill('2x + 3x')
    await page.locator('#execute-btn').click()
    await expect(page.locator('#output')).toContainText('5 * x')
  })

  test('formula-parser: x^2+1 with x=3 = 10', async ({ page }) => {
    await page.goto('/t/formula-parser/')
    await page.locator('#param-formula').fill('x^2+1')
    await page.locator('#param-variables').fill('{"x":3}')
    await page.locator('#execute-btn').click()
    await expect(page.locator('#output')).toContainText('10')
  })

  test('basic-math: sqrt(144) = 12', async ({ page }) => {
    await page.goto('/t/basic-math/')
    await page.locator('#param-operation').fill('sqrt')
    await page.locator('#param-a').fill('144')
    await page.locator('#execute-btn').click()
    await expect(page.locator('#output')).toContainText('12')
  })

  test('chart-generator: bar chart renders on canvas', async ({ page }) => {
    await page.goto('/t/chart-generator/')
    await page.locator('#param-type').selectOption('bar')
    await page.locator('#param-labels').fill('["A","B"]')
    await page.locator('#param-data').fill('[10,20]')
    await page.locator('#execute-btn').click()

    // Wait a bit for Chart.js to render
    await page.waitForTimeout(500)

    // Verify the canvas has been drawn on (non-empty)
    const canvasBlank = await page.evaluate(() => {
      const canvas = document.getElementById('chart-canvas') as HTMLCanvasElement
      const ctx = canvas.getContext('2d')!
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      return data.every((v) => v === 0)
    })
    expect(canvasBlank).toBe(false)
  })

  test('stat-distribution: normal pdf at x=0 contains 0.39', async ({ page }) => {
    await page.goto('/t/stat-distribution/')
    await page.locator('#param-distribution').fill('normal')
    await page.locator('#param-fn').fill('pdf')
    await page.locator('#param-x').fill('0')
    await page.locator('#param-params').fill('[0,1]')
    await page.locator('#execute-btn').click()
    await expect(page.locator('#output')).toContainText('0.39')
  })

  test('copy button becomes visible after execution', async ({ page }) => {
    await page.goto('/t/mathjs-evaluate/')
    await expect(page.locator('#copy-btn')).toBeHidden()
    await page.locator('#param-expression').fill('1+1')
    await page.locator('#execute-btn').click()
    await expect(page.locator('#output')).not.toHaveText('Result will appear here...')
    await expect(page.locator('#copy-btn')).toBeVisible()
  })

  test('clicking example fills input fields', async ({ page }) => {
    await page.goto('/t/mathjs-evaluate/')
    // Click the first example
    const example = page.locator('.cursor-pointer').first()
    await example.click()
    // The expression input should now be filled
    const value = await page.locator('#param-expression').inputValue()
    expect(value).toBeTruthy()
  })
})
