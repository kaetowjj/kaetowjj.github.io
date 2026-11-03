# 开发、测试与部署

解决 Windows 本地环境安装、Jekyll 启动、自动化测试、GitHub Actions/Pages 部署与排错的问题。仅在 GitHub 网页改文字时不必安装本地环境。

[← 返回项目入口](../README.md)

 **本文所有终端命令均在仓库根目录执行，不是在 docs 目录中。**

<a id="setup"></a>
## Windows 本地准备（只做一次）

只在 GitHub 网页修改文字不必安装这些工具。批量处理照片或长期本地写作需要：

- [Git for Windows](https://git-scm.com/downloads/win)；[VS Code](https://code.visualstudio.com/)。
- [Node.js](https://nodejs.org/en/download) 22 或更新的受支持版本；当前 CI 使用 Node 22。npm 随 Node 安装。图片处理依赖 Sharp，必须安装开发依赖，不要使用省略 devDependencies 的安装方式。
- 本地预览 Jekyll 另需 [RubyInstaller with Devkit](https://rubyinstaller.org/downloads/)（推荐与 CI 一致的 Ruby 3.3）及 Bundler。Windows 原生依赖需要 MSYS2/DevKit；安装时按 RubyInstaller 提示完成工具链安装。

安装后重新打开 PowerShell，检查版本：

```powershell
git --version
node --version
npm --version
ruby --version
bundle --version
```

如果仅缺 Bundler，运行 `gem install bundler`。如果命令找不到，先重新打开终端并检查安装时是否添加到 PATH；不要在不明终端目录里继续操作。

在希望存放项目的父目录执行以下命令。已克隆过仓库则直接打开已有目录，不要再次嵌套克隆：

```powershell
git clone https://github.com/kaetowjj/kaetowjj.github.io.git
Set-Location ./kaetowjj.github.io
npm ci
bundle install
code .
```

`code .` 需要 VS Code 已添加到 PATH；也可以在 VS Code 用 File → Open Folder 打开该目录。检查当前位置有 `package.json`、`Gemfile`、`_config.yml`。本文后续命令均在这里执行。

本地预览：

```powershell
bundle exec jekyll serve --livereload
```

打开 http://127.0.0.1:4000/ 。终端需保持运行；按 Ctrl+C 停止。修改 `_config.yml` 后停止并重新启动。普通 Markdown 和图片修改可等待重建后刷新。完整测试命令见[验证](#checks)。

<a id="checks"></a>
## 本地检查与开发资料（保留给需要时查阅）

检查依赖后，在 PowerShell 的仓库根目录执行：

```powershell
npm test
$env:JEKYLL_ENV = 'production'
bundle exec jekyll build --strict_front_matter --trace
npm run check:site
npx playwright install chromium
npm run test:browser
Remove-Item Env:JEKYLL_ENV
```

逐条看结果，上一条失败先解决，不要把后续命令执行完误当成全部成功。回到日常开发预览前移除 JEKYLL_ENV，使行为与开发模式一致。

- npm test：逻辑和图片流水线测试。图片测试会读取当前真实摄影数据并检查文件与比例，不再要求八张 Demo。
- Jekyll build：解析 Liquid、YAML、Markdown 并输出 _site。_site 是构建产物，不应手动维护或提交。
- check:site：检查生成 HTML 中的本地 href/src 与关键页面；现在也通过 checkPhotography 校验摄影 JSON 引用和其中 image/thumbnail/srcset 的本地文件；实际显示仍需预览。
- test:browser：需先构建 _site，自动在 127.0.0.1:4173 启动测试服务器，使用桌面 1280×900 和手机 390×844 视口。摄影浏览器测试从当前真实数据推导数量、分类、标签与浏览顺序，头像测试也读取当前资料属性，不再要求 Demo ID 或占位姓名。
- 固定版本 MathJax 依赖 CDN 网络；首次安装 Playwright 需要下载 Chromium。本地只写内容可先运行 Jekyll 预览，最终仍以 CI 的完整检查为准。

开发者/后续 Coding Agent 参考：

- [AGENTS.md：架构与修改约束](../AGENTS.md)。
- [原始 V2 需求](requirements-v2.md)、[实施记录](superpowers/plans/2026-11-02-engineering-lab.md)、[历史验收记录](validation.md)；历史记录不是最新提交的测试状态，最新结果看 Actions。
- [Gemfile](../Gemfile) / [package.json](../package.json)：依赖与实际命令。
- [布局](../_layouts)、[语言/主题脚本](../assets/js/site.mjs)、[画廊交互](../assets/js/gallery.mjs)、[画廊纯逻辑](../assets/js/gallery-core.mjs)、[About 头像脚本](../assets/js/about-avatar.mjs)。
- [Demo 图片生成脚本](../scripts/demo-images.mjs) 对应 npm run demo:images，只用于原始 Demo 数据恢复，**不要在已放真实照片的数据上运行**；它按记录数量/尺寸生成占位图且会覆盖固定 Demo 文件，不是日常照片导入或自动补图命令。
- 官方参考：[Jekyll](https://jekyllrb.com/docs/)、[GitHub Pages 自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

<a id="deploy"></a>
## GitHub Actions 部署与故障排查

[工作流文件](../.github/workflows/pages.yml)是真实执行依据。它在推送 main、提交 PR 或手动 workflow_dispatch 时运行；PR 只构建测试，合并/推送 main 后才执行部署。流程为：安装 Ruby/Node 与依赖 → npm test → Jekyll 生产构建 → 资源检查 → 安装 Chromium → 浏览器测试 → 打包 → deploy。

### 在 GitHub 查看本次发布

1. 打开 [Actions](https://github.com/kaetowjj/kaetowjj.github.io/actions/workflows/pages.yml)，选择 **Build, test and deploy Engineering Lab** 对应的提交。核对提交说明/commit SHA，别看到了更早的成功记录。
2. 展开 build；若红叉，点失败的具体步骤，阅读第一处实际错误。
3. build 成功后还要等待 deploy 成功，才打开网站检查。频繁提交可能取消前一个运行，以最新提交为准。
4. 手动触发：该工作流页面的 **Run workflow → main → Run workflow**（需写权限）；修复源码后新提交也会自动重跑。
5. 仓库 Settings → Pages（需登录有仓库管理权限的账号，匿名访问后台可能显示 404） 的 **Build and deployment → Source** 应选 **GitHub Actions**。若仍是 Deploy from a branch，可能出现额外的 “pages build and deployment” 运行；切换后可避免分支流程绕过本工作流的测试和重复发布。本手册并不代表已代你修改后台设置。

| 现象 | 操作 |
| --- | --- |
| Pages 未开启 / configure-pages 失败 | 检查 Settings → Pages 的 Source、仓库权限及可用 Pages 功能；按错误提示配置后重跑。 |
| 等待环境批准 | 在 github-pages environment 的待审批部署界面完成审核（如你配置了审批规则）。 |
| Ruby 原生依赖编译失败 | Windows 确认 RubyInstaller DevKit/MSYS2 完整；CI 固定 Ruby 3.3。不要为解决环境问题随意删 Gemfile.lock。 |
| npm/Sharp 安装失败 | 确认 Node 版本、网络以及没有省略开发依赖，从仓库根目录重跑 npm ci。 |
| YAML/Front Matter 失败 | 检查 ---、缩进、冒号后的空格；含冒号等特殊字符的标题用引号。 |
| 浏览器用例失败 | 读取日志和可用的 test-results artifact；通过构建不等于所有交互正常。 |
| 部署成功却内容旧 / 资源 404 | 核对线上 URL、对应提交、大小写、baseurl 和所有资源是否提交；等待 CDN 更新并强制刷新。GitHub Pages 缓存头由平台控制，重要图片更新建议换文件名。 |

canonical、Open Graph、Sitemap 由模板/插件生成。可用订阅地址：[Notes RSS](https://kaetowjj.github.io/notes/feed.xml)、[Essays RSS](https://kaetowjj.github.io/essays/feed.xml)，以及 [Sitemap](https://kaetowjj.github.io/sitemap.xml)。

<a id="routine"></a>
## 推荐的日常维护方式

| 工具 | 适合做什么 | 完成后确认什么 |
| --- | --- | --- |
| GitHub 网页 | 偶尔改字、更新一篇短文章、调整一项资料 | Commit 的分支、Actions 结果、线上页面。 |
| VS Code + Git | 长期双语写作、本地预览、批量照片处理、核对 JSON 合并差异 | 只提交需要的文件，保留原图备份，检查 staged diff。 |
| Codex | 批量辅助整理内容、修改网站功能、维护与内容解耦的测试、诊断构建问题 | 人工确认事实、拍摄日期、版权及公开隐私；要求提供真实检查结果。 |
| GitHub Actions | 对提交的代码/内容构建、运行测试和部署 | 它不会取走你电脑里的原片，也不会替你运行本地导入/手动合并。 |

每次发布前的小清单：

- [ ] 标题、日期、中英文与占位内容已核对；真实文章不带误导性的 Demo 标识。
- [ ] 图片 ID 唯一，导入清单已手动合并，原有照片没有被覆盖；实际拍摄日未知就保留 null。
- [ ] 图片文件与数据一起提交；原图、凭据和私人主邮箱没有进入公开仓库。
- [ ] Actions 对本次提交成功，线上新内容与预期一致。

### 哪些仍是手动操作？

原片导出、命名去重、选择本批文件、合并 photography-import.json、填写真实元数据/双语文本、检查并提交文件、必要时后台配置 Pages、实际浏览验收都需要作者操作。当前没有自动扫描仓库补图、自动翻译、EXIF 日期导入或自动元数据合并。

最值得后续自动化的是一个**先预览差异、检查 ID/目标文件冲突、校验路径/分类/标签、备份后再合并**的照片导入工具；当前摄影端到端测试已依据真实数据生成预期，不再要求固定 Demo。本次只编写使用说明，没有新增这些功能或改变现有上传流程。

[← 返回 README](../README.md)
