import jstat from 'jstat'
import type { ToolDefinition } from './types'

type DistType = 'normal' | 'beta' | 'chisquare' | 'exponential' | 'gamma' | 'poisson' | 'studentt' | 'uniform'

export const statDistributionTool: ToolDefinition = {
  id: 'stat-distribution',
  name: 'Statistical Distribution Calculator',
  webmcpName: 'stat_distribution',
  description: 'Calculate probability density, cumulative distribution, and inverse CDF for common statistical distributions.',
  category: 'Statistics',
  library: 'jstat',
  params: [
    {
      name: 'distribution',
      type: 'string',
      description: 'Distribution type: normal, beta, chisquare, exponential, gamma, poisson, studentt, uniform',
      required: true,
    },
    {
      name: 'fn',
      type: 'string',
      description: 'Function to compute: pdf (probability density), cdf (cumulative), inv (inverse CDF), mean, variance',
      required: true,
    },
    {
      name: 'x',
      type: 'number',
      description: 'The value at which to evaluate (for pdf/cdf) or probability (for inv)',
      required: true,
    },
    {
      name: 'params',
      type: 'object',
      description: 'Distribution parameters as array (e.g., [0, 1] for normal(mean, std))',
      required: true,
    },
  ],
  examples: [
    { input: { distribution: 'normal', fn: 'pdf', x: 0, params: [0, 1] }, output: '0.3989' },
    { input: { distribution: 'normal', fn: 'cdf', x: 1.96, params: [0, 1] }, output: '0.975' },
    { input: { distribution: 'normal', fn: 'inv', x: 0.975, params: [0, 1] }, output: '1.96' },
  ],
  execute: async (args) => {
    const dist = String(args.distribution) as DistType
    const fn = String(args.fn)
    const x = Number(args.x)
    const params = args.params as number[]

    const distObj = (jstat as any)[dist]
    if (!distObj) throw new Error(`Unknown distribution: ${dist}`)

    let result: number
    if (fn === 'mean') {
      result = distObj.mean(...params)
    } else if (fn === 'variance') {
      result = distObj.variance(...params)
    } else {
      const fnObj = distObj[fn]
      if (!fnObj) throw new Error(`Unknown function: ${fn}`)
      result = fnObj(x, ...params)
    }

    return { distribution: dist, fn, x, params, result }
  },
}
