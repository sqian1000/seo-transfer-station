import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: ['docs.aigcwuji.com']
  },
  preview: {
    allowedHosts: ['docs.aigcwuji.com']
  }
});
