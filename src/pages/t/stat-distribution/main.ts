import '@/styles/main.css'
import { renderHeader } from '@/shared/header'
import { renderFooter } from '@/shared/footer'
import { renderToolUI } from '@/shared/tool-ui'
import { statDistributionTool } from '@/lib/tools/stat-distribution'
import { registerWebMCPTool } from '@/lib/webmcp'
import { buildToolJsonLd, injectJsonLd } from '@/lib/jsonld'

const app = document.getElementById('app')!
renderHeader(app)
renderToolUI(app, statDistributionTool)
renderFooter(app)

registerWebMCPTool(statDistributionTool)
injectJsonLd(buildToolJsonLd(statDistributionTool, 'https://ibea.ai'))
