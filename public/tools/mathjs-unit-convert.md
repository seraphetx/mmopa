# mathjs_unit_convert

Convert between physical units using mathjs.

## Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| value | number | Yes | Numeric value to convert |
| from | string | Yes | Source unit (e.g., "km", "lb", "celsius") |
| to | string | Yes | Target unit (e.g., "mile", "kg", "fahrenheit") |

## Examples
- `{"value": 100, "from": "celsius", "to": "fahrenheit"}` → `212 fahrenheit`
- `{"value": 1, "from": "km", "to": "m"}` → `1000 m`
- `{"value": 5, "from": "lb", "to": "kg"}` → `2.26796 kg`

## Supported Units
Length, mass, time, temperature, volume, area, speed, force, energy, power, pressure, electric current, and more.
