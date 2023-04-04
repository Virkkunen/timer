import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { ghPages } from 'vite-plugin-gh-pages';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react(), ghPages()],
  base: '/timer/',
  publicDir: 'public',
  build: {
    manifest: true,
  }
})
