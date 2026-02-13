import '@/styles/main.css'
import { renderHeader } from '@/shared/header'
import { renderFooter } from '@/shared/footer'
import { renderToolUI } from '@/shared/tool-ui'
import { mathjsSimplifyTool } from '@/lib/tools/mathjs-simplify'
import { registerWebMCPTool } from '@/lib/webmcp'
import { buildToolJsonLd, injectJsonLd } from '@/lib/jsonld'

const app = document.getElementById('app')!
renderHeader(app)
renderToolUI(app, mathjsSimplifyTool)
renderFooter(app)

registerWebMCPTool(mathjsSimplifyTool)
injectJsonLd(buildToolJsonLd(mathjsSimplifyTool, 'https://www.ibea.ai'))
