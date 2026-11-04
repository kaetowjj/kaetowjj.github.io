# 文章发布与双语写作

解决如何新建、编辑、删除 Tech Blog 和 Essays，以及维护双语正文和文章配图的问题。先选择目标目录，再按网页或本地流程操作。

[← 返回项目入口](../README.md)

需要本地命令时，先完成[环境准备](development.md#setup)。 **本文所有终端命令均在仓库根目录执行，不是在 docs 目录中。**

<a id="articles"></a>
## 发布 Tech Blog 与 Essays

### 先选择正确目录

| 类型 | 目录与参考文章 | 新文件名示例 | 发布后的 URL |
| --- | --- | --- | --- |
| Tech Blog | [_tech/](../_tech)；[现有文章](../_tech/reproducible-data-workflows.md) | repeatable-data-task.md | https://kaetowjj.github.io/tech/repeatable-data-task/ |
| Essay | [_essays/](../_essays)；[现有随笔](../_essays/why-an-engineering-lab.md) | learning-in-public.md | https://kaetowjj.github.io/essays/learning-in-public/ |

Tech Blog 统一收录技术问题、笔记、实验和项目记录，不再区分 Note / Project，也不需要 Category 或 type 字段。Essays 适合个人经历、观察与思考；它的现有栏目与分类筛选保留。两者使用相同文章布局与双语正文机制。

### 直接用 GitHub 网页发表（十步）

1. 登录 GitHub，进入上表中的目标目录，确认当前分支为 main。
2. 点击 **Add file → Create new file**。
3. 输入小写英文、数字和短横线组成的文件名，以 `.md` 结尾，例如 `repeatable-data-task.md`。直接在目录中创建时不要再重复输入 `_tech/`。
4. 打开[文章模板](templates/article.md)，点击 Raw 复制原始 Markdown；也可复制下节完整示例。模板已含 description 与 description_zh，请分别填写。
5. 修改文件顶部两条 `---` 之间的 Front Matter。真实文章移除示例的 `demo: true`，不要把 Demo 实验结论当作真实成果。
6. 在两个语言容器里分别填写英文和中文正文；保留容器前后的空行。
7. 点击 **Preview** 检查内容。GitHub 预览不能完整模拟 Jekyll、Liquid、双语切换或 MathJax，最终排版以本地或线上页面为准。
8. 点击 **Commit changes…**，填写说明（例如 Add tech post about repeatable data tasks），选择直接提交 main 并确认。如果界面要求创建分支/PR，提交 PR 后还需合并到 main 才会部署。
9. 打开 [Actions](https://github.com/kaetowjj/kaetowjj.github.io/actions)，找到对应提交的 **Build, test and deploy Engineering Lab**，等待 build 和 deploy 均成功。
10. 打开上表规则对应的线上 URL，切换语言检查标题、正文、目录、代码和公式。列表页也应出现新文章。

### Front Matter 和 URL 的关系

| 字段 | 如何填写及真实行为 |
| --- | --- |
| title / title_zh | 英文/中文标题；中文标题为空时正文标题回退英文。文件名不随标题自动变化。 |
| description / description_zh | 列表中的英文/中文摘要；中文为空回退英文。HTML SEO description 当前使用 description，语言切换不会更新 head 元数据。 |
| date | 初次发布日期，建议 ISO 格式 YYYY-MM-DD；不是照片拍摄日期。 |
| updated | 最近实质修改日期；正文“更新于”缺省显示 date。Tech Blog 列表按 date 发布时间降序排列，更新旧文不会自动置顶；Essays 保留按 updated 排序。 |
| tags | 可选字符串数组，例如 [python, concurrency]；省略或 [] 表示无 Tag。技术文章自动汇总 Tag，不需要预先登记；显示与筛选使用构建期统一的规范键：去除 Unicode 首尾空白、NFKC 兼容规范化并折叠大小写；常见英文 Tag 显示为小写。 |
| math | 有公式时用 true；只在此类页面加载固定版本 MathJax CDN。 |
| changelog | 可选更新记录数组，含 date、en、zh；修改文章时手动维护，不会自动生成。 |
| demo | 仅示例用 true，页面显示 Demo 标识；真实文章删掉或设 false。 |

本仓库使用 Jekyll collections，不是 `_posts` 的日期命名规则。简单 ASCII 文件名的基本名称决定 `:name`，例如 `_tech/repeatable-data-task.md` 对应 `/tech/repeatable-data-task/`。修改 title、date、updated 或 tags 不改变该 URL；重命名/移动文件则可能改变 URL，旧链接不会自动重定向。无需给文件名加发布日期。示例 URL 只在创建并发布该文件后存在。

### 用 Tag 聚合技术文章

1. 在文章 Front Matter 写 `tags: [python, concurrency]`；可以填写以前从未用过的新 Tag，不需改其它数据文件。推荐小写英文与短横线，避免 Python / python / PYTHON 多种写法；当前构建与筛选会将它们合并显示为 python。Unicode 标签也由同一个构建过滤器处理，浏览器使用构建出的键，不独立推导文章的标签身份。
2. 一篇文章可有多个 Tag；不想分类时省略 tags 或写 `tags: []`。不必为所有文章强制选择某个学科或职业。
3. 提交并部署后，打开 [Tech Blog](https://kaetowjj.github.io/tech/)，顶部自动显示全部 Tag（去重），文章下方也显示独立可点击的 Tag。
4. 点击一个 Tag 后只显示包含它的文章，选中项保持实心背景；点击 All / 全部恢复完整列表。筛选不重新加载整页。
5. 复制浏览器地址即可分享，例如 `https://kaetowjj.github.io/tech/?tag=python`。直接打开、前进/后退与中英文切换均保留筛选；未知 Tag 显示空状态。没有文章时页面仍可打开。
6. 在文章正文页点击 Tag，同样会打开对应聚合地址。含特殊字符的 Tag 应复制生成的链接，例如 c++ 会编码为 c%2B%2B，不要手工用裸 + 拼 URL。

当前两篇历史 Demo 已完整迁移至 _tech，继续明确标记 Demo；旧 Demo 路径未建立重定向。请使用上表的新地址，历史需求与测试记录保留当时路径，仅作追溯。

<a id="bilingual"></a>
## 完整可复制的双语文章

把下面**整个代码块内容**保存为 `_tech/repeatable-data-task.md`，不要把外层四个反引号也复制到文件。用于 Essay 时放到 _essays 并改内容。日期和标题均为示例，请自行填写真实值。

````markdown
---
title: "Making a Small Data Task Repeatable"
title_zh: "让一个小数据任务可重复执行"
description: "A minimal record of inputs, steps, and checks."
description_zh: "记录输入、步骤与检查的最小示例。"
date: 2026-11-03
updated: 2026-11-03
tags: [pipelines, reproducibility]
math: true
demo: true
changelog:
  - date: 2026-11-03
    en: First demo version.
    zh: 首个演示版本。
---

<div data-lang="en" markdown="1">

## Problem

How can I repeat the same transformation tomorrow? This is a Demo example, not a measured production result.

## Design

Record the input file and transformation steps.

```python
rows = [1, 2, 3]
print(sum(rows))
```

| Item | What to record |
| --- | --- |
| Input | File name and checksum |
| Output | Row count and validation result |

## Experiment

The illustrative processing cost is:

$$T(n) = a n + b$$

## Lessons Learned

A small explicit checklist is easier to repeat.

</div>

<div data-lang="zh" markdown="1">

## 问题

如何在明天重复同一项转换？这是 Demo 示例，不是生产环境的实测结论。

## 设计

记录输入文件与转换步骤。

```python
rows = [1, 2, 3]
print(sum(rows))
```

| 项目 | 需要记录的内容 |
| --- | --- |
| 输入 | 文件名与校验和 |
| 输出 | 行数与校验结果 |

## 实验

示意处理成本如下：

$$T(n) = a n + b$$

## 经验

简短且明确的检查清单更容易重复使用。

</div>
````

### 容器、代码、表格和公式的注意事项

- `title` 与 `description` 为英文；`title_zh` 与 `description_zh` 为中文。它们位于 Front Matter，不在正文语言容器内。
- `<div data-lang="en" markdown="1">` 和 `<div data-lang="zh" markdown="1">` 应为同一父容器下的兄弟块。网站会显示当前语言，隐藏另一块，并根据显示的正文生成目录。
- 开始标签之后、结束标签之前、两个容器之间留空行，让 Kramdown 识别 Markdown 块边界；`markdown="1"` 明确要求容器内部解析 Markdown。不要把整段正文额外缩进四格，否则可能被当作代码。示例中的代码块只需三反引号和语言名。
- 表格要有表头及 `| --- |` 分隔行。二、三级标题会生成文章目录。项目配置了 Rouge。示例的 python 标记用于指明代码语言；本次本地构建确认生成了 language-python 代码块，但双语 HTML 容器中的围栏不应仅凭配置就假定已有彩色高亮，具体显示请用网站预览核实。
- 示例的 `$$…$$` 是独立数学公式；设置 `math: true` 后由 MathJax 渲染。网络/CDN不可达时可能只见公式源码，GitHub Markdown 预览也不等同本站。
- 缺少中文标题或摘要时回退英文；正文缺少目标语言容器时显示已有容器（优先英文，否则现有第一块）。**空的中文容器也算“已有中文”**，不会自动回退到英文：还未翻译时删除该空容器，或先写有效内容。网站不会自动翻译文章。
- 右上角 **中文 / EN** 按钮立即切换，localStorage 保存偏好并跨页面保持。默认语言见[设置](customization.md#settings)。摄影 title/description/alt/location 等双语对象优先当前语言，再英文，再中文；建议仍完整填写。

### 用 VS Code + Git 长期写作

每次开始先打开项目目录并同步；如果本地已有未提交修改，先查看 status，妥善提交或暂存后再 pull，遇到冲突先处理，不要强制覆盖。

```powershell
git status
git pull --ff-only
Copy-Item ./docs/templates/article.md ./_tech/my-new-post.md
code ./_tech/my-new-post.md
```

Essay 将复制目标换为 `./_essays/my-new-essay.md`。在 VS Code 编辑、用 Markdown Preview 初查，再用 `bundle exec jekyll serve --livereload` 查看真实网站。

确认完成后（以下示例只提交这一篇技术文章）：

```powershell
git diff -- _tech/my-new-post.md
git add -- _tech/my-new-post.md
git diff --cached
git commit -m "Add tech post"
git push origin main
```

新文件在 git add 之前不会出现在普通 git diff 中，可在编辑器查看；git status 会列为 untracked。推送需已登录 GitHub 并有写权限，按 Git 的正常登录流程操作，不要把 token 或密码写进命令、文章或仓库。最后按上面的 Actions 与线上检查步骤验收。

### 编辑已发布文章与添加正文图片

在原文章的 GitHub 页面点铅笔 Edit this file，或在 VS Code 打开原文件。修改正文、updated 和可选 changelog，保持文件名可保留原 URL；填写 Commit changes，再检查 Actions 和线上文章。不要为一次小修新建重复文章。

文章配图不走摄影画廊导入：先导出合适尺寸、去除 EXIF/GPS 的 WebP，在 [assets/images/](../assets/images) 用 Add file → Upload files 上传，例如 note-diagram.webp；本地也可复制到此目录。示例文件需实际上传后才存在。在语言容器里写：

```markdown
![Diagram of the data workflow]({{ '/assets/images/note-diagram.webp' | relative_url }})
```

中文容器把 alt 改成“数据工作流示意图”。Markdown 图片不会自动压缩或去元数据。检查路径大小写，同时提交配图和文章：

```powershell
git add -- _tech/my-new-post.md assets/images/note-diagram.webp
git diff --cached --stat
git commit -m "Update tech post with illustration"
git push origin main
```

## 删除文章

先确认文章文件和是否有其它页面链接到它。GitHub 网页打开该 Markdown 文件，在文件操作菜单选择 Delete file，再 Commit changes；本地可在 VS Code 删除并在 Source Control 暂存删除，或使用下面命令（路径替换为实际要删除的文章）：

```powershell
git rm -- _tech/my-new-post.md
git diff --cached --stat
git commit -m "Remove tech post"
git push origin main
```

删除后等待 [Actions](https://github.com/kaetowjj/kaetowjj.github.io/actions/workflows/pages.yml) 对该提交完成部署，确认集合列表不再包含此文章。旧 URL 将失效，不会自动重定向。配图可能被多篇文章共用，不要连目录一起删除；先核对引用，再单独清理不再使用的图片。Essays 使用相同流程，只需选择对应目录。

[← 返回 README](../README.md)
