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

<a id="profile"></a>
## About、个人资料、邮箱与头像

主要入口：[profile.yml](../_data/profile.yml)、[about.md](../about.md)。profile 中的 intro 现在只用于 About 顶部；首页长文单独由 _data/home.yml 的 hero、exploring、beyond 管理；教育、工作经历、兴趣及联系说明在 about.md 的英文/中文容器中分别维护，保留现有 include 与 script 标签。

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
| 主题颜色 | [assets/css/main.css](../assets/css/main.css) 的 :root 与 html[data-theme=dark] 变量 | 需修改 CSS；重点是 --bg、--surface、--text、--muted、--line、--accent、--code。 |
| SEO 站名、站点说明及发布地址 | [_config.yml](../_config.yml) 的 title、description、url、baseurl | 配置部分是；可见文字另见下文。 |
| 页眉/页脚站名、Hero 与正文 | _config.yml 的 title；_data/home.yml 的 headline/hero | 站名统一读 title；Hero 独立配置，Footer 仅保留版权和彩蛋。 |

### 默认语言与个人偏好

在 _config.yml 找到并修改 `default_language: zh`，其它配置保持不变。它控制首次访问的页面语言；**浏览器已保存的 lab-language 偏好优先**，因此已有访客可能仍看到英文。右上角切换即可；若要测试真正的首次默认状态，使用新的隐私浏览窗口。`lang: en` 是另一项站点配置，不替代 default_language；RSS 等插件可能读取站点语言元数据，可按站点主语言一并检查。当前为单 URL 双语，canonical 不因切换语言改变，head 中标题/description 也不是按语言即时切换的。

<a id="themes"></a>
### Light / Dark / System

无需修改配置即可使用右上角主题按钮，循环顺序为 System → Light → Dark → System。首次跟随系统，选择后本地保存；System 会实时响应操作系统明暗变化。清除站点存储会清除语言、主题和照片排序偏好。需要改配色才编辑 CSS Variables，同时检查两个主题中的表格、代码、文字对比和 prefers-reduced-motion。

### 站名与发布地址

_config.yml 的 title 当前为 Jerry's Engineering Lab，控制默认浏览器站名、Open Graph 站名、页眉 wordmark 与页脚版权站名；页眉和页脚均读取 site.title，避免硬编码不一致。首页 Hero 的 headline 是独立的个人表达，无需与站名相同。Footer 只保留版权与 Jerry 的收藏彩蛋，已移除旧标语及 Email、GitHub、RSS、LinkedIn 可见入口；RSS Feed 与 head 元数据仍然保留。

当前发布根地址为 `https://kaetowjj.github.io`，baseurl 为 `""`。这是用户主页仓库，不需要在 URL 中加仓库名。若未来迁移成项目子路径站点，需要同步调整 url/baseurl 并检查所有资源；日常写文章、上传图片无需改它们。时区配置为 Asia/Shanghai。

[← 返回 README](../README.md)
