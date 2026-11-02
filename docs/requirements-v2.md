# Personal Engineering Lab — Codex 开发需求 V2

## 一、项目目标

请为我从零构建一个基于 **Jekyll + GitHub Pages** 的个人网站。

网站名称暂定：

**Engineering Lab**

副标题：

**Thinking, Building & Learning**

网站定位为一个长期维护的个人工程研究博客、技术项目展示平台以及摄影作品画廊。

请实际完成开发、构建、测试和部署配置，而不是仅提供教程或设计方案。

### 设计参考

- 个人主页与博客：https://jinyansu1.github.io/
- 摄影画廊：Flickr
- 摄影作品悬浮说明：National Geographic 风格的简洁摄影说明

只参考信息架构和交互理念，不复制他人的受版权保护的代码或摄影作品。

### 设计关键词

Minimalist、Academic、Modern、Editorial、Clean、Readable。

页面应当简洁、现代、有足够留白，不使用夸张的动画和过度装饰。

---

## 二、技术架构

使用：

- Jekyll
- GitHub Pages
- Markdown
- Liquid Templates
- HTML5
- SCSS / CSS
- Vanilla JavaScript
- YAML 数据文件

技术原则：

1. 不需要后端或数据库。
2. 尽可能减少第三方依赖。
3. 组件清晰，易于维护。
4. 支持 GitHub Pages 自动部署。
5. 未来可以使用 Codex 持续增加功能。
6. 尽可能将内容与页面样式、交互逻辑解耦。
7. 不要引入不必要的 React、Vue 等大型前端框架。

---

## 三、网站结构

网站包含以下页面：

### Home

- 个人介绍
- 技术研究方向
- 最近更新的文章
- 技术项目入口
- Photography 入口
- GitHub / LinkedIn 等社交链接

### Engineering Notes

用于长期积累技术笔记。

支持分类、标签、代码高亮、数学公式、目录和文章更新记录。

主要方向：

- Data Engineering
- AI Systems
- Software Architecture
- Distributed Systems
- Engineering Practices

技术笔记的核心结构可以包括：

- Problem
- Constraints
- Alternatives
- Design
- Experiments
- Results
- Lessons Learned

不强制每篇文章遵循固定模板，但提供可选模板。

### Projects

展示技术项目，包括：

- 背景与问题
- 技术栈
- 架构设计
- 方案比较
- 实现过程
- 测试结果
- 总结和反思

### Essays

记录职业经历、学习过程和个人思考。

### Photography

个人摄影作品画廊。

**这是普通摄影作品展示页面，不是精选作品集。**

详细要求见第六节。

### About

个人简介、教育经历、工作经历、兴趣和联系方式。

缺少的个人信息使用明确占位符，不得编造。

---

## 四、中英文系统

网站支持：

**English / 中文**

导航栏右上角提供语言切换按钮。

要求：

1. 导航、主页、文章和摄影文字均支持双语。
2. 默认语言可以配置。
3. 切换语言不刷新页面。
4. 使用 localStorage 保存用户偏好。
5. 跨页面保持语言设置。
6. 缺少翻译时应有合理回退机制。
7. 支持中英文分别优化排版及字体。

第一版文章采用同一个 Markdown 文件维护中英文内容，参考 Jinyan Su 网站的实现方式。

确保 Jekyll 能正确处理文章内的 Markdown、代码块、数学公式和 HTML 容器。

为将来升级独立语言 URL 保留可扩展空间。

---

## 五、主题切换系统

支持三种模式：

- Light
- Dark
- System

右上角提供太阳、月亮或系统图标。

要求：

1. 首次访问跟随系统主题。
2. 手动切换后记住用户选择。
3. System 模式实时响应系统主题变化。
4. 切换页面时保持主题。
5. 避免页面加载时出现亮色闪烁。
6. 使用 CSS Variables 管理颜色。
7. 支持平滑过渡。
8. 尊重 prefers-reduced-motion。
9. 保证代码块、表格、图片说明等元素在明暗模式下均易于阅读。

Dark Mode 使用柔和深灰背景，不要纯黑。

---

# 六、Photography Gallery — 摄影画廊

这是网站的重要页面。

**本版本明确不需要 Selected Works、Featured Works、精选作品、首页大图推荐或人工精选机制。**

所有照片均作为普通作品展示，可以通过分类、Tag 标签和拍摄时间进行浏览。

视觉目标：

**A clean, chronological photography gallery with categories and tags.**

## 6.1 基础画廊布局

采用 Flickr 风格的 **Justified Gallery**。

布局要求：

- 照片按照行排列。
- 同一行照片高度尽量一致。
- 保留原始宽高比。
- 横幅、竖幅和全景照片可以自然混排。
- 尽量完整显示照片，避免强制裁切。
- 根据窗口宽度动态调整布局。
- 桌面端呈现连续的摄影作品流。
- 手机端适配小屏幕。
- 照片之间留出适当间距。

