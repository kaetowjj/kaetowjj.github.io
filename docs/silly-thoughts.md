# Jerry's Silly Thoughts 收藏指南

解决如何添加、修改、删除真实幽默收藏，保存来源并维护全站 Footer 随机展示的问题。坚持 Curated, Not Generated，保留每条原文语言。

[← 返回项目入口](../README.md)

需要本地命令时，先完成[环境准备](development.md#setup)。 **本文所有终端命令均在仓库根目录执行，不是在 docs 目录中。**

<a id="thoughts"></a>
## How to Manage Jerry's Silly Thoughts

**Curated, Not Generated. 收藏真实短句，不生成笑话充数。** 入口是 [_data/quotes.yml](../_data/quotes.yml)。冷笑话、中文谐音、英文 puns、双关、荒诞短句都可以，不要求与技术相关。网站只展示收藏，不联网抓取、不调用翻译 API、不自动把 Hero 或普通技术文案加入收藏。

当前共 **12 条**收藏：原有2条与本次新增的10条中文冷笑话，均为 zh / both。下面是与 _data/quotes.yml 同步的完整数据，可复制结构维护；personal_collection 表示用户提供的个人收藏，**不声称为作者原创**，不编造作者、点赞数或来源：

```yaml
- id: chocolate
  text: "以柔克刚，以巧克力。🍫"
  lang: zh
  placement: both
  source_type: personal_collection
  source_url:
  author:
- id: mcdonalds
  text: "别人吃苦耐劳，我吃麦当劳。"
  lang: zh
  placement: both
  source_type: guancha_user_article
  source_url: "https://user.guancha.cn/main/content?id=1501441"
  author:
- id: willow-orange
  text: "无心插柳，柳橙汁。"
  lang: zh
  placement: both
  source_type: ptt
  source_url: "https://www.ptt.cc/bbs/joke/M.1699627861.A.678.html"
  author:
- id: corn-soup
  text: "遇水则发，玉米浓汤。"
  lang: zh
  placement: both
  source_type: ptt
  source_url: "https://www.ptt.cc/bbs/joke/M.1699627861.A.678.html"
  author:
- id: boat-porridge
  text: "水能载舟，亦能煮粥。"
  lang: zh
  placement: both
  source_type: ptt
  source_url: "https://www.ptt.cc/bbs/joke/M.1699627861.A.678.html"
  author:
- id: night-sandwich
  text: "夜路走多，总汇三明治。"
  lang: zh
  placement: both
  source_type: ptt
  source_url: "https://www.ptt.cc/bbs/joke/M.1699627861.A.678.html"
  author:
- id: yoshinoya
  text: "想吃吉野家，但吉野不在家。"
  lang: zh
  placement: both
  source_type: ptt
  source_url: "https://www.ptt.cc/bbs/joke/M.1699627861.A.678.html"
  author:
- id: roosevelt
  text: "儿孙自有儿孙福，螺丝自有罗斯福。"
  lang: zh
  placement: both
  source_type: ptt
  source_url: "https://www.ptt.cc/bbs/joke/M.1699627861.A.678.html"
  author:
- id: tiger-mountain
  text: "明知山有虎，别去明知山。"
  lang: zh
  placement: both
  source_type: ptt
  source_url: "https://www.ptt.cc/bbs/joke/M.1699627861.A.678.html"
  author:
- id: doraemon
  text: "一人做事一人当，小丁做事小叮当。"
  lang: zh
  placement: both
  source_type: ptt
  source_url: "https://www.ptt.cc/bbs/joke/M.1699627861.A.678.html"
  author:
- id: bandai
  text: "钱不是万能的，是万代的。"
  lang: zh
  placement: both
  source_type: ptt
  source_url: "https://www.ptt.cc/bbs/joke/M.1699627861.A.678.html"
  author:
- id: wise-words
  text: "听君一席话，如听一席话。"
  lang: zh
  placement: both
  source_type: ptt
  source_url: "https://www.ptt.cc/bbs/joke/M.1699627861.A.678.html"
  author:
```

新增10条由用户选自 [PTT joke 板的主帖或评论](https://www.ptt.cc/bbs/joke/M.1699627861.A.678.html)，按用户确认的中文文本和标点保存，不改写或自动翻译。统一使用 source_type: ptt 和该帖 source_url；author 保持为空。PTT 发言账号仅表示发布或评论账号，不能据此认定为原创作者。全站只在 Footer 展示 Jerry's Silly Thoughts；首页正文不再有 A Little Nonsense 区域。当前12条均可在 Footer 随机展示，切换界面语言不翻译原文。

Footer 语录位于居中的社交图标和版权下方，保持较小字号和较弱视觉权重。每次页面加载时随机选一条；刷新或进入另一页会重新抽取，可能再次抽到同一句。没有 Shuffle 按钮或自动轮播，也不再需要首页/页脚去重。只有一条时持续显示它，空集合隐藏语录区域。图标地址和布局维护见[Footer 个性化](customization.md#footer)。

### 添加、修改和删除收藏

1. 在 quotes.yml 点 Edit。新增时在末尾照上面结构追加一个以 - id 开始的对象，保留旧记录；不要覆盖整份文件。给新条目取唯一的英文短横线 ID。
2. 将用户提供或已核实的原句原样填入 text。含引号或冒号时注意 YAML 转义。使用双引号包裹时，内部双引号需加反斜线；使用单引号时，内部单引号需写成两个单引号。
3. lang 填 zh、en；混合句可填主要语言或 und。这个字段只用于语义和屏幕阅读器，不按网站语言过滤。中文不生成英文对应版，英文不翻译成中文；切换 UI 不会更换当前收藏。
4. 新增条目的 placement 填 footer。现有 both 继续兼容 Footer，不必批量修改收藏数据；旧 home 值仍可保存在数据中，但不再有对应展示区域，不会出现在 Footer。
5. 来源和作者按下表填写。修改时编辑原对象；删除时删除对应完整对象，保持其它条目不变。核对所有 ID 唯一和 placement 拼写。
6. Commit changes，或本地提交 _data/quotes.yml 后 push。等 Actions 成功，再打开首页、About 等其它页面，检查 Footer 原句、来源链接及换行。多刷新几次检查随机抽取；切换中英文后原句应保持不变。

| 字段 | 含义与填写要求 |
| --- | --- |
| id | 唯一标识。重复或无效记录会被展示层忽略，不应依赖忽略行为整理数据。 |
| text | 原文纯文本；不支持嵌入 HTML，标签按文字显示。 |
| lang | 原文语言标记，仅提供语义，不影响 UI 语言和随机范围。 |
| placement | footer：全站 Footer；both：兼容现有收藏，同样只显示在 Footer。home：旧数据值保留但不再展示。拼错/不填不会展示。 |
| source_type | personal_collection、ptt、reddit、tieba、douban 等；不表示网站已自动验证出处。 |
| source_url | 可选真实完整 HTTP(S) 原帖链接。个人提供且无原帖时留空；网络引用应保存可核实原帖。相对路径、脚本地址或含账号密码的 URL 不会成为链接。 |
| author | 已核实原作者，可选；不知道留空，不要填 Jerry 暗示所有收藏为原创。 |

### 保存 PTT、Reddit、贴吧等真实来源

先在浏览器打开原帖，核实对应原句。Reddit 可用 Share → Copy link，贴吧复制具体贴文地址。将实际复制的完整地址粘贴到 source_url（可用引号包裹），source_type 填 reddit 或 tieba；作者已核实且适合公开时再填 author。PTT可保存主帖或包含所选评论的具体帖子URL，source_type填ptt；不要把发言账号直接填为原创作者，无法确定时author留空。社区首页/搜索结果不替代具体原帖。打不开或无法核实时，不作为“已验证社区内容”发布，可暂存在个人笔记等待确认。本指南不提供虚构的示例原帖地址。

优先短句或简短语言双关，不批量复制长篇原创段子；较长内容更适合自己的简短摘要和原帖链接。不要把 AI 生成的摘要/笑话当成社区原句，不能冒充原作者。URL 检查只验证格式/协议，**不会自动验证作者、版权或出处真实性**，这些仍需收藏者确认。现有短句由用户挑选，来源链接用于记录发现位置；无法核实原创者时保持 author 为空，不应据此认定引用页面作者为原作者。

[← 返回 README](../README.md)
