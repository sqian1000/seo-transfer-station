# SEO Autonomous Daily Research — 2026-05-09

- **时间**：2026-05-09 09:20:54
- **主控**：main
- **项目**：`project/seo-transfer-station`
- **范围**：自主研究、SERP/竞品观察、关键词机会整理；本轮不修改代码。
- **共享情报**：`shared-context/intel/20260509-ai-api-seo-serp.md`
- **协作**：本轮为定时 Research，未等待临时 Agent；main 使用本地上下文 + Tavily 授权搜索完成最低可用情报并落盘。

## 1. 今日输入

### 1.1 本地事实源

- `shared-context/PROJECT_STATUS.md`
- `project/seo-transfer-station/reports/2026-05-08-agent-research.md`
- `shared-context/intel/20260508-ai-api-seo-serp.md`
- `src/data/pages/cursor-api-config.mdx`
- `src/data/pages/vscode-cursor-plugin-guide.mdx`
- `src/data/pages/codex-api-config.mdx`
- `src/data/pages/cline-roo-code-config.mdx`
- `src/data/pages/api-key-safety-checklist.mdx`

当前站点已经覆盖五路线分流、Cursor custom OpenAI URL 最小验证、Claude Code settings/env、Codex `openai_base_url` / `model_providers` / `wire_api` 决策树、Cline/Roo OpenAI Compatible provider 与 Roo native tool calling。今日研究重点不再重复基础字段，而是继续锁定“配置已填但不生效”的高意图失败分型。

### 1.2 外部观察来源

- Tavily：`2026 Cursor custom OpenAI URL Responses API chat completions HTTP Compatibility Mode`
- Tavily：`Cursor forum Responses API payload chat completions override OpenAI base URL`
- Tavily：`2026 Claude Code VS Code extension ANTHROPIC_BASE_URL settings login screen`
- Tavily：`2026 Codex CLI custom base URL config.toml auth.json OPENAI_BASE_URL`
- Tavily：`2026 Cline Roo Code OpenAI compatible provider native tool calling settings custom provider`
- Tavily：`2026 AI API gateway coding agents Cursor Claude Code Codex Cline model verification fake models`

> 注：本轮不修改代码、不触发 build/QA。未发现需要打扰主公的 blocker。

## 2. 今日 SERP / 竞品观察

### 2.1 Cursor：Responses API / Chat Completions 错配成为更明确的排错点

今日 Cursor 相关 SERP 继续围绕 custom OpenAI URL 失败，但痛点比“Base URL 要不要 `/v1`”更具体：

- HTTP/2 与自定义 endpoint 兼容问题，官方社区建议在 Cursor Settings → Network → HTTP Compatibility Mode 切到 HTTP/1.1。
- Override OpenAI Base URL 对所有模型生效，而不只是 custom key 模型；混用 Cursor Pro 模型和自定义 endpoint 时容易误伤。
- Cursor 可能对部分模型走 Responses API 路径，却向 `/chat/completions` 发送 Responses-shaped body，或期待 Chat Completions 输出结构，导致“curl 能通但 Cursor 不通”。
- 第三方 gateway 文档也强调必须复制 `/v1/models` 返回的实际 model id，不要猜上游模型别名。

对本站的新增判断：`cursor-api-config.mdx` 已经有路线分流和最小验证，但下一轮实现应把“失败分型”做成更可扫描的 H2/H3，尤其是：入口混淆、HTTP/1.1、Responses vs Chat Completions、Override 对所有模型生效、模型名来自 `/v1/models`、401/404/429。

可追溯来源：

- Cursor custom OpenAI URL forum：`https://forum.cursor.com/t/cursor-cannot-connect-to-a-custom-url-compatible-with-the-openai-protocol/153906`
- Cursor custom override unusable：`https://forum.cursor.com/t/the-custom-override-of-the-openai-base-url-is-unusable/152675`
- Cursor Responses payload / chat completions issue：`https://forum.cursor.com/t/override-openai-base-url-sends-responses-api-payload-to-chat-completions-but-expects-chat-completions-output/159298`
- OpenAI Responses migration docs：`https://developers.openai.com/api/docs/guides/migrate-to-responses`
- TheRouter Cursor integration troubleshooting：`https://therouter.ai/docs/guides/guides/cursor-integration/`

