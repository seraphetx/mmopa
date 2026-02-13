# chart_generator

Generate data visualizations using Chart.js.

## Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| type | string | Yes | Chart type: bar, line, pie, doughnut, radar, scatter |
| labels | array | Yes | Labels for data points (e.g., ["Jan", "Feb", "Mar"]) |
| data | array | Yes | Numeric data values (e.g., [10, 20, 30]) |
| title | string | No | Chart title |

## Examples
- `{"type": "bar", "labels": ["A", "B", "C"], "data": [10, 20, 30], "title": "Sample"}` → Chart rendered on canvas
