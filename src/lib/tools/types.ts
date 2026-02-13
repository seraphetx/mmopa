export interface ToolParam {
  name: string
  type: 'string' | 'number' | 'boolean' | 'object'
  description: string
  required: boolean
  default?: unknown
}

export interface ToolDefinition {
  id: string
  name: string
  webmcpName: string
  description: string
  params: ToolParam[]
  execute: (args: Record<string, unknown>) => Promise<unknown>
  category: string
  library: string
  examples: { input: Record<string, unknown>; output: string }[]
}
