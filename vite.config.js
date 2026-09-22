import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Makes it easy to host anywhere (Vercel, Netlify, GitHub Pages)
});
