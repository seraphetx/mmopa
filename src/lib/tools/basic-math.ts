import type { ToolDefinition } from './types'

type MathOp = 'add' | 'subtract' | 'multiply' | 'divide' | 'power' | 'sqrt' | 'abs' | 'ceil' | 'floor' | 'round' | 'log' | 'log2' | 'log10' | 'sin' | 'cos' | 'tan' | 'min' | 'max' | 'random'

const ops: Record<MathOp, (a: number, b?: number) => number> = {
  add: (a, b) => a + (b ?? 0),
  subtract: (a, b) => a - (b ?? 0),
  multiply: (a, b) => a * (b ?? 1),
  divide: (a, b) => {
    if (b === 0) throw new Error('Division by zero')
    return a / (b ?? 1)
  },
  power: (a, b) => Math.pow(a, b ?? 2),
  sqrt: (a) => Math.sqrt(a),
  abs: (a) => Math.abs(a),
  ceil: (a) => Math.ceil(a),
  floor: (a) => Math.floor(a),
  round: (a) => Math.round(a),
  log: (a) => Math.log(a),
  log2: (a) => Math.log2(a),
  log10: (a) => Math.log10(a),
  sin: (a) => Math.sin(a),
  cos: (a) => Math.cos(a),
  tan: (a) => Math.tan(a),
  min: (a, b) => Math.min(a, b ?? a),
  max: (a, b) => Math.max(a, b ?? a),
  random: () => Math.random(),
}

export const basicMathTool: ToolDefinition = {
  id: 'basic-math',
  name: 'Basic Math',
  webmcpName: 'basic_math',
  description: 'Perform basic mathematical operations using native Math functions. Supports arithmetic, trigonometry, rounding, and more.',
  category: 'Mathematics',
  library: 'Native Math',
  params: [
    {
      name: 'operation',
      type: 'string',
      description: `Operation to perform: ${Object.keys(ops).join(', ')}`,
      required: true,
    },
    {
      name: 'a',
      type: 'number',
      description: 'First operand',
      required: true,
    },
    {
      name: 'b',
      type: 'number',
      description: 'Second operand (for binary operations like add, subtract, etc.)',
      required: false,
    },
  ],
  examples: [
    { input: { operation: 'add', a: 10, b: 5 }, output: '15' },
    { input: { operation: 'sqrt', a: 144 }, output: '12' },
    { input: { operation: 'power', a: 2, b: 8 }, output: '256' },
  ],
  execute: async (args) => {
    const op = String(args.operation) as MathOp
    const a = Number(args.a)
    const b = args.b != null ? Number(args.b) : undefined
    const fn = ops[op]
    if (!fn) throw new Error(`Unknown operation: ${op}. Valid: ${Object.keys(ops).join(', ')}`)
    const result = fn(a, b)
    return { operation: op, a, b, result }
  },
}
