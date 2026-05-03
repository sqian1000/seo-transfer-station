# SEO Autonomous Daily Research — 2026-05-03

- **时间**：2026-05-03 09:41:59
- **主控**：main
- **项目**：`project/seo-transfer-station`
- **范围**：仅研究、情报与关键词机会整理；本轮不修改代码。
- **共享情报**：`shared-context/intel/20260503-ai-api-seo-serp.md`

## 1. 今日输入

### 1.1 本地事实源

- `project/seo-transfer-station/reports/2026-05-02-agent-research.md`
- `shared-context/intel/20260502-ai-api-seo-serp.md`
- `shared-context/knowledge-base/reports/seo-pm01-plan-20260501.md`
- `project/seo-transfer-station/src/data/pages/*.mdx`

### 1.2 外部观察来源

- Claude Code 官方文档与第三方 provider 配置文章
- Codex 官方配置文档、GitHub issue、OpenAI Community 讨论
- Cline / LM Studio / LiteLLM 等 OpenAI-compatible 文档
- Cursor 论坛自定义 API 地址问题
- 中文 AI API 中转站风险、模型真实性、隐私与 Key Pool 讨论

> 注：本轮曾尝试临时 research 子 Agent 协助扫描，但该子任务未在可用时间内返回结果；main 已基于本地与授权搜索完成产物，不影响本轮结论。

## 2. 当前站点覆盖状态

当前页面已经覆盖 P0 主轴：

- Claude Code 中转站手动配置
- Codex API 手动配置
- OpenAI 兼容 API Base URL 总指南
- Cursor / Cline / Roo Code / VS Code 插件接入
- 401 invalid key、model not found、429 rate limit 排查
- API Key 安全清单、模型/额度/费用、服务状态排查

这说明下一步不应继续堆“AI API 中转站是什么”这类泛内容，而应进入更细的 FAQ 与差异表：用户搜的是“我填了为什么没生效”“到底要不要带 `/v1`”“这个客户端字段名是什么”“怎么证明模型没被换”。

## 3. 今日 SERP 结论

### 3.1 Claude Code：环境变量不生效是最值得抢的细分问题

今日 SERP 中，Claude Code 仍是最强转化入口，但用户问题已经细化到：

- `ANTHROPIC_BASE_URL` 配了为什么没走中转；
- `.claude/settings.json` 和 shell 环境变量谁覆盖谁；
- VS Code / IDE 为什么读不到终端变量；
- 第三方 Claude Code Base URL 到底要不要加 `/v1`；
- model not found 是模型名问题、套餐权限问题，还是路径问题。

**机会判断**：现有 `claude-code-api-proxy.mdx` 已有基础，但可以增加一段独立 FAQ：

1. `echo $ANTHROPIC_BASE_URL` / `echo $ANTHROPIC_AUTH_TOKEN` 检查；
2. 检查项目级 `.claude/settings.json`；
3. 检查 IDE 环境变量注入；
4. 检查 Base URL 是否误带 `/v1`；
5. 检查模型名、套餐权限、provider 映射。

### 3.2 Claude Code `/model` 与 gateway 模型列表可能成为新问题词

SERP 出现关于 Claude Code `/model` picker 从 gateway `/v1/models` 读取模型的更新线索；官方 Model configuration 文档也说明第三方 provider 的模型 ID 与能力展示会影响体验。

**机会判断**：可以先列入 P1 FAQ 观察，不急着写成大页。候选标题：

- `Claude Code /model 看不到中转站模型怎么办？/v1/models、模型名与能力显示排查`

落地前需要用官方文档二次核验，避免过度依赖聚合站信息。

### 3.3 Codex：从“会不会配”进入“配置优先级怎么判定”

Codex 相关 SERP 聚焦：

- `~/.codex/config.toml`
- `openai_base_url`
- `[model_providers.xxx]`
- `model_provider`
- `wire_api = responses / chat`
- 环境变量与 CLI `--config` 覆盖

**机会判断**：现有 Codex 页面应补“配置优先级与最小可用配置”表：

| 场景 | 推荐配置 | 用户最常错点 |
|---|---|---|
| 只想替换官方 OpenAI endpoint | `openai_base_url` | 路径、环境变量覆盖 |
| 多 provider 切换 | `[model_providers.xxx]` + `model_provider` | provider id 与模型名不对应 |
| 兼容不同 wire API | `wire_api` | responses / chat.completions 不匹配 |
| 临时测试 | 环境变量或 `--config` | 以为写入文件但实际被 CLI 覆盖 |

### 3.4 OpenAI compatible：`/v1` 规则必须按客户端讲

“Base URL 要不要带 `/v1`”仍是稳定长尾，但答案不能一刀切：

