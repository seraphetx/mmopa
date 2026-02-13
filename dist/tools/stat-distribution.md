# stat_distribution

Calculate statistical distributions using jstat.

## Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| distribution | string | Yes | Distribution: normal, beta, chisquare, exponential, gamma, poisson, studentt, uniform |
| fn | string | Yes | Function: pdf, cdf, inv, mean, variance |
| x | number | Yes | Value to evaluate (for pdf/cdf) or probability (for inv) |
| params | array | Yes | Distribution parameters (e.g., [0, 1] for normal(mean, std)) |

## Examples
- `{"distribution": "normal", "fn": "pdf", "x": 0, "params": [0, 1]}` → `0.3989`
- `{"distribution": "normal", "fn": "cdf", "x": 1.96, "params": [0, 1]}` → `0.975`
- `{"distribution": "normal", "fn": "inv", "x": 0.975, "params": [0, 1]}` → `1.96`

## Supported Distributions
- **normal**: params [mean, std]
- **beta**: params [alpha, beta]
- **chisquare**: params [dof]
- **exponential**: params [rate]
- **gamma**: params [shape, scale]
- **poisson**: params [lambda]
- **studentt**: params [dof]
- **uniform**: params [min, max]
