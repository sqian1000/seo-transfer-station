# SEO Autonomous Daily Research — 2026-05-06

- **时间**：2026-05-06 09:20:00
- **主控**：main
- **项目**：`project/seo-transfer-station`
- **范围**：仅研究、SERP/竞品观察与关键词机会整理；本轮不修改代码。
- **共享情报**：`shared-context/intel/20260506-ai-api-seo-serp.md`

## 1. 今日输入

### 1.1 本地事实源

- `project/seo-transfer-station/reports/2026-05-05-agent-research.md`
- `shared-context/intel/20260505-ai-api-seo-serp.md`
- `project/seo-transfer-station/reports/2026-05-05-agent-summary.md`
- `shared-context/PROJECT_STATUS.md`
- 当前页面清单：`claude-code-api-proxy.mdx`、`codex-api-config.mdx`、`openai-compatible-api.mdx`、`cline-roo-code-config.mdx`、`cursor-api-config.mdx`、`api-key-safety-checklist.mdx`、401/model-not-found/429 等排错页。

### 1.2 外部观察来源

- Tavily：`2026 Claude Code API proxy ANTHROPIC_BASE_URL settings env model not working`
- Tavily：`OpenAI Codex CLI config.toml custom base_url model_providers wire_api 2026`
- Tavily：`OpenAI compatible base_url /v1 Cline Roo Cursor LiteLLM tool calling`
- Tavily：`Claude Code 中转站 ANTHROPIC_BASE_URL 不生效 model not found 国内 2026`
- Tavily：`Codex 第三方 API config.toml base_url model_provider 中转站 2026`
- Tavily：`AI API 中转站 模型真假 降级 Key Pool Claude Code 风险`
- 官方/准官方与公开讨论：Claude Code Env Vars、OpenAI Codex docs、Cline/Roo/LiteLLM docs、Cursor forum、GitHub issues、RelayRadar 等。

> 注：本轮未创建临时 research 子 Agent；main 直接合并本地事实、授权搜索和公开来源后写入本报告与 shared-context 情报。未发现需要打扰主公的 blocker。

## 2. 当前站点覆盖状态

昨日已经完成 3 篇核心 MDX 内容增强：

- `claude-code-api-proxy.mdx`：settings/env、`ANTHROPIC_BASE_URL`、`ANTHROPIC_AUTH_TOKEN`、`/model`、model not found 排查。
- `codex-api-config.mdx`：`config.toml` 字段决策树、`openai_base_url`、`model_providers`、`wire_api`、项目级覆盖与验证步骤。
- `openai-compatible-api.mdx`：`/v1` 客户端差异表，覆盖 Claude Code、Codex、Cline、Roo、Cursor、OpenAI SDK、LiteLLM、LM Studio。

今日判断：不建议继续重复扩写这三个核心页的基础配置段。更高收益的增量在：

1. `cursor-api-config.mdx` 与 `cline-roo-code-config.mdx` 的“连接测试矩阵”；
2. “模型真实性/降级/Key Pool/日志安全”的可复现检查清单；
3. Codex Key 放置与配置来源优先级的小型矩阵。

## 3. 今日 SERP / 竞品结论

### 3.1 Claude Code：从 settings/env 下沉到 IDE/扩展进程问题

今日外部结果继续围绕：

- `ANTHROPIC_BASE_URL`、`ANTHROPIC_AUTH_TOKEN`、`ANTHROPIC_API_KEY`；
- `settings.json` proxy config 不生效；
- VS Code / Cursor extension 仍显示 login screen；
- CLI 生效但 IDE 扩展不生效；
- 第三方 API proxy 下的 `model not found`。

新增判断：昨日已经补了配置优先级和 `/model` 排查，今天更适合把这类问题放进 **Cursor / VS Code 插件路线拆分**：

- Cursor 原生 AI 的 provider 设置不会自动影响 Claude Code 扩展；
- Claude Code 扩展可能依赖编辑器进程继承环境变量，改完 shell 后需要重启 IDE；
- 项目 `.claude/settings.local.json` / `.claude/settings.json` 可能覆盖用户 `~/.claude/settings.json`；
- 仍要求登录时，不要先重装，先确认当前报错来自 Claude Code CLI、Claude Code 扩展，还是 Cursor 原生 AI。

可追溯来源：

- Claude Code Environment variables：`https://code.claude.com/docs/en/env-vars`
- Apiyi third-party proxy model not found guide：`https://help.apiyi.com/en/claude-code-third-party-api-base-url-setup-guide-en.html`
- GitHub issue #22004 settings.json proxy config：`https://github.com/anthropics/claude-code/issues/22004`
- GitHub issue #20271 VS Code Extension login screen：`https://github.com/anthropics/claude-code/issues/20271`
- KimYx0207 中文 Claude Code + OpenClaw Guide：`https://github.com/KimYx0207/Claude-Code-x-OpenClaw-Guide-Zh/blob/main/docs/claude-code/01-Claude-Code%E5%AE%8C%E6%95%B4%E5%AE%89%E8%A3%85%E6%8C%87%E5%8D%97.md`
- 腾讯云 Claude Code 中转站接入实战：`https://cloud.tencent.com/developer/article/2658130`

