# SEO Autonomous Daily Research — 2026-05-07

- **时间**：2026-05-07 09:20:00
- **主控**：main
- **项目**：`project/seo-transfer-station`
- **范围**：仅自主研究、SERP/竞品观察、关键词机会整理；本轮不修改代码。
- **共享情报**：`shared-context/intel/20260507-ai-api-seo-serp.md`
- **协作**：已启动临时 research 子 Agent 做轻量竞品/关键词观察；main 合并其结果、本地上下文与 Tavily 授权搜索后落盘。

## 1. 今日输入

### 1.1 本地事实源

- `project/seo-transfer-station/reports/2026-05-06-agent-research.md`
- `shared-context/intel/20260506-ai-api-seo-serp.md`
- 当前页面清单：`claude-code-api-proxy.mdx`、`codex-api-config.mdx`、`openai-compatible-api.mdx`、`cline-roo-code-config.mdx`、`cursor-api-config.mdx`、`api-key-safety-checklist.mdx`、`vscode-cursor-plugin-guide.mdx`、401/model-not-found/429 排错页。

### 1.2 外部观察来源

- Tavily：`2026 Cursor custom OpenAI URL API proxy Cline Roo Code OpenAI compatible tool calling`
- Tavily：`2026 Codex config.toml auth.json openai_base_url custom provider API proxy`
- Tavily：`AI API proxy model verification fake models downgrade tool calling key pool risk 2026`
- Tavily：`Claude Code VS Code extension ANTHROPIC_BASE_URL login screen proxy settings 2026`
- 官方/准官方与公开讨论：Claude Code、OpenAI Codex、Cline、Roo Code、LiteLLM、Cursor forum、OpenAI community、GitHub issues、arXiv、RelayRadar 等。

> 注：本轮不修改代码，不触发 build/QA。未发现需要打扰主公的 blocker。

## 2. 今日 SERP / 竞品观察

### 2.1 Cursor / Cline / Roo：OpenAI-compatible 已进入“同一 IDE 多入口混配”阶段

今日搜索继续显示：用户不是只问“OpenAI Compatible 怎么填”，而是卡在 **同一个 Cursor / VS Code 环境里，不同扩展读取不同配置**。

关键观察：

- Cursor forum 仍有“自定义 OpenAI-compatible URL，curl 能通但 Cursor 连不上”的问题，说明 Cursor 原生 AI 的 URL/Key/模型检测逻辑本身值得单独承接。
- Cline 官方文档把 OpenAI Compatible 拆成 Provider、Base URL、API Key、Model ID，适合做表格化接入页。
- Roo Code 官方文档强调 OpenAI-compatible endpoint 还必须支持 OpenAI native tool calling；很多“能聊天”的代理并不等于“能跑 Roo 工具调用”。
- Roo Code issue 中出现 CLI `--base-url` 等能力诉求，说明 OpenAI-compatible 不只在 GUI 配置里，也会下沉到 CLI/自动化场景。
- Reddit/LocalLLM 方向出现“把 Cursor CLI 包成 OpenAI-compatible 本地代理”的实验，说明开发者正在把 IDE/CLI/Proxy 互相桥接，长尾排错会越来越具体。

可追溯来源：

- Cursor custom OpenAI URL forum：`https://forum.cursor.com/t/cursor-cannot-connect-to-a-custom-url-compatible-with-the-openai-protocol/153906`
- Cline OpenAI Compatible：`https://docs.cline.bot/provider-config/openai-compatible`
- Roo Code OpenAI Compatible：`https://docs.roocode.com/providers/openai-compatible`
- Roo Code CLI OpenAI-compatible base-url issue：`https://github.com/RooCodeInc/Roo-Code/issues/11917`
- Local proxy for Cursor CLI / OpenAI-compatible discussion：`https://www.reddit.com/r/LocalLLM/comments/1rdye8q/i_built_an_openaicompatible_local_proxy_to_expose/`

内容机会：优先把 `cursor-api-config.mdx` 与 `cline-roo-code-config.mdx` 升级为“连接测试矩阵”，明确 Cursor 原生 AI、Claude Code 扩展、Codex 扩展、Cline、Roo 分别读哪套配置。

### 2.2 Claude Code：VS Code 扩展登录态 / env 继承仍是高价值排错入口

今日搜索结果继续集中在：

- `ANTHROPIC_BASE_URL`；
- VS Code Extension 不识别 `ANTHROPIC_BASE_URL`；
- 显示 login screen；
- extension 与 CLI 的 settings/env parity；
- 通过 LiteLLM proxy env 或禁用 login prompt 的 workaround。

新增判断：