不得随机放大部分照片来制造精选效果。

所有照片在视觉层级上应当平等。

## 6.2 作品分类 Categories

支持为照片设置一个主要分类。

初始分类：

- All
- Wildlife
- Landscape
- Street
- Travel
- Other

页面顶部提供分类筛选栏。

例如：

All | Wildlife | Landscape | Street | Travel | Other

点击分类后，只显示对应分类的照片。

分类应通过数据配置维护，未来可自由增加或修改，不要写死在页面组件中。

## 6.3 Tag 标签

除了主要分类，每张照片可以拥有多个 Tag。

例如：

- Birds
- Architecture
- Nature
- Night
- Film
- Black & White
- Japan
- Thailand

Tag 和 Category 是两套独立的元数据。

示例：

Category: Wildlife

Tags: Birds, Nature, Wetland

另一张照片可以是：

Category: Travel

Tags: Japan, Architecture, Night

要求：

1. 每张照片可以有零个或多个 Tag。
2. 支持点击标签筛选作品。
3. 分类和标签筛选可以组合使用。
4. 标签数量和名称可通过 YAML 自由扩展。
5. 提供清除筛选的入口。
6. 支持中英文标签名称。
7. 筛选后不重新加载页面。
8. 空结果时提供简洁的提示。

第一版可以采用单个 Category + 单个 Tag 的组合筛选，不需要过度复杂的多条件查询系统。

## 6.4 拍摄时间排序

摄影页面必须提供两种排序方式：

**Newest First — 最新拍摄在前**

按拍摄日期从大到小排序。

**Oldest First — 最早拍摄在前**

按拍摄日期从小到大排序。

要求：

1. 默认使用 Newest First。
2. 通过下拉菜单或简洁按钮切换。
3. 排序依据为照片的实际拍摄日期，不是文件名、上传日期或文件修改时间。
4. 排序时不刷新页面。
5. 切换分类或 Tag 后，仍保留当前排序方式。
6. 可以通过 localStorage 保存用户排序偏好。
7. 相同日期的照片使用稳定的次级排序规则。
8. 缺少拍摄日期的照片统一放在最后，不得伪造日期。

照片数据应支持 ISO 日期格式，例如：

`2026-10-12`

## 6.5 Hover Overlay Caption

鼠标悬浮到照片时，显示底部渐变文字蒙层。

默认状态：

- 只显示照片。
- 不显示大面积文字。
- 不使用明显的边框或装饰。

悬浮状态：

- 底部出现柔和的半透明渐变。
- 显示作品标题。
- 显示拍摄时间及地点。
- 可以显示一句简短描述。
- 动画自然、克制。

示例：

**Morning Encounter / 清晨的相遇**

2026 · Wildlife · Guangdong

A quiet moment in the morning light.

要求：

- 内容支持双语。
- 文本不要覆盖整张照片。
- 蒙层具备足够文字对比度。
- 键盘聚焦时也可以显示。
- 手机端不依赖 Hover，点击照片即可查看信息。

## 6.6 Lightbox 全屏浏览

点击照片打开 Lightbox。

需要支持：

- 查看大尺寸照片。
- 完整显示构图，不强制裁切。
- 前一张、后一张。
- 键盘左右方向键。
- Esc 关闭。
- 关闭按钮。
- 手机触控操作。
- 图片加载状态。
- 合理的焦点管理。
- 保持当前语言和主题。

打开照片后，可以查看：

- 标题
- 拍摄日期
- 地点
- 描述
- Category
- Tags
- 摄影设备与参数

Lightbox 浏览顺序必须与当前筛选和排序结果一致。

## 6.7 摄影元数据

通过 `_data/photography.yml` 管理作品。

建议数据结构：

```yaml
- id: photo-001

  image: /assets/photography/photo-001.webp
  thumbnail: /assets/photography/thumbs/photo-001.webp

  title:
    en: Morning Encounter
    zh: 清晨的相遇

  description:
    en: A quiet moment in the morning light.
    zh: 清晨光线中的安静瞬间。

  date: 2026-10-12
  location: Guangdong

  category: wildlife

  tags:
    - birds
    - nature

  camera: Nikon Z8
  lens: 500mm f/5.6
  focal_length: 500mm
  aperture: f/5.6
  shutter_speed: 1/1000
  iso: 800

  alt:
    en: A bird perched on a branch
    zh: 停在树枝上的鸟
```

以上仅为数据结构示例，不代表我的实际摄影作品。

Category 和 Tag 的中英文显示名称通过独立配置映射。

摄影参数允许缺失，界面应自动隐藏缺失项目。

## 6.8 图片优化与性能

原始摄影文件可能非常大，需要建立标准的图片处理流程。

要求：