内容机会：`Cursor custom OpenAI URL 连接失败：HTTP/1.1、Responses API 和模型名逐项排查`。

### 2.2 Claude Code：扩展登录页 / 不读 env 的搜索意图升温

今日 Claude Code 扩展结果里出现 GitHub issue 与第三方教程，核心不是“Claude Code 能不能配置中转站”，而是 IDE 扩展层如何绕开默认登录、如何读取 settings/env：

- 有 issue 提到 VS Code Extension 不识别 `ANTHROPIC_BASE_URL` 并显示 login screen，解决思路涉及 `claudeCode.disableLoginPrompt`、LiteLLM proxy env、扩展 settings。
- 第三方扩展/教程会使用 `claude-code.environmentVariables`、Shell alias/function、VS Code settings.json 注入 `ANTHROPIC_BASE_URL` / `ANTHROPIC_AUTH_TOKEN`。
- 官方 settings 文档继续强调 user/project/local/managed settings 层级；环境变量和 IDE 进程继承仍是排错重点。
- LLM gateway 文档说明 Claude Code 会查询 gateway `/v1/models`，模型列表不对时不能只看 Key，还要看 gateway format 和返回结构。

对本站的新增判断：`vscode-cursor-plugin-guide.mdx` 已经有 Claude Code settings/env 基础说明，下一轮更适合补一个“仍要求登录”的诊断树：当前是官方扩展还是第三方扩展、Extension settings 是否覆盖、IDE 是否重启、是否从终端启动、settings/env/Secret Storage 谁在生效、gateway 是否支持 Anthropic Messages format。

可追溯来源：

- Claude Code VS Code extension login/env issue：`https://github.com/anthropics/claude-code/issues/20271`
- Claude Code settings docs：`https://code.claude.com/docs/en/settings`
- Claude Code LLM gateway docs：`https://code.claude.com/docs/en/llm-gateway`
- VS Code Claude Code config tutorial：`https://xaicontrol.com/en/blog/vscode-claude-code-config/`
- Claude Code Integration marketplace page：`https://marketplace.visualstudio.com/items?itemName=maskzh.claude-code-integration`

内容机会：`Claude Code 扩展仍要求登录：disableLoginPrompt、settings/env 与 IDE 进程排查`。

### 2.3 Codex：`config.toml` / `auth.json` / env 的优先级仍是可转化长尾

今日 Codex 相关结果继续确认：官方 Advanced Configuration / Configuration Reference 是最可靠来源，外部讨论仍集中在 custom base URL + API key 为什么不按预期生效。

观察：

- 官方文档区分 `openai_base_url`、`model_providers.<id>`、credential storage、configuration reference 等；对普通用户来说入口过多。
- 第三方文章强调 `auth.json` 不要提交、API key 用环境变量或用户目录保存。
- OpenAI Community 仍有“terminal env / command options / custom base URL 不生效”的疑问，说明排查表价值高。
- GitHub issue 出现 base_url not honored 一类问题，提醒我们内容不能把所有失败归因到用户填错，也要提示版本/实现限制可能存在。

对本站的新增判断：`codex-api-config.mdx` 已经有字段决策树，下一轮可以补“你改了哪里 / Codex 实际读哪里 / 怎么验证”的短表，尤其区分 `config.toml`、`auth.json`、env、profile、CLI 参数、IDE 扩展不支持的实验 profile。

可追溯来源：

- Codex Advanced Configuration：`https://developers.openai.com/codex/config-advanced`
- Codex Configuration Reference：`https://developers.openai.com/codex/config-reference`
- Codex custom base URL community discussion：`https://community.openai.com/t/cant-setup-codex-cli-with-custom-base-url-and-api-key-via-terminal-env-variables-or-command-options/1363678`
- Codex config.toml guide：`https://blog.laozhang.ai/en/posts/codex-config-toml`
- OpenAI Codex issue base_url not honored：`https://github.com/openai/codex/issues/1734`

