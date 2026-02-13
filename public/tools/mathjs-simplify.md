# mathjs_simplify

Simplify algebraic expressions using mathjs.

## Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| expression | string | Yes | Algebraic expression to simplify (e.g., "2x + 3x") |

## Examples
- `{"expression": "2x + 3x"}` → `5 * x`
- `{"expression": "x^2 / x"}` → `x`
- `{"expression": "2 * (x + 1) - x"}` → `x + 2`