- `claude-code-api-proxy.mdx` 已经覆盖 CLI settings/env；更适合把今日增量放入 `cursor-api-config.mdx` 或 `vscode-cursor-plugin-guide.mdx`，作为“在 IDE 里到底是谁发起请求”的诊断入口。
- 如果用户在 Cursor/VS Code 里看到登录页，第一步不应是重装 Claude Code，而是区分：Claude Code CLI、Claude Code VS Code Extension、Cursor 原生 AI、Cline/Roo 扩展是否混在一起。
- Extension 场景要明确提示：shell 里 export 的 env 不一定被已经启动的 IDE 进程继承，项目级 settings 也可能覆盖用户级 settings。

可追溯来源：

- Claude Code Environment variables：`https://code.claude.com/docs/en/env-vars`
- VS Code Extension does not recognize ANTHROPIC_BASE_URL and shows login screen：`https://github.com/anthropics/claude-code/issues/20271`
- New VS Code Extension does not recognize ANTHROPIC_BASE_URL：`https://github.com/anthropics/claude-code/issues/8522`
- VS Code Extension custom endpoints/settings parity feature request：`https://github.com/anthropics/claude-code/issues/8727`
- Anthropic-compatible proxy examples for Claude Code：`https://github.com/Alishahryar1/free-claude-code`

内容机会：新增小节标题可用：`Claude Code 扩展仍要求登录：先确认 IDE 进程、环境变量与 settings 覆盖顺序`。

### 2.3 Codex：`auth.json`、`config.toml`、`openai_base_url` 的来源优先级还在制造搜索需求

今日 Codex SERP 显示：

- custom/local OpenAI-compatible endpoints 的 provider support 仍有讨论；
- OpenAI Community 中仍有人无法通过 env 或命令行正确设置 custom base URL + API key；
- GitHub issue 中 restricted network / built-in provider / `OPENAI_BASE_URL` / separate custom provider 的区别会影响行为；
- release notes 出现 `openai_base_url` config override，说明版本差异本身也会造成教程过期。

新增判断：

- `codex-api-config.mdx` 昨日已覆盖 custom provider 和 `wire_api`，今日更适合补“配置来源优先级矩阵”：`OPENAI_API_KEY`、`OPENAI_BASE_URL`、`auth.json`、`~/.codex/config.toml`、project `.codex/config.toml`、profiles、custom provider `env_key`。
- 需要提醒用户：不同 Codex 版本对内置 OpenAI provider 与 custom provider 的支持差异会改变排查路径；不要只复制旧教程。
- `base_url not working` 不一定是 URL 写错，也可能是 provider id 未切换、profile 未生效、项目 trusted config 未加载、Key 仍来自另一处。

可追溯来源：

- OpenAI Codex Advanced Configuration：`https://developers.openai.com/codex/config-advanced`
- OpenAI Codex Configuration Reference：`https://developers.openai.com/codex/config-reference`
- OpenAI Community custom base URL 讨论：`https://community.openai.com/t/cant-setup-codex-cli-with-custom-base-url-and-api-key-via-terminal-env-variables-or-command-options/1363678`
- OpenAI Codex issue restricted network / `OPENAI_BASE_URL`：`https://github.com/openai/codex/issues/14401`
- Codex release note mentioning `openai_base_url` override：`https://www.gitclear.com/open_repos/openai/codex/release/rust-v0.115.0`
- Morph Codex Provider Configuration：`https://www.morphllm.com/codex-provider-configuration`

内容机会：下一轮可在 `codex-api-config.mdx` 增加“Key 到底读哪一份？”短表，但优先级低于 Cursor/Cline/Roo 连接矩阵。

### 2.4 模型真实性 / 降级 / Key Pool：风险词正在从社区讨论变成可搜索问题

今日搜索命中：

- arXiv `Real Money, Fake Models: Deceptive Model Claims in Shadow APIs`；
- AI API security best practices 2026；
- ProxyPool Hub / key 管理类内容；
- 非官方 AI model API proxy 的安全问题讨论；
- LiteLLM / unified API platform 安全事件相关报道。

新增判断：

- “模型真假/降级”不是单纯负面八卦，已经具备独立信息需求：用户需要知道如何验证模型能力，而不是只看服务商宣传。
- 站点应该继续避开“某某平台真假榜单”，改写成工程化自测：模型名映射、长上下文、tool calling、JSON/structured output、streaming、延迟、429/余额、日志留存。
- Key Pool 内容可与 `api-key-safety-checklist.mdx` 合并：按项目分 Key、预算上限、可轮换、最小权限、日志脱敏、避免把客户数据/私有密钥交给不可信线路。

