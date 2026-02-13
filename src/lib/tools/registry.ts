import type { ToolDefinition } from './types'
import { mathjsEvaluateTool } from './mathjs-evaluate'
import { mathjsUnitConvertTool } from './mathjs-unit-convert'
import { mathjsSimplifyTool } from './mathjs-simplify'
import { formulaParserTool } from './formula-parser'
import { basicMathTool } from './basic-math'
import { chartGeneratorTool } from './chart-generator'
import { statDistributionTool } from './stat-distribution'

export const tools: ToolDefinition[] = [
  mathjsEvaluateTool,
  mathjsUnitConvertTool,
  mathjsSimplifyTool,
  formulaParserTool,
  basicMathTool,
  chartGeneratorTool,
  statDistributionTool,
]

export function getToolById(id: string): ToolDefinition | undefined {
  return tools.find((t) => t.id === id)
}

export function getToolByWebmcpName(name: string): ToolDefinition | undefined {
  return tools.find((t) => t.webmcpName === name)
}
