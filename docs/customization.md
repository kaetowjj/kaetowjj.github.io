# 个人网站配置

解决如何修改站名、首页长文、About、头像、公开邮箱、默认语言、主题和导航的问题。内容配置优先改数据文件；样式与交互的边界在后文列明。

[← 返回项目入口](../README.md)

需要本地命令时，先完成[环境准备](development.md#setup)。 **本文所有终端命令均在仓库根目录执行，不是在 docs 目录中。**

<a id="homepage"></a>
## 如何维护个人首页？ / Homepage

打开 [_data/home.yml](../_data/home.yml) 编辑；所有长文案在这里，不放入 profile.yml 的短 intro。首页呈现持续探索的个人，不使用职业头衔或一排技术标签定义作者；AI 基础设施是当前兴趣，不是固定身份。

首页顺序为 Hero → What I'm Exploring / 我在探索什么 → Beyond Engineering / 工程之外 → Recent Notes → Projects / Photography → Jerry's Silly Thoughts。

| 字段 | 修改内容 |
| --- | --- |
| headline.en / zh | Hero 主标题：Still branching out. / 还在探索。 |
| exploring.title.en / zh | 探索方向章节标题。 |
| exploring.en / zh | AI、数据工程、架构决策与技术品味的完整段落。 |
| beyond.title.en / zh | 工程之外章节标题。 |
| beyond.en / zh | 中英文各六个自然段：野生动物、人文摄影、表达、家人、自我认识与建站缘由。 |

Hero 只显示主标题和 About 链接，不显示 eyebrow、个人介绍或技术标签；旧的 eyebrow、hero 字段已移除。链接文字在 [index.html](../index.html) 中维护，当前为 A little about me ↗ / 关于我 ↗。主标题配置示例：

```yaml
headline:
  en: "Still branching out."
  zh: "还在探索。"
```

What I'm Exploring 与 Beyond Engineering 的 en/zh 长正文使用 YAML 竖线块；每行相对字段多缩进两个空格，空行分隔段落。例如只替换 exploring.en 的正文时：

```yaml
exploring:
  title:
    en: "What I'm Exploring"
    zh: "我在探索什么"
  en: |
    My first paragraph.

    My second paragraph.
  zh: |
    我的第一段。

    我的第二段。
```

不要用这段演示文案覆盖真实内容。保留 Beyond Engineering 的六个自然段，不混为一段，不为每段加子标题或粗体关键词；中英文独立维护。正文由 Jekyll markdownify 解析，不要给长段落加 data-en/data-zh 属性。英文直引号可能由现有 Markdown 排版转换为弯引号，原始文案仍保存在 YAML 中。

保存后 Commit changes；本地则提交 _data/home.yml 并 push。等待 Actions 的 build/deploy 成功后，检查双语段落与手机换行。正文宽度、行距、段落间距在 [home.css](../assets/css/home.css) 调整。站名仍由 _config.yml 的 title 控制，Hero 标题是独立表达。

<a id="profile"></a>
## About、个人资料、邮箱与头像

主要入口：[profile.yml](../_data/profile.yml)、[about.md](../about.md)。About 的 URL 仍是 /about/，导航仍为 About / 关于；页面标题为 A Little Background. / 一些经历。顶部只显示圆形头像和姓名，随后是 Education、Experience 和 Contact；兴趣与个人长文统一在首页维护。现有 profile.intro 数据保留，但 About 使用 hide_intro=true，不再显示它。

profile.yml 是普通 YAML，**用空格缩进，不用 Tab**。以下仅为填写示例，请用自己的真实资料替换；当前公开联系邮箱使用已确认的 Outlook 别名 hi.jerrywong@outlook.com；姓名等请换为自己的真实资料：

```yaml
name:
  en: "Your Name"
  zh: "你的姓名"
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

- name 控制头像旁姓名。教育和经历直接在 about.md 的 background-education、background-experience 区域编辑；每个条目用 background-item 包裹。标题与正文使用 bi.html 的 en/zh 参数配对维护，保留 include 与头像 script。当前为 UNSW 信息技术硕士（人工智能方向，2022–2024）、黑龙江大学网络工程本科（2017–2021），以及上海浦东发展银行广州分行（2025.07–至今）。Technology / Data 是职能描述，不是正式 HR 职称；仅按确认的真实资料更新。
- About 标题需同步维护 front matter 的 title 和页面 h1 的双语内容；不要修改 permalink 或 navigation.yml 的 About 标识。页面不另设 Interests、Beyond Engineering 或 Misc。
- github 与 linkedin 配置字段保留供未来使用，但当前 Footer 不显示 GitHub、LinkedIn 等社交入口。About 联系区只显示邮箱。留空请写 `linkedin: ""`，不要删除键或填一个假地址。

<a id="email"></a>
### 公开联系邮箱

当前 email 为 **hi.jerrywong@outlook.com**。email 非空时，仅 About 联系区域由此字段生成 mailto 联系链接，Footer 不显示联系入口；不涉及 Git 提交邮箱或账号登录设置。留空 `email: ""` 可隐藏 About 中该链接；联系区没有额外社交按钮。

**建议使用专门的公开联系别名**，不要公开私人主邮箱。仓库及网站是公开的；不要把邮箱密码、验证码、GitHub token、相机云服务凭据或其它账号秘密写入任何文件。把别名写入 email 不会自动在邮箱服务商处创建它，须先确认该别名已配置并可收信。

<a id="avatar"></a>
### 更换圆形头像与调整焦点

1. 把照片导出为适合网页的 WebP，建议约 512px、sRGB，导出时移除 EXIF/GPS。头像组件只负责显示裁剪，**不会优化文件或剥离 EXIF**。
2. 在本地将其保存为 `assets/images/avatar.webp`；或者打开 [assets/images/](../assets/images) → Add file → Upload files，上传同名文件并提交。已有同名文件时确认是有意替换。
3. 默认路径不变时无需改 HTML/CSS；在 profile.yml 编辑双语 alt 和 initials。initials 是手动配置，不会根据姓名自动生成。
4. 默认 `position: "center 35%"` 对应 CSS object-position；圆形区域使用 object-fit: cover，不拉伸。可从 center、center 35%、center 50% 等值试起，通过预览调整人物眼睛与脸部位置。
5. 桌面头像直径 176px，手机 128px；图片缺失、src 为空或加载失败时显示首字母占位，不显示破图图标。替换后等待部署并强制刷新；若缓存持续，可改成 avatar-v2.webp 并同步更新 src。

不要把头像原图放入公开仓库后再假定页面裁剪等于隐私保护：下载者仍可取得整个原文件。无需运行摄影的批处理脚本来更换头像，该脚本输出到摄影目录并生成摄影清单。

<a id="settings"></a>
## 网站设置：哪些改数据，哪些要改模板？

| 需求 | 修改位置 | 只改数据即可？ |
| --- | --- | --- |
| 默认界面语言 | [_config.yml](../_config.yml)：default_language 为 en 或 zh | 是；重新构建，本地需重启 Jekyll。 |
| 首页文案与探索章节 | [_data/home.yml](../_data/home.yml) | 是；不随机改变主标题。 |
| 收藏短句及显示位置 | [_data/quotes.yml](../_data/quotes.yml) | 是；保留原文，不自动翻译。 |
| 个人资料、头像、公开邮箱 | [_data/profile.yml](../_data/profile.yml)；履历正文在 [about.md](../about.md) | 资料/头像改数据，履历改 Markdown。 |
| 摄影、分类、标签 | [_data/](../_data) 对应三个摄影数据文件 | 是；同时提交相关图片。 |
| 导航名称、链接和顺序 | [_data/navigation.yml](../_data/navigation.yml) 的 id/url/en/zh | 是；添加菜单不会自动创建目标页面，新增页仍需单独创建。 |
| 主题颜色 | [assets/css/main.css](../assets/css/main.css) 的 :root 与 html[data-theme=dark] 变量 | 需修改 CSS；重点是 --bg、--surface、--text、--muted、--line、--accent、--code；交互色见下文 --interactive-hover。 |
| SEO 站名、站点说明及发布地址 | [_config.yml](../_config.yml) 的 title、description、url、baseurl | 配置部分是；可见文字另见下文。 |
| 页眉/页脚站名、Hero 与正文 | _config.yml 的 title；_data/home.yml 的 headline/exploring/beyond | 站名统一读 title；Hero 独立配置，Footer 仅保留版权和彩蛋。 |

### 默认语言与个人偏好

在 _config.yml 找到并修改 `default_language: zh`，其它配置保持不变。它控制首次访问的页面语言；**浏览器已保存的 lab-language 偏好优先**，因此已有访客可能仍看到英文。右上角切换即可；若要测试真正的首次默认状态，使用新的隐私浏览窗口。`lang: en` 是另一项站点配置，不替代 default_language；RSS 等插件可能读取站点语言元数据，可按站点主语言一并检查。当前为单 URL 双语，canonical 不因切换语言改变，head 中标题/description 也不是按语言即时切换的。

<a id="themes"></a>
### Light / Dark / System

无需修改配置即可使用右上角主题按钮，循环顺序为 System → Light → Dark → System。首次跟随系统，选择后本地保存；System 会实时响应操作系统明暗变化。清除站点存储会清除语言、主题和照片排序偏好。需要改配色才编辑 CSS Variables，同时检查两个主题中的表格、代码、文字对比和 prefers-reduced-motion。

### Hover、当前位置与键盘焦点

统一交互色在 [main.css](../assets/css/main.css) 的主题变量中维护：

```css
:root { --interactive-hover: #B45309; }
html[data-theme="dark"] { --interactive-hover: #A7D7A4; }
```

它们只控制交互反馈，不替换 --accent 或背景变量。正文仍为 Light #272D2B、Dark #E5E8E1；普通链接的默认强调色、导航未选项的灰色沿用原样。支持 Hover 的设备上，链接和普通控件使用 180ms 的 color / border-color / background-color 过渡：

- 顶部非当前导航、Logo、Home 的 About 链接、正文链接、目录、文章标签、邮箱和来源链接变色。
- 整块可点击的文章条目及 Projects / Photography 入口，仅标题和边框变色；描述、日期与普通段落不变色。
- 语言、主题、菜单按钮，摄影未选分类、Tag / Sort 下拉框、清除筛选、查看器按钮、照片标签及 Shuffle 均有反馈。
- 当前页面通过 aria-current="page" 表示，文字始终使用 --text，底线保持 --accent；Hover 不覆盖它。手机菜单同样保留短底线。不要用 :active 表示当前页面，:active 只是按下瞬间。
- 摄影 aria-pressed="true" 的已选分类保持现有实心背景与反色文字，Hover 不改颜色。照片本身使用轻微边缘提示和现有标题浮层；浮层白字保持原样，避免暖橙色在照片暗部对比不足。原生下拉菜单的选项保持正文色与页面背景色。
- 文章标签链接和照片标签按钮 Hover 时，标签底色轻微变为 --bg；这让浅色模式的橙色小字对比度达到约 4.68:1（原 --surface 灰底仅约 4.32:1）。整站背景色保持原样。
- Tab 聚焦仍显示 2px 轮廓和间距，不只靠颜色区分；原生 Disabled 控件降低透明度、使用默认光标，且不应用 Hover 颜色。

Hover 样式限定在 @media (hover: hover)，无 Hover 的手机继续正常点击。prefers-reduced-motion: reduce 时取消过渡；这不改变按钮功能，也不增加 JavaScript。变更颜色后请同时检查两个主题、已选状态、键盘焦点和触屏操作。

### 轻微过渡与减少动画

[main.css](../assets/css/main.css) 统一维护上述 180ms 交互过渡；[home.css](../assets/css/home.css) 与 [about.css](../assets/css/about.css) 为这两个页面的内容添加 180ms、opacity 0.88 到 1 的轻微进入效果。没有新增 JavaScript、路由拦截或 View Transitions；导航仍为原生页面跳转，前进、后退及滚动恢复由浏览器处理。prefers-reduced-motion: reduce 时关闭这些效果。不需要给每个区块增加滚动动画。

### 站名与发布地址

_config.yml 的 title 当前为 Jerry's Engineering Lab，控制默认浏览器站名、Open Graph 站名、页眉 wordmark 与页脚版权站名；页眉和页脚均读取 site.title，避免硬编码不一致。首页 Hero 的 headline 是独立的个人表达，无需与站名相同。Footer 只保留版权与 Jerry 的收藏彩蛋，已移除旧标语及 Email、GitHub、RSS、LinkedIn 可见入口；RSS Feed 与 head 元数据仍然保留。

当前发布根地址为 `https://kaetowjj.github.io`，baseurl 为 `""`。这是用户主页仓库，不需要在 URL 中加仓库名。若未来迁移成项目子路径站点，需要同步调整 url/baseurl 并检查所有资源；日常写文章、上传图片无需改它们。时区配置为 Asia/Shanghai。

[← 返回 README](../README.md)
