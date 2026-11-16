# 峡谷精简收尾 Implementation Plan

> **For agentic workers:** 按清单在当前会话逐项实施和检查；用户已要求直接开始，无需再次审批，也不自动提交或安装。

**Goal:** 完成审查中已确认的五项清理，保留峡谷战绩、评级及符文装备功能。

**Architecture:** 沿用现有 Pengu 生命周期。删除纯装饰、无消费者 Token 和无调用接口；按开关请求推荐数据。为配装异步操作传递会话取消信号，在切换玩法、英雄、阶段或关闭功能时失效，阻止晚到响应继续写回。

**Tech Stack:** React 19.1 / TypeScript 5.8 / Vite 6 / Vitest 3.2。

**Spec:** 本文“已确认范围”；对应用户对上一轮五项审查结果的全部清理授权。

## 已确认范围

- 删除主页粒子和呼吸动画、通用弹窗粒子、特殊日期提示及对应样式和状态。
- 删除 League Session Token 的请求、订阅、缓存及无消费者访问器；保留战绩实际使用的 Entitlements Token。
- 删除无调用的 LCU 封装与调试入口；核对宿主 init/load 入口，保留有调用的战绩链路。
- 删除无条件 T 级预取；智能符文独立启用时不请求 OP.GG 推荐或常见分路表。
- 修复配装读写跨会话失效；发布包停止生成自定义头像、背景说明。

## Global Constraints

- 保留用户修改；当前从 main 创建 codex/finish-rift-cleanup。
- 不添加依赖，不改评分阈值或峡谷模式范围，不修改选人评级粒子。
- 仅构建到 dist 并同步仓库成品，不执行 dev/build:install，不提交或推送。

## Review Focus

- 读符文页时切到其他玩法，不能继续更新、创建或删除符文页。
- 读装备集时退出、换英雄或关闭自动装备，不能继续 PUT。
- 新会话英雄相同时，上一轮 finally 不能清理新一轮的去重状态。
- 仅智能符文开启时，无外部配装请求，保存恢复和轮询仍正常。
- 所有推荐开关关闭或非峡谷模式时，不加载 T 级或注入推荐入口。

## Task 1: 配装取消和按需加载

**Files:** src/lib/lcu.ts、src/lib/features/opgg-build-recommendation.ts、src/components/ui/OpggBuildRecommendationPanel.tsx、src/lib/features.ts、src/lib/features/champselect-tier-badge.ts；tests/features/opgg-lifecycle.test.ts、tests/lcu-runes.test.ts、tests/features/game-mode-lifecycle.test.ts。

**Interfaces:** LCU 符文和装备读写支持可选 AbortSignal；推荐面板接受会话信号；原有单参调用保持兼容。

- [x] 添加模式切换、关闭开关、相同英雄新会话以及符文正常应用的回归测试，先验证旧行为失败。
- [x] 添加会话取消，在每次异步读取后及写入前检查有效性；取消后禁止失败回退和重复页删除。
- [x] 将 T 级和配装加载限定到所需功能，停止智能符文单开时的外部推荐请求。
- [x] 运行相关 Vitest 测试，确认正向峡谷流程与失效边界通过。

## Task 2: 删除剩余装饰和无用接口

**Files:** src/index.tsx、pengu.d.ts、src/components/pages/HomePage.tsx、src/components/ui/Modal.tsx、对应 CSS、src/lib/lcu.ts、src/types/lcu.ts。

**Interfaces:** 保留 Pengu init/load、真实战绩查询和选人评级展示；移除仅由被删代码使用的类型和导入。

- [x] 删除纯装饰实现、对应无限动画、特殊日期状态。
- [x] 删除无消费者的 League Session Token 链路、无调用的 LCU 接口和调试入口，搜索确认无残留调用。
- [x] 运行类型检查及现有测试。

## Task 3: 发布说明和成品

**Files:** .github/workflows/release.yml、README.md、index.js、index.css。

- [x] 移除发布包中自定义头像、背景资源目录说明；同步 README 的按需加载和精简范围。
- [x] 运行 npm run typecheck、npm test、npm run build。
- [x] 从 dist 同步 index.js/index.css，核对资源引用、git diff --check 和最终工作区。

## 验证结果

- `npm run build`：类型检查和生产构建通过，仅输出到 dist。
- `npm test`：9 个测试文件、97 项测试通过。
- 根目录 index.js/index.css 已与 dist 产物同步；未安装、提交或推送。
