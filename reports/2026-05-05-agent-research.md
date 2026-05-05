# SEO Autonomous Daily Research — 2026-05-05

- **时间**：2026-05-05 09:20:00
- **主控**：main
- **项目**：`project/seo-transfer-station`
- **范围**：仅研究、SERP/竞品观察与关键词机会整理；本轮不修改代码。
- **共享情报**：`shared-context/intel/20260505-ai-api-seo-serp.md`

## 1. 今日输入

### 1.1 本地事实源

- `project/seo-transfer-station/reports/2026-05-04-agent-research.md`
- `shared-context/intel/20260504-ai-api-seo-serp.md`
- `project/seo-transfer-station/reports/2026-05-04-agent-summary.md`
- `shared-context/PROJECT_STATUS.md`
- 当前页面清单：`claude-code-api-proxy.mdx`、`codex-api-config.mdx`、`openai-compatible-api.mdx`、`cline-roo-code-config.mdx`、`cursor-api-config.mdx`、`vscode-cursor-plugin-guide.mdx`、`openclaw-api-config.mdx`、模型费用/API Key 安全/服务状态/401/model-not-found/429 排错页。

### 1.2 外部观察来源

- Tavily：`AI API 中转站 Claude Code Codex base_url`
- Tavily：`Claude Code ANTHROPIC_BASE_URL settings.json 不生效 model`
- Tavily：`Codex config.toml model_providers base_url wire_api responses chat`
- Tavily：`OpenAI compatible base_url /v1 Cline Cursor Roo Code Codex Claude Code`
- 临时 research 子 Agent：中文 SERP、竞品内容形态与关键词机会补充。
- 官方/准官方文档抓取：Claude Code Settings / Environment variables / Model configuration，OpenAI Codex Advanced Configuration / Configuration Reference，Cline / Roo Code / LiteLLM OpenAI-compatible 文档。

> 注：本轮临时 research 子 Agent 已回传结果；main 合并本地事实、授权搜索和官方文档后写入本报告与 shared-context 情报。未发现需要打扰主公的 blocker。

## 2. 当前站点覆盖状态

站点已经覆盖核心 P0 页面：

- Claude Code 中转配置：`claude-code-api-proxy.mdx`
- Codex API 配置：`codex-api-config.mdx`
- OpenAI-compatible API 总页：`openai-compatible-api.mdx`
- Cline/Roo、Cursor、VS Code 插件接入页
- 401 invalid key、model not found、429 rate limit 排错页
- API Key 安全、模型/额度/费用、服务状态排查页

今日判断：不需要首页或代码结构大改。真正的增量来自“更细的工程长尾”：配置优先级、`/v1` 路径差异、Codex provider 字段决策、跨客户端诊断矩阵、模型真实性/降级验证清单。

## 3. 今日 SERP / 竞品结论

### 3.1 Claude Code：从“会配置”下沉到“为什么不生效”

外部结果继续聚焦：

- `ANTHROPIC_BASE_URL`、`ANTHROPIC_AUTH_TOKEN`、`ANTHROPIC_API_KEY`；
- `~/.claude/settings.json`、`.claude/settings.json`、`.claude/settings.local.json`；
- settings 层级优先级：Managed > CLI args > Local > Project > User；
- `ANTHROPIC_MODEL`、settings `model`、`/model`、模型列表；
- IDE / shell 环境变量继承导致“配置了但仍要求登录/仍走官方/模型看不到”。

官方文档证据：

- Claude Code Settings 文档明确 settings scope 与文件路径，并说明 Local 覆盖 Project、Project 覆盖 User。
- Claude Code Env Vars 文档明确 `ANTHROPIC_BASE_URL` 用于覆盖 API endpoint，`ANTHROPIC_AUTH_TOKEN` 作为 Authorization header，`ANTHROPIC_API_KEY` 存在时会优先使用 API key 路径。
- Claude Code Model configuration 文档明确 `/model`、启动参数、`ANTHROPIC_MODEL`、settings `model` 的优先级。

