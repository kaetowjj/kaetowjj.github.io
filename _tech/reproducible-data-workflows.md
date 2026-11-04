---
title: Building Reproducible Data Workflows
title_zh: 如何构建可复现的数据加工工作流
description: "Demo — a working example of bilingual engineering documentation."
description_zh: "Demo：中英文工程文档示例。"
date: 2026-10-20
updated: 2026-11-02
tags: ["reproducibility","pipelines"]
demo: true
math: true
changelog:
  - date: 2026-11-02
    en: Initial demo document.
    zh: 初始演示文档。
---
<div data-lang="en" markdown="1">

## Problem
A workflow is useful only if another person can reproduce its output. This Demo compares an ad hoc script with a versioned pipeline.
## Constraints
Inputs change, environments drift, and retries must be safe.
## Alternatives

| Approach | Benefit | Cost |
| --- | --- | --- |
| Manual script | Quick start | Hidden assumptions |
| Versioned pipeline | Repeatable runs | Explicit configuration |

## Design
Keep immutable inputs, version transformations, and record environment details.

```python
from hashlib import sha256

def fingerprint(data: bytes) -> str:
    return sha256(data).hexdigest()
```

## Experiments
Compare input hashes before accepting a cached result. The illustrative model is:

$$T(n) = T_{read}(n) + T_{transform}(n)$$

## Results
No production benchmark has been performed. This example demonstrates documentation structure only.
## Lessons Learned
Treat the data contract as part of the code.

</div>

<div data-lang="zh" markdown="1">

## 问题
工作流的输出应当可以由其他人复现。本 Demo 比较临时脚本与版本化流水线。
## 约束
输入会变化，环境会漂移，重试需要安全。
## 备选方案

| 方案 | 收益 | 成本 |
| --- | --- | --- |
| 手动脚本 | 快速启动 | 隐含假设 |
| 版本化流水线 | 可重复执行 | 显式配置 |

## 设计
保留不可变输入，版本化转换过程，记录环境信息。

```python
from hashlib import sha256

def fingerprint(data: bytes) -> str:
    return sha256(data).hexdigest()
```

## 实验
复用缓存前比较输入哈希。以下公式仅展示排版：

$$T(n) = T_{read}(n) + T_{transform}(n)$$

## 结果
尚未进行生产基准测试，此示例仅演示文档结构。
## 经验
将数据契约视为代码的一部分。

</div>
