import type { ToolDefinition } from '@/lib/tools/types'

export function renderToolUI(container: HTMLElement, tool: ToolDefinition): void {
  const section = document.createElement('section')
  section.className = 'mx-auto max-w-3xl px-4 py-8'

  // Title and description
  const heading = document.createElement('div')
  heading.className = 'mb-6'
  heading.innerHTML = `
    <h1 class="text-2xl font-bold mb-2">${tool.name}</h1>
    <p class="text-gray-600">${tool.description}</p>
    <span class="inline-block mt-2 text-xs bg-gray-100 text-gray-500 rounded px-2 py-0.5">Powered by ${tool.library}</span>
  `
  section.appendChild(heading)

  // Input fields
  const form = document.createElement('div')
  form.className = 'space-y-4 mb-6'

  for (const param of tool.params) {
    const wrapper = document.createElement('div')
    const label = document.createElement('label')
    label.className = 'block text-sm font-medium mb-1'
    label.textContent = `${param.name}${param.required ? '' : ' (optional)'}`

    let input: HTMLInputElement | HTMLTextAreaElement
    if (param.type === 'object') {
      input = document.createElement('textarea')
      input.className = 'input-field'
      input.rows = 2
      input.placeholder = param.description
    } else {
      input = document.createElement('input')
      input.className = 'input-field'
      input.type = param.type === 'number' ? 'number' : 'text'
      input.placeholder = param.description
    }
    input.id = `param-${param.name}`

    wrapper.appendChild(label)
    wrapper.appendChild(input)
    form.appendChild(wrapper)
  }
  section.appendChild(form)

  // Execute button
  const btnRow = document.createElement('div')
  btnRow.className = 'flex gap-3 mb-6'
  const execBtn = document.createElement('button')
  execBtn.className = 'btn-primary'
  execBtn.textContent = 'Execute'
  execBtn.id = 'execute-btn'
  btnRow.appendChild(execBtn)

  const copyBtn = document.createElement('button')
  copyBtn.className = 'btn-primary bg-gray-500 hover:bg-gray-600'
  copyBtn.textContent = 'Copy Result'
  copyBtn.id = 'copy-btn'
  copyBtn.style.display = 'none'
  btnRow.appendChild(copyBtn)
  section.appendChild(btnRow)

  // Output area
  const output = document.createElement('div')
  output.id = 'output'
  output.className = 'output-area'
  output.textContent = 'Result will appear here...'
  section.appendChild(output)

  // Examples
  if (tool.examples.length > 0) {
    const exSection = document.createElement('div')
    exSection.className = 'mt-8'
    exSection.innerHTML = `<h2 class="text-lg font-semibold mb-3">Examples</h2>`
    const list = document.createElement('div')
    list.className = 'space-y-3'
    for (const ex of tool.examples) {
      const item = document.createElement('div')
      item.className = 'bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm cursor-pointer hover:border-blue-300 transition-colors'
      item.innerHTML = `
        <div class="font-mono text-gray-700">${JSON.stringify(ex.input)}</div>
        <div class="text-gray-500 mt-1">→ ${ex.output}</div>
      `
      item.addEventListener('click', () => fillInputs(tool, ex.input))
      list.appendChild(item)
    }
    exSection.appendChild(list)
    section.appendChild(exSection)
  }

  container.appendChild(section)

  // Wire up execute
  execBtn.addEventListener('click', async () => {
    const args = collectInputs(tool)
    const outputEl = document.getElementById('output')!
    const copyBtnEl = document.getElementById('copy-btn')!
    try {
      outputEl.textContent = 'Computing...'
      const result = await tool.execute(args)
      outputEl.textContent = JSON.stringify(result, null, 2)
      copyBtnEl.style.display = ''
    } catch (err) {
      outputEl.textContent = `Error: ${err instanceof Error ? err.message : String(err)}`
    }
  })

  // Wire up copy
  copyBtn.addEventListener('click', () => {
    const text = document.getElementById('output')!.textContent ?? ''
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.textContent = 'Copied!'
      setTimeout(() => (copyBtn.textContent = 'Copy Result'), 1500)
    })
  })
}

function collectInputs(tool: ToolDefinition): Record<string, unknown> {
  const args: Record<string, unknown> = {}
  for (const param of tool.params) {
    const el = document.getElementById(`param-${param.name}`) as HTMLInputElement | HTMLTextAreaElement
    if (!el) continue
    const val = el.value.trim()
    if (!val && !param.required) continue
    if (param.type === 'number') {
      args[param.name] = Number(val)
    } else if (param.type === 'object') {
      try {
        args[param.name] = JSON.parse(val)
      } catch {
        args[param.name] = val
      }
    } else {
      args[param.name] = val
    }
  }
  return args
}

function fillInputs(tool: ToolDefinition, values: Record<string, unknown>): void {
  for (const param of tool.params) {
    const el = document.getElementById(`param-${param.name}`) as HTMLInputElement | HTMLTextAreaElement
    if (!el || !(param.name in values)) continue
    const v = values[param.name]
    el.value = typeof v === 'object' ? JSON.stringify(v) : String(v)
  }
}
