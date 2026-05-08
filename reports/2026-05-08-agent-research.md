# SEO Autonomous Daily Research — 2026-05-08

- **时间**：2026-05-08 09:20:00
- **主控**：main
- **项目**：`project/seo-transfer-station`
- **范围**：仅自主研究、SERP/竞品观察、关键词机会整理；本轮不修改代码。
- **共享情报**：`shared-context/intel/20260508-ai-api-seo-serp.md`
- **协作**：根据 2026-05-04 召回经验，本轮未等待临时 Agent；main 使用本地上下文 + Tavily 授权搜索完成最低可用情报并落盘。

## 1. 今日输入

### 1.1 本地事实源

- `project/seo-transfer-station/reports/2026-05-07-agent-research.md`
- `shared-context/intel/20260507-ai-api-seo-serp.md`
- `src/data/pages/cursor-api-config.mdx`
- `src/data/pages/cline-roo-code-config.mdx`
- `src/data/pages/api-key-safety-checklist.mdx`

现有站点已覆盖：

- Cursor 原生 AI / Claude Code 扩展 / Codex 扩展 / Cline / Roo Code 五条路线分流。
- Cline / Roo Code OpenAI Compatible provider 表单、连接测试矩阵和 Roo native tool calling 验证。
- API Key 分组、预算、轮换、日志脱敏、敏感代码边界、模型真实性与降级自测。

今日判断：基础“字段怎么填”已经不是最大缺口；更值得继续做的是 **失败分型与配置来源优先级**。

### 1.2 外部观察来源

- Tavily：`2026 Cursor custom OpenAI URL API proxy OpenAI compatible base URL issue`
- Tavily：`2026 Claude Code VS Code extension ANTHROPIC_BASE_URL login custom endpoint settings`
- Tavily：`2026 Roo Code OpenAI compatible tool calling Cline API proxy base URL`
- Tavily：`2026 OpenAI Codex CLI custom base URL config.toml auth.json OPENAI_BASE_URL`
- Tavily：`Real Money, Fake Models shadow APIs deceptive model claims`
- Tavily：`2026 AI API gateway clients Claude Code Codex Cline Cursor OpenAI compatible`

> 注：本轮不修改代码，不触发 build/QA。未发现需要打扰主公的 blocker。

## 2. 今日 SERP / 竞品观察

### 2.1 Cursor：从“Base URL 怎么填”进入“为什么 curl 能通但 Cursor 不通”

今日 Cursor 相关 SERP 继续出现：

- custom OpenAI URL 不能连接；
- custom override of OpenAI base URL unusable；
- curl 能通但 Cursor 不通；
- Responses API payload 与 `/chat/completions` 输出结构不匹配；
- 需要切 HTTP Compatibility Mode 到 HTTP/1.1 或更新 Cursor 版本的建议。

新增判断：

- `cursor-api-config.mdx` 已有五路线分流与最小验证流程，下一步不要重复写“Base URL 填 `/v1`”。
- 真正值得补的是“Cursor 原生 provider 失败分型”：
  - 入口误判：改了 Cursor 原生 AI，但实际报错来自 Claude Code/Codex/Cline/Roo。
  - 协议兼容：OpenAI-compatible endpoint 不等于完全兼容 Cursor 当前 payload。
  - HTTP 层兼容：HTTP/2、HTTP/1.1、代理/网关转发行为可能不同。
  - 接口形态：Responses API payload 与 Chat Completions endpoint/response schema 不一致。
  - 常规配置：`/v1`、模型名、401、404、429、余额、限流。
- 这类内容的搜索意图更强：用户通常已经在配置页，离转化/留存更近。

可追溯来源：

- Cursor custom OpenAI URL forum：`https://forum.cursor.com/t/cursor-cannot-connect-to-a-custom-url-compatible-with-the-openai-protocol/153906`
- Cursor custom override unusable：`https://forum.cursor.com/t/the-custom-override-of-the-openai-base-url-is-unusable/152675`
- Cursor Responses API payload / chat completions issue：`https://forum.cursor.com/t/override-openai-base-url-sends-responses-api-payload-to-chat-completions-but-expects-chat-completions-output/159298`
- OpenAI-compatible custom base URL feature discussion：`https://github.com/openclaw/openclaw/issues/3307`
- Bifrost OpenAI API Proxy setup：`https://dev.to/pranay_batta/how-to-set-up-an-openai-api-proxy-with-bifrost-in-30-seconds-5d0n`

内容机会：新增 H2 可用：`Cursor custom OpenAI URL：curl 能通但 Cursor 不通的失败分型`。

### 2.2 Claude Code：扩展登录态/env 继承仍是强长尾

今日 Claude Code / VS Code / Cursor 扩展相关结果继续集中在：

- `ANTHROPIC_BASE_URL`；
- LLM gateway；
- settings / env vars；
- VS Code 插件 settings；
- API key helper / Secret Storage；
- 扩展显示 login screen 或不读取当前 env。

新增判断：

