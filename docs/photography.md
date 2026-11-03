# 摄影作品维护

解决从导出原片、生成 WebP、手动合并元数据，到校验分类标签并发布摄影作品的问题。当前没有自动合并能力，请保留下面的完整导入步骤。

[← 返回项目入口](../README.md)

需要本地命令时，先完成[环境准备](development.md#setup)。 **本文所有终端命令均在仓库根目录执行，不是在 docs 目录中。**

<a id="photos"></a>
## 摄影作品：从原片到线上画廊

当前 [_data/photography.yml](../_data/photography.yml) 虽然扩展名是 yml，内容实际为 **JSON 数组**；分类和标签文件是 **JSON 对象**。JSON 可由 Jekyll 的 YAML 读取器处理。本手册统一保留现有 JSON 写法，这样 Node 的 JSON 校验和现有 Demo 脚本都适用。不要混用 YAML 的短横线写法与 JSON 逗号。

### A. 准备本次要上传的照片

1. 在 Lightroom、相机软件等工具中先将 RAW 导出为 JPEG、PNG、TIFF、WebP 或 AVIF。脚本支持 `.jpg/.jpeg/.png/.tif/.tiff/.webp/.avif`（不区分大小写）；RAW 不在支持列表内，会被跳过，不会自动冲洗。原片很大且包含私密元数据，不应直接放入公开网页仓库。
2. 使用唯一、可读的英文文件名，例如 `garden-20261012-01.jpg`。脚本会去扩展名、转小写、把非 a-z/0-9/下划线/短横线字符替换成短横线作为 ID。中文名或不同符号可能归一化到相同 ID，因此不推荐。
3. 将**本次新增**照片放在仓库根目录的 [originals/](../originals)。脚本仅处理该目录第一层，不递归子目录。可在资源管理器复制文件，也可用下方 PowerShell 命令。
4. [.gitignore](../.gitignore) 忽略 originals/*，只有 .gitkeep 被保留；这让普通 git add 不提交原图。它不加密、不备份文件，也不能让已经被跟踪的文件自动消失。不要使用 git add -f 强行提交原图。指定仓库外的输入目录时，原图也不会被复制到仓库。
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

1. 先备份 [_data/photography.yml](../_data/photography.yml)。不要在上次清单未处理完时再次运行脚本。
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

打开 [photo_categories.yml](../_data/photo_categories.yml) 与 [photo_tags.yml](../_data/photo_tags.yml)。它们是按 ID 映射双语名称的对象，不是照片数组。

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

仅有 GitHub 网页时，也必须先在本地完成脚本处理：在 [assets/photography/](../assets/photography) 点 Add file → Upload files 上传大图；在 thumbs/、responsive/ 的对应目录上传相应文件（需要新目录时可用本地 Git）。编辑 photography.yml 合并数据，再提交映射变更。网页上传**不会执行本地优化脚本**。分多次提交时可能短暂出现图片/数据不匹配，批量图片推荐使用本地 Git 一次提交。

| 问题 | 按顺序检查 |
| --- | --- |
| 图片 404 | image、thumbnail、每个 srcset.src 对应的 WebP 是否已提交？大小写是否完全相同？路径是否 /assets/photography/…？能否直接打开线上图片 URL？等待对应提交 deploy 成功再强制刷新。 |
| 新照片未出现 | 是否只运行了脚本却没合并清单？是否误覆盖/未保存 photography.yml？是否推送 main？清除分类与 Tag 筛选，检查排序；date=null 的照片在最后。 |
| 分类/标签不显示 | 是否在对应映射文件添加并提交了 ID/en/zh？照片使用的键名大小写是否一致？两套映射不要混淆。文章分类与摄影分类也不共用文件。 |
| JSON 格式错误 | 检查尾逗号、缺失逗号、引号、[]/{}；运行上面的 Node 校验，编辑器选择 JSON 语言模式可辅助检查。 |
| 图片变形或布局比例错误 | width/height 是否等于处理后的真实尺寸？是否手动替换 WebP 后没更新数据？重新处理并核对元数据；不要填原始 RAW 尺寸或随意写显示尺寸。 |
| Actions 构建/测试失败 | 打开本次提交失败步骤日志；先修复首个明确错误。JSON 错误可能导致 Jekyll 失败或画廊脚本异常，未提交图片也可能表现为浏览器测试失败。不要只根据 Commit 成功判断上线。 |

[← 返回 README](../README.md)
