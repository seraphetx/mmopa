# formula_parser

Parse and evaluate mathematical formulas with variables using fparser.

## Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| formula | string | Yes | Formula to evaluate (e.g., "x^2 + 2*x + 1") |
| variables | object | No | Variable values as key-value pairs (e.g., {"x": 3}) |

## Examples
- `{"formula": "x^2 + 2*x + 1", "variables": {"x": 3}}` → `16`
- `{"formula": "sin(x) * cos(y)", "variables": {"x": 1.5708, "y": 0}}` → `1`
- `{"formula": "2 * PI * r", "variables": {"r": 5}}` → `31.4159`
