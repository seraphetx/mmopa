import '@/styles/main.css'
import { renderHeader } from '@/shared/header'
import { renderFooter } from '@/shared/footer'
import { tools } from '@/lib/tools/registry'

const app = document.getElementById('app')!
renderHeader(app)

const main = document.createElement('main')
main.className = 'mx-auto max-w-5xl px-4 py-10'

// Hero
main.innerHTML = `
  <div class="text-center mb-10">
    <h1 class="text-3xl font-bold mb-3">Free AI Math & Data Tools</h1>
    <p class="text-gray-600 max-w-xl mx-auto">High-precision math, unit conversion, statistics, and chart generation. WebMCP-enabled for seamless AI agent integration.</p>
  </div>
`

// Tool grid
const grid = document.createElement('div')
grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'

for (const tool of tools) {
  const card = document.createElement('a')
  card.href = `/t/${tool.id}/`
  card.className = 'tool-card block no-underline text-inherit'
  card.innerHTML = `
    <div class="text-xs text-gray-400 mb-1">${tool.category}</div>
    <h2 class="text-lg font-semibold mb-1">${tool.name}</h2>
    <p class="text-sm text-gray-600 mb-2">${tool.description}</p>
    <span class="text-xs bg-gray-100 text-gray-500 rounded px-2 py-0.5">${tool.library}</span>
  `
  grid.appendChild(card)
}

main.appendChild(grid)
app.appendChild(main)
renderFooter(app)