内容机会：`cursor-api-config.mdx` 补“Claude Code 扩展仍要求登录 / `ANTHROPIC_BASE_URL` 不生效”的诊断树，并内链 `claude-code-api-proxy.mdx`。

### 3.2 Codex：`wire_api` 不是孤立字段，必须和 provider/版本/auth 一起讲

今日 Codex SERP 集中在：

- `~/.codex/config.toml`；
- `auth.json` 与 API Key 存放；
- `model_provider`、`base_url`、`env_key`；
- `wire_api = "responses"` 与 `wire_api = "chat"`；
- local/custom provider 的 `base_url not working`。

新增判断：

- 官方 Codex 文档倾向以 Responses 协议为默认/核心；第三方集成与旧教程仍可能出现 Chat Completions 风格。
- 用户很容易把 Key 同时放进 env、`auth.json`、TOML headers，导致“看起来都配了，但实际 CLI 读的是另一套”。
- `openai_base_url`、custom `[model_providers.<id>]`、profile、project `.codex/config.toml` 的组合已经超出单个模板能解释的范围，适合做矩阵。

可追溯来源：

- OpenAI Codex Advanced Configuration：`https://developers.openai.com/codex/config-advanced`
- OpenAI Codex Configuration Reference：`https://developers.openai.com/codex/config-reference`
- OpenAI Developer Community custom base URL 讨论：`https://community.openai.com/t/cant-setup-codex-cli-with-custom-base-url-and-api-key-via-terminal-env-variables-or-command-options/1363678`
- GitHub issue local model base_url not working：`https://github.com/openai/codex/issues/7152`
- Portkey Codex integration：`https://docs.portkey.ai/docs/integrations/libraries/codex`
- Morph Codex Provider Configuration：`https://www.morphllm.com/codex-provider-configuration`
- 博客园 Codex 第三方 API 配置：`https://www.cnblogs.com/coldchair/p/19856090`
- GitHub newaiproxy/codex-api：`https://github.com/newaiproxy/codex-api`

内容机会：`codex-api-config.mdx` 后续可补一小节“Key 和配置到底读哪一份”：`OPENAI_API_KEY`、provider `env_key`、`auth.json`、profile、项目级 `.codex/config.toml`、用户级 `~/.codex/config.toml`。

### 3.3 Cursor / Cline / Roo：多入口混配是今日最强工程长尾

外部结果显示：

- Cline OpenAI Compatible：用户需要选择 OpenAI Compatible provider，填 Base URL、API Key、Model ID。
- Roo Code OpenAI Compatible：除了 Base URL / Key / Model，还要求模型支持 OpenAI native tool calling。
- Cursor custom OpenAI URL：公开 forum 仍有“兼容 URL 但 Cursor 不能连接”的问题。
- LiteLLM / Runpod / local LLM 文档显示，OpenAI-compatible 已经是多工具通用接入层，但每个工具对模型命名、路径、tool calling 的要求不同。

今日判断：本站已有 `openai-compatible-api.mdx` 总表，现在最值得把流量接到 **具体工具页**：

| 场景 | 用户真正问题 | 应承接页面 |
|---|---|---|
| Cursor 原生 AI | custom OpenAI URL 连不上 | `cursor-api-config.mdx` |
| Cursor 里 Claude Code 扩展 | 仍要求登录 / 不读 env | `cursor-api-config.mdx` + `claude-code-api-proxy.mdx` |
| Cursor 里 Codex 扩展 | 改了 Cursor 设置但 Codex 仍走默认 | `cursor-api-config.mdx` + `codex-api-config.mdx` |
| Cline | OpenAI Compatible profile 配错 | `cline-roo-code-config.mdx` |
| Roo Code | tool calling 失败 | `cline-roo-code-config.mdx` |
| LiteLLM / local proxy | `/v1` 或 model prefix 错 | `openai-compatible-api.mdx` |

可追溯来源：

- Cline OpenAI Compatible：`https://docs.cline.bot/provider-config/openai-compatible`
- Roo Code OpenAI Compatible：`https://docs.roocode.com/providers/openai-compatible`
- Cursor custom OpenAI URL forum：`https://forum.cursor.com/t/cursor-cannot-connect-to-a-custom-url-compatible-with-the-openai-protocol/153906`
- Cursor custom OpenAI API key forum：`https://forum.cursor.com/t/set-custom-open-ai-api-key/58974`
- LiteLLM OpenAI-Compatible Endpoints：`https://docs.litellm.ai/docs/providers/openai_compatible`
- Runpod AI coding tools：`https://docs.runpod.io/public-endpoints/ai-coding-tools`

内容机会：优先做“Cursor / Cline / Roo 连接测试矩阵”，每个场景给配置位置、字段、最小验证 prompt、错误→下一跳。

### 3.4 信任内容：模型真假/降级已经可以做成独立 FAQ 或增强安全页

今日中文 SERP 中，“模型真假”“降级”“Token 套利”“Shadow API”“Key Pool”明显可见。竞品常见两类：

