import { defineConfig } from 'vite'

export default defineConfig({
  base: '/assets/',
  build: {
    outDir: 'dist', // this should already exist
  },
})