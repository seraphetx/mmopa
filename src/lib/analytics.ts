export function trackAgentInvoked(toolId: string): void {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'agent_invoked', {
        event_category: 'webmcp',
        event_label: toolId,
      })
    }
  } catch {
    // silently ignore analytics errors
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