- 用户在 IDE 里看到登录页，不应直接得出“中转站不可用”的结论。
- 需要先确认是哪一类入口：Claude Code CLI、官方 VS Code/Cursor 扩展、第三方 Claude Code 集成插件、Cursor 原生 AI、Cline/Roo 扩展。
- Shell 里 export 的 env 不一定被已启动 IDE 进程继承；IDE settings、Secret Storage、用户级/项目级 Claude settings 也可能互相覆盖。
- 适合把内容放到 `vscode-cursor-plugin-guide.mdx`，并从 `cursor-api-config.mdx` 内链过去。

可追溯来源：

- Claude Code LLM gateway docs：`https://code.claude.com/docs/en/llm-gateway`
- Claude Code settings docs：`https://code.claude.com/docs/en/settings`
- Claude Code env vars docs：`https://code.claude.com/docs/en/env-vars`
- vLLM Claude Code integration：`https://docs.vllm.ai/en/stable/serving/integrations/claude_code/`
- VS Code Claude Code config tutorial：`https://xaicontrol.com/en/blog/vscode-claude-code-config/`

内容机会：新增标题可用：`Claude Code 扩展仍要求登录：先检查 CLI、env、settings 与 IDE 进程`。

### 2.3 Cline / Roo Code：站内已覆盖，后续只需补多 provider/profile 小节

今日 Cline / Roo Code SERP 没有出现明显新主题，仍是：

- Cline：Provider 选 OpenAI Compatible，填写 Base URL / API Key / Model ID。
- Roo Code：OpenAI Compatible provider，但必须验证 OpenAI native tool calling。
- 高级用户希望用 settings.json / custom providers 管理多 provider。

新增判断：

- `cline-roo-code-config.mdx` 当前已经有推荐配置、连接测试矩阵、Roo tool calling 验证、常见排错，短期不需要再堆基础内容。
- 下一步如需增强，可补“小团队多 provider/profile 管理”或“Cline settings.json 自定义 provider”，但优先级低于 Cursor 原生 provider 失败分型。

可追溯来源：

- Cline OpenAI Compatible：`https://docs.cline.bot/provider-config/openai-compatible`
- Roo Code OpenAI Compatible：`https://docs.roocode.com/providers/openai-compatible`
- Cline custom provider issue：`https://github.com/cline/cline/issues/4633`
- Coder AI Gateway clients：`https://coder.com/docs/ai-coder/ai-gateway/clients`
- Best open-source AI coding tools 2026：`https://frontman.sh/blog/best-open-source-ai-coding-tools-2026/`

内容机会：暂列 P2，不建议今日实现。

### 2.4 Codex：`config.toml` / `auth.json` / env 的优先级表仍可补

今日 Codex 相关搜索继续显示：

- 官方 Advanced Configuration / Configuration Reference 是核心来源。
- 用户仍会问 custom base URL + API key 通过 env、命令行、`.env` 或 config 文件为什么不生效。
- `~/.codex/config.toml`、`auth.json`、`OPENAI_API_KEY`、`OPENAI_BASE_URL`、custom provider `env_key`、profile、项目级配置共同存在时，优先级很容易混乱。

新增判断：

- `codex-api-config.mdx` 已经覆盖大量配置概念；建议补一张短表：`你改了哪里 / Codex 实际可能读哪里 / 如何验证`。
- 这属于高质量 P1 小增量，但今天优先级仍低于 Cursor 与 Claude Code 扩展。

可追溯来源：

- Codex Advanced Configuration：`https://developers.openai.com/codex/config-advanced`
- Codex Configuration Reference：`https://developers.openai.com/codex/config-reference`
- OpenAI Community custom base URL 讨论：`https://community.openai.com/t/cant-setup-codex-cli-with-custom-base-url-and-api-key-via-terminal-env-variables-or-command-options/1363678`
- Codex config storage overview：`https://inventivehq.com/knowledge-base/openai/where-configuration-files-are-stored`
- Codex CLI getting started：`https://www.deployhq.com/blog/getting-started-with-openai-codex-cli-ai-powered-code-generation-from-your-terminal`

内容机会：`Codex config.toml、auth.json 与 OPENAI_BASE_URL：Key 和 base_url 到底读哪一份？`

### 2.5 AI API Gateway / 模型真实性：继续走可信自测路线

今日 AI API Gateway / 模型验真方向观察：

- 竞品内容常写“一把 Key 接 Claude/GPT/Gemini/100+ models”，转化味强但容易泛化。
- agentic coding tools 对比文章会把 Claude Code、Cursor、Codex、Aider 等纳入统一框架，说明“多客户端统一接入”是用户认知入口。
- arXiv `Real Money, Fake Models` 为 shadow APIs / deceptive model claims 提供可信外部依据。
- Anthropic 关于 proxy/distillation 风险的讨论提醒：代理线路、账号池、模型访问来源存在安全与合规边界。

新增判断：

