# Jerry's Silly Thoughts 收藏指南

解决如何添加、修改、删除真实幽默收藏，保存来源并控制首页/页脚展示的问题。坚持 Curated, Not Generated，保留每条原文语言。

[← 返回项目入口](../README.md)

需要本地命令时，先完成[环境准备](development.md#setup)。 **本文所有终端命令均在仓库根目录执行，不是在 docs 目录中。**

<a id="thoughts"></a>
## How to Manage Jerry's Silly Thoughts

**Curated, Not Generated. 收藏真实短句，不生成笑话充数。** 入口是 [_data/quotes.yml](../_data/quotes.yml)。冷笑话、中文谐音、英文 puns、双关、荒诞短句都可以，不要求与技术相关。网站只展示收藏，不联网抓取、不调用翻译 API、不自动把 Hero 或普通技术文案加入收藏。

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

[← 返回 README](../README.md)
