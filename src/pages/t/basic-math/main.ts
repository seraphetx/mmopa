import '@/styles/main.css'
import { renderHeader } from '@/shared/header'
import { renderFooter } from '@/shared/footer'
import { renderToolUI } from '@/shared/tool-ui'
import { basicMathTool } from '@/lib/tools/basic-math'
import { registerWebMCPTool } from '@/lib/webmcp'
import { buildToolJsonLd, injectJsonLd } from '@/lib/jsonld'

const app = document.getElementById('app')!
renderHeader(app)
renderToolUI(app, basicMathTool)
renderFooter(app)

registerWebMCPTool(basicMathTool)
injectJsonLd(buildToolJsonLd(basicMathTool, 'https://www.ibea.ai'))
