# Engineering Lab

Jekyll + GitHub Pages 个人工程博客与摄影画廊。所有初始文章和摄影占位图都标注 Demo，个人信息保持占位符。

## 本地运行

安装 Ruby 3.3+（Windows 需 RubyInstaller DevKit）与 Node.js 22+。

```sh
bundle install
npm ci
bundle exec jekyll serve --livereload
```

访问 http://127.0.0.1:4000 。生产构建：`JEKYLL_ENV=production bundle exec jekyll build --strict_front_matter`（PowerShell 使用 `$env:JEKYLL_ENV='production'`）。

## 内容与双语

从 docs/templates/article.md 复制模板到 _notes、_essays 或 _projects。每个 Markdown 文件内使用两个 `<div data-lang="en" markdown="1">` / `data-lang="zh"` 容器，容器前后和内容间保留空行。代码块和表格直接写 Markdown，数学文章设 `math: true` 并使用双美元公式。文章标题用 title / title_zh，摘要用 description / description_zh，更新时修改 updated 和 changelog。

UI 的 data-en / data-zh 提供就地翻译；缺少中文标题时回退英文。缺少某语言的正文时显示现有正文。默认语言见 _config.yml 的 default_language。语言与 Light / Dark / System 偏好保存在 localStorage；禁止存储时仍可使用全部控件。未来独立语言 URL 可复用相同翻译字段。

个人资料在 _data/profile.yml 修改；教育、经历、兴趣与正文在 about.md 修改。LinkedIn 和 email 填入后才显示链接。导航见 _data/navigation.yml。

## 摄影维护

1. 将 JPEG / PNG / TIFF / WebP / AVIF 放到 originals（已被 Git 忽略）。先将 RAW 导出为支持的格式。
2. 执行 `npm run images`，或 `npm run images -- /path/to/exported-images`。
3. 脚本生成最大 2000px WebP、480px 缩略图及 responsive/ 下的 960px 响应式版本，并输出 photography-import.json。它自动处理方向、移除 EXIF/GPS，保留原图于本地。
4. 将生成记录合并到 _data/photography.yml，补充 title、description、alt、实际拍摄 date（ISO YYYY-MM-DD），category 和 tags。没有日期请保持 null。location 可写双语对象；设备参数均可省略。
5. 提交 _data 与 assets，推送 main，Actions 自动构建并测试后部署。

_data/photography.yml 当前使用 JSON 语法（合法 YAML 1.2），方便脚本处理；可继续使用 JSON，或改用常规 YAML（同时调整 Demo 生成脚本）。不要提交 originals 或 photography-import.json 中未审查的内容。不要添加敏感野生动物的坐标。

分类在 _data/photo_categories.yml 添加 ID 与 en/zh 显示名称；标签在 _data/photo_tags.yml 添加。照片使用对应 ID，无需编辑 HTML。分类与单个标签取交集；排序偏好独立保存。日期缺失始终最后，同日按 ID 升序。最后一行保持目标高度且左对齐，不裁切、不人为放大作品。

`npm run demo:images` 重新生成原创抽象 Demo 占位图（非摄影作品），八条虚拟元数据包含横竖混排、同日与缺失日期。上传真实作品时删除或替换 Demo 数据。

## 样式与扩展

assets/css/main.css 的 CSS Variables 定义主题颜色；assets/js/site.mjs 管理语言、主题、导航与目录，gallery-core.mjs 为可测试的筛选/布局纯函数，gallery.mjs 管理画廊与原生 dialog。添加样式时同时验证两个主题和 reduced-motion。

## 验证

```sh
npm test
bundle exec jekyll build --strict_front_matter --trace
npm run check:site
npx playwright install chromium
npm run test:browser
```

浏览器测试覆盖 1280px 桌面与 390px 手机视口。详细结果见 docs/validation.md。RSS 为 /notes/feed.xml 和 /essays/feed.xml；Sitemap 为 /sitemap.xml。数学渲染仅在 math:true 页面加载固定版本 MathJax CDN，离线时保留可读的公式源码。

## GitHub Pages 部署

目标仓库 kaetowjj/kaetowjj.github.io，目标地址 https://kaetowjj.github.io/ 。在 GitHub 仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。工作流 .github/workflows/pages.yml 在 main 推送时构建、验证资源、运行桌面/手机浏览器测试，全部通过才部署。PR 仅测试，不部署。

若 deploy 报 Pages 未开启，按以上步骤切换 Source 并在 Actions 重新运行。若 environment 审批待处理，在 github-pages 环境批准。若资源 404，检查 _config.yml 的 url / baseurl（当前根站点 baseurl 为空）；项目子路径站点需同步修改。GitHub Pages 的缓存头由托管平台控制；图片换内容时建议换文件名。canonical 和 Open Graph 使用站点 URL，单 URL 双语页面共享 canonical。

参考：Jekyll https://jekyllrb.com/docs/；GitHub Pages https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages 。