1. 不直接将 RAW 原片用于网页。
2. 为展示生成压缩后的 WebP 图片。
3. 生成适合画廊的小尺寸缩略图。
4. 支持不同屏幕尺寸的响应式图片。
5. 使用 Lazy Loading。
6. 尽量减少不必要的图片请求。
7. 保留良好的照片细节和色彩。
8. 正确处理图片方向。
9. 注意 EXIF 信息中的隐私数据。
10. 野生动物摄影不公开敏感物种的精确坐标。

提供简单的本地图片处理脚本，方便我以后批量添加作品。

尽量避免收费图片服务。

## 6.9 摄影内容维护

日后添加照片时，我希望只需要：

1. 将照片放入指定文件夹。
2. 运行图片优化脚本。
3. 在 YAML 中添加元数据。
4. 提交 GitHub。
5. 网站自动更新。

不需要手动修改 HTML。

摄影页面需要支持几十至数百张作品的长期积累，设计时注意渲染和加载性能，但第一版不必引入复杂后端或搜索服务。

---

## 七、阅读体验

实现：

- 响应式导航栏
- 手机端菜单
- 文章目录
- 代码高亮
- Markdown 表格
- 数学公式
- 图片展示
- 合理的字体层次
- 清晰的链接样式
- 键盘可访问性

避免复杂动画。

---

## 八、SEO 与性能

支持：

- SEO Metadata
- Open Graph
- Sitemap
- RSS
- Canonical URL
- 文章发布日期和更新日期
- 清晰的 URL 结构
- 图片性能优化
- 合理的缓存策略

尽量使用 GitHub Pages 支持的 Jekyll 插件。

如需要非原生支持的插件，可使用 GitHub Actions 自行构建。

---

## 九、GitHub Pages 部署

目标：

`https://<GITHUB_USERNAME>.github.io/`

任务：

1. 检查仓库现有结构。
2. 初始化 Jekyll。
3. 创建页面与布局。
4. 实现语言切换。
5. 实现主题切换。
6. 实现摄影画廊、分类、标签和排序。
7. 实现 Hover Caption 和 Lightbox。
8. 创建示例内容。
9. 添加图片优化脚本。
10. 配置 GitHub Pages 自动部署。
11. 执行构建测试。
12. 验证页面和资源路径。
13. 测试手机端布局。
14. 在权限允许时提交并推送代码。

如果需要我在 GitHub 后台手动授权或开启 Pages，请给出明确操作步骤。

部署成功必须通过真实构建结果或实际页面验证，不能仅根据代码提交推断。

---

## 十、开发文档

提供 README.md，说明：

- 如何本地运行网站。
- 如何新增中英文文章。
- 如何修改个人资料。
- 如何添加摄影作品。
- 如何创建新的 Category。
- 如何添加 Tag。
- 如何批量优化图片。
- 如何更改样式和主题。
- 如何部署与排查问题。

另外创建 AGENTS.md，说明：

- 项目架构
- 开发约束
- 目录结构
- 测试命令
- Coding Agent 修改规范

---

## 十一、初始内容

创建少量明确标记为 Demo 的示例内容。

Engineering Notes：

Building Reproducible Data Workflows / 如何构建可复现的数据加工工作流

Essays：

Why I Started an Engineering Lab / 为什么我开始记录工程研究笔记

Projects：

Data Processing Workflow Prototype

Photography：

提供至少六条虚拟照片元数据，用于验证：

- 不同分类
- 不同 Tag
- 正序与倒序排序
- 横图与竖图混排
- 中英文标题
- Lightbox 浏览

示例图片必须是有权使用的素材或明确标识的占位图，不得盗用他人的作品。

不得将这些示例伪装成我的真实作品。

---

## 十二、开发与验收

请按以下阶段执行：

Phase 1：初始化项目和部署环境。

Phase 2：开发个人主页、Notes、Projects、Essays、About。

Phase 3：实现中英文切换和 Light / Dark / System。

Phase 4：实现 Photography Gallery，包括分类、Tag、时间排序、Hover Caption、Lightbox。

Phase 5：优化性能、增加文档、运行测试及完成部署配置。

### 必须验证的交互

- 语言切换后页面内容正确。
- 主题切换后状态正确保存。
- 摄影分类筛选正确。
- Tag 筛选正确。
- 分类和 Tag 组合筛选正确。
- 时间从小到大排序正确。
- 时间从大到小排序正确。
- 筛选后排序仍然正确。
- Lightbox 的上一张、下一张遵循当前画廊顺序。
- 图片在不同屏幕下不出现明显变形。
- 键盘操作和手机端浏览正常。

请提供实际执行的测试结果。

**最终目标：一个简洁、专业、支持中英文与明暗主题、拥有可长期维护的技术博客和 Flickr 风格摄影画廊的个人网站。**

不要开发后台管理系统，不需要登录功能，不需要点赞或社交互动功能。

优先实现稳定、容易维护的第一版网站。