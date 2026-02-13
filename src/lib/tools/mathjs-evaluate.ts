import { evaluate } from 'mathjs'
import type { ToolDefinition } from './types'

export const mathjsEvaluateTool: ToolDefinition = {
  id: 'mathjs-evaluate',
  name: 'Math Expression Evaluator',
  webmcpName: 'mathjs_evaluate',
  description: 'Evaluate mathematical expressions with high precision. Supports arithmetic, algebra, trigonometry, logarithms, matrices, and more.',
  category: 'Mathematics',
  library: 'mathjs',
  params: [
    {
      name: 'expression',
      type: 'string',
      description: 'The mathematical expression to evaluate (e.g., "2^10", "sin(pi/4)", "det([1,2;3,4])")',
      required: true,
    },
  ],
  examples: [
    { input: { expression: '2^10' }, output: '1024' },
    { input: { expression: 'sin(pi / 4)' }, output: '0.7071067811865476' },
    { input: { expression: 'sqrt(144) + log(e^3)' }, output: '15' },
  ],
  execute: async (args) => {
    const expr = String(args.expression)
    const result = evaluate(expr)
    return { expression: expr, result: String(result) }
  },
}
