import type { ToolDefinition } from './tools/types'
import { trackAgentInvoked } from './analytics'

declare global {
  interface ModelContextTool {
    name: string
    description: string
    parameters: {
      type: 'object'
      properties: Record<string, { type: string; description: string }>
      required: string[]
    }
    execute: (args: Record<string, unknown>) => Promise<unknown>
  }

  interface ModelContext {
    registerTool: (tool: ModelContextTool) => void
  }

  interface Navigator {
    modelContext?: ModelContext
  }
}

export function registerWebMCPTool(tool: ToolDefinition): void {
  if (!navigator.modelContext) return

  const properties: Record<string, { type: string; description: string }> = {}
  const required: string[] = []

  for (const param of tool.params) {
    properties[param.name] = {
      type: param.type,
      description: param.description,
    }
    if (param.required) {
      required.push(param.name)
    }
  }

  navigator.modelContext.registerTool({
    name: tool.webmcpName,
    description: tool.description,
    parameters: { type: 'object', properties, required },
    execute: async (args) => {
      trackAgentInvoked(tool.id)
      return tool.execute(args)
    },
  })
}
