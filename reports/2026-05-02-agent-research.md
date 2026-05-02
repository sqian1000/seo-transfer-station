# SEO Autonomous Daily Research — 2026-05-02

- **时间**：2026-05-02 09:24:00
- **主控**：main
- **项目**：`project/seo-transfer-station`
- **范围**：仅研究、情报与关键词机会整理；本轮不修改代码。

## 1. 研究输入

### 1.1 本地事实源
- `project/seo-transfer-station/reports/2026-05-01-research.md`
- `project/seo-transfer-station/reports/2026-05-01-plan.md`
- `project/seo-transfer-station/reports/2026-05-01-agent-summary.md`
- `shared-context/intel/20260501-ai-api-seo-keywords.md`
- `shared-context/knowledge-base/reports/seo-pm01-plan-20260501.md`
- `shared-context/decisions/ADR-20260501-seo-transfer-station-architecture.md`
- `shared-context/intel/20260502-ai-api-seo-serp.md`

### 1.2 外部观察来源
- Claude Code 中转 / 配置类 SERP
- Codex API / `base_url` / `config.toml` 类 SERP
- OpenAI compatible API / BASE_URL 教程类 SERP
- 中转站价格 / 选型 / 风险认知类文章

## 2. 当前状态回顾

昨天已经完成一轮 P0 SEO 迭代闭环，首页定位、技术 SEO 方案、关键词池、开发与 QA gate 都已经成型。今天不需要回到“项目方向对不对”的阶段，而应继续回答三个更实的问题：

1. 用户今天还会搜什么更细的问题？
2. 竞品主要用什么结构承接这些问题？
3. 我们下一批最值得做的内容页 / FAQ 是哪些？

## 3. 今日 SERP 结论

### 3.1 Claude Code：仍然是最强转化入口

SERP 里最常见的是：
- Claude Code 中转站
- Claude Code Base URL
- Claude Code API Key / Token
- `ANTHROPIC_BASE_URL` / `ANTHROPIC_AUTH_TOKEN`
- 国内接入 / 配置失败 / 报错排查

这类搜索已经不是“AI API 是什么”，而是“我现在就要把 Claude Code 配通”。

**结论**：
- 首页和专题页继续承接 Claude Code 是对的。
- 真正有点击价值的，不只是“怎么配”，而是：
  - 配置文件在哪；
  - 环境变量为什么不生效；
  - 怎么验证已经走了中转；
  - 401 / timeout / model not found 怎么查。

### 3.2 Codex：搜索已进入配置细节层

SERP 里出现大量：
- Codex API 配置
- Codex CLI 自定义 `base_url`
- `~/.codex/config.toml`
- `openai_base_url`
- `model_provider`
- 自定义 provider / OpenAI compatible provider

**结论**：
- Codex 页的价值不应停留在“可以配置”。
- 下一层真正有机会的是“配置细节与坑位”：
  - 只改 `openai_base_url` 的最简路径；
  - 自定义 provider 的标准写法；
  - `base_url` 是否带 `/v1`；
  - `responses` / `chat.completions` 的兼容差异；
  - 多 provider 切换时常见报错。

### 3.3 OpenAI compatible：泛词依旧有效，但要做成迁移实用文档

官方云厂商文档仍在持续教育用户：把 API Key、BASE_URL、模型名替换掉，就能用 OpenAI SDK 访问不同模型服务。

**结论**：
- “OpenAI compatible API” 不是空洞概念词，仍然有稳定需求。
- 但页面结构应更工程化：
  - 哪些工具支持自定义 API 地址；
  - 哪些场景需要完整 endpoint；
  - 哪些只需要 BASE_URL；
  - 模型名、认证头、SDK 调用方式差异是什么。

### 3.4 价格 / 选型 / 风险：信任型内容仍有空间

市场上充满“推荐榜”“最低价”“稳定直连”类文章，但真正有持续价值的是“如何判断是否靠谱”。

**结论**：
- 本项目不建议卷低价口号。
- 更适合做：
  - 购买前须知
  - 中转站安全边界
  - 模型真实性验证
  - 团队预算 / Key 分组 / 备用线路
