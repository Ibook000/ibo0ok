# IBO0OK Personal Site

这是我的个人主页项目，采用终端风格交互与作品集式展示。
页面会展示头像、代表项目、技术方向与联系方式。

## 在线访问
- 面向访客展示站点：[https://ibook000.github.io/ibo0ok/](https://ibook000.github.io/ibo0ok/)

## 项目亮点
- 首页主视觉展示个人头像（`assets/images/avatar.jpg`）
- Selected Work：展示仓库规模、近期项目与技术分布
- 终端式交互命令（`help/about/skills/contact/projects/work/clear`）
- 响应式布局，适配桌面与移动端

## 基于仓库信息的技术画像（2026-03-27 抓取）
- GitHub 用户：[`Ibook000`](https://github.com/Ibook000)
- Public Repos：33
- Language 分布（非 fork 仓库）：
  - Python x9
  - TypeScript x2
  - JavaScript x2
  - HTML x2
  - Vue x1
  - CSS x1
  - C x1

## 技术栈
- 前端：HTML5, CSS3, JavaScript, TypeScript, Vue
- 自动化：Python 脚本、Bot 开发、任务流程工具
- AI/数据：MCP 服务、加密数据处理、新闻分析工具
- 工程协作：GitHub Actions / GitHub API / 仓库自动化

## 代表项目（来自公开仓库）
- [polymarket-auto-redeemer](https://github.com/Ibook000/polymarket-auto-redeemer) - 多账户多市场自动赎回机器人
- [crypto_mcp_server](https://github.com/Ibook000/crypto_mcp_server) - 加密市场数据 MCP 服务
- [GithubTrending](https://github.com/Ibook000/GithubTrending) - Trending 榜单展示 + AI 总结
- [crypto-news-analyzer](https://github.com/Ibook000/crypto-news-analyzer) - 加密新闻抓取与分析
- [ChartMaster](https://github.com/Ibook000/ChartMaster) - TypeScript 图表相关项目

## 使用方式
1. 克隆仓库：`git clone https://github.com/Ibook000/ibo0ok.git`
2. 进入目录后直接打开 `index.html`
3. 在页面终端输入 `help` 查看可用命令

## 可用命令
- `about`：个人简介
- `skills`：技术栈概览
- `contact`：联系方式
- `projects`：项目入口提示
- `work`：跳转到 Selected Work 模块
- `clear`：清空终端输出
- `help`：命令帮助

## 项目结构
- `index.html`：页面入口
- `assets/styles/site.css`：页面样式
- `assets/scripts/site.js`：交互逻辑与 GitHub 数据渲染
- `assets/images/avatar.jpg`：头像资源

## GitHub Pages 部署
- 工作流文件：`.github/workflows/static.yml`
- 采用 `build -> deploy` 两阶段，仅上传 `_site` 发布目录
- 自动生成 `.nojekyll`，避免静态资源路径被 Jekyll 处理
- 自动生成 `404.html`（回退到首页），降低访问深链时报错概率
- 如使用自定义域名，仓库根目录放置 `CNAME` 会被自动带入发布包

## 联系方式
- GitHub: [Ibook000](https://github.com/Ibook000)
- X: [BookI50684](https://x.com/BookI50684)
- Telegram: @ibookusbb
- WeChat: IBO0OK
- QQ: 2424935829
