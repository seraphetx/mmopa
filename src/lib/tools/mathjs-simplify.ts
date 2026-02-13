import { simplify, parse } from 'mathjs'
import type { ToolDefinition } from './types'

export const mathjsSimplifyTool: ToolDefinition = {
  id: 'mathjs-simplify',
  name: 'Expression Simplifier',
  webmcpName: 'mathjs_simplify',
  description: 'Simplify algebraic expressions. Reduces mathematical expressions to their simplest form using algebraic rules.',
  category: 'Mathematics',
  library: 'mathjs',
  params: [
    {
      name: 'expression',
      type: 'string',
      description: 'The algebraic expression to simplify (e.g., "2x + 3x", "x^2 / x")',
      required: true,
    },
  ],
  examples: [
    { input: { expression: '2x + 3x' }, output: '5 * x' },
    { input: { expression: 'x^2 / x' }, output: 'x' },
    { input: { expression: '2 * (x + 1) - x' }, output: 'x + 2' },
  ],
  execute: async (args) => {
    const expr = String(args.expression)
    const node = parse(expr)
    const simplified = simplify(node)
    return { expression: expr, simplified: simplified.toString() }
  },
}
