# Sona · 排位分析精简版

基于 [WJZ-P/sona](https://github.com/WJZ-P/sona) 的 Pengu Loader 插件，在 [limnova/sona](https://github.com/limnova/sona) 独立维护。保留原作者 WJZ_P 的署名与 AGPL-3.0 许可。

本版本仅面向国服召唤师峡谷（匹配、单双排、灵活组排等经典峡谷队列），界面固定为简体中文。其他玩法不启用房间、选人或游戏分析，战绩列表与评分也仅包含峡谷对局。

## 保留功能

- **选人阶段分析**：队友近期胜率、胜负场数、KDA、原有五档头像粒子特效；点击头像打开详细战绩，匿名模式兼容与换楼绑定保留。
- **牛马检测器**：基于原有综合评分，在头像战绩区展示「千里马／上等马／中等马／下等马／纯牛马」队内评级及分数，仅本地显示。与选人增强共用战绩查询；两者同时开启时取较大的查询局数。
- **双方对局分析**：队友与对手胜率、KDA、段位、近期对局和开黑识别；保留进入游戏后的分析弹窗及客户端内的对局分析按钮。
- **战绩查询**：输入 `召唤师名#Tag` 查询国服近期战绩，保留国服大区互通查询，支持峡谷队列过滤、翻页与单局详情。
- **组队成员战绩**：大厅成员头像点击查询及近期表现展示。
- **符文装备推荐**：保留 OP.GG 推荐面板、分路及段位过滤、符文应用、召唤师技能、智能符文保存恢复和推荐装备集。
- **英雄参考数据**：峡谷英雄 T 级角标。
- **基础设置**：固定中文、面板快捷键、入口显隐、更新提醒与关于页面。

战绩查询局数可选近 20／50／100 局；实际有效样本受接口返回、模式过滤及重开／挂机局排除影响。评级是队内相对排名，不改变真实段位。

## 已移除功能

独立客户端美化（壁纸、毛玻璃、自定义头像／生涯背景／旗帜、流光昵称、全局粒子、窗口特效）、在线状态与签名修改、好友分组和状态增强、段位伪装，以及自动接局、自动禁用／预选／锁定英雄、自动点赞、自动返回／排队、快速大厅、无 CD 换英雄、解锁炫彩、入口隐藏／模式筛选、广告与隐私请求改写、奖励领取、回放工具、游戏设置备份与调试工具。

语言切换、翻译框架和外服战绩服务器适配已移除。自动发聊天已移除；推荐配置的操作反馈改为本地提示。旧 DataStore 中的已删除功能设置不再被加载或执行。大乱斗、海克斯大乱斗、斗魂竞技场、无限火力、极限闪击等模式的适配、ARAM.GG 数据源及特殊模式平衡性提示和更新任务已移除。

## 安装与使用

1. 安装 [Pengu Loader](https://pengu.lol/) v1.1.0+。
2. 将此版本的 `index.js`、`index.css`、`assets` 放入 Pengu 插件目录下的 `sona` 文件夹；在 Loader 刷新并启用 Sona 后重启客户端。
3. 点击 Play 按钮旁的 Sona 头像，或按 **F1** 打开面板。进入「排位分析」开启需要的功能。
4. 「英雄选择阶段增强」控制头像分析；「牛马检测器」控制头像旁的评级，也可单独开启。设置自动持久化。

更新入口指向 `limnova/sona` 的 Releases，避免安装回原版完整功能集。不要混用原版成品覆盖此版本。

## 开发

环境：React 19、TypeScript 5、Vite 6，运行宿主为 LOL 客户端的 Pengu Loader。

```powershell
npm ci
npm run typecheck
npm test
npm run build
```

`npm test` 对源码和测试进行类型检查，再运行峡谷功能入口、队列筛选、战力评分、战绩请求竞态、分页及配装数据转换和装备集合并的回归测试。测试使用独立的 `vitest.config.ts`；构建回归测试只在临时目录中验证打包、安装和失败保护，不会修改实际安装目录。

`npm run typecheck` 分别检查浏览器源码和 Node 构建配置；源码、构建配置和测试的增量缓存分别保存在 `node_modules/.cache/tsc/`。`npm run build` 先检查类型，再生成 `dist/`，不会安装到 Pengu 目录。已经完成类型检查时，可用 `npm run build:bundle` 单独打包；发布 CI 会先运行测试，再使用完整构建命令。

配装的数据模型位于 `src/types/build-recommendation.ts`；分路上下文、OP.GG 数据适配与装备集逻辑位于 `src/lib/build-recommendation/`，宿主事件和界面控制仍由 `src/lib/features/opgg-build-recommendation.ts` 负责。战绩列表行与分页会话位于 `src/components/ui/match-history/`。

`npm run dev` 写入开发入口；`npm run build:install` 在类型检查和打包成功后更新已安装插件，并保留目录中的自定义资源。两者优先读取 `PENGU_LOADER_PATH` 环境变量，否则使用 `package.json` 的 `config.loaderPath`；相对路径以项目根目录为基准，最终目录为 `<loaderPath>/plugins/sona`。默认 `../../` 解析到仓库外，使用前请核对目标路径。例如 PowerShell 中先设置 `$env:PENGU_LOADER_PATH = 'D:\Pengu'`，再运行 `npm run build:install`。

战绩优先走 SGP，失败时回退客户端原生接口；接口、网络或区服状态可能导致无数据。`/lol-chat/v1/me` 仅以 GET 读取区服标识，供战绩路由使用。配装依赖 OP.GG 外部数据源；OP.GG 全球统计仅用于英雄配装参考。

## 许可与致谢

[AGPL-3.0](LICENSE)。原项目由 **WJZ_P** 创作，本分支保留原有许可和作者署名。

沿用原项目致谢：[BetterTencentLCU](https://github.com/BakaFT/BetterTencentLCU)、[upl](https://github.com/imunproductive/upl)、[CustomHookLoader](https://github.com/BakaFT/CustomHookLoader)、[balance-buff-viewer](https://github.com/nomi-san/balance-buff-viewer)、[LeagueAkari](https://github.com/LeagueAkari/LeagueAkari)。
