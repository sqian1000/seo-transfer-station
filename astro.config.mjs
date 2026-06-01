// @ts-check
import { defineConfig, envField } from 'astro/config';
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import { ViteToml } from 'vite-plugin-toml';
import tailwindcss from '@tailwindcss/vite';

const site = "https://www.aigcwuji.com";

// https://astro.build/config
export default defineConfig({
  site,
  server: {
    allowedHosts: ['docs.aigcwuji.com']
  },
  integrations: [
    vue(),
    mdx(),
    icon(),
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return !pathname.startsWith('/go/')
          && !pathname.startsWith('/blog/')
          && pathname !== '/novel-tools/'
          && pathname !== '/go-click-analytics/';
      }
    })
  ],
  vite: {
    plugins: [tailwindcss(), ViteToml()],
    server: {
      allowedHosts: ['docs.aigcwuji.com']
    },
    preview: {
      allowedHosts: ['docs.aigcwuji.com']
    }
  },
  env: {
    schema: {
      POSTHOG_API_KEY: envField.string({ context: "client", access: "public", optional: true }),
      POSTHOG_API_HOST: envField.string({ context: "client", access: "public", optional: true }),
      NOTION_TOKEN: envField.string({ context: "server", access: "secret", optional: true })
    }
  }
});