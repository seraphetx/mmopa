import '@/styles/main.css'
import { renderHeader } from '@/shared/header'
import { renderFooter } from '@/shared/footer'
import { renderToolUI } from '@/shared/tool-ui'
import { formulaParserTool } from '@/lib/tools/formula-parser'
import { registerWebMCPTool } from '@/lib/webmcp'
import { buildToolJsonLd, injectJsonLd } from '@/lib/jsonld'

const app = document.getElementById('app')!
renderHeader(app)
renderToolUI(app, formulaParserTool)
renderFooter(app)

registerWebMCPTool(formulaParserTool)
injectJsonLd(buildToolJsonLd(formulaParserTool, 'https://ibea.ai'))
