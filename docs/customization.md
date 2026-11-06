# 个人网站配置

解决如何修改站名、首页短介绍、About 长文与履历、头像、公开邮箱、默认语言、主题和导航的问题。内容配置优先改数据文件；样式与交互的边界在后文列明。

[← 返回项目入口](../README.md)

需要本地命令时，先完成[环境准备](development.md#setup)。 **本文所有终端命令均在仓库根目录执行，不是在 docs 目录中。**

<a id="homepage"></a>
## Home：简短介绍、最新文章与导航

编辑 [_data/home.yml](../_data/home.yml)。这个文件只保存 headline 和 intro 的 en / zh：首页标题和一段简短个人介绍；不要把完整兴趣与思考重新放回 Home。长文在 About，见[下节](#about-copy)。

首页顺序为标题 → 简短介绍 → About 链接 → Recent Posts → Tech Blog / Photography 卡片。冷笑话只在全站 Footer 展示，维护方法见[收藏指南](silly-thoughts.md)。

| 字段 | 修改内容 |
| --- | --- |
| headline.en / zh | 主标题：Still branching out. / 还在探索。 |
| intro.en / zh | 标题下方普通正文字号的短介绍；分别维护中英文。 |

当前首页配置结构如下；编辑对应字段后 Commit changes，等待 Actions 部署，再检查两种语言与手机换行。站名仍由 _config.yml 的 title 控制，Hero 标题是独立表达。

```yaml
headline:
  en: "Still branching out."
  zh: "还在探索。"
intro:
  en: |
    I'm Jerry. I enjoy figuring out how technology works, but I'm just as curious about the world beyond the screen. These days, I'm exploring how to make AI genuinely useful, photographing wildlife and everyday life, and learning to put my own thoughts into words.
  zh: |
    我是 Jerry。我喜欢琢磨技术背后的原理，也喜欢走出屏幕，用相机观察自然和身边的生活。最近在探索怎样让 AI 真正派上用场，也在慢慢学习如何更好地表达自己的观察和想法。
```

About、Tech Blog、Essays 和 Photography 入口在 [index.html](../index.html) 中维护，保留已有 SVG 与 relative_url。首页最新文章自动生成，数量、Demo 排除与发布日期规则见[Recent Posts 发布规则](publishing.md#recent-posts)，无需手动填写列表，也没有单独的 /posts/ 页面。

<a id="hero-wave"></a>
## Dot Contour Wave：Home 与标题区域

全站标题背景共用 [hero-wave.html](../_includes/hero-wave.html)、[dot-wave.css](../assets/css/dot-wave.css)、[hero-wave-core.mjs](../assets/js/hero-wave-core.mjs) 和 [hero-wave.mjs](../assets/js/hero-wave.mjs)；[home.css](../assets/css/home.css) 仅保留首页原有构图和间距。它不读取摄影图片，也不需要上传 GIF 或安装动画库。标题和简介仍只编辑 home.yml，无需接触动画代码。

两种主题共享一组曲线与风场，只切换圆点配色：Light 为麦金/琥珀/浅金，Dark 为灰绿/鼠尾草绿/月光银白。整站背景、正文颜色和 Hover 变量不变。高光来自圆点自身的颜色变化，没有独立实线、发光丝带或背景色块。

如需调整装饰颜色，在 dot-wave.css 中修改三组 RGB 数值（用空格分隔，不带逗号）：

```css
.hero-wave {
  --wave-shadow: 158 115 56;
  --wave-mid: 191 139 64;
  --wave-light: 225 190 117;
}
html[data-theme=dark] .hero-wave {
  --wave-shadow: 106 134 116;
  --wave-mid: 154 180 156;
  --wave-light: 219 230 216;
}
```

正式默认参数为 **Double gust、Wind strength 2×、Speed 1.5×**，统一保存在 hero-wave-core.mjs 的 WAVE_DEFAULTS 中，本地面板也读取同一配置。每12秒模拟时间形成一组双阵风，在1.5×速度下约为8秒实际时间；微风持续，双阵风之间保留短暂呼吸，不再有长时间等待。跨周期继续计算上一组尾部，让它自然消退，避免强行跳回初始帧。首阵约2–3秒进入右侧可见区域，第二阵随后传播；波峰有局部位移和圆点自身的亮暗变化。正式首页不显示调试按钮，也没有鼠标追踪或后台配置界面。

工程边界与检查步骤：

1. 点阵按平滑曲线弧长近似等距采样，仅在尺寸、字体或语言变化时重新计算；不是每帧随机撒点。桌面最多5250个缓存点，窄屏最多2000个缓存点（含渐隐及画布外的采样点，不等于可见数量），Canvas 的像素比上限分别为2和1.5，绘制上限仍为30/24帧每秒。均匀缩减沿线和线间采样间距，可见圆点比前版增加约20%–30%；地形公式和昼夜配色不变。每帧只遍历可绘制圆点，公共阵风参数按帧缓存，绘制使用连续的分数帧时间，避免无意漏帧。
2. Home 保留已确认的构图、文字避让和窄屏44px底部留白。其他页面在原有标题区域内展开，不新增高度或留白；说明见下节。Canvas 不占文档流、不接收点击，也不进入屏幕阅读器或 Tab 顺序。
3. 切换 Light / Dark / System、中文/英文后检查正文清晰与构图；系统主题自动变化会同步点阵配色。无需修改 profile、About 或 Footer。
4. 系统开启“减少动态效果”后停止连续动画，保留当前静态帧；滚出 Hero 或切到后台后暂停，返回时接着播放，不补跑后台动画。Canvas 不可用或关闭 JavaScript 时显示内联 SVG 的静态点状曲线。
5. 本地按[开发指南](development.md)构建后预览；修改动画时运行 npm test、严格 Jekyll 构建、npm run check:site 以及 npm run test:browser。浏览器测试覆盖配色、文字避让、尺寸变化、暂停恢复、降级与原生 About 链接；真实手机的流畅度和耗电仍需设备实测。

### 复用到栏目页与文章标题

Tech Blog、Essays、Photography、About 直接在现有 .page-heading 内放置共享 include；文章由 [_layouts/article.html](../_layouts/article.html) 在 .article-heading 内统一放置。没有额外的 Compact 横幅，也不改变原有标题、介绍、日期、标签及后续内容的位置。

栏目页及Home的 Front Matter 使用 wave: true；[_layouts/default.html](../_layouts/default.html) 为这些页面和文章布局统一加载一次共享CSS与脚本。以后若为新的栏目页复用，在其 Front Matter 加入 wave: true，再在原有标题容器内部添加：

```liquid
{% include hero-wave.html context="heading" %}
```

保持原来的 .page-heading 标题与正文结构，不额外包裹横幅或增加padding/min-height；不要在页面里再次添加脚本标签。文章模板已统一包含，无需逐篇添加。Home使用默认context，保持原构图。

背景是绝对定位的装饰层，可延展到主内容区右缘，但父标题原有790px/850px最大宽度与高度保留。短标题容器使用完整尺寸的地形片段裁切、重新构图，点半径/均匀间距保持同一体系；不是把Home Canvas等比压小。脚本按实际可见文字行、日期及链接/标签区域设置渐隐与位移安全边距；语言、字体或容器尺寸变化后重新计算。手机较长标题占用更多区域时，可见范围随文字自然调整，优先保留可读性。

Canvas不可用时保留静态SVG，JavaScript可用时同样为文字区建立遮罩；关闭JavaScript时仍有CSS控制的右下渐隐静态图案。颜色、Double gust/2×/1.5×、减少动态和离屏/后台暂停均由同一套共享代码维护。

### 本机动画诊断：wave-debug=1

1. 按[开发指南](development.md)准备环境，在仓库根目录运行：

```powershell
bundle exec jekyll serve --livereload
```

2. 打开 [http://127.0.0.1:4000/?wave-debug=1](http://127.0.0.1:4000/?wave-debug=1)。栏目页或文章也可直接附加该参数，例如 /tech/?wave-debug=1；面板显示当前页面的背景。如果使用已构建的 scripts/serve.mjs 测试服务器，则端口为4173；它不会自动重新构建源文件。
3. 右下角本地面板显示 Canvas / SVG fallback、实际绘制 FPS、模拟时间与帧数。running 表示连续动画；paused: reduced-motion、hidden tab、offscreen、static 分别表示系统减少动态、后台标签页、Hero 离屏或主动静态。Canvas unavailable 表示正在使用静态 SVG，控件会禁用。
4. Mode 可选 Auto、Static、Breeze、Single gust、Double gust；打开和刷新时默认选Double gust/2×/1.5×。Auto沿用同一双阵风节奏。切换模式或按 Replay from start 会重放；强度为0–2倍、速度为0.5–2倍。单/双阵风仍保留周期中的平静阶段。刷新页面恢复上面这组正式默认值，不保存这些实验参数。
5. 调试模式也不绕过系统减少动态和可见性暂停。开启减少动态时 FPS 为0属于预期；要观察运动，应在测试环境的系统/浏览器偏好中选择允许动态，而不是删除无障碍逻辑。
6. 调试入口只接受 localhost、127.0.0.1 和 [::1]；公开网站即使带 wave-debug=1 也不会加载面板模块或样式。正常本机页面不带参数时同样不加载它们。不要将面板添加到首页模板。

[hero-wave-debug.mjs](../assets/js/hero-wave-debug.mjs) 和 [hero-wave-debug.css](../assets/css/hero-wave-debug.css) 是独立的按需开发工具。入口脚本 URL 带构建版本 v，核心模块沿用同一版本，避免更新时混用旧核心代码；本机面板会显示入口 URL。在 DevTools → Network 检查入口/核心模块是否成功加载、版本是否一致；Console 检查运行时错误。若 Canvas 持续运行但感觉静止，应对照 Replay 后2–6秒的波峰，而不只检查两帧文件是否不同。

如需移除某个页面的装饰，删除该页标题内的 hero-wave.html include，栏目页同时移除 wave: true。文章标题由共享article布局统一管理。Home若移除装饰，再检查home.css中原有的窄屏额外底部留白；保留文案和链接。共享资源在default布局加载，不在各页面重复添加或删除全站脚本。不要为关闭装饰去修改主题或语录逻辑。

<a id="about-copy"></a>
## About：完整个人探索与思考

编辑 [_data/about.yml](../_data/about.yml) 的 exploring 和 beyond；这是原 Home 长文的唯一维护位置。当前 What I'm Exploring 两种语言各3段，Beyond Engineering 各6段，迁移时完整保留了原文。

| 字段 | 修改内容 |
| --- | --- |
| exploring.title.en / zh | What I'm Exploring / 我在探索什么章节标题。 |
| exploring.en / zh | 完整工程探索正文。 |
| beyond.title.en / zh | Beyond Engineering / 工程之外章节标题。 |
| beyond.en / zh | 完整自然、摄影、家庭、社会观察与个人表达正文。 |

长正文使用 YAML 竖线块，正文行相对字段缩进两个空格，空行分隔自然段；保留中英文各自的段落与措辞，不为段落随意加粗或添加子标题。不需要把长文复制到 about.md 或 profile.yml。[_includes/bilingual-copy.html](../_includes/bilingual-copy.html) 负责两种语言的 Markdown 渲染，也用于 Home 短介绍。英文智能引号属于现有排版行为，原始文案仍保存在 YAML。

About 顺序为标题 → 头像与姓名 → Exploring → Beyond → Education → Experience → Contact。长文在正常页面流中展开，没有固定高度滚动框、折叠按钮或悬浮目录。[about.css](../assets/css/about.css) 控制740px最大正文宽度、17px桌面/16px手机字号、1.9行高与自然段间距；修改样式时同时检查浅色/深色和中英文。

<a id="profile"></a>
## About、个人资料、邮箱与头像

主要入口：[profile.yml](../_data/profile.yml)、[about.md](../about.md)。About 的 URL 仍是 /about/，导航仍为 About / 关于；页面标题为 A Little Background. / 一些经历。顶部显示圆形头像和姓名，随后为 Exploring、Beyond、Education、Experience 和 Contact；兴趣与个人长文统一在 _data/about.yml 维护。现有 profile.intro 数据保留，但 About 使用 hide_intro=true，不再显示它。

profile.yml 是普通 YAML，**用空格缩进，不用 Tab**。以下仅为填写示例，请用自己的真实资料替换；当前公开联系邮箱使用已确认的 Outlook 别名 hi.jerrywong@outlook.com；姓名等请换为自己的真实资料：

```yaml
name:
  en: "Your Name"
  zh: "你的姓名"
email: "hi.jerrywong@outlook.com"
linkedin: "https://www.linkedin.com/in/junjie-jerry-wang"
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
- About 标题需同步维护 front matter 的 title 和页面 h1 的双语内容；不要修改 permalink 或 navigation.yml 的 About 标识。页面不额外增设 Interests 或 Misc 栏目。
- Footer 按 GitHub → LinkedIn → Email 的顺序读取 github、linkedin、email；About 联系区仍只显示邮箱。留空字符串可隐藏对应图标，例如 `linkedin: ""`，不要填假地址。地址只在 profile.yml 维护，不在模板中重复粘贴。

<a id="footer"></a>
### Footer 社交图标与留白

修改上面 profile.yml 中的 github、linkedin、email，提交并等待部署即可同步全站 Footer。GitHub 和 LinkedIn 在新标签页打开并带 noopener noreferrer；Email 是 mailto 链接，不另开标签。当前 LinkedIn 是 https://www.linkedin.com/in/junjie-jerry-wang，公开邮箱仍为 hi.jerrywong@outlook.com。

Footer 按社交图标 → 版权 → 随机语录垂直居中。[_includes/social-icon.html](../_includes/social-icon.html) 提供无障碍隐藏的单色 SVG；[main.css](../assets/css/main.css) 控制46px圆形链接与间距，背景使用 --surface、默认图标使用 --muted，Hover / 键盘 Focus 使用既定 --interactive-hover。年份从 site.time 自动获取，站名读取 _config.yml 的 title。图标不使用 Emoji、外部图片或 CDN。

[thoughts.css](../assets/css/thoughts.css) 维护 Footer 语录的居中和较小字号，也包含已有 Hero 字体规则。Footer 顶部和语录上方不添加横线，以留白区分内容。来源链接保留 Focus 轮廓、180ms过渡和减少动画支持。语录仅在 Footer 随机展示，规则见[收藏指南](silly-thoughts.md#thoughts)。

<a id="email"></a>
### 公开联系邮箱

当前 email 为 **hi.jerrywong@outlook.com**。email 非空时，About 联系区域和 Footer 的 Email 图标都由此字段生成 mailto 联系链接；不涉及 Git 提交邮箱或账号登录设置。留空 `email: ""` 可同时隐藏 About 邮箱链接和 Footer 邮箱图标；联系区没有额外社交按钮。

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
| 首页标题与短介绍 | [_data/home.yml](../_data/home.yml) 的 headline / intro | 是；不随机改变主标题。 |
| About 个人长文 | [_data/about.yml](../_data/about.yml) 的 exploring / beyond | 是；中英文独立维护，保留自然段。 |
| Footer 收藏短句 | [_data/quotes.yml](../_data/quotes.yml) | 是；保留原文，不自动翻译。 |
| 个人资料、头像、公开邮箱 | [_data/profile.yml](../_data/profile.yml)；履历正文在 [about.md](../about.md) | 资料/头像改数据，履历改 Markdown。 |
| 摄影、分类、标签 | [_data/](../_data) 对应三个摄影数据文件 | 是；同时提交相关图片。 |
| 导航名称、链接和顺序 | [_data/navigation.yml](../_data/navigation.yml) 的 id/url/en/zh | 是；添加菜单不会自动创建目标页面，新增页仍需单独创建。 |
| 主题颜色 | [assets/css/main.css](../assets/css/main.css) 的 :root 与 html[data-theme=dark] 变量 | 需修改 CSS；重点是 --bg、--surface、--text、--muted、--line、--accent、--code；交互色见下文 --interactive-hover。 |
| SEO 站名、站点说明及发布地址 | [_config.yml](../_config.yml) 的 title、description、url、baseurl | 配置部分是；可见文字另见下文。 |
| 页眉/页脚站名、Hero 与正文 | _config.yml 的 title；_data/home.yml 的 headline/intro；_data/about.yml 的 exploring/beyond | 站名统一读 title；Hero 独立配置，Footer 保留社交图标、版权和彩蛋。 |

### 默认语言与个人偏好

在 _config.yml 找到并修改 `default_language: zh`，其它配置保持不变。它控制首次访问的页面语言；**浏览器已保存的 lab-language 偏好优先**，因此已有访客可能仍看到英文。右上角切换即可；若要测试真正的首次默认状态，使用新的隐私浏览窗口。`lang: en` 是另一项站点配置，不替代 default_language；可按站点主语言检查元数据。当前为单 URL 双语，canonical 不因切换语言改变，head 中标题/description 也不是按语言即时切换的。

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
- 整块可点击的文章条目及 Tech Blog / Photography 入口，仅标题和边框变色；描述、日期与普通段落不变色。
- 语言、主题、菜单按钮，摄影未选分类、Tag / Sort 下拉框、清除筛选、查看器按钮、照片标签均有反馈。
- 当前页面通过 aria-current="page" 表示，文字始终使用 --text，底线保持 --accent；Hover 不覆盖它。手机菜单同样保留短底线。不要用 :active 表示当前页面，:active 只是按下瞬间。
- 摄影 aria-pressed="true" 的已选分类保持现有实心背景与反色文字，Hover 不改颜色。照片本身使用轻微边缘提示和现有标题浮层；浮层白字保持原样，避免暖橙色在照片暗部对比不足。原生下拉菜单的选项保持正文色与页面背景色。
- 文章标签链接和照片标签按钮 Hover 时，标签底色轻微变为 --bg；这让浅色模式的橙色小字对比度达到约 4.68:1（原 --surface 灰底仅约 4.32:1）。整站背景色保持原样。
- Tab 聚焦仍显示 2px 轮廓和间距，不只靠颜色区分；原生 Disabled 控件降低透明度、使用默认光标，且不应用 Hover 颜色。

Hover 样式限定在 @media (hover: hover)，无 Hover 的手机继续正常点击。prefers-reduced-motion: reduce 时取消过渡；这不改变按钮功能，也不增加 JavaScript。变更颜色后请同时检查两个主题、已选状态、键盘焦点和触屏操作。

链接的右上装饰箭头统一使用 [_includes/arrow-up-right.html](../_includes/arrow-up-right.html) 的细线 SVG，尺寸为 1em，stroke 使用 currentColor，随链接文字继承颜色和 Hover 过渡。图标通过 aria-hidden 和 focusable=false 避免重复朗读或成为 Tab 焦点；短句来源链接更新文字时保留同一个 SVG。请复用这个 include，不再用 Unicode ↗ 充当界面图标，以避免 iOS 的 Emoji 字体渲染；正文中有意义的符号保持原文。

### 轻微过渡与减少动画

[main.css](../assets/css/main.css) 统一维护上述 180ms 交互过渡；[home.css](../assets/css/home.css) 与 [about.css](../assets/css/about.css) 为这两个页面的内容添加 180ms、opacity 0.88 到 1 的轻微进入效果。没有新增 JavaScript、路由拦截或 View Transitions；导航仍为原生页面跳转，前进、后退及滚动恢复由浏览器处理。prefers-reduced-motion: reduce 时关闭这些效果。不需要给每个区块增加滚动动画。

### 站名与发布地址

_config.yml 的 title 当前为 Jerry's Engineering Lab，控制默认浏览器站名、Open Graph 站名、页眉 wordmark 与页脚版权站名；页眉和页脚均读取 site.title，避免硬编码不一致。首页 Hero 的 headline 是独立的个人表达，无需与站名相同。Footer 居中显示 GitHub / LinkedIn / Email SVG 图标、自动年份版权与 Jerry 的收藏彩蛋，不显示额外标语或横线；head 中的基础 SEO 元数据与 Sitemap 保留。

当前发布根地址为 `https://kaetowjj.github.io`，baseurl 为 `""`。这是用户主页仓库，不需要在 URL 中加仓库名。若未来迁移成项目子路径站点，需要同步调整 url/baseurl 并检查所有资源；日常写文章、上传图片无需改它们。时区配置为 Asia/Shanghai。

[← 返回 README](../README.md)