内容机会：`Codex config.toml、auth.json 与 OPENAI_BASE_URL：到底哪一层覆盖了你？`。

### 2.4 Cline / Roo Code：基础配置稳定，差异点继续是 tool calling 与多 provider 管理

今日 Cline / Roo Code 结果没有出现新主线：

- Cline 官方仍是 Provider 选 OpenAI Compatible，填写 Base URL、API Key、Model ID。
- Roo Code 官方继续强调 OpenAI-compatible provider 与熟悉 API interface；实际使用仍要验证 native tool calling。
- 竞品/横评文章把 Cline、Roo Code、Aider、OpenCode、Continue 等列入 BYOK / model-agnostic 工具体系，说明“多 provider / 多工具矩阵”仍有搜索需求。
- 高级用户更关心 custom provider、settings、团队 profile，而不是基础表单截图。

对本站的新增判断：`cline-roo-code-config.mdx` 已经足够覆盖基础配置和验证矩阵；短期 P2 可补“小团队多 provider/profile 管理”，但不应抢 Cursor / Claude Code / Codex 的 P0/P1 实现名额。

可追溯来源：

- Cline OpenAI Compatible docs：`https://docs.cline.bot/provider-config/openai-compatible`
- Roo Code OpenAI Compatible docs：`https://docs.roocode.com/providers/openai-compatible`
- Agentic Coding Tools Compared 2026：`https://www.requesty.ai/blog/agentic-coding-tools-compared-2026-claude-code-cursor-codex-aider`
- Best open-source AI coding tools 2026：`https://frontman.sh/blog/best-open-source-ai-coding-tools-2026/`
- Every AI Coding CLI in 2026：`https://dev.to/soulentheo/every-ai-coding-cli-in-2026-the-complete-map-30-tools-compared-4gob`

内容机会：暂列 P2：`Cline / Roo Code 多 provider 管理：Base URL、Model ID 与 tool calling 验证清单`。

### 2.5 AI API Gateway / 模型真实性：避免泛榜单，继续用可验证排错建立信任

今日 AI coding agents / gateway 类 SERP 中，横评与榜单内容很多，常见写法是“Codex、Cursor、Claude Code、Devin、Cline 等谁更强”。这类内容热度高，但与本站“AI API 中转站配置/排错”定位相比，直接做榜单容易变泛、也更容易引入不可验证承诺。

更适合本站的角度：

- 用多客户端配置矩阵承接“我同时用 Cursor / Claude Code / Codex / Cline / Roo，怎么统一排错”的真实需求。
- 用模型能力自测承接“模型名是真的还是假的、tool calling/长上下文/JSON/streaming 是否稳定”的信任需求。
- 不写“100% 真模型”“绝对稳定”“官方背书”这类高风险表达。
- 从 Cursor Responses 错配、Roo tool calling、Codex wire_api、Claude Code `/v1/models` 这四类实际失败内链到安全自测页。

可追溯来源：

- Agentic Coding Tools Compared 2026：`https://www.requesty.ai/blog/agentic-coding-tools-compared-2026-claude-code-cursor-codex-aider`
- Best AI Coding Agents 2026：`https://www.faros.ai/blog/best-ai-coding-agents-2026`
- Best open-source AI coding tools 2026：`https://frontman.sh/blog/best-open-source-ai-coding-tools-2026/`
- OpenAI Responses migration docs：`https://developers.openai.com/api/docs/guides/migrate-to-responses`
- Real Money, Fake Models：`https://arxiv.org/abs/2603.01919`

内容机会：安全页后续可拆 FAQ，但今日不抢主线。

## 3. 今日关键词机会

### P0 / 高转化

- Cursor custom OpenAI URL 连接失败
- Cursor 自定义 OpenAI URL curl 能通但 Cursor 不通
- Cursor HTTP Compatibility Mode HTTP/1.1
- Cursor Responses API chat completions 兼容
- Cursor Override OpenAI Base URL 所有模型生效
- Cursor `/v1/models` model id
- Claude Code VS Code extension login screen
- Claude Code disableLoginPrompt
- Claude Code ANTHROPIC_BASE_URL 不生效
- Claude Code settings env IDE 进程
- Codex config.toml auth.json OPENAI_BASE_URL
- Codex custom base URL 不生效

