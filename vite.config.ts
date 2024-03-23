import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
import { peerDependencies, dependencies } from './package.json'
import dts from 'vite-plugin-dts';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'components', 'index.ts'),
      formats: ['es', 'cjs'],
      fileName: (ext) => `index.${ext}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies), ...Object.keys(dependencies)], output: { preserveModules: true, exports: 'named' }
    },
    target: 'esnext',
    sourcemap: true
  }
})
