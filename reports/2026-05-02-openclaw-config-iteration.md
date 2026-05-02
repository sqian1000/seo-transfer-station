# 2026-05-02 OpenClaw 配置文档迭代记录

## 目标
补强 `project/seo-transfer-station` 中 OpenClaw 配置说明，围绕官方配置结构、配置入口、排障技巧和 SEO 长尾词增强首页与专题页承接。

## 输入来源
- 本地 OpenClaw 文档：
  - `docs/gateway/configuration.md`
  - `docs/gateway/configuration-reference.md`
  - `docs/gateway/config-tools.md`
  - `docs/gateway/authentication.md`
- PM 圆桌方案：`shared-context/knowledge-base/reports/seo-openclaw-config-pm-20260502.md`
- 项目页面：
  - `src/pages/index.astro`
  - `src/data/pages/openclaw-api-config.mdx`
  - `src/data/pages/openai-compatible-api.mdx`

## 本轮改动
1. 重写 `src/data/pages/openclaw-api-config.mdx`
   - 从“配置示例页”扩成“完整 SOP 页面”
   - 增补配置入口：`openclaw onboard` / `openclaw configure` / `openclaw config get|set` / Control UI
   - 增补 JSON5、热加载、`openclaw doctor`、`auth-profiles.json`、最小配置、生产推荐拆密钥
   - 增补 `openai-responses` vs `openai-completions` 选择逻辑
   - 增补 Think / reasoning 解释与排查流程
   - 增补错误排查表和使用技巧
2. 更新 `src/pages/index.astro`
   - 首页 title / description 纳入 OpenClaw 关键词
   - OpenClaw 区块增加 4 张意图卡：Base URL、三层结构、Responses/Completions、Think off
   - 强化到 `/openclaw-api-config` 的 CTA 与锚文本
   - 增强首页节选提示，说明完整 SOP、auth-profiles.json 和排错表在专题页

## 构建验收
- 执行：`pnpm build`
- 结果：通过（0 errors，存在既有 hints，不属于本轮引入）

## 风险与备注
- Content / QA 子任务本轮未产出可用结果，最终由 main 依据本地官方文档兜底完成。
- `astro.config.mjs` 存在既有未提交改动（allowedHosts），本轮未触碰。