内容机会：`claude-code-api-proxy.mdx` 应从“配置教程”升级为“配置优先级 + 不生效排查顺序 + 模型列表/权限诊断”。

### 3.2 Codex：`openai_base_url` 与 custom provider 决策是强长尾

Tavily 与官方文档显示 Codex 相关搜索意图集中在：

- `~/.codex/config.toml`；
- 内置 OpenAI provider 的 `openai_base_url`；
- 自定义 `[model_providers.<id>]`、`base_url`、`env_key`、headers；
- `model_provider` / `--provider` / profile；
- `wire_api = "responses"` 与 `wire_api = "chat"` 的选择；
- 项目级 `.codex/config.toml` 在 trusted project 下才加载，且更靠近 cwd 的配置覆盖更远层级。

官方文档证据：

- OpenAI Codex Advanced Configuration：若只是把内置 OpenAI provider 指到 proxy/router/data residency endpoint，应使用 `openai_base_url`，不要定义 `[model_providers.openai]`。
- OpenAI Codex Configuration Reference：Codex 配置文件支持用户级 `~/.codex/config.toml` 与项目级 `.codex/config.toml`；项目配置只在 trusted project 下加载。
- Portkey Codex 文档/Tavily 结果强调 custom provider 可通过 `wire_api` 选择 Responses 或 Chat Completions 协议。

内容机会：`codex-api-config.mdx` 应补“字段选择决策树”：什么时候用 `openai_base_url`，什么时候新建 provider，什么时候改 `model_provider`，什么时候看 `wire_api`。

### 3.3 OpenAI-compatible：`/v1` 不能统一回答，必须按客户端给表

今日多个来源继续验证昨日结论：`base_url` 是否带 `/v1` 必须按客户端、SDK、provider endpoint 和协议判断。

典型差异：

| 客户端/工具 | 配置字段 | `/v1` 判断 | 今日内容机会 |
|---|---|---|---|
| Claude Code | `ANTHROPIC_BASE_URL` / settings `env` | 以 Anthropic-compatible provider 文档为准，不要套 OpenAI SDK 规则 | 补“不要把 OpenAI `/v1` 规则硬套到 Claude Code” |
| Codex | `openai_base_url` 或 provider `base_url` | 内置 provider / custom provider / `wire_api` 不同，按官方配置和 provider endpoint | 补字段决策树 |
| Cline | OpenAI Compatible Base URL | 文档要求填 provider 给出的 endpoint，不是官方 OpenAI URL | 补 provider endpoint 校验项 |
| Roo Code | OpenAI Compatible Base URL | 与 Cline 类似，并要求模型支持 OpenAI native tool calling | 补 tool calling 能力验证 |
| LiteLLM | `api_base` | 文档提醒 Not Found 时检查 `api_base` 是否带 `/v1` postfix，但也提示不要追加具体 endpoint path | 做“404/Not Found 与 /v1”排查专栏 |
| Cursor | Custom OpenAI URL | SERP 显示常见问题是模型开关/API Key/URL 兼容性 | 合入跨客户端诊断矩阵 |

内容机会：`openai-compatible-api.mdx` 继续是最适合承接“Base URL 要不要带 /v1”的总页；它应内链到 Claude Code、Codex、Cline/Roo、Cursor 页面。

### 3.4 竞品形态：榜单很多，但更适合避开正面红海

临时 research 子 Agent 观察到的竞品形态：

1. **聚合榜单 / 推荐清单型**：GitHub awesome-ai-proxy、CSDN/SegmentFault/搜狐榜单，常见话术是 TOP 排名、成本、稳定性、兼容性、迁移示例。
2. **Claude Code 配置教程型**：Windows/macOS/Linux env、`~/.claude/settings.json` 示例、国内使用、强制登录/仍走官方排查。
3. **Codex CLI 第三方 API 配置型**：`~/.codex/config.toml`、`model_provider`、`base_url`、`env_key`、TOML 模板。
4. **开源代理 / 自建网关型**：Claude Code → OpenAI-compatible proxy、Claude + Codex 共用网关、日志/路由/中间件。
5. **官方 / 准官方兼容文档型**：Anthropic OpenAI SDK compatibility、Coder AI Gateway client configuration 等。

