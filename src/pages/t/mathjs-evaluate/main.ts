import '@/styles/main.css'
import { renderHeader } from '@/shared/header'
import { renderFooter } from '@/shared/footer'
import { renderToolUI } from '@/shared/tool-ui'
import { mathjsEvaluateTool } from '@/lib/tools/mathjs-evaluate'
import { registerWebMCPTool } from '@/lib/webmcp'
import { buildToolJsonLd, injectJsonLd } from '@/lib/jsonld'

const app = document.getElementById('app')!
renderHeader(app)
renderToolUI(app, mathjsEvaluateTool)
renderFooter(app)

registerWebMCPTool(mathjsEvaluateTool)
injectJsonLd(buildToolJsonLd(mathjsEvaluateTool, 'https://ibea.ai'))
