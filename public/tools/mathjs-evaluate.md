# mathjs_evaluate

Evaluate mathematical expressions with high precision using mathjs.

## Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| expression | string | Yes | Math expression (e.g., "2^10", "sin(pi/4)", "det([1,2;3,4])") |

## Examples
- `{"expression": "2^10"}` → `{"expression": "2^10", "result": "1024"}`
- `{"expression": "sin(pi / 4)"}` → `{"expression": "sin(pi / 4)", "result": "0.7071067811865476"}`
- `{"expression": "sqrt(144) + log(e^3)"}` → `{"expression": "sqrt(144) + log(e^3)", "result": "15"}`

## Supported Operations
Arithmetic, trigonometry, logarithms, matrix operations, complex numbers, big numbers, units, and more. See [mathjs documentation](https://mathjs.org/docs/).
