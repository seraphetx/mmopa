# basic_math

Perform basic mathematical operations using native JavaScript Math.

## Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| operation | string | Yes | One of: add, subtract, multiply, divide, power, sqrt, abs, ceil, floor, round, log, log2, log10, sin, cos, tan, min, max, random |
| a | number | Yes | First operand |
| b | number | No | Second operand (for binary operations) |

## Examples
- `{"operation": "add", "a": 10, "b": 5}` → `15`
- `{"operation": "sqrt", "a": 144}` → `12`
- `{"operation": "power", "a": 2, "b": 8}` → `256`
