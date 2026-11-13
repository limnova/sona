# 项目级 Chrome DevTools MCP

本目录的 [config.toml](config.toml) 只为本仓库注册 Chrome DevTools MCP，不修改用户级 Codex 配置。

- 固定工具包版本为 `chrome-devtools-mcp@1.13.0`，通过 `npx` 启动；包由 npm 缓存管理，不使用全局安装。
- 在受信任的本项目目录打开或重新加载 Codex 会话后，检查 MCP 列表中的 `chrome-devtools`。项目配置规则见 [OpenAI 官方说明](https://learn.chatgpt.com/docs/extend/mcp?surface=cli)。
- 配置使用临时浏览器资料目录，关闭工具使用统计和 CrUX 查询。实际调用浏览器工具时才需要可用的 Chrome；安装验证不启动浏览器。
- 默认连接的是工具启动的独立 Chrome，不自动连接当前 Chrome 或 LOL 客户端。分析 LOL 内置浏览器前，先核实客户端是否提供可连接的调试端点，并显式选择目标。
- 需要分析已有调试目标时，按 [Chrome DevTools 配置说明](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/1417f93ee3f83b87270c910b0c0337de475f6f17/docs/advanced-usage.md) 调整连接参数，不假设普通网页测量等同于 LOL 内的结果。
- 项目技能位于 [chrome-devtools/SKILL.md](../.agents/skills/chrome-devtools/SKILL.md)。此配置不代表已完成实际客户端性能测试。
