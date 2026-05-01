import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: ['docs.531288.xyz']
  },
  preview: {
    allowedHosts: ['docs.531288.xyz']
  }
});
