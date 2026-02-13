import '@/styles/main.css'
import { renderHeader } from '@/shared/header'
import { renderFooter } from '@/shared/footer'
import { chartGeneratorTool } from '@/lib/tools/chart-generator'
import { registerWebMCPTool } from '@/lib/webmcp'
import { buildToolJsonLd, injectJsonLd } from '@/lib/jsonld'
import { trackAgentInvoked } from '@/lib/analytics'
import { Chart, registerables } from 'chart.js'
import type { ToolDefinition } from '@/lib/tools/types'

Chart.register(...registerables)

const app = document.getElementById('app')!
renderHeader(app)

// Custom UI for chart generator (needs canvas)
const section = document.createElement('section')
section.className = 'mx-auto max-w-3xl px-4 py-8'
section.innerHTML = `
  <div class="mb-6">
    <h1 class="text-2xl font-bold mb-2">${chartGeneratorTool.name}</h1>
    <p class="text-gray-600">${chartGeneratorTool.description}</p>
    <span class="inline-block mt-2 text-xs bg-gray-100 text-gray-500 rounded px-2 py-0.5">Powered by ${chartGeneratorTool.library}</span>
  </div>
  <div class="space-y-4 mb-6">
    <div>
      <label class="block text-sm font-medium mb-1">Chart Type</label>
      <select id="param-type" class="input-field">
        <option value="bar">Bar</option>
        <option value="line">Line</option>
        <option value="pie">Pie</option>
        <option value="doughnut">Doughnut</option>
        <option value="radar">Radar</option>
        <option value="scatter">Scatter</option>
      </select>
    </div>
    <div>
      <label class="block text-sm font-medium mb-1">Labels (JSON array)</label>
      <input id="param-labels" class="input-field" type="text" placeholder='["Jan", "Feb", "Mar"]' value='["Jan", "Feb", "Mar", "Apr", "May"]' />
    </div>
    <div>
      <label class="block text-sm font-medium mb-1">Data (JSON array)</label>
      <input id="param-data" class="input-field" type="text" placeholder="[10, 20, 30]" value="[12, 19, 3, 5, 8]" />
    </div>
    <div>
      <label class="block text-sm font-medium mb-1">Title (optional)</label>
      <input id="param-title" class="input-field" type="text" placeholder="My Chart" />
    </div>
  </div>
  <button id="execute-btn" class="btn-primary mb-6">Generate Chart</button>
  <div class="bg-white border border-gray-200 rounded-lg p-4">
    <canvas id="chart-canvas" width="600" height="400"></canvas>
  </div>
`
app.appendChild(section)

let chartInstance: Chart | null = null
const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316']

document.getElementById('execute-btn')!.addEventListener('click', () => {
  try {
    const type = (document.getElementById('param-type') as HTMLSelectElement).value as any
    const labels = JSON.parse((document.getElementById('param-labels') as HTMLInputElement).value)
    const data = JSON.parse((document.getElementById('param-data') as HTMLInputElement).value)
    const title = (document.getElementById('param-title') as HTMLInputElement).value

    if (chartInstance) chartInstance.destroy()

    const canvas = document.getElementById('chart-canvas') as HTMLCanvasElement
    chartInstance = new Chart(canvas, {
      type,
      data: {
        labels,
        datasets: [{
          label: title || 'Data',
          data,
          backgroundColor: colors.slice(0, data.length),
          borderColor: type === 'line' ? '#3b82f6' : undefined,
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: !!title, text: title },
        },
      },
    })
  } catch (err) {
    alert(`Error: ${err instanceof Error ? err.message : String(err)}`)
  }
})

renderFooter(app)

// WebMCP registration with chart rendering
const chartWebMCPTool: ToolDefinition = {
  ...chartGeneratorTool,
  execute: async (args) => {
    trackAgentInvoked(chartGeneratorTool.id)
    const type = String(args.type) as any
    const labels = args.labels as string[]
    const data = args.data as number[]
    const title = String(args.title ?? '')

    if (chartInstance) chartInstance.destroy()
    const canvas = document.getElementById('chart-canvas') as HTMLCanvasElement
    chartInstance = new Chart(canvas, {
      type,
      data: {
        labels,
        datasets: [{
          label: title || 'Data',
          data,
          backgroundColor: colors.slice(0, data.length),
          borderColor: type === 'line' ? '#3b82f6' : undefined,
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        plugins: { title: { display: !!title, text: title } },
      },
    })

    return { type, labels, data, title, rendered: true }
  },
}
registerWebMCPTool(chartWebMCPTool)
injectJsonLd(buildToolJsonLd(chartGeneratorTool, 'https://ibea.ai'))
