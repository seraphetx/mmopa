# MMOPA - WebMCP Tool Pages for www.ibea.ai

## Project Overview
Static site hosting WebMCP-enabled math/logic tool pages. Built with Vite (MPA), Tailwind CSS v4, vanilla TypeScript. Deployed via nginx serving `dist/`.

- **Production URL**: https://www.ibea.ai
- **GitHub**: https://github.com/seraphetx/mmopa

## Architecture
- **Vite MPA**: Each tool page is an independent entry point in `src/pages/t/[tool-id]/`
- **No framework**: Pure TypeScript DOM manipulation, no React/Vue
- **WebMCP**: Tools registered via `navigator.modelContext.registerTool()` on each page
- **AI discovery**: `llms.txt` indexes all tools; `public/tools/*.md` provides low-token mirrors

## Key Conventions
- Tool IDs use kebab-case (`mathjs-evaluate`), WebMCP names use snake_case (`mathjs_evaluate`)
- Each tool has: definition in `src/lib/tools/`, page in `src/pages/t/`, markdown in `public/tools/`
- Shared UI components in `src/shared/` (header, footer, tool-ui)
- Styles use Tailwind v4 CSS-first config via `@tailwindcss/vite` plugin
- All canonical/SEO URLs use `https://www.ibea.ai` (not bare `ibea.ai`)
- `dist/` is committed to the repo for deployment

## Commands
- `npm run dev` — Start Vite dev server
- `npm run build` — Build to `dist/`
- `npm run preview` — Preview production build
- `npm test` — Run Playwright E2E tests (builds first, then serves on port 4173)

## Testing
- **Framework**: Playwright (chromium only)
- **Config**: `playwright.config.ts` — webServer builds + runs `vite preview --port 4173`
- **Test dir**: `e2e/`
  - `home.spec.ts` — Home page (title, nav, 7 tool cards, footer)
  - `tool-pages.spec.ts` — All 7 tool pages structure (header/footer, execute/copy/output, JSON-LD)
  - `tool-execution.spec.ts` — Fill inputs + Execute for each tool, verify results
  - `static-assets.spec.ts` — llms.txt, robots.txt, sitemap.xml, tools/*.md

## Key Selectors (for tests & UI)
- `#param-{name}` — Input fields (e.g. `#param-expression`)
- `#execute-btn` — Execute button
- `#copy-btn` — Copy Result button (hidden until execution)
- `#output` — Result display area
- `#chart-canvas` — Chart.js canvas (chart-generator only)
- `.tool-card` — Home page tool cards

## File Structure
- `src/lib/tools/types.ts` — ToolDefinition interface
- `src/lib/tools/registry.ts` — Central tool registry (7 tools)
- `src/lib/webmcp.ts` — WebMCP registration helper
- `src/lib/jsonld.ts` — JSON-LD structured data builder
- `src/shared/tool-ui.ts` — Shared tool page UI (input/output/copy)
- `playwright.config.ts` — Playwright E2E config
- `e2e/` — E2E test specs (64 tests)