结论：大词“AI API 中转站榜单”竞争重且质量参差，本站更应继续走“开发工具配置 + 排错 + 可验证信任”的工程型差异化。

### 3.5 信任内容：模型真假/降级仍是可转化风险词

中文 SERP 仍有低倍率、假模型、降级、Key Pool、隐私、封号/风控等讨论。本站不适合写夸张榜单，更适合做：

- 模型名、上下文长度、tool calling、JSON 输出、图片/多模态能力的验证清单；
- 429/限流/套餐权限与余额排查；
- API Key 最小权限、团队分组、日志留存边界；
- “不要上传敏感仓库/客户数据”的安全提示。

## 4. 今日关键词机会

### P0 / 高转化

- Claude Code 中转站
- Claude Code API Base URL
- Claude Code 国内使用
- ANTHROPIC_BASE_URL 配置
- ANTHROPIC_BASE_URL 不生效
- Claude Code settings.json 优先级
- Claude Code /model 看不到模型
- Codex API 配置
- Codex 第三方 API
- Codex base_url
- Codex CLI 中转站
- `~/.codex/config.toml`
- OpenAI Codex custom base_url

### P1 / 泛入口与差异化长尾

- AI API 中转站
- 国内 AI API
- OpenAI API 中转站
- Claude API 中转站
- OpenAI compatible base_url
- OpenAI 兼容 API 中转站
- OpenAI compatible base_url 要不要带 /v1
- Claude Code OpenAI compatible API
- Claude Code 转 OpenAI API
- Claude Code proxy
- Claude Code Codex API proxy
- 国内开发者 Claude Code Codex 配置
- AI API 中转站 模型真假
- AI API 中转站 降级 判断

### 候选标题

1. `Claude Code 中转站配置教程：国内可用 API Base URL / ANTHROPIC_BASE_URL 设置`
2. `Claude Code settings.json 优先级：为什么 ANTHROPIC_BASE_URL 配了但不生效？`
3. `Codex CLI 第三方 API 配置：base_url / model_provider / env_key 完整示例`
4. `Codex config.toml 自定义中转站：openai_base_url、model_provider 与 wire_api 怎么选？`
5. `OpenAI-compatible Base URL 要不要带 /v1？Claude Code、Codex、Cline、Cursor 对照表`
6. `AI API 中转站怎么判断模型真假？降级、限流、上下文与日志验证清单`

## 5. 给后续 PM / CONTENT / DEV 的建议

### PM

- 若 PM/CONTENT 协作链路继续无 final，main 可按昨日 Close 的降级策略直接产出最低可实现规格。
- 今日建议仍保持 **2xP1**：
  1. `Claude Code settings/env 不生效 + /model 模型列表排查`；
  2. `Codex config.toml provider/base_url/wire_api 决策树 + OpenAI-compatible /v1 总表`。
- 不建议做“中转站榜单”作为第一突破口，避免进入低质红海。

### CONTENT

- 每个教程段落必须出现真实字段名、文件路径、最小配置片段、验证命令/验证动作、常见错误。
- 官方文档优先，中文竞品只用于识别用户语言与排错场景。
- 标题继续问题化：`不生效怎么办`、`要不要带 /v1`、`怎么判断真假`。

### DEV

- 本轮 research 不修改代码。
- 规格 ready 后优先改 MDX 内容，不需要改 Astro 组件，除非表格移动端可读性不足。
- 如果新增长表，QA gate 必须覆盖移动端横向滚动/可读性。

### QA

- DEV 产物出现后再注册 QA；不要提前制造假超时。
- Gate 保持：`pnpm build`、sitemap、robots/noindex、title/description、canonical、FAQ/JSON-LD、内链、移动端表格。

## 6. Blocker

none。今日 research 与 shared-context 情报已完成；未修改代码，无需打扰主公。