- `api-key-safety-checklist.mdx` 已经覆盖模型真实性与降级自测清单，不建议再写“榜单/推荐”。
- 更好的方向是从 Cursor/Roo/Codex 实际失败里内链到安全页：当用户遇到 tool calling、长上下文、streaming 异常时，解释如何做模型能力与线路稳定性自测。

可追溯来源：

- Real Money, Fake Models：`https://arxiv.org/abs/2603.01919`
- Agentic Coding Tools Compared 2026：`https://www.requesty.ai/blog/agentic-coding-tools-compared-2026-claude-code-cursor-codex-aider`
- Unified AI API Gateway 2026：`https://www.skillboss.co/docs/blog/unified-ai-api-gateway-2026`
- Anthropic proxy/distillation risk discussion：`https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks`
- AI gateway client matrix：`https://coder.com/docs/ai-coder/ai-gateway/clients`

内容机会：安全页后续可拆独立 FAQ，但今日不抢主线。

## 3. 今日关键词机会

### P0 / 高转化

- Cursor custom OpenAI URL 连接失败
- Cursor 自定义 OpenAI URL curl 能通但不能用
- Cursor HTTP Compatibility Mode OpenAI
- Cursor Responses API chat completions 兼容
- Cursor API 中转站 连接测试
- Claude Code VS Code extension ANTHROPIC_BASE_URL
- Claude Code 扩展仍要求登录
- Claude Code Cursor 扩展 settings
- Claude Code LLM gateway API 中转站
- Cline OpenAI Compatible Base URL
- Roo Code OpenAI Compatible tool calling

### P1 / 差异化长尾

- Cursor 原生 AI 和 Claude Code 扩展区别
- Cursor Codex Cline Roo 配置区别
- OpenAI compatible endpoint Responses API
- OpenAI compatible tool calling 怎么验证
- Codex config.toml auth.json 优先级
- Codex OPENAI_BASE_URL 不生效
- AI API Gateway coding agents
- AI API 中转站 模型真假 自测
- AI API 中转站 Key Pool 风险
- API Key 轮换 预算 日志脱敏

### 候选标题

1. `Cursor custom OpenAI URL 连接失败：curl 能通但 Cursor 不通的 7 个排查点`
2. `Cursor 原生 AI、Claude Code、Codex、Cline、Roo Code：同一个 IDE 里的 API 配置到底谁生效？`
3. `Claude Code 扩展仍要求登录怎么办？ANTHROPIC_BASE_URL、settings 与 IDE 进程排查`
4. `Cursor OpenAI Compatible 兼容性排查：HTTP/1.1、Responses API 与 /v1 Base URL`
5. `Codex config.toml、auth.json 与 OPENAI_BASE_URL：Key 和 base_url 到底读哪一份？`
6. `AI API 中转站模型真假怎么自测：tool calling、长上下文、JSON 与流式输出清单`

## 4. 给后续 PM / CONTENT / DEV / QA 的建议

### PM

- 今日建议 **2xP1**：
  1. 增强 `cursor-api-config.mdx`：新增 `Cursor 原生 provider 连接失败分型`，覆盖 HTTP/1.1、Responses API / Chat Completions payload、curl 能通但 Cursor 不通。
  2. 增强 `vscode-cursor-plugin-guide.mdx` 或 `cursor-api-config.mdx`：新增 `Claude Code 扩展仍要求登录诊断树`，明确 CLI/env/settings/Secret Storage/IDE 进程分层。
- 若只能做 1 个任务：优先 Cursor 原生 provider 失败分型。它最贴近“已配置但失败”的高意图搜索。
- Codex 配置来源优先级可作为 P1 小任务；Cline/Roo 多 provider/profile 暂列 P2。

### CONTENT

- 标题从“怎么配置”升级到“为什么不生效/连接失败/仍要求登录”。
- Cursor 内容必须反复区分原生 AI provider 与扩展入口，避免混写。
- Claude Code 扩展内容要写“不同扩展/版本设置项可能不同”，不要承诺某个设置项永远有效。
- 模型真实性继续用自测清单，不点名攻击具体服务商，不写绝对承诺。

### DEV

- 本轮 research 不修改代码。
- 下一轮实现优先改 MDX，不需要改 Astro 组件。
- 表格若过长，拆成“症状/可能原因/先查什么”三列表，避免移动端溢出。
- 推荐新增内链：
  - `cursor-api-config` → `openai-compatible-api` / `vscode-cursor-plugin-guide` / 401 / 429 / model-not-found。
  - `vscode-cursor-plugin-guide` → `claude-code-api-proxy`。
  - Cursor/Roo tool calling 异常 → `api-key-safety-checklist` 的模型真实性自测。

### QA

- DEV 产物出现后再注册 QA；不要提前制造假超时。
- Gate 建议保持：`pnpm build`、目标 dist 页面存在、sitemap/noindex、title/description、canonical、内链、绝对承诺词检查、真实 API 域名/API Key 泄露检查、移动端表格可读性。

## 5. Blocker

none。今日 research 与 shared-context 情报已完成；未修改代码，无需打扰主公。
