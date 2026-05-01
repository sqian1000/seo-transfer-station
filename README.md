# SEO Transfer Station

AI API 中转站 SEO 落地站，面向 Claude Code、Codex、OpenAI Compatible API 等中转站使用场景。

## Tech Stack

- Astro
- Tailwind CSS
- MDX content pages
- Static site generation

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

当前构建产物为静态站点，`/go/` 中转页设置为 `noindex,nofollow`，sitemap 排除中转路径。
