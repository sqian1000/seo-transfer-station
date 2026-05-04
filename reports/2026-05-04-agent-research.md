# SEO Autonomous Daily Research — 2026-05-04

- **时间**：2026-05-04 09:40:00
- **主控**：main
- **项目**：`project/seo-transfer-station`
- **范围**：仅研究、情报与关键词机会整理；本轮不修改代码。
- **共享情报**：`shared-context/intel/20260504-ai-api-seo-serp.md`

## 1. 今日输入

### 1.1 本地事实源

- `project/seo-transfer-station/reports/2026-05-03-agent-research.md`
- `shared-context/intel/20260503-ai-api-seo-serp.md`
- `project/seo-transfer-station/reports/2026-05-03-agent-summary.md`
- `shared-context/PROJECT_STATUS.md`
- 当前页面清单：Claude Code、Codex、OpenAI-compatible、Cursor、Cline/Roo、模型费用、安全清单与 401/model-not-found/429 排错页。

### 1.2 外部观察来源

- Claude Code 官方 Model configuration / Settings 文档
- Codex 官方 Advanced Configuration / Configuration Reference / Sample Configuration
- GitHub issue 与 OpenAI Community 中 custom base URL / provider 配置讨论
- Cline / LM Studio / LiteLLM / Claude OpenAI SDK compatibility 文档
- 中文 AI API 中转站模型真实性、安全风险、Key Pool 与降级讨论

> 注：本轮临时 research 子 Agent 超时未产出；main 已用授权搜索工具补齐情报，不影响本轮结论。该协作失败已按自我改进规则记录到 `.learnings/ERRORS.md`。

## 2. 当前站点覆盖状态

当前站点 P0 页面仍完整：

- Claude Code 中转配置；
- Codex API 配置；
- OpenAI-compatible API；
- Cursor / Cline / Roo Code / VS Code 插件入口；
- 401 invalid key、model not found、429 rate limit；
- API Key 安全、模型/额度/费用、服务状态排查。

因此今日不建议再写“AI API 中转站是什么”或首页大改。更高价值的方向是：

1. 把 `/v1` 与 Base URL 规则按客户端做成对照表；
2. 把 Claude Code settings/env 不生效做成排查 FAQ；
3. 把 Codex config.toml 的 `openai_base_url` / provider / `wire_api` 做成决策树；
4. 把模型真实性、降级、限流、隐私边界做成工程化验证清单。

## 3. 今日 SERP 结论

### 3.1 Claude Code：settings 优先级与模型选择成为新细分

今日 Claude Code 相关结果不只停留在 `ANTHROPIC_BASE_URL` 怎么设置，还扩展到：

- settings 文件层级：用户级、项目级、local；
- shell env 与 IDE 环境继承；
- `ANTHROPIC_MODEL` / settings model；
- `/model` 看不到模型、模型列表与第三方 provider 能力展示；
- Base URL 误带 `/v1` 或 provider path 不匹配。

内容机会：在 `claude-code-api-proxy.mdx` 中补“配置优先级 + 不生效排查顺序”，必要时拆独立 FAQ。

### 3.2 Codex：custom provider 配置比基础教程更值得抢

Codex 搜索结果集中在：

- `~/.codex/config.toml`；
- `openai_base_url`；
- `[model_providers.xxx].base_url`；
- `model_provider` / `--provider`；
- `wire_api = responses / chat`；
- 环境变量、配置文件、CLI 参数冲突。

内容机会：`codex-api-config.mdx` 应补“字段怎么选”和“冲突怎么排查”，而不是只给一个静态配置片段。

### 3.3 `/v1` 规则必须按客户端讲

延续昨日判断：`base_url` 是否带 `/v1` 不能一刀切。Claude Code、Codex、OpenAI SDK、LiteLLM、Cline/Roo、Cursor 的规则不同，且与 provider 文档、字段名和协议类型有关。

内容机会：`openai-compatible-api.mdx` 优先新增客户端差异表；这是今日最适合转为 PM/CONTENT 任务的 P1。

### 3.4 信任内容从“便宜”转向“可验证”

中文 SERP 里低倍率、假模型、Key Pool、降级、封号和隐私风险持续出现。本项目不应卷低价榜，而应用工程化验证建立可信度：

- 模型响应特征和能力验证；
- 上下文长度 / tool calling / JSON 输出稳定性；
- 429 / 限流与套餐权限；
- Key 权限最小化；
- 日志留存边界；
- 不上传敏感仓库/客户数据。

## 4. 今日关键词机会

### 高优先级

- Claude Code settings.json 优先级
- Claude Code ANTHROPIC_BASE_URL 不生效
- Claude Code /model 看不到模型
- Codex config.toml openai_base_url
- Codex model_providers base_url
- Codex wire_api responses chat completions
- OpenAI compatible base_url 要不要带 /v1
- Cline OpenAI compatible Base URL
- Cursor custom OpenAI URL 连接失败
- AI API 中转站 模型真假
- AI API 中转站 降级 判断

### 候选标题

1. `OpenAI-compatible Base URL 要不要带 /v1？Claude Code、Codex、Cline、Cursor 对照表`
2. `Claude Code settings.json 优先级：为什么 ANTHROPIC_BASE_URL 配了但不生效？`
3. `Codex config.toml 自定义中转站：openai_base_url、model_provider 与 wire_api 怎么选？`
4. `Claude Code /model 看不到中转站模型怎么办？模型列表、权限与 provider 映射排查`
5. `AI API 中转站怎么判断模型真假？降级、限流、上下文与日志验证清单`

## 5. 给后续 PM / CONTENT / DEV 的建议

### PM

- 今日建议选择 2xP1：`/v1` 客户端规则表 + Claude/Codex 配置优先级 brief。
- 输出必须明确页面归属、H2/H3、内链、CTA 边界、验收口径。
- 不要把“模型真假”写成恐吓文；应定位为信任与验证清单。

### CONTENT

- 每段内容必须含真实字段名、文件路径、最小配置片段和验证步骤。
- 来源优先官方文档，其次 issue/community，再引用中文风险讨论。
- 中文标题问题化：“不生效怎么办”“要不要带 /v1”“怎么判断真假”。

### DEV

- 本轮不修改代码。
- 等 PM/CONTENT final 后，再决定是否只改 MDX，还是需要 FAQ schema / 表格组件。
- QA gate 仍应包含 build、sitemap、robots/noindex、title/description、移动端表格可读性、内链。

## 6. 今日结论

未发现需要打扰主公的 blocker。今日应继续收敛到两个 P1 规格任务：

1. 跨客户端 `/v1` / Base URL / provider 字段决策表；
2. Claude Code settings/env + Codex config.toml provider 配置优先级内容 brief。

本轮已写入 shared-context 情报文件与项目 reports 文件，未修改代码。
