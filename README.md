# Jerry's Engineering Lab

还在探索，也还在生长。

这里记录我做过的东西、正在追问的问题、工程之外的观察，以及未来可能改变的想法。AI 与软件工程、野生动物与摄影、自我认知都可以在这里相遇；它们是兴趣，不是限定自己的身份标签。

**[访问网站](https://kaetowjj.github.io/)** · [About](https://kaetowjj.github.io/about/) · [Photography](https://kaetowjj.github.io/photography/)

## 这个项目有什么？

- Engineering Notes、Essays、Projects：以 Markdown 维护的笔记、随笔和项目记录。
- 个人首页与 About：独立维护的双语介绍、头像和公开联系邮箱。
- Photography：保留照片比例的画廊、分类/标签筛选、拍摄时间排序和 Lightbox。
- 中文 / English 切换，以及 Light / Dark / System 主题。
- Jerry's Silly Thoughts：真实短句收藏，原文展示；Curated, Not Generated。
- GitHub Actions 构建、验证与 GitHub Pages 部署，保留 RSS 和 Sitemap。

## 我要做什么？

| 目的 | 详细手册 |
| --- | --- |
| 发表、编辑或删除工程笔记 / 随笔 / 项目 | [文章发布](docs/publishing.md#articles) |
| 写中英文正文、代码、表格、公式和配图 | [双语写作](docs/publishing.md#bilingual) |
| 上传照片、生成 WebP、合并摄影数据 | [摄影管理](docs/photography.md#photos) |
| 检查 Category / Tag ID 与筛选问题 | [摄影校验与排错](docs/photography.md) |
| 修改 Hero、What I'm Exploring、Beyond Engineering | [首页个性化](docs/customization.md#homepage) |
| 修改 About、姓名、头像和公开邮箱 | [个人资料](docs/customization.md#profile) |
| 修改默认语言、主题配色或导航 | [网站设置](docs/customization.md#settings) |
| 添加笑话、保存真实来源、配置 Home / Footer | [Jerry's Silly Thoughts](docs/silly-thoughts.md) |
| 安装环境、本地预览、运行测试 | [开发指南](docs/development.md#setup) |
| 查看构建、部署结果与故障排查 | [部署维护](docs/development.md#deploy) |

日常小改可使用 GitHub 网页；长期写作和批量照片处理推荐本地 VS Code + Git。原片导出、摄影 JSON 合并、真实日期和来源核实仍需人工完成，本站没有上传后台或自动导入数据库。

## 技术栈

Jekyll、Liquid、Markdown/Kramdown、YAML/JSON、HTML/CSS、Vanilla JavaScript；Node.js + Sharp 用于图片处理，Node test runner 与 Playwright 用于验证。无需后端或数据库。

## 最小本地启动

已安装 Git、Node.js、Ruby 和 Bundler 后，在 PowerShell 执行：

```powershell
git clone https://github.com/kaetowjj/kaetowjj.github.io.git
Set-Location ./kaetowjj.github.io
npm ci
bundle install
bundle exec jekyll serve --livereload
```

打开 http://127.0.0.1:4000/，按 Ctrl+C 停止。已有工作副本无需重新克隆。版本要求、Windows DevKit、测试和部署操作统一见[开发指南](docs/development.md)。

## 项目与文档维护

详细操作按功能保存在 docs；README 仅作项目入口。修改某项功能时更新对应手册，避免在入口不断追加教程；跨功能内容保留一个主要说明位置，其它地方链接引用。Coding Agent 规则见 [AGENTS.md](AGENTS.md)。

保留的项目资料：[V2 原始需求](docs/requirements-v2.md)、[历史验收记录](docs/validation.md)、[实施记录](docs/superpowers/plans/2026-11-02-engineering-lab.md)、[文章模板](docs/templates/article.md)。历史资料记录当时的需求和结果，不取代现行手册或最新 [Actions 结果](https://github.com/kaetowjj/kaetowjj.github.io/actions/workflows/pages.yml)。
