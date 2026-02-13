import Fparser from 'fparser'
import type { ToolDefinition } from './types'

export const formulaParserTool: ToolDefinition = {
  id: 'formula-parser',
  name: 'Formula Parser',
  webmcpName: 'formula_parser',
  description: 'Parse and evaluate mathematical formulas with variables. Define a formula and provide variable values to compute results.',
  category: 'Mathematics',
  library: 'fparser',
  params: [
    {
      name: 'formula',
      type: 'string',
      description: 'The formula to evaluate (e.g., "x^2 + 2*x + 1")',
      required: true,
    },
    {
      name: 'variables',
      type: 'object',
      description: 'Variable values as key-value pairs (e.g., {"x": 3})',
      required: false,
      default: {},
    },
  ],
  examples: [
    { input: { formula: 'x^2 + 2*x + 1', variables: { x: 3 } }, output: '16' },
    { input: { formula: 'sin(x) * cos(y)', variables: { x: 1.5708, y: 0 } }, output: '1' },
    { input: { formula: '2 * PI * r', variables: { r: 5 } }, output: '31.4159' },
  ],
  execute: async (args) => {
    const formula = String(args.formula)
    const variables = (args.variables as Record<string, number>) ?? {}
    const fparser = new Fparser(formula)
    const result = fparser.evaluate(variables)
    return { formula, variables, result: String(result) }
  },
}
