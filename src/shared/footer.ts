export function renderFooter(container: HTMLElement): void {
  const footer = document.createElement('footer')
  footer.className = 'border-t border-gray-200 bg-white mt-auto'
  footer.innerHTML = `
    <div class="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-gray-500">
      <p>&copy; ${new Date().getFullYear()} ibea.ai &mdash; Free AI-powered math and data tools</p>
    </div>
  `
  container.appendChild(footer)
}
