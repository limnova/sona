# 项目协作约定

## 仓库与分支

- 本项目在 `limnova/sona` 独立开发。`origin` 指向 `https://github.com/limnova/sona.git`；保留 GitHub fork 记录，不添加原作者仓库的 `upstream`，不向原仓库推送或创建 PR，除非用户另有要求。
- `main` 是稳定主线，日常工作使用短期任务分支；当前的 `codex/lite-performance` 可以继续用于本轮精简和性能优化。
- 新建或检查分支名时，读取 [.agents/skills/conventional-branch/SKILL.md](.agents/skills/conventional-branch/SKILL.md)。优先使用 `codex/<简短英文任务名>`，例如 `codex/optimize-match-loading`；也接受技能中的用途前缀。
- 切换或创建分支前检查工作区和当前任务关系，保留用户未提交的修改。已有合适分支时继续使用，不机械地切回主线或执行 `pull`。
- 新任务需要最新主线时，先获取 `origin` 的状态，再从确认的基线建分支；已有未完成的依赖修改应保留在正确的任务链上。

## 提交与远端操作

- 用户要求提交或拆分提交时，读取 [.agents/skills/git-commit/SKILL.md](.agents/skills/git-commit/SKILL.md)，检查实际 diff，按一个逻辑变化一个提交组织。
- 使用 Conventional Commits：`type(scope): 描述`。类型使用 `feat`、`fix`、`perf`、`refactor`、`docs`、`test`、`build`、`ci`、`chore`、`style`、`revert`；描述可用中文，标题不超过 72 个字符。
- 示例：`perf(match-history): 复用选人阶段的战绩缓存`、`chore(skills): 引入项目级 Git 工作流技能`。
- 技能安装或代码修改本身不代表用户要求提交、推送、开 PR 或发布；用户已明确授权的操作直接完成，不重复确认。
- 推送或创建 PR 前核对目标是 `limnova/sona`。合并回本仓库 `main` 时检查实际 diff、冲突和适用验证结果。
- 保留已有提交历史，不擅自 amend、rebase、强制推送、执行破坏性 reset 或删除分支；这些操作按用户的明确要求执行。
- 按路径暂存本次任务的文件，避免带入其他改动；不提交凭据、令牌、日志、依赖目录或个人配置。

## 开发技能

- 写代码、审查或重构前，按任务使用 [.agents/skills/karpathy-guidelines/SKILL.md](.agents/skills/karpathy-guidelines/SKILL.md)：先理解现有实现，明确可验证的目标，保持改动聚焦，减少不必要的抽象。
- 整理条件分支、数据转换、命名和业务规则复用时，使用 [.agents/skills/code-readability/SKILL.md](.agents/skills/code-readability/SKILL.md)。避免嵌套或连续三元表达式，保留简单的单层选择；可读性重构保持既有默认值、阈值与副作用。
- React 性能、请求等待、事件监听、重渲染和包体积问题，使用 [.agents/skills/vercel-react-best-practices/SKILL.md](.agents/skills/vercel-react-best-practices/SKILL.md)。只加载与当前问题相关的规则。
- 拆分大型 React 组件、整理状态归属或设计组件接口时，使用 [.agents/skills/vercel-composition-patterns/SKILL.md](.agents/skills/vercel-composition-patterns/SKILL.md)。按实际复杂度选择组合方式，避免为单一用途引入通用框架。
- Vite 配置、插件生命周期、资源加载或库模式打包问题，使用 [.agents/skills/vite/SKILL.md](.agents/skills/vite/SKILL.md)。
- 查找无用依赖、文件、导出或排查 Knip 报告时，使用 [.agents/skills/knip/SKILL.md](.agents/skills/knip/SKILL.md)。先核实 Pengu 的 `init/load` 等宿主入口和动态引用，再判断是否能删除；不直接批量应用修复。
- 编写测试、模拟 LCU/SGP 请求、验证取消/超时/缓存逻辑时，使用 [.agents/skills/vitest/SKILL.md](.agents/skills/vitest/SKILL.md)。技能参考版本包含 Vitest 5 的预发布内容；实施前选择与实际 Vite、Node 版本兼容的稳定工具版本。测试使用独立配置，避免加载现有 Vite 构建插件产生复制或删除目录的副作用。
- 浏览器网络、主线程或内存分析时，使用 [.agents/skills/chrome-devtools/SKILL.md](.agents/skills/chrome-devtools/SKILL.md)。项目 MCP 配置见 [.codex/README.md](.codex/README.md)；先确认连接目标，不能把独立 Chrome 的结果当作 LOL 内置浏览器的实测结果。
- 当前项目是 React 19.1 / TypeScript 5.8 / Vite 6 的 Pengu Loader 插件，没有 Next.js、SSR 或 React Server Components。跳过对应服务端规则；需要延迟加载时采用当前环境支持的原生 `import()` / React 方案。
- Vite 技能参考 Vite 8，涉及配置 API 时必须按锁文件中的实际 Vite 版本核对官方文档；不直接套用 Rolldown / Oxc 或执行版本迁移。React 新 API 和浏览器 API 同样核对已安装版本及 LOL 内置浏览器的支持情况。
- 只安装技能不改变项目依赖。性能改动先明确测量指标，验证前后行为与开销，不将技能中的示例收益当成本项目实测结果。

## 验证与构建

- 仅修改技能或文档时，检查内容、引用路径和 diff 即可，不为此安装前端依赖或启动 LOL。
- 修改源码后运行适用的类型检查；有现成依赖时可运行 `npx --no-install tsc --noEmit`。`npm test` 会检查源码和测试的类型，并通过独立 Vitest 配置运行回归测试；目前没有配置 lint 脚本，不声称 lint 已通过。
- `npm run typecheck` 检查浏览器源码和 Node 构建配置；`npm run build` 只生成 `dist/`。源码、构建配置和测试使用独立增量缓存，位于 `node_modules/.cache/tsc/`。
- 运行 `npm run dev` 或 `npm run build:install` 前检查 `PENGU_LOADER_PATH`、`package.json` 的 `config.loaderPath` 和 `vite.config.ts`：这些命令会写入目标插件目录。先确认解析后的绝对路径在预期位置；安装只覆盖产物文件，保留其他用户资源。
- 沿用原项目许可与署名；第三方技能的来源、固定版本和许可见 [.agents/skills/README.md](.agents/skills/README.md)。
