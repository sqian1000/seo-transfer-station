# AI API 中转站多 Agent 自动化方案

> 生成时间：2026-05-01 15:31:00（北京时间）
> 状态：草案，未写入系统 crontab；等待真实域名、控制台入口、购买入口确认后再自动化上线。

## 目标

让 SEO 项目进入自动迭代闭环：每日搜索、讨论、设计、开发、QA、复盘，而不是靠主公逐条追问。

## 当前可用 Agent 现实约束

- 当前可 `sessions_spawn` 的 agent id 只有 `main`。
- 已通过同一运行时创建 4 个角色实例：PM / 架构 / 内容 / QA。
- 后续可以继续以角色实例方式并行，最多按临时子 agent 上限控制在 10 个以内。
- 如果要启用真正独立的 `pm01/dev03/qa04/content` agent，需要先把它们加入 OpenClaw spawn allowlist 或用现有跨 session 通信机制恢复。

## 每日自动例会流程

### 09:00 SEO Research
- 搜索 P0/P1 关键词：Claude Code 中转站、Codex API 配置、ANTHROPIC_BASE_URL、Claude Code 401、model not found、429 等。
- 输出 SERP 前 10 摘要：标题、描述、页面类型、CTA、缺口。
- 产物：`project/seo-transfer-station/reports/YYYY-MM-DD-serp.md`

### 09:30 数据回看
- 查看页面访问、CTA 点击、/go/ 点击、配置复制、排错点击。
- 当前 PostHog 事件需补齐后启用。
- 产物：`project/seo-transfer-station/reports/YYYY-MM-DD-analytics.md`

### 10:00 迭代计划
- PM 选择 1 个 P0 或 2 个 P1 小任务。
- 明确 owner、验收命令、风险。
- 产物：`project/seo-transfer-station/reports/YYYY-MM-DD-plan.md`

### 当天执行
- Frontend/Visual：页面与视觉。
- Content：文案、FAQ、关键词。
- Architecture：技术 SEO、schema、性能。
- QA：build、lint、SEO gate、截图。

### 收盘总结
- 写入 `project/seo-transfer-station/reports/YYYY-MM-DD-summary.md`。
- 必须包含 build 结果、剩余 blocker、明日优先级。

## 推荐角色实例

1. PM：关键词路线、产品路径、优先级。
2. SEO Research：每日 SERP 搜索和竞品摘要。
3. Content：页面 brief、FAQ、长尾词、合规措辞。
4. Frontend Visual：未来科技风、组件、移动端。
5. Architecture：metadata、schema、sitemap、性能。
6. QA：build、截图、SEO lint、链接检查。
7. Analytics：PostHog 事件、/go/ 点击、日报。

## 上线前 Blocker Gate

- `pnpm build` 必须通过。
- 首页不得出现 `/og/undefined.png`。
- 生产产物不得出现未白名单 `example.com` / `api.example.com`。
- 真实域名必须同步到 `astro.config.mjs`、`settings.toml`、`robots.txt`。
- `/go/` 不进 sitemap，且 noindex/nofollow。
- 内部死链 `/submit`、`/advertise`、legal 页面必须处理。
- 移动端 375px 截图无横向滚动、无 CTA 溢出。

## 定时任务建议

先不直接改现有 crontab。建议新增脚本后由主控审核：

```bash
# 建议，不直接执行
15 9 * * * cd /root/.openclaw/workspace && python3 scripts/local_cron_runner.py seo_daily_research
45 9 * * * cd /root/.openclaw/workspace && python3 scripts/local_cron_runner.py seo_daily_plan
30 18 * * * cd /root/.openclaw/workspace && python3 scripts/local_cron_runner.py seo_daily_summary
```

需要先实现 `seo_daily_research / seo_daily_plan / seo_daily_summary` 子命令，并确保不消耗高额模型 quota。优先用本地文件和轻量搜索摘要。