### P1 / 差异化长尾

- Cursor 原生 AI 和 Claude Code 扩展区别
- Cursor Codex Cline Roo 配置区别
- OpenAI compatible endpoint Responses API
- OpenAI compatible tool calling 怎么验证
- Codex profile CLI 参数覆盖
- Codex wire_api responses chat
- Roo Code OpenAI native tool calling
- Cline custom provider settings
- AI API Gateway coding agents
- AI API 中转站模型真假自测
- Key Pool 风险 API 中转站

### 候选标题

1. `Cursor custom OpenAI URL 连接失败：HTTP/1.1、Responses API 和模型名逐项排查`
2. `Cursor curl 能通但不能用：Override OpenAI Base URL 的 7 个真实坑`
3. `Claude Code 扩展仍要求登录：disableLoginPrompt、settings/env 与 IDE 进程排查`
4. `Claude Code 在 Cursor 里不读 ANTHROPIC_BASE_URL：先分清扩展设置和 Claude settings`
5. `Codex config.toml、auth.json 与 OPENAI_BASE_URL：到底哪一层覆盖了你？`
6. `OpenAI Compatible 不等于全兼容：Responses API、Chat Completions 与 tool calling 自测`

## 4. 给后续 PM / CONTENT / DEV / QA 的建议

### PM

- 今日建议延续 2026-05-08 结论，但把优先级更明确：
  1. P0：`cursor-api-config.mdx` 增强 Cursor 原生 provider 失败分型，重点是 HTTP/1.1、Responses vs Chat Completions、Override 影响全部模型、`/v1/models` 模型名。
  2. P1：`vscode-cursor-plugin-guide.mdx` 增强 Claude Code 扩展仍要求登录诊断树。
  3. P1：`codex-api-config.mdx` 增强配置来源优先级短表。
- 在继续实现前，仍建议先补 `PROJECT_STATUS.md` 中记录的 2026-05-07 独立 QA gap，避免 DEV 自检长期替代 QA。

### CONTENT

- 标题用“连接失败 / 不生效 / 仍要求登录 / 哪一层覆盖了你”，不要只写“怎么配置”。
- Cursor 内容必须显式区分 Cursor 原生 AI、Claude Code 扩展、Codex 扩展、Cline、Roo Code。
- Claude Code 内容不要把官方扩展、第三方扩展、CLI settings、VS Code settings 混成一个入口。
- Codex 内容不要承诺某个字段永远生效；提示版本、profile、CLI 参数、IDE 扩展能力限制。
- 安全页继续用可验证自测，不点名攻击具体服务商。

### DEV

- 本轮 research 不修改代码。
- 下一轮实现优先只改 MDX，不需要改 Astro 组件。
- 表格控制宽度；长字段拆成列表，避免移动端横向溢出。
- 示例继续使用 `YOUR_API_DOMAIN`、`sk-xxxxxxxxxxxxxxxx`，不得写真实 Key/线路。

### QA

- QA 重点看：
  - 是否有真实 Key、真实私有线路、绝对稳定承诺；
  - Cursor/Claude/Codex/Cline/Roo 是否混写；
  - 内链是否指向现有 slug；
  - build 是否通过；
  - 移动端长表格是否溢出。

## 5. 今日结论

- 最高价值机会仍是 **“配置已填但不生效”的失败分型**，不是基础教程。
- Cursor 今日新增可抓点最强：HTTP/1.1、Responses API 与 Chat Completions payload 错配、Override OpenAI Base URL 影响范围。
- Claude Code 扩展“仍要求登录/不读 env”仍是高意图长尾，适合做诊断树。
- Codex 配置来源优先级适合做短表补强。
- Cline/Roo 维持 P2，多 provider/profile 后补。
- 本轮未发现 blocker；按定时任务要求落盘后静默。
