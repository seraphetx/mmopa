export function renderHeader(container: HTMLElement): void {
  const header = document.createElement('header')
  header.className = 'border-b border-gray-200 bg-white'
  header.innerHTML = `
    <div class="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
      <a href="/" class="text-xl font-bold text-blue-600 no-underline">ibea.ai</a>
      <nav class="flex gap-4 text-sm text-gray-600">
        <a href="/" class="hover:text-gray-900 no-underline">Tools</a>
        <a href="/llms.txt" class="hover:text-gray-900 no-underline">llms.txt</a>
      </nav>
    </div>
  `
  container.prepend(header)
}