可追溯来源：

- Real Money, Fake Models: Deceptive Model Claims in Shadow APIs：`https://arxiv.org/html/2603.01919v1`
- AI API Security Best Practices 2026：`https://crazyrouter.com/en/blog/ai-api-security-best-practices-2026`
- Stop Letting AI Tools Fight Over Your API Keys：`https://dev.to/codekingai/stop-letting-ai-tools-fight-over-your-api-keys-let-a-smart-proxy-handle-it-19el`
- Security concerns over AI model API proxy services：`https://www.binance.com/en/square/post/311764961684114`
- RelayRadar 中转雷达：`https://github.com/AetherCore-Dev/relay-radar`

内容机会：`api-key-safety-checklist.mdx` 可新增“模型真实性与降级判断”章节，或者拆出独立页面后从安全页内链。

## 3. 今日关键词机会

### P0 / 高转化

- Cursor API 中转站
- Cursor custom OpenAI URL
- Cursor 自定义 API 连接失败
- Cursor Claude Code 扩展 中转站
- Cline OpenAI Compatible
- Cline API 中转站
- Roo Code OpenAI Compatible
- Roo Code tool calling 失败
- Roo Code native tool calling
- Codex auth.json config.toml
- Codex openai_base_url
- Codex base_url not working
- Claude Code VS Code extension ANTHROPIC_BASE_URL
- Claude Code 扩展 仍要求登录

### P1 / 差异化长尾

- Cursor 原生 AI Claude Code Codex 扩展 区别
- OpenAI-compatible Base URL 连接测试
- OpenAI compatible base_url 要不要带 /v1
- OpenAI compatible tool calling 怎么验证
- Cline Roo Cursor 配置区别
- Codex config.toml env_key
- Codex custom provider OPENAI_BASE_URL
- AI API 中转站 模型真假
- AI API 中转站 降级 判断
- AI API 中转站 Key Pool 风险
- AI API 中转站 日志 安全
- API Key 轮换 预算 限流

### 候选标题

1. `Cursor / Cline / Roo Code 接入 API 中转站：OpenAI Compatible Base URL 与连接测试矩阵`
2. `Cursor 自定义 OpenAI URL 连接失败怎么办？先区分原生 AI、Claude Code 扩展和 Codex 扩展`
3. `Roo Code tool calling 失败：OpenAI Compatible 模型能力怎么验证？`
4. `Claude Code 扩展仍要求登录：ANTHROPIC_BASE_URL、settings.json 与 IDE 进程排查`
5. `Codex auth.json 与 config.toml 怎么放 Key？env_key、model_provider、base_url 排查表`
6. `AI API 中转站怎么判断模型真假？降级、tool calling、上下文与日志检查清单`

## 4. 给后续 PM / CONTENT / DEV / QA 的建议

### PM

- 今日建议继续 **2xP1**，但实现顺序建议为：
  1. `Cursor / Cline / Roo 连接测试矩阵`：增强 `cursor-api-config.mdx` + `cline-roo-code-config.mdx`。
  2. `模型真实性与降级判断清单`：增强 `api-key-safety-checklist.mdx` 或拆独立 FAQ。
- 若只能做 1 个任务：优先连接测试矩阵。它承接 OpenAI-compatible 总页流量，也能自然内链 Claude Code、Codex、Cline、Roo、Cursor。
- 不建议写“十大中转站推荐/榜单”。该词红海且信任风险高，本站更适合可验证排错路线。

### CONTENT

- 每个客户端段落必须包含：配置位置、字段名、Base URL 是否带 `/v1`、模型名示例、最小验证动作、失败下一跳。
- Roo 内容必须单独强调 native tool calling，不要把“能聊天”写成“能使用工具”。
- Claude Code IDE/扩展内容必须先区分 CLI、VS Code Extension、Cursor 原生 AI、Cline/Roo 扩展，不要把不同入口混讲。
- 模型真实性内容用“自测清单/风险降低”语气，不写绝对承诺。

### DEV

- 本轮 research 不修改代码。
- 若进入实现，优先改 MDX 内容，不需要改 Astro 组件。
- 长表建议拆成 2-3 个小表，避免移动端超宽。

### QA

- DEV 产物出现后再注册 QA；不要提前制造假超时。
- Gate 建议保持：`pnpm build`、目标 dist 页面存在、sitemap/noindex、title/description、canonical、内链、绝对承诺词检查、真实 API 域名/API Key 泄露检查、移动端表格可读性。

## 5. Blocker

none。今日 research 与 shared-context 情报已完成；未修改代码，无需打扰主公。
