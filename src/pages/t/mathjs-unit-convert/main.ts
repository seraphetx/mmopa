import '@/styles/main.css'
import { renderHeader } from '@/shared/header'
import { renderFooter } from '@/shared/footer'
import { renderToolUI } from '@/shared/tool-ui'
import { mathjsUnitConvertTool } from '@/lib/tools/mathjs-unit-convert'
import { registerWebMCPTool } from '@/lib/webmcp'
import { buildToolJsonLd, injectJsonLd } from '@/lib/jsonld'

const app = document.getElementById('app')!
renderHeader(app)
renderToolUI(app, mathjsUnitConvertTool)
renderFooter(app)

registerWebMCPTool(mathjsUnitConvertTool)
injectJsonLd(buildToolJsonLd(mathjsUnitConvertTool, 'https://ibea.ai'))