1. 营销型推荐：强调便宜、稳定、国内直连、多模型支持；
2. 风险型讨论：强调假模型、偷换、降级、日志隐私、封号/实名/风控。

本站不适合写夸张榜单，更适合写“开发者自测清单”：

- 模型名与 provider 映射：控制台模型名是否与客户端模型名一致；
- 长上下文：长文是否被异常截断；
- tool calling：Roo/Cline/Codex 是否能真实调用工具；
- JSON / structured output：是否稳定遵守格式；
- streaming：是否真正流式返回；
- 429/余额/并发：限流是否可解释；
- 日志留存：是否明确记录请求内容、保留时间、谁可访问；
- Key 最小权限：按项目分组、预算上限、可轮换；
- 敏感代码：不要把客户数据、密钥、私有仓库直接交给不可信线路。

可追溯来源：

- RelayRadar：`https://github.com/AetherCore-Dev/relay-radar`
- Real Money, Fake Models 中文解读：`https://zhuanlan.zhihu.com/p/2013587854857621566`
- Shadow API 欺骗性模型声明：`https://zhuanlan.zhihu.com/p/2013295849157977484`
- Binance Square Token 套利讨论：`https://www.binance.com/zh-CN/square/post/315554928468993`
- 网易订阅 Claude 中转站站长思考：`https://www.163.com/dy/article/KQL6JBSM0556GNEJ.html`

内容机会：可增强 `api-key-safety-checklist.mdx`，或新增独立“模型真实性与降级判断清单”页。若做独立页，必须避免点名攻击具体服务商，重点写通用验证方法。

## 4. 今日关键词机会

### P0 / 高转化

- Cursor API 中转站
- Cursor custom OpenAI URL
- Cursor 自定义 API 连接失败
- Cursor Claude Code 扩展 中转站
- Cline OpenAI Compatible
- Cline API 中转站
- Roo Code OpenAI Compatible
- Roo Code tool calling 失败
- Codex auth.json config.toml
- Codex config.toml env_key
- Codex base_url not working
- Claude Code VS Code extension ANTHROPIC_BASE_URL
- Claude Code 仍要求登录

### P1 / 差异化长尾

- OpenAI compatible tool calling
- OpenAI-compatible Base URL 连接测试
- OpenAI compatible base_url 要不要带 /v1
- Cline Roo Cursor 配置区别
- Cursor 原生 AI Claude Code Codex 扩展 区别
- AI API 中转站 模型真假
- AI API 中转站 降级 判断
- AI API 中转站 Key Pool 风险
- Claude Code 中转站 风险
- AI API 中转站 日志 安全
- API Key 最小权限 分组预算

### 候选标题

1. `Cursor / Cline / Roo Code 接入 API 中转站：OpenAI Compatible Base URL 与连接测试矩阵`
2. `Cursor 自定义 OpenAI URL 连接失败怎么办？先区分原生 AI、Claude Code 扩展和 Codex 扩展`
3. `Roo Code tool calling 失败：OpenAI Compatible 模型能力怎么验证？`
4. `Codex auth.json 与 config.toml 怎么放 Key？env_key、model_provider、base_url 排查表`
5. `AI API 中转站怎么判断模型真假？降级、tool calling、上下文与日志检查清单`
6. `Claude Code 扩展仍要求登录：ANTHROPIC_BASE_URL、settings.json 与 IDE 进程排查`

## 5. 给后续 PM / CONTENT / DEV 的建议

### PM

- 今日建议仍保持 **2xP1**，但换焦点：
  1. `Cursor / Cline / Roo 连接测试矩阵`，增强 `cursor-api-config.mdx` + `cline-roo-code-config.mdx`；
  2. `模型真实性与降级判断清单`，增强 `api-key-safety-checklist.mdx` 或拆独立 FAQ/页面。
- 如果今天只能做一个，实现优先级：连接测试矩阵 > 模型真实性 FAQ > Codex Key 放置矩阵。
- 不建议做泛“中转站榜单”，避免进入低质红海与不可验证承诺。

### CONTENT

- 每个客户端段落必须包含：配置位置、真实字段名、Base URL 样例、模型能力要求、最小验证动作、失败下一跳。
- 模型真实性内容必须使用“检查清单/自测流程”语气，不写绝对保证。
- 标题继续问题化：`连接失败怎么办`、`为什么扩展不生效`、`tool calling 失败`、`怎么判断降级`。

### DEV

- 本轮 research 不修改代码。
- 若进入实现，优先改 MDX 内容；不需要改 Astro 组件。
- 长表要注意移动端可读性，尽量拆成多个短表或诊断树。
- 继续不写真实 API Key，不新增不可验证价格、稳定率、官方背书。

### QA

- DEV 产物出现后再注册 QA；不要提前制造假超时。
- Gate 保持：`pnpm build`、目标 dist 页面存在、sitemap、robots/noindex、title/description、canonical、FAQ/JSON-LD（如新增）、内链、绝对承诺词检查、真实 API 域名/API Key 泄露检查、移动端表格可读性。

## 6. Blocker

none。今日 research 与 shared-context 情报已完成；未修改代码，无需打扰主公。