- 这类内容既能承接搜索，也能提高转化质量。

## 4. 竞品形态观察

### 4.1 竞品常见结构
1. 首屏就给可复制命令或环境变量。
2. 快速区分 Claude Code / Codex / OpenAI SDK 三类配置。
3. 用 401 / 429 / model not found 吸附故障流量。
4. 用购买链接或控制台入口承接转化。
5. 用“稳定、便宜、国内可用”做情绪化卖点。

### 4.2 我们更好的打法
1. 用**真实配置路径 + 验证方法 + 排错矩阵**建立信任。
2. 用 **FAQ / How-to / 错误排查** 持续扩长尾，而不是首页堆词。
3. 用 **购买前判断清单 / 安全建议** 过滤掉低质量线索。
4. 保持 `/go/` 只做转化中转，不抢索引。

## 5. 今日关键词机会

### 5.1 应继续强化的核心词
- Claude Code Base URL
- Claude Code API Key 配置
- Codex API 配置
- Codex CLI base_url
- OpenAI compatible API
- AI API 中转站 错误排查

### 5.2 新增问题型长尾机会
- Claude Code 环境变量不生效
- Claude Code settings.json 配置
- Claude Code 如何验证走了中转
- Codex `config.toml` 配置示例
- Codex `openai_base_url` 怎么填
- Codex `model_provider` 是什么
- OpenAI compatible base_url 要不要带 `/v1`
- invalid base url 怎么排查
- model not found 怎么排查
- API 中转站 安全建议
- API 中转站 购买前须知

### 5.3 候选专题标题
1. `Claude Code 环境变量不生效怎么办？Base URL、Token 与配置覆盖顺序排查`
2. `Codex config.toml 怎么配？openai_base_url、model_provider 与自定义 provider 详解`
3. `OpenAI compatible Base URL 要不要带 /v1？不同客户端填写规则总览`
4. `AI API 中转站购买前须知：价格、模型真实性、日志与备用线路怎么判断`
5. `model not found / invalid key / 429：AI API 中转常见错误排查手册`

## 6. 对项目的直接价值判断

### 6.1 最值得继续做的内容方向
**优先级 1：问题型教程**
- 因为离转化最近，且 SERP 已经证明用户确实在搜。

**优先级 2：配置差异型文档**
- 比如 Claude Code、Codex、Cursor、Cline 的字段名、路径和调用方式差异。

**优先级 3：信任 / 风险说明页**
- 用来避免项目滑向纯营销话术，同时补上购买决策层。

### 6.2 当前暂不建议做的方向
- 泛“AI API 中转站推荐榜”
- 只讲概念、不讲配置的泛科普页
- 没有真实数据支撑的价格对比页

理由：这几类内容同质化高，且最容易落入不可信或过度营销。

## 7. 下一轮建议

1. **内容优先级建议**
   - 第一优先：Codex `config.toml` / provider 教程
   - 第二优先：Claude Code 环境变量不生效 / 验证中转排查
   - 第三优先：OpenAI compatible Base URL `/v1` 规则总指南
   - 第四优先：购买前须知 / 安全建议页

2. **信息架构建议**
   - 首页继续扮演总入口。
   - 细问题拆到专题页 / FAQ，不把首页写成超长混合文。

3. **写作策略建议**
   - 标题更问题导向。
   - 正文必须有字段名、文件路径、示例、验证步骤、常见错误。
   - 避免“最低价 / 绝对稳定 / 绝不封号”类表述。

## 8. 结论

今天的研究没有发现新的 blocker。

相反，方向更清晰了：
- **Claude Code 配置与排错** 仍是最稳的核心流量入口；
- **Codex `config.toml` / provider / base_url** 是下一批最值得抢的工程型长尾；
- **OpenAI compatible Base URL 迁移规则** 仍然是高复用教育内容；
- **购买前须知 / 安全边界 / 模型真实性判断** 是差异化信任内容。

本轮已按要求写入 shared-context 情报文件，未修改项目代码，也无需要打扰主公的 blocker。
