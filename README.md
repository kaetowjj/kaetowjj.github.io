# Jerry's Engineering Lab：网站使用与维护手册

这是一份可以边看边操作的日常维护指南。网站使用 **Jekyll + GitHub Pages**，文章存放在 Markdown 文件中，摄影和个人资料存放在数据文件中；没有后台、登录或网页自动上传处理功能。

网站：[Engineering Lab](https://kaetowjj.github.io/) · [About](https://kaetowjj.github.io/about/) · [Photography](https://kaetowjj.github.io/photography/) · [Actions 部署记录](https://github.com/kaetowjj/kaetowjj.github.io/actions)

## 我要做什么？

以下路径均相对于仓库根目录。点击文件链接后可用铅笔按钮编辑；目录链接用于新增文件。

| 我想做什么 | 实际入口（GitHub 可点击） | 本手册步骤 |
| --- | --- | --- |
| 发表 Engineering Note | [_notes/](https://github.com/kaetowjj/kaetowjj.github.io/tree/main/_notes)；[文章模板](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/docs/templates/article.md) | [发布文章](#articles) |
| 发表 Essay | [_essays/](https://github.com/kaetowjj/kaetowjj.github.io/tree/main/_essays) | [发布文章](#articles) |
| 新增 Project | [_projects/](https://github.com/kaetowjj/kaetowjj.github.io/tree/main/_projects) | [发布文章](#articles) |
| 上传摄影作品 | [优化脚本](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/scripts/optimize-images.mjs)、[摄影数据](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_data/photography.yml)、[图片目录](https://github.com/kaetowjj/kaetowjj.github.io/tree/main/assets/photography) | [摄影完整流程](#photos) |
| 修改中英文内容 | 对应文章文件；[About 正文](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/about.md) | [中英文写作](#bilingual) |
| 修改默认语言 | [_config.yml](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_config.yml) 的 default_language | [网站设置](#settings) |
| 修改首页标题和介绍 | [_data/home.yml](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_data/home.yml) | [Homepage 个性化](#homepage) |
| 添加谐音梗和冷笑话 | [_data/quotes.yml](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_data/quotes.yml) | [Jerry's Silly Thoughts](#thoughts) |
| 调整白天 / 黑夜模式 | 右上角主题按钮；[配色 CSS](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/assets/css/main.css) | [Themes](#themes) |
| 修改个人资料 | [_data/profile.yml](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_data/profile.yml)、[about.md](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/about.md) | [个人资料](#profile) |
| 更换头像 | [assets/images/](https://github.com/kaetowjj/kaetowjj.github.io/tree/main/assets/images) 的 avatar.webp；[头像配置](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_data/profile.yml) | [头像](#avatar) |
| 修改邮箱 | [_data/profile.yml](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_data/profile.yml) 的 email | [公开联系邮箱](#email) |
| 查看部署状态 | [.github/workflows/pages.yml](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/.github/workflows/pages.yml)、[Actions](https://github.com/kaetowjj/kaetowjj.github.io/actions) | [部署与排错](#deploy) |

建议按“修改 → 本地预览或检查 → Commit → 等 Actions 成功 → 检查线上页面”的顺序操作。GitHub 的 Commit changes 只是保存源码，**不代表已经部署成功**。

<a id="articles"></a>
## 发布 Notes、Essays、Projects

### 2.1 先选择正确目录

| 类型 | 目录与参考文章 | 新文件名示例 | 发布后的 URL |
| --- | --- | --- | --- |
| Engineering Note | [_notes/](https://github.com/kaetowjj/kaetowjj.github.io/tree/main/_notes)；[现有笔记](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_notes/reproducible-data-workflows.md) | repeatable-data-task.md | https://kaetowjj.github.io/notes/repeatable-data-task/ |
| Essay | [_essays/](https://github.com/kaetowjj/kaetowjj.github.io/tree/main/_essays)；[现有随笔](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_essays/why-an-engineering-lab.md) | learning-in-public.md | https://kaetowjj.github.io/essays/learning-in-public/ |
| Project | [_projects/](https://github.com/kaetowjj/kaetowjj.github.io/tree/main/_projects)；[现有项目](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_projects/data-workflow-prototype.md) | batch-workflow.md | https://kaetowjj.github.io/projects/batch-workflow/ |

三个目录使用相同的文章布局和双语写法。Notes 适合问题、设计和实验；Essays 适合经历与思考；Projects 可按背景、技术栈、架构、方案比较、实现、实际测试结果、反思组织正文。它们不是必须填满的固定表单。

### 2.2 直接用 GitHub 网页发表（十步）

1. 登录 GitHub，进入上表中的目标目录，确认当前分支为 main。
2. 点击 **Add file → Create new file**。
3. 输入小写英文、数字和短横线组成的文件名，以 `.md` 结尾，例如 `repeatable-data-task.md`。直接在目录中创建时不要再重复输入 `_notes/`。
4. 打开[文章模板](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/docs/templates/article.md)，点击 Raw 复制原始 Markdown；也可复制下节完整示例。模板本身只有英文 description，中文摘要需自行补充 description_zh。
5. 修改文件顶部两条 `---` 之间的 Front Matter。真实文章移除示例的 `demo: true`，不要把 Demo 实验结论当作真实成果。
6. 在两个语言容器里分别填写英文和中文正文；保留容器前后的空行。
7. 点击 **Preview** 检查内容。GitHub 预览不能完整模拟 Jekyll、Liquid、双语切换或 MathJax，最终排版以本地或线上页面为准。
8. 点击 **Commit changes…**，填写说明（例如 Add note about repeatable data tasks），选择直接提交 main 并确认。如果界面要求创建分支/PR，提交 PR 后还需合并到 main 才会部署。
9. 打开 [Actions](https://github.com/kaetowjj/kaetowjj.github.io/actions)，找到对应提交的 **Build, test and deploy Engineering Lab**，等待 build 和 deploy 均成功。
10. 打开上表规则对应的线上 URL，切换语言检查标题、正文、目录、代码和公式。列表页也应出现新文章。

### 2.3 Front Matter 和 URL 的关系

| 字段 | 如何填写及真实行为 |
| --- | --- |
| title / title_zh | 英文/中文标题；中文标题为空时正文标题回退英文。文件名不随标题自动变化。 |
| description / description_zh | 列表中的英文/中文摘要；中文为空回退英文。HTML SEO description 当前使用 description，语言切换不会更新 head 元数据。 |
| date | 初次发布日期，建议 ISO 格式 YYYY-MM-DD；不是照片拍摄日期。 |
| updated | 最近实质修改日期；列表按它降序排列，因此每篇都建议填写。正文“更新于”缺省显示 date，但不要依赖这个显示回退来安排列表排序。 |
| category | 一个分类字符串，例如 Data Engineering；由文章集合自动汇总到筛选菜单，不需要修改摄影分类文件。 |
| tags | 字符串数组，例如 [pipelines, reproducibility]；列表可按单个标签筛选。不要在文章标签里使用分隔符竖线。 |
| math | 有公式时用 true；只在此类页面加载固定版本 MathJax CDN。 |
| changelog | 可选更新记录数组，含 date、en、zh；修改文章时手动维护，不会自动生成。 |
| demo | 仅示例用 true，页面显示 Demo 标识；真实文章删掉或设 false。 |

本仓库使用 Jekyll collections，不是 `_posts` 的日期命名规则。简单 ASCII 文件名的基本名称决定 `:name`，例如 `_notes/repeatable-data-task.md` 对应 `/notes/repeatable-data-task/`。修改 title、date、updated、category 或 tags 不改变该 URL；重命名/移动文件则可能改变 URL，旧链接不会自动重定向。无需给文件名加发布日期。示例 URL 只在创建并发布该文件后存在。

<a id="bilingual"></a>
## 完整可复制的双语文章

把下面**整个代码块内容**保存为 `_notes/repeatable-data-task.md`，不要把外层四个反引号也复制到文件。用于 Essay 或 Project 时只需放到相应目录并改内容。日期和标题均为示例，请自行填写真实值。

````markdown
---
title: "Making a Small Data Task Repeatable"
title_zh: "让一个小数据任务可重复执行"
description: "A minimal record of inputs, steps, and checks."
description_zh: "记录输入、步骤与检查的最小示例。"
date: 2026-11-03
updated: 2026-11-03
category: Data Engineering
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
- 右上角 **中文 / EN** 按钮立即切换，localStorage 保存偏好并跨页面保持。默认语言见[设置](#settings)。摄影 title/description/alt/location 等双语对象优先当前语言，再英文，再中文；建议仍完整填写。

### 用 VS Code + Git 长期写作

每次开始先打开项目目录并同步；如果本地已有未提交修改，先查看 status，妥善提交或暂存后再 pull，遇到冲突先处理，不要强制覆盖。

```powershell
git status
git pull --ff-only
Copy-Item ./docs/templates/article.md ./_notes/my-new-note.md
code ./_notes/my-new-note.md
```

Essay/Project 将复制目标换为 `./_essays/my-new-essay.md` 或 `./_projects/my-new-project.md`。在 VS Code 编辑、用 Markdown Preview 初查，再用 `bundle exec jekyll serve --livereload` 查看真实网站。

确认完成后（以下示例只提交这一篇笔记）：

```powershell
git diff -- _notes/my-new-note.md
git add -- _notes/my-new-note.md
git diff --cached
git commit -m "Add engineering note"
git push origin main
```

新文件在 git add 之前不会出现在普通 git diff 中，可在编辑器查看；git status 会列为 untracked。推送需已登录 GitHub 并有写权限，按 Git 的正常登录流程操作，不要把 token 或密码写进命令、文章或仓库。最后按上面的 Actions 与线上检查步骤验收。

### 编辑已发布文章与添加正文图片

在原文章的 GitHub 页面点铅笔 Edit this file，或在 VS Code 打开原文件。修改正文、updated 和可选 changelog，保持文件名可保留原 URL；填写 Commit changes，再检查 Actions 和线上文章。不要为一次小修新建重复文章。

文章配图不走摄影画廊导入：先导出合适尺寸、去除 EXIF/GPS 的 WebP，在 [assets/images/](https://github.com/kaetowjj/kaetowjj.github.io/tree/main/assets/images) 用 Add file → Upload files 上传，例如 note-diagram.webp；本地也可复制到此目录。示例文件需实际上传后才存在。在语言容器里写：

```markdown
![Diagram of the data workflow]({{ '/assets/images/note-diagram.webp' | relative_url }})
```

中文容器把 alt 改成“数据工作流示意图”。Markdown 图片不会自动压缩或去元数据。检查路径大小写，同时提交配图和文章：

```powershell
git add -- _notes/my-new-note.md assets/images/note-diagram.webp
git diff --cached --stat
git commit -m "Update note with illustration"
git push origin main
```

<a id="homepage"></a>
## 如何维护个人首页？ / Homepage

打开 [_data/home.yml](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_data/home.yml) 编辑；所有长文案在这里，不放入 profile.yml 的短 intro。首页呈现持续探索的个人，不使用职业头衔或一排技术标签定义作者；AI 基础设施是当前兴趣，不是固定身份。

首页顺序为 Hero → What I'm Exploring / 我在探索什么 → Beyond Engineering / 工程之外 → Recent Notes → Projects / Photography → Jerry's Silly Thoughts。

| 字段 | 修改内容 |
| --- | --- |
| eyebrow.en / zh | 小号说明。 |
| headline.en / zh | 主标题：Still branching out. / 还在探索，也还在生长。 |
| hero.en / zh | Hero 两段完整个人介绍，保留 About 入口；不再使用 subtitle、intro 或 disciplines 字段。 |
| exploring.title.en / zh | 探索方向章节标题。 |
| exploring.en / zh | AI、数据工程、架构决策与技术品味的完整段落。 |
| beyond.title.en / zh | 工程之外章节标题。 |
| beyond.en / zh | 野生动物、摄影、环境与自我认知等段落。 |

长正文使用 YAML 的竖线块；每行相对字段多缩进两个空格，空行分隔段落。不要改成大于号折叠块。普通 Markdown 的 **加粗**、*强调* 与段落会由 Jekyll markdownify 解析；不要给这些长段落加 data-en/data-zh 属性或重复粘贴到 profile.yml。

以下 Hero 是可复制的完整配置片段；只替换文件内对应字段，保留其它 exploring、beyond 字段：

```yaml
headline:
  en: "Still branching out."
  zh: "还在探索，也还在生长。"
hero:
  en: |
    I don't want to be defined by a job title, a field, or a single version of myself.

    I'm more interested in following questions, building things, and figuring out what matters to me along the way.
  zh: |
    我不想被某个职业头衔、某个技术领域，或者某个阶段的自己所定义。

    比起急着回答「我是什么样的人」，我更愿意跟着真正感兴趣的问题走，动手做点东西，再慢慢弄清楚什么对自己重要。
```

What I'm Exploring 与 Beyond Engineering 的 en/zh 正文使用同样的竖线写法，直接编辑相应语言段落即可。About 姓名、头像和简短个人介绍仍在 profile.yml，与首页长文案独立。

保存后 Commit changes；本地则 git add _data/home.yml、commit、push。等待 Actions 的 build/deploy 成功后检查双语加粗、段落及手机换行，无需处理照片。站点统一名称仍由 _config.yml 的 title 控制页眉和版权信息，Hero 主标题是独立的个人表达。

<a id="thoughts"></a>
## How to Manage Jerry's Silly Thoughts

**Curated, Not Generated. 收藏真实短句，不生成笑话充数。** 入口是 [_data/quotes.yml](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_data/quotes.yml)。冷笑话、中文谐音、英文 puns、双关、荒诞短句都可以，不要求与技术相关。网站只展示收藏，不联网抓取、不调用翻译 API、不自动把 Hero 或普通技术文案加入收藏。

当前完整数据如下，可复制结构维护；personal_collection 表示用户提供的个人收藏，**不声称为作者原创**，不编造作者、点赞数或来源：

```yaml
- id: chocolate
  text: "以柔克刚，以巧克力。🍫"
  lang: zh
  placement: both
  source_type: personal_collection
  source_url:
  author:
```

### 添加、修改和删除收藏

1. 在 quotes.yml 点 Edit。新增时在末尾照上面结构追加一个以 - id 开始的对象，保留旧记录；不要覆盖整份文件。给新条目取唯一的英文短横线 ID。
2. 将用户提供或已核实的原句原样填入 text。含引号或冒号时注意 YAML 转义。使用双引号包裹时，内部双引号需加反斜线；使用单引号时，内部单引号需写成两个单引号。
3. lang 填 zh、en；混合句可填主要语言或 und。这个字段只用于语义和屏幕阅读器，不按网站语言过滤。中文不生成英文对应版，英文不翻译成中文；切换 UI 不会更换当前收藏。
4. placement 填 home、footer 或 both。首页加载随机选一条，多条时 Shuffle 换另一条，不自动轮播；单条隐藏 Shuffle，空集合隐藏模块。首页两处避免重复：仅一条 both 时只在首页正文显示，其它页面 Footer 仍可显示。
5. 来源和作者按下表填写。修改时编辑原对象；删除时删除对应完整对象，保持其它条目不变。核对所有 ID 唯一和 placement 拼写。
6. Commit changes，或本地提交 _data/quotes.yml 后 push。等 Actions 成功，再打开首页、About 等其它页面检查原句语言、显示位置、来源和键盘 Shuffle。仅一条时无法真正换句是预期行为。

| 字段 | 含义与填写要求 |
| --- | --- |
| id | 唯一标识。重复或无效记录会被展示层忽略，不应依赖忽略行为整理数据。 |
| text | 原文纯文本；不支持嵌入 HTML，标签按文字显示。 |
| lang | 原文语言标记，仅提供语义，不影响 UI 语言和随机范围。 |
| placement | home：仅首页；footer：仅全站 Footer；both：两处均可。拼错/不填不会展示。 |
| source_type | personal_collection、reddit、tieba、douban 等；不表示网站已自动验证出处。 |
| source_url | 可选真实完整 HTTP(S) 原帖链接。个人提供且无原帖时留空；网络引用应保存可核实原帖。相对路径、脚本地址或含账号密码的 URL 不会成为链接。 |
| author | 已核实原作者，可选；不知道留空，不要填 Jerry 暗示所有收藏为原创。 |

### 保存 Reddit、贴吧等真实来源

先在浏览器打开原帖，核实对应原句。Reddit 可用 Share → Copy link，贴吧复制具体贴文地址。将实际复制的完整地址粘贴到 source_url（可用引号包裹），source_type 填 reddit 或 tieba；作者已核实且适合公开时再填 author。社区首页/搜索结果不替代具体原帖。打不开或无法核实时，不作为“已验证社区内容”发布，可暂存在个人笔记等待确认。本指南不提供虚构的示例原帖地址。

优先短句或简短语言双关，不批量复制长篇原创段子；较长内容更适合自己的简短摘要和原帖链接。不要把 AI 生成的摘要/笑话当成社区原句，不能冒充原作者。URL 检查只验证格式/协议，**不会自动验证作者、版权或出处真实性**，这些仍需收藏者确认。当前唯一初始内容由用户给定，没有虚构网络来源。

<a id="photos"></a>
## 摄影作品：从原片到线上画廊

当前 [_data/photography.yml](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_data/photography.yml) 虽然扩展名是 yml，内容实际为 **JSON 数组**；分类和标签文件是 **JSON 对象**。JSON 可由 Jekyll 的 YAML 读取器处理。本手册统一保留现有 JSON 写法，这样 Node 的 JSON 校验和现有 Demo 脚本都适用。不要混用 YAML 的短横线写法与 JSON 逗号。

### A. 准备本次要上传的照片

1. 在 Lightroom、相机软件等工具中先将 RAW 导出为 JPEG、PNG、TIFF、WebP 或 AVIF。脚本支持 `.jpg/.jpeg/.png/.tif/.tiff/.webp/.avif`（不区分大小写）；RAW 不在支持列表内，会被跳过，不会自动冲洗。原片很大且包含私密元数据，不应直接放入公开网页仓库。
2. 使用唯一、可读的英文文件名，例如 `garden-20261012-01.jpg`。脚本会去扩展名、转小写、把非 a-z/0-9/下划线/短横线字符替换成短横线作为 ID。中文名或不同符号可能归一化到相同 ID，因此不推荐。
3. 将**本次新增**照片放在仓库根目录的 [originals/](https://github.com/kaetowjj/kaetowjj.github.io/tree/main/originals)。脚本仅处理该目录第一层，不递归子目录。可在资源管理器复制文件，也可用下方 PowerShell 命令。
4. [.gitignore](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/.gitignore) 忽略 originals/*，只有 .gitkeep 被保留；这让普通 git add 不提交原图。它不加密、不备份文件，也不能让已经被跟踪的文件自动消失。不要使用 git add -f 强行提交原图。指定仓库外的输入目录时，原图也不会被复制到仓库。
5. 同一次运行会检查归一化 ID 是否重复，但**不会检查现有画廊或上次生成的文件**。同一个 ID 再运行会覆盖对应 WebP。jpg 和 png 即使扩展名不同，同一基本文件名也会冲突。请先在 photography.yml 搜索 ID，给新照片选择全站唯一名称；更新同一真实作品时才有意复用 ID。

### B. 自动生成网页图片（PowerShell）

在项目根目录执行，`npm ci` 首次或依赖改变后运行即可，不需要 Ruby 就能处理照片：

```powershell
npm ci
New-Item -ItemType Directory -Force ./originals | Out-Null
Copy-Item "D:\Photos\Exports\garden-20261012-01.jpg" ./originals/
npm run images
```

上面的 D 盘路径是示例，换成真实照片路径。也可直接处理其他文件夹（带空格的路径保留引号）：

```powershell
npm run images -- "D:\Photos\This Batch"
```

脚本会处理输入文件夹中所有受支持文件。保留在 originals 中的旧照片下次也会重新处理，导入清单也会重新生成；建议每批完成后把输入照片移到个人备份目录，或为每批指定单独文件夹。先检查 ID 和文件名再运行：脚本不是原子事务，处理中途失败可能已写出部分图片。

| 输出 | 用途与实际生成规则 |
| --- | --- |
| `assets/photography/<id>.webp` | Lightbox 大图；最长边不超过 2000px，保持比例且不放大小图，WebP quality 85。 |
| `assets/photography/thumbs/<id>.webp` | 画廊缩略图；目标宽 480px，不放大小图，因此不一定恰为 480px，quality 78。 |
| `assets/photography/responsive/<id>-960.webp` | 当处理后的大图宽度大于 960px 时才生成的 960px 宽版本，quality 83。 |
| `photography-import.json` | 本次运行的元数据对象数组；每次运行覆盖这个清单，**不会合并到画廊**。本文件也被 Git 忽略。 |

大图与缩略图/响应式版本用途不同：浏览器根据 srcset 和屏幕选择画廊图片，点击后加载 image 大图。脚本生成 srcset 时只加入比大图窄的 480/960 版本及大图自身；小图不会凭空生成更大版本。由脚本产生的路径和宽高请保留原样。

脚本使用 Sharp 的 rotate() 读取方向后旋转，输出不保留 EXIF（包括 GPS），原始文件不被修改。它不从 EXIF 自动填写日期、器材或地点。文字元数据也不要公开敏感物种精确坐标；原片仍需自己备份。

<a id="merge"></a>
### C. photography-import.json 到底怎样放进 photography.yml？

**不是直接复制整个文件去覆盖。** 只有你明确决定丢弃全部旧记录、完全重新建立画廊时，替换整个数组才有意义；而且导入清单仍需补齐真实元数据。日常新增需要**手动把新对象追加进已有数组**，当前没有自动合并命令或网页导入按钮。

具体操作：

1. 先备份 [_data/photography.yml](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_data/photography.yml)。不要在上次清单未处理完时再次运行脚本。
2. 用 VS Code 同时打开 photography-import.json 和 _data/photography.yml。
3. 清单最外层 `[ ]` 表示“本次所有记录的数组”；里面每个 `{ }` 是一张照片。先核对 ID：已在画廊存在的跳过；有意更新旧照片则编辑原对象，不要再追加一份。
4. 复制新对象（包含其 { }，**不复制最外层 [ ]**），在旧数组最后一个对象后加一个逗号，再粘贴新对象到旧数组最后的 `]` 之前。
5. 多个新对象之间用逗号，最后一个对象后面**不能有尾逗号**。最终整个文件只有一对最外层 [ ]。JSON 使用英文双引号，不支持注释。
6. 保留所有原有对象；补齐新记录的标题、alt、真实 date、分类与标签，下面示例演示整个过程。
7. 运行格式/ID 检查和本地预览后再提交。保留备份直到线上确认。

备份命令（在工作区外放一份，避免误提交备份）：

```powershell
Copy-Item ./_data/photography.yml ../photography.backup.json
```

**三个完整示例**：下面是假设已有一张 river、本次导入一张 garden 的教学数据，不是你的真实作品，也不是当前仓库完整数据。假设两张导出图均为 1200×800；实际导入必须使用自己脚本生成的宽高与路径。

**导入前：_data/photography.yml**

```json
[
  {
    "id": "river-20261001-01",
    "image": "/assets/photography/river-20261001-01.webp",
    "thumbnail": "/assets/photography/thumbs/river-20261001-01.webp",
    "width": 1200,
    "height": 800,
    "srcset": [
      {
        "src": "/assets/photography/thumbs/river-20261001-01.webp",
        "width": 480
      },
      {
        "src": "/assets/photography/responsive/river-20261001-01-960.webp",
        "width": 960
      },
      {
        "src": "/assets/photography/river-20261001-01.webp",
        "width": 1200
      }
    ],
    "title": {
      "en": "River at dawn",
      "zh": "黎明的河流"
    },
    "description": {
      "en": "A quiet river.",
      "zh": "安静的河流。"
    },
    "alt": {
      "en": "River reflecting morning light",
      "zh": "河面映着晨光"
    },
    "date": "2026-10-01",
    "category": "landscape",
    "tags": [
      "nature"
    ]
  }
]
```
**本次脚本输出：photography-import.json（尚未填写元数据）**

```json
[
  {
    "id": "garden-20261012-01",
    "image": "/assets/photography/garden-20261012-01.webp",
    "thumbnail": "/assets/photography/thumbs/garden-20261012-01.webp",
    "width": 1200,
    "height": 800,
    "srcset": [
      {
        "src": "/assets/photography/thumbs/garden-20261012-01.webp",
        "width": 480
      },
      {
        "src": "/assets/photography/responsive/garden-20261012-01-960.webp",
        "width": 960
      },
      {
        "src": "/assets/photography/garden-20261012-01.webp",
        "width": 1200
      }
    ],
    "title": {
      "en": "[Title]",
      "zh": "[标题]"
    },
    "description": {
      "en": "",
      "zh": ""
    },
    "alt": {
      "en": "[Describe the image]",
      "zh": "[描述画面]"
    },
    "date": null,
    "category": "other",
    "tags": []
  }
]
```
**合并并填写后：_data/photography.yml（旧记录保留，新对象追加）**

```json
[
  {
    "id": "river-20261001-01",
    "image": "/assets/photography/river-20261001-01.webp",
    "thumbnail": "/assets/photography/thumbs/river-20261001-01.webp",
    "width": 1200,
    "height": 800,
    "srcset": [
      {
        "src": "/assets/photography/thumbs/river-20261001-01.webp",
        "width": 480
      },
      {
        "src": "/assets/photography/responsive/river-20261001-01-960.webp",
        "width": 960
      },
      {
        "src": "/assets/photography/river-20261001-01.webp",
        "width": 1200
      }
    ],
    "title": {
      "en": "River at dawn",
      "zh": "黎明的河流"
    },
    "description": {
      "en": "A quiet river.",
      "zh": "安静的河流。"
    },
    "alt": {
      "en": "River reflecting morning light",
      "zh": "河面映着晨光"
    },
    "date": "2026-10-01",
    "category": "landscape",
    "tags": [
      "nature"
    ]
  },
  {
    "id": "garden-20261012-01",
    "image": "/assets/photography/garden-20261012-01.webp",
    "thumbnail": "/assets/photography/thumbs/garden-20261012-01.webp",
    "width": 1200,
    "height": 800,
    "srcset": [
      {
        "src": "/assets/photography/thumbs/garden-20261012-01.webp",
        "width": 480
      },
      {
        "src": "/assets/photography/responsive/garden-20261012-01-960.webp",
        "width": 960
      },
      {
        "src": "/assets/photography/garden-20261012-01.webp",
        "width": 1200
      }
    ],
    "title": {
      "en": "Garden light",
      "zh": "花园里的光"
    },
    "description": {
      "en": "Sunlight through leaves.",
      "zh": "阳光穿过树叶。"
    },
    "alt": {
      "en": "Green leaves lit by afternoon sunlight",
      "zh": "午后阳光照亮绿叶"
    },
    "date": "2026-10-12",
    "category": "landscape",
    "tags": [
      "nature"
    ],
    "location": {
      "en": "A local park",
      "zh": "附近公园"
    }
  }
]
```

注意两对象之间的 `},`；最后一个对象以 `}` 结束，然后才是数组的 `]`。不要把摄影数组粘贴到分类/标签对象文件里。

验证 JSON 可解析且 ID 唯一（只检查，不合并、不改写文件）。以下临时脚本方式同时适合 Windows PowerShell 5.1 和新版 PowerShell，避免外部程序引号传递差异：

```powershell
$checkFile = Join-Path $env:TEMP 'engineering-lab-check-photos.cjs'
@'
const fs = require('node:fs');
const photos = JSON.parse(fs.readFileSync('_data/photography.yml', 'utf8'));
if (!Array.isArray(photos)) throw new Error('Expected a JSON array');
const ids = photos.map(photo => photo.id);
if (ids.some(id => typeof id !== 'string' || !id) || new Set(ids).size !== ids.length) {
  throw new Error('Missing or duplicate photo ID');
}
for (const name of ['photo_categories', 'photo_tags']) {
  JSON.parse(fs.readFileSync('_data/' + name + '.yml', 'utf8'));
}
console.log('JSON and IDs OK:', photos.length);
'@ | Set-Content -LiteralPath $checkFile -Encoding UTF8
node $checkFile
```

若显示 SyntaxError，按报错位置检查英文逗号、引号和括号；此校验不能证明路径、日期、分类引用或宽高正确，仍需预览。它要求保持现有 JSON 写法。不要用 PowerShell 的默认文本输出方式随意重写数据文件，以免引入编码变化。

**删除 Demo**：先备份，再从摄影数组中只删除已确认是示例的对象。历史示例 ID 为 demo-01 到 demo-08（当前真实作品不再依赖这些 Demo）；通过标题里的 Demo 和 description 再核对一次，不要按位置批量删除真实对象。修正相邻逗号并验证。只移除元数据，画廊就不会再展示它们；对应图片可暂时保留。清理 Demo 图片前确认没有任何真实记录的 image、thumbnail、srcset 仍引用这些文件。不要删除整个 assets/photography 目录。

### D. 每张照片字段怎样填？

| 字段 | 谁生成/谁填写 | 说明 |
| --- | --- | --- |
| id | 脚本生成，作者核对唯一性 | 由文件名归一化产生；避免和已发布作品重复。同日排序以 ID 为稳定次级规则。 |
| image | 脚本生成 | Lightbox 大图的站点绝对路径，以 /assets/ 开头；不是 originals 路径或 D 盘路径。 |
| thumbnail | 脚本生成 | 小图路径；和 image 一起提交对应文件。 |
| srcset | 脚本生成 | 数组，每项含 src（图片路径）、width（像素宽度）；不是 HTML 字符串，不要手改成英文逗号分隔的一行。 |
| width / height | 脚本生成 | 优化后大图像素尺寸，已考虑方向；布局依据其比例，不是 CSS 显示尺寸。 |
| title.en / title.zh | 作者填写 | 英文/中文标题，替换 [Title] / [标题]。 |
| description.en / description.zh | 作者填写，可留空 | 简短作品说明；不是自动识别出的场景。 |
| alt.en / alt.zh | 作者填写 | 用文字描述画面供屏幕阅读器使用，不要只写“图片”或文件名。 |
| date | 脚本固定输出 null，作者确认 | 必须依据真实拍摄日期填写字符串如 "2026-10-12"；无法确认就保留 null，不能写上传日或猜测日期。 |
| location | 作者可选添加 | 支持字符串或 {"en":"A local park","zh":"附近公园"}；只写适宜公开的粗略地点。 |
| category | 作者选择 | 脚本默认 other，必须对应 photo_categories.yml 中一个 ID。每张照片一个主要分类。 |
| tags | 作者选择，可为 [] | 字符串数组，可选多个 ID；对应 photo_tags.yml。与 Category 独立。 |
| camera / lens | 作者可选添加 | 相机、镜头说明字符串；不会从 EXIF 自动填写。 |
| focal_length / aperture / shutter_speed | 作者可选添加 | 例如 "50mm"、"f/4"、"1/250"；根据真实参数填写，不知道就省略。 |
| iso | 作者可选添加 | 例如 400；键名是小写 iso，界面显示 ISO。以上器材项缺失/为空会隐藏。 |

日期支持 Newest first / Oldest first，不刷新页面；缺失/不可解析日期最后，同日按 ID 升序。筛选保留当前排序，Lightbox 依照当前筛选和排序结果前后浏览。不要为让照片排前面伪造拍摄日期。

### E. 分类和标签管理

打开 [photo_categories.yml](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_data/photo_categories.yml) 与 [photo_tags.yml](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_data/photo_tags.yml)。它们是按 ID 映射双语名称的对象，不是照片数组。

- **选分类**：在照片对象写 `"category": "wildlife"`。现有分类有 wildlife、landscape、street、travel、other；All/全部由界面自动提供，不要为照片写 category=all。
- **多个标签**：写 `"tags": ["birds", "nature"]`。空标签写 `[]`。必须使用映射键 ID，不是显示文字 Birds 或 鸟类。
- **新增分类**：在分类文件最后一个键值后加逗号，追加例如下面一项（仅复制花括号内部的键值，保留原有其它分类）：

```json
{
  "architecture": { "en": "Architecture", "zh": "建筑" }
}
```

- **新增标签**：同样在标签文件中追加一项，例如：

```json
{
  "wetland": { "en": "Wetland", "zh": "湿地" }
}
```

- 然后给照片设置 `"category": "architecture"` 或在 tags 里加 `"wetland"`。重新构建后，分类按钮和标签下拉菜单会从映射自动生成，即使还没有照片使用该映射也会显示。无需修改 HTML。
- **只改显示名称**：保持键名 ID 不变，只修改 en/zh。例如把 Wetland 改为 Wetlands 不需要修改照片；若重命名 ID，必须同步更新所有引用。
- 分类和标签可组合，取交集。某个分类+标签没有交集时显示空结果；这并不说明上传失败，可先点 Clear filters/清除筛选。

### 摄影 ID 规范与发布前验证

**Category ID 和显示名称不是同一回事。** 错误：`"category": "Street"`；正确：`"category": "street"`。显示文字 Street / 街头在 photo_categories.yml 中维护。Tag 同样使用小写英文 kebab-case：例如 people、street、daily-life，而不是 People、Street、Daily Life。Category 与 Tag 是独立映射，照片可同时 category=street、tags 包含 street。

当前真实作品保留原 ID、图片路径、标题、描述、alt、拍摄日期和尺寸；仅将分类规范为 street、标签规范为 people / street / daily-life，补齐其双语显示名。新增内容时先定义映射再引用，不会自动纠正或默默吞掉拼错的 ID。

在仓库根目录运行（无需先构建网页）：

```powershell
node scripts/check-photography.mjs
```

或运行完整检查（需先构建 _site）：

```powershell
bundle exec jekyll build --strict_front_matter
npm run check:site
```

check:site 已自动包含同一摄影校验。校验检查 category/tag 引用及大小写、taxonomy ID 格式和双语显示名、重复照片 ID、必要字段、尺寸、日期、srcset 与本地图片文件；当前摄影数据和 taxonomy 文件保持 JSON 语法。错误会包含照片 ID、字段与修复建议，例如：Photo dsc_6047 / category: unknown/noncanonical ID "Street"; use "street"。校验只提示，不修改原片或元数据。

本地预览 Photography 后点击 Street、Wildlife、All；分别选择 Tag、组合筛选、切换语言与正反时间排序，打开 Lightbox 检查前后顺序，再点 Clear filters。没有 Wildlife 作品时应为空状态；这与失效不同。自动端到端测试也会真实点击这些控件，依据当前作品计算预期结果。

### F. 提交发布与排查

完成合并、填元数据并通过检查后，提交生成的图片和数据；只在改过分类/标签时提交相应映射文件：

```powershell
git status
git add -- assets/photography _data/photography.yml _data/photo_categories.yml _data/photo_tags.yml
git diff --cached --stat
git diff --cached -- _data/photography.yml _data/photo_categories.yml _data/photo_tags.yml
git commit -m "Add photography batch"
git push origin main
```

不要提交 originals、photography-import.json、node_modules 或 _site。生成图片只是本地文件，不会自动上传；数据和图片都需要 git add、commit、push。之后查看 Actions、打开 Photography，清除旧筛选，检查标题、日期、比例、双语和 Lightbox。

仅有 GitHub 网页时，也必须先在本地完成脚本处理：在 [assets/photography/](https://github.com/kaetowjj/kaetowjj.github.io/tree/main/assets/photography) 点 Add file → Upload files 上传大图；在 thumbs/、responsive/ 的对应目录上传相应文件（需要新目录时可用本地 Git）。编辑 photography.yml 合并数据，再提交映射变更。网页上传**不会执行本地优化脚本**。分多次提交时可能短暂出现图片/数据不匹配，批量图片推荐使用本地 Git 一次提交。

| 问题 | 按顺序检查 |
| --- | --- |
| 图片 404 | image、thumbnail、每个 srcset.src 对应的 WebP 是否已提交？大小写是否完全相同？路径是否 /assets/photography/…？能否直接打开线上图片 URL？等待对应提交 deploy 成功再强制刷新。 |
| 新照片未出现 | 是否只运行了脚本却没合并清单？是否误覆盖/未保存 photography.yml？是否推送 main？清除分类与 Tag 筛选，检查排序；date=null 的照片在最后。 |
| 分类/标签不显示 | 是否在对应映射文件添加并提交了 ID/en/zh？照片使用的键名大小写是否一致？两套映射不要混淆。文章分类与摄影分类也不共用文件。 |
| JSON 格式错误 | 检查尾逗号、缺失逗号、引号、[]/{}；运行上面的 Node 校验，编辑器选择 JSON 语言模式可辅助检查。 |
| 图片变形或布局比例错误 | width/height 是否等于处理后的真实尺寸？是否手动替换 WebP 后没更新数据？重新处理并核对元数据；不要填原始 RAW 尺寸或随意写显示尺寸。 |
| Actions 构建/测试失败 | 打开本次提交失败步骤日志；先修复首个明确错误。JSON 错误可能导致 Jekyll 失败或画廊脚本异常，未提交图片也可能表现为浏览器测试失败。不要只根据 Commit 成功判断上线。 |

<a id="profile"></a>
## About、个人资料、邮箱与头像

主要入口：[profile.yml](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_data/profile.yml)、[about.md](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/about.md)。profile 中的 intro 现在只用于 About 顶部；首页简介单独由 _data/home.yml 的 intro 管理；教育、工作经历、兴趣及联系说明在 about.md 的英文/中文容器中分别维护，保留现有 include 与 script 标签。

profile.yml 是普通 YAML，**用空格缩进，不用 Tab**。以下仅为填写示例，请用自己的真实资料替换；当前公开联系邮箱使用已确认的 Outlook 别名 hi.jerrywong@outlook.com；姓名、简介等请换为自己的真实资料：

```yaml
name:
  en: "Your Name"
  zh: "你的姓名"
intro:
  en: "I write about data engineering and systems."
  zh: "我记录数据工程与系统实践。"
email: "hi.jerrywong@outlook.com"
linkedin: "https://www.linkedin.com/in/your-profile/"
github: "https://github.com/kaetowjj"
avatar:
  src: "/assets/images/avatar.webp"
  position: "center 35%"
  alt:
    en: "Portrait of Your Name"
    zh: "你的个人头像"
  initials:
    en: "YN"
    zh: "名"
```

- name 控制 About 头像旁姓名；intro 控制顶部简介。教育与经历没有结构化履历数据库，直接在 about.md 替换占位内容即可。
- github 与 linkedin 配置字段保留供未来使用，但当前 Footer 不显示 GitHub、LinkedIn 等社交入口。About 联系区只显示邮箱。留空请写 `linkedin: ""`，不要删除键或填一个假地址。

<a id="email"></a>
### 公开联系邮箱

当前 email 为 **hi.jerrywong@outlook.com**。email 非空时，仅 About 联系区域由此字段生成 mailto 联系链接，Footer 不显示联系入口；不涉及 Git 提交邮箱或账号登录设置。留空 `email: ""` 可隐藏 About 中该链接；About 正文中的联系说明需要自己相应修改。

**建议使用专门的公开联系别名**，不要公开私人主邮箱。仓库及网站是公开的；不要把邮箱密码、验证码、GitHub token、相机云服务凭据或其它账号秘密写入任何文件。把别名写入 email 不会自动在邮箱服务商处创建它，须先确认该别名已配置并可收信。

<a id="avatar"></a>
### 更换圆形头像与调整焦点

1. 把照片导出为适合网页的 WebP，建议约 512px、sRGB，导出时移除 EXIF/GPS。头像组件只负责显示裁剪，**不会优化文件或剥离 EXIF**。
2. 在本地将其保存为 `assets/images/avatar.webp`；或者打开 [assets/images/](https://github.com/kaetowjj/kaetowjj.github.io/tree/main/assets/images) → Add file → Upload files，上传同名文件并提交。已有同名文件时确认是有意替换。
3. 默认路径不变时无需改 HTML/CSS；在 profile.yml 编辑双语 alt 和 initials。initials 是手动配置，不会根据姓名自动生成。
4. 默认 `position: "center 35%"` 对应 CSS object-position；圆形区域使用 object-fit: cover，不拉伸。可从 center、center 35%、center 50% 等值试起，通过预览调整人物眼睛与脸部位置。
5. 桌面头像直径 176px，手机 128px；图片缺失、src 为空或加载失败时显示首字母占位，不显示破图图标。替换后等待部署并强制刷新；若缓存持续，可改成 avatar-v2.webp 并同步更新 src。

不要把头像原图放入公开仓库后再假定页面裁剪等于隐私保护：下载者仍可取得整个原文件。无需运行摄影的批处理脚本来更换头像，该脚本输出到摄影目录并生成摄影清单。

<a id="settings"></a>
## 网站设置：哪些改数据，哪些要改模板？

| 需求 | 修改位置 | 只改数据即可？ |
| --- | --- | --- |
| 默认界面语言 | [_config.yml](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_config.yml)：default_language 为 en 或 zh | 是；重新构建，本地需重启 Jekyll。 |
| 首页文案与专业标签 | [_data/home.yml](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_data/home.yml) | 是；不随机改变主标题。 |
| 收藏短句及显示位置 | [_data/quotes.yml](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_data/quotes.yml) | 是；保留原文，不自动翻译。 |
| 个人资料、头像、公开邮箱 | [_data/profile.yml](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_data/profile.yml)；履历正文在 [about.md](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/about.md) | 资料/头像改数据，履历改 Markdown。 |
| 摄影、分类、标签 | [_data/](https://github.com/kaetowjj/kaetowjj.github.io/tree/main/_data) 对应三个摄影数据文件 | 是；同时提交相关图片。 |
| 导航名称、链接和顺序 | [_data/navigation.yml](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_data/navigation.yml) 的 id/url/en/zh | 是；添加菜单不会自动创建目标页面，新增页仍需单独创建。 |
| 主题颜色 | [assets/css/main.css](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/assets/css/main.css) 的 :root 与 html[data-theme=dark] 变量 | 需修改 CSS；重点是 --bg、--surface、--text、--muted、--line、--accent、--code。 |
| SEO 站名、站点说明及发布地址 | [_config.yml](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/_config.yml) 的 title、description、url、baseurl | 配置部分是；可见文字另见下文。 |
| 页眉/页脚站名、Hero 与正文 | _config.yml 的 title；_data/home.yml 的 headline/hero | 站名统一读 title；Hero 独立配置，Footer 仅保留版权和彩蛋。 |

### 默认语言与个人偏好

在 _config.yml 找到并修改 `default_language: zh`，其它配置保持不变。它控制首次访问的页面语言；**浏览器已保存的 lab-language 偏好优先**，因此已有访客可能仍看到英文。右上角切换即可；若要测试真正的首次默认状态，使用新的隐私浏览窗口。`lang: en` 是另一项站点配置，不替代 default_language；RSS 等插件可能读取站点语言元数据，可按站点主语言一并检查。当前为单 URL 双语，canonical 不因切换语言改变，head 中标题/description 也不是按语言即时切换的。

<a id="themes"></a>
### Light / Dark / System

无需修改配置即可使用右上角主题按钮，循环顺序为 System → Light → Dark → System。首次跟随系统，选择后本地保存；System 会实时响应操作系统明暗变化。清除站点存储会清除语言、主题和照片排序偏好。需要改配色才编辑 CSS Variables，同时检查两个主题中的表格、代码、文字对比和 prefers-reduced-motion。

### 站名、副标题与地址

_config.yml 的 title 当前为 Jerry's Engineering Lab，控制默认浏览器站名、Open Graph 站名、页眉 wordmark 与页脚版权站名；页眉和页脚均读取 site.title，避免硬编码不一致。首页 Hero 的 headline 是独立的个人表达，无需与站名相同。Footer 只保留版权与 Jerry 的收藏彩蛋，已移除旧标语及 Email、GitHub、RSS、LinkedIn 可见入口；RSS Feed 与 head 元数据仍然保留。

当前发布根地址为 `https://kaetowjj.github.io`，baseurl 为 `""`。这是用户主页仓库，不需要在 URL 中加仓库名。若未来迁移成项目子路径站点，需要同步调整 url/baseurl 并检查所有资源；日常写文章、上传图片无需改它们。时区配置为 Asia/Shanghai。

<a id="deploy"></a>
## GitHub Actions 部署与故障排查

[工作流文件](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/.github/workflows/pages.yml)是真实执行依据。它在推送 main、提交 PR 或手动 workflow_dispatch 时运行；PR 只构建测试，合并/推送 main 后才执行部署。流程为：安装 Ruby/Node 与依赖 → npm test → Jekyll 生产构建 → 资源检查 → 安装 Chromium → 浏览器测试 → 打包 → deploy。

### 在 GitHub 查看本次发布

1. 打开 [Actions](https://github.com/kaetowjj/kaetowjj.github.io/actions/workflows/pages.yml)，选择 **Build, test and deploy Engineering Lab** 对应的提交。核对提交说明/commit SHA，别看到了更早的成功记录。
2. 展开 build；若红叉，点失败的具体步骤，阅读第一处实际错误。
3. build 成功后还要等待 deploy 成功，才打开网站检查。频繁提交可能取消前一个运行，以最新提交为准。
4. 手动触发：该工作流页面的 **Run workflow → main → Run workflow**（需写权限）；修复源码后新提交也会自动重跑。
5. 仓库 [Settings → Pages](https://github.com/kaetowjj/kaetowjj.github.io/settings/pages) 的 **Build and deployment → Source** 应选 **GitHub Actions**。若仍是 Deploy from a branch，可能出现额外的 “pages build and deployment” 运行；切换后可避免分支流程绕过本工作流的测试和重复发布。本手册并不代表已代你修改后台设置。

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

- [AGENTS.md：架构与修改约束](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/AGENTS.md)。
- [原始 V2 需求](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/docs/requirements-v2.md)、[实施记录](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/docs/superpowers/plans/2026-11-02-engineering-lab.md)、[历史验收记录](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/docs/validation.md)；历史记录不是最新提交的测试状态，最新结果看 Actions。
- [Gemfile](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/Gemfile) / [package.json](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/package.json)：依赖与实际命令。
- [布局](https://github.com/kaetowjj/kaetowjj.github.io/tree/main/_layouts)、[语言/主题脚本](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/assets/js/site.mjs)、[画廊交互](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/assets/js/gallery.mjs)、[画廊纯逻辑](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/assets/js/gallery-core.mjs)、[About 头像脚本](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/assets/js/about-avatar.mjs)。
- [Demo 图片生成脚本](https://github.com/kaetowjj/kaetowjj.github.io/blob/main/scripts/demo-images.mjs) 对应 npm run demo:images，只用于原始 Demo 数据恢复，**不要在已放真实照片的数据上运行**；它按记录数量/尺寸生成占位图且会覆盖固定 Demo 文件，不是日常照片导入或自动补图命令。
- 官方参考：[Jekyll](https://jekyllrb.com/docs/)、[GitHub Pages 自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

<a id="routine"></a>
## 推荐的日常维护方式

| 工具 | 适合做什么 | 完成后确认什么 |
| --- | --- | --- |
| GitHub 网页 | 偶尔改字、更新一篇短文章、调整一项资料 | Commit 的分支、Actions 结果、线上页面。 |
| VS Code + Git | 长期双语写作、本地预览、批量照片处理、核对 JSON 合并差异 | 只提交需要的文件，保留原图备份，检查 staged diff。 |
| Codex | 批量辅助整理内容、修改网站功能、调整硬编码到 Demo 的测试、诊断构建问题 | 人工确认事实、拍摄日期、版权及公开隐私；要求提供真实检查结果。 |
| GitHub Actions | 对提交的代码/内容构建、运行测试和部署 | 它不会取走你电脑里的原片，也不会替你运行本地导入/手动合并。 |

每次发布前的小清单：

- [ ] 标题、日期、中英文与占位内容已核对；真实文章不带误导性的 Demo 标识。
- [ ] 图片 ID 唯一，导入清单已手动合并，原有照片没有被覆盖；实际拍摄日未知就保留 null。
- [ ] 图片文件与数据一起提交；原图、凭据和私人主邮箱没有进入公开仓库。
- [ ] Actions 对本次提交成功，线上新内容与预期一致。

### 哪些仍是手动操作？

原片导出、命名去重、选择本批文件、合并 photography-import.json、填写真实元数据/双语文本、检查并提交文件、必要时后台配置 Pages、实际浏览验收都需要作者操作。当前没有自动扫描仓库补图、自动翻译、EXIF 日期导入或自动元数据合并。

最值得后续自动化的是一个**先预览差异、检查 ID/目标文件冲突、校验路径/分类/标签、备份后再合并**的照片导入工具；其次是把内容测试与 Demo fixtures 分离。本次只编写使用说明，没有新增这些功能或改变现有上传流程。
