import { resolve } from 'path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: resolve(__dirname, 'src/pages'),
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'src/pages/index.html'),
        'mathjs-evaluate': resolve(__dirname, 'src/pages/t/mathjs-evaluate/index.html'),
        'mathjs-unit-convert': resolve(__dirname, 'src/pages/t/mathjs-unit-convert/index.html'),
        'mathjs-simplify': resolve(__dirname, 'src/pages/t/mathjs-simplify/index.html'),
        'formula-parser': resolve(__dirname, 'src/pages/t/formula-parser/index.html'),
        'basic-math': resolve(__dirname, 'src/pages/t/basic-math/index.html'),
        'chart-generator': resolve(__dirname, 'src/pages/t/chart-generator/index.html'),
        'stat-distribution': resolve(__dirname, 'src/pages/t/stat-distribution/index.html'),
      },
    },
  },
  publicDir: resolve(__dirname, 'public'),
})
