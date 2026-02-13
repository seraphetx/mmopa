import type { ToolDefinition } from './types'

export const chartGeneratorTool: ToolDefinition = {
  id: 'chart-generator',
  name: 'Chart Generator',
  webmcpName: 'chart_generator',
  description: 'Generate data visualizations as charts. Supports bar, line, pie, doughnut, radar, and scatter chart types.',
  category: 'Visualization',
  library: 'Chart.js',
  params: [
    {
      name: 'type',
      type: 'string',
      description: 'Chart type: bar, line, pie, doughnut, radar, scatter',
      required: true,
    },
    {
      name: 'labels',
      type: 'object',
      description: 'Array of labels for the data points (e.g., ["Jan", "Feb", "Mar"])',
      required: true,
    },
    {
      name: 'data',
      type: 'object',
      description: 'Array of numeric data values (e.g., [10, 20, 30])',
      required: true,
    },
    {
      name: 'title',
      type: 'string',
      description: 'Chart title',
      required: false,
      default: '',
    },
  ],
  examples: [
    {
      input: { type: 'bar', labels: ['A', 'B', 'C'], data: [10, 20, 30], title: 'Sample Chart' },
      output: 'Chart rendered on canvas',
    },
  ],
  execute: async (args) => {
    // Chart rendering happens in the page's main.ts using Chart.js
    // This returns the config for the page to render
    return {
      type: String(args.type),
      labels: args.labels,
      data: args.data,
      title: args.title ?? '',
    }
  },
}
