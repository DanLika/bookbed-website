import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    // Code splitting for better lazy loading
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - split for better caching and parallel loading
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'i18n-vendor': ['react-i18next', 'i18next'],
          // Split animation libraries for better performance
          'gsap-vendor': ['gsap'],
          'framer-vendor': ['framer-motion'],
          // Separate WebGL/Three.js (heavy, only needed for Hero)
          'three-vendor': ['three', 'postprocessing'],
        },
      },
    },
    // Enable minification with esbuild (faster than terser)
    minify: 'esbuild',
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    // Sourcemap for production debugging (optional, can disable for smaller builds)
    sourcemap: false,
    // Target modern browsers for smaller bundle
    target: 'es2020',
  },
  // Image optimization
  assetsInclude: ['**/*.avif', '**/*.webp'],
})