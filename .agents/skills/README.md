# 项目级开发技能

本目录的技能随仓库保存，只在本项目范围使用。项目约定见根目录 [AGENTS.md](../../AGENTS.md)。

| 技能 | 用途 | 文件 |
| --- | --- | --- |
| `git-commit` | 检查 diff、组织原子提交、编写 Conventional Commits 提交信息 | [SKILL.md](git-commit/SKILL.md) |
| `conventional-branch` | 选择和检查任务分支名称 | [SKILL.md](conventional-branch/SKILL.md) |
| `vercel-react-best-practices` | React 渲染、异步请求、事件监听与包体积优化 | [SKILL.md](vercel-react-best-practices/SKILL.md) |
| `vercel-composition-patterns` | React 组件拆分、状态归属与组件组合 | [SKILL.md](vercel-composition-patterns/SKILL.md) |
| `karpathy-guidelines` | 简化实现、聚焦改动范围、定义验证目标 | [SKILL.md](karpathy-guidelines/SKILL.md) |
| `vite` | Vite 配置、插件 API、资源处理与库模式构建 | [SKILL.md](vite/SKILL.md) |
| `knip` | 无用依赖、文件和导出分析，处理误报与清理预览 | [SKILL.md](knip/SKILL.md) |
| `vitest` | 单元测试、请求模拟、假时钟与回归验证 | [SKILL.md](vitest/SKILL.md) |
| `chrome-devtools` | 通过 Chrome DevTools MCP 分析网络、渲染与内存 | [SKILL.md](chrome-devtools/SKILL.md) |

## 来源与许可

| 技能 | 来源仓库 | 固定提交 | 来源路径 |
| --- | --- | --- | --- |
| `git-commit`、`conventional-branch` | [github/awesome-copilot](https://github.com/github/awesome-copilot) | `222eba62d518c27317e917c92e3ec1a7e6729455` | `skills/git-commit`、`skills/conventional-branch` |
| 两个 `vercel-*` 技能 | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | `1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62` | `skills/react-best-practices`、`skills/composition-patterns` |
| `karpathy-guidelines` | [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) | `2c606141936f1eeef17fa3043a72095b4765b9c2` | `skills/karpathy-guidelines` |
| `vite`、`vitest` | [antfu/skills](https://github.com/antfu/skills) | `d524ed287eef22757297827ce42e3cad88abd20c` | `skills/vite`、`skills/vitest` |
| `knip` | [matt-riley/agent-skills](https://github.com/matt-riley/agent-skills) | `51b50f0c3cc1fc68f01b12fbb9b266d886be9fc1` | `skills/knip` |
| `chrome-devtools` | [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | `1417f93ee3f83b87270c910b0c0337de475f6f17` | `skills/chrome-devtools` |

- 技能目录均保留固定来源版本的完整文件；适配本项目的规则集中写在根目录 `AGENTS.md`。
- `awesome-copilot` 的 MIT 许可见 [LICENSE.awesome-copilot](LICENSE.awesome-copilot)；`antfu/skills` 的 MIT 许可见 [LICENSE.antfu](LICENSE.antfu)。
- Knip 社区技能的 GNU GPL v3 许可见 [LICENSE.knip-skill](LICENSE.knip-skill)；Chrome DevTools 技能沿用来源项目的 Apache-2.0 许可，见 [LICENSE.chrome-devtools](LICENSE.chrome-devtools)。
- 两个 Vercel 技能与 Karpathy Guidelines 的 `SKILL.md` 声明 MIT；对应固定版本的来源仓库 README 也声明 MIT，未提供独立 LICENSE 文件。保留原始许可声明与来源信息，不补造作者版权声明。
- Karpathy Guidelines 是社区根据 Karpathy 的观察整理的技能，不是 Karpathy 本人维护的官方项目。
- 以上许可仅适用于相应第三方技能，不改变 Sona 的项目许可。
- 更新时先审查来源版本，再用安装器替换相应技能目录，并同步固定版本和许可；不自动追踪来源仓库的最新改动。

## 适用范围

- 优先满足本项目的战绩查询、出装符文推荐和性能精简需求；按任务加载技能，不一次展开所有规则。
- Vercel 技能包含 Next.js 服务端内容，本项目只采用适用于 React 客户端的部分。
- `vite` 技能基于 Vite 8，本项目使用 Vite 6；先核对当前版本支持的 API，不因为安装技能而迁移到 Rolldown 或升级依赖。
- `vitest` 技能基于 Vitest 5.1.0-beta.1；使用通用测试方法时仍需按实际安装的稳定版本核对 API，不因技能版本自动引入预发布依赖。
- 这里只安装 Knip 和 Vitest 的技能资料，尚未添加对应 npm 依赖、配置或测试脚本；建立实际检查流程时另行实施。
- Chrome DevTools 的项目级 MCP 已在 [.codex/config.toml](../../.codex/config.toml) 中配置，运行说明见 [.codex/README.md](../../.codex/README.md)。工具包版本与技能来源版本分别记录，更新时分别核对。

## 使用

在本项目目录启动 Codex 后，技能可按任务发现；也可以在请求中显式使用 `$git-commit`、`$vercel-react-best-practices`、`$karpathy-guidelines` 等名称。项目级技能路径遵循 [OpenAI 官方说明](https://developers.openai.com/api/reference/cli)。

这些技能提供操作约定，不是 Git hooks、commitlint 或 GitHub 分支保护，不会自动拦截手工 Git 命令。