- OpenAI SDK / LiteLLM：常见要求 `api_base` 带 `/v1`，否则可能 Not Found；
- Claude Code Anthropic-compatible：常见不带 `/v1`，客户端会拼 Anthropic 路径；
- Codex：取决于 `openai_base_url` / provider endpoint 与 wire API；
- Cline / Roo / Cursor / Cherry Studio：取决于工具字段和 provider 文档。

**机会判断**：当前 `openai-compatible-api.mdx` 是总指南，最值得新增的是“客户端差异表”，而不是新开一篇泛科普。

### 3.5 Cursor / Cline / Roo：自定义 API 地址的兼容性诊断值得补

今日结果显示，用户会直接搜索 Cursor 自定义 OpenAI-compatible URL 连不上、Cline OpenAI Compatible 如何填等问题。当前站点已有入口，但仍可以增强：

- 每个客户端字段名是什么；
- Base URL 是否带 `/v1`；
- API Key 放在哪里；
- 模型名从哪里来；
- 最小验证请求是什么；
- 失败时先看 401、404、429、timeout 哪一类。

## 4. 竞品与内容形态观察

### 4.1 竞品常见打法

1. 首屏给命令或配置片段，直接降低跳出率。
2. 用“Claude Code / Codex / Cursor / Cline”混合覆盖多个客户端。
3. 用 401、429、model not found、环境变量不生效吸收故障流量。
4. 用“低价、稳定、国内可用”做情绪化卖点。
5. 对安全、隐私、模型真实性通常讲得不够系统。

### 4.2 本项目差异化打法

1. 继续做“运维手册型落地页”，少喊口号，多给路径、字段、验证步骤。
2. 把 `/v1`、环境变量覆盖、provider 配置优先级做成表格和 FAQ。
3. 用安全清单、模型真实性验证、日志边界建立信任。
4. 不卷“最低价推荐榜”，避免内容可信度下降。

## 5. 今日关键词机会

### 5.1 高优先级关键词

- Claude Code 环境变量不生效
- Claude Code settings.json 配置
- Claude Code ANTHROPIC_BASE_URL 要不要带 /v1
- Claude Code /model 看不到模型
- Codex config.toml openai_base_url
- Codex model_provider 配置
- Codex wire_api responses chat completions
- OpenAI compatible base_url 要不要带 /v1
- Cursor 自定义 API 地址连接失败
- Cline OpenAI compatible 配置
- AI API 中转站 模型真假
- AI API 中转站 安全风险

### 5.2 候选标题

1. `Claude Code 环境变量不生效怎么办？ANTHROPIC_BASE_URL、settings.json 与 VS Code 覆盖顺序`
2. `OpenAI compatible Base URL 到底要不要带 /v1？按 Claude Code、Codex、Cline、Cursor、SDK 区分`
3. `Codex config.toml 配置优先级：openai_base_url、model_provider、环境变量和 --config 怎么排查`
4. `Claude Code /model 看不到中转站模型怎么办？/v1/models、模型名与能力显示排查`
5. `AI API 中转站怎么判断模型真假？降级、偷换模型、上下文和限流验证清单`

## 6. 给后续 PM / CONTENT / DEV 的建议

### PM

- 下一轮不要再规划泛“AI API 中转站介绍”。
- 规划粒度应改为 FAQ / 表格 / 排错矩阵。
- 推荐 P1 顺序：`/v1` 规则表 → Claude Code 环境变量 FAQ → Codex 配置优先级 → 模型真实性验证。

### CONTENT

- 文章必须包含真实字段名、文件路径、示例片段和验证步骤。
- 标题尽量问题化，例如“不生效怎么办”“要不要带 /v1”“为什么看不到模型”。
- 安全类内容避免恐吓式表达，使用清单、边界、验证方法。

### DEV

- 本轮不修改代码。
- 如果后续执行，建议优先在现有页面中追加 FAQ block 与对照表，观察索引和内链后再拆独立页。
- QA gate 应包含：build、sitemap、robots/noindex、页面 title/description、移动端表格可读性、内部链接。

## 7. 今日结论

未发现需要打扰主公的 blocker。

方向继续收敛为：

- **Claude Code**：环境变量、settings.json、IDE 注入、`/v1` 路径、模型列表；
- **Codex**：`config.toml`、`openai_base_url`、`model_provider`、`wire_api`、覆盖优先级；
- **OpenAI compatible**：按客户端讲 `/v1` 与字段差异；
- **信任内容**：模型真实性、降级判断、Key 权限、日志和隐私边界。

本轮已写入 shared-context 情报文件与项目 reports 文件，未修改代码。
