import { unit } from 'mathjs'
import type { ToolDefinition } from './types'

export const mathjsUnitConvertTool: ToolDefinition = {
  id: 'mathjs-unit-convert',
  name: 'Unit Converter',
  webmcpName: 'mathjs_unit_convert',
  description: 'Convert between physical units. Supports length, mass, time, temperature, volume, speed, energy, and more.',
  category: 'Mathematics',
  library: 'mathjs',
  params: [
    {
      name: 'value',
      type: 'number',
      description: 'The numeric value to convert',
      required: true,
    },
    {
      name: 'from',
      type: 'string',
      description: 'Source unit (e.g., "km", "lb", "celsius")',
      required: true,
    },
    {
      name: 'to',
      type: 'string',
      description: 'Target unit (e.g., "mile", "kg", "fahrenheit")',
      required: true,
    },
  ],
  examples: [
    { input: { value: 100, from: 'celsius', to: 'fahrenheit' }, output: '212 fahrenheit' },
    { input: { value: 1, from: 'km', to: 'm' }, output: '1000 m' },
    { input: { value: 5, from: 'lb', to: 'kg' }, output: '2.26796 kg' },
  ],
  execute: async (args) => {
    const val = Number(args.value)
    const from = String(args.from)
    const to = String(args.to)
    const result = unit(val, from).to(to)
    return { value: val, from, to, result: result.toString() }
  },
}
