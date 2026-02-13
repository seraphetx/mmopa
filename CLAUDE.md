# MMOPA - WebMCP Tool Pages for ibea.ai

## Project Overview
Static site hosting WebMCP-enabled math/logic tool pages. Built with Vite (MPA), Tailwind CSS v4, vanilla TypeScript. Deployed via nginx serving `dist/`.

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

## Commands
- `npm run dev` — Start Vite dev server
- `npm run build` — Build to `dist/`
- `npm run preview` — Preview production build

## File Structure
- `src/lib/tools/types.ts` — ToolDefinition interface
- `src/lib/tools/registry.ts` — Central tool registry
- `src/lib/webmcp.ts` — WebMCP registration helper
- `src/lib/jsonld.ts` — JSON-LD structured data builder
- `src/shared/tool-ui.ts` — Shared tool page UI (input/output/copy)
