---
title: "A Reading List of Classic Computer Systems Papers"
title_zh: "一份计算机系统经典论文书单"
description: "15 papers on distributed systems, databases, systems design, and AI infrastructure, with original sources and a short reason to read each."
description_zh: "15 篇分布式系统、数据库、系统设计与 AI 基础设施论文，附原始出处和简短推荐理由。"
date: 2026-11-11
updated: 2026-11-11
tags: [reading-list, computer-systems, papers]
math: false
---

<div data-lang="en" markdown="1">

Lately I've been interested in how computer systems are designed, especially work that uses a relatively simple idea to address a whole class of difficult problems.

MapReduce, Bigtable, and the more recent PagedAttention are good examples. Their appeal is not just that they made existing systems faster, but that they suggested a different way to think about the problem.

I put together fifteen papers on distributed computing, databases, systems architecture, and AI infrastructure. Some are decades old; others are recent.

This isn't a ranking or a list of papers I've already mastered. Think of it as a reading map, with links to the original publications.

## 01 / Starting with good abstractions

These papers show how a small interface or model can make a complicated underlying system easier to use.

### 1. MapReduce: Simplified Data Processing on Large Clusters (2004)

**Jeffrey Dean, Sanjay Ghemawat**

[Google Research · Paper](https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/)

If I were to start with only one paper, I'd choose MapReduce.

Programmers define Map and Reduce operations; the framework handles parallel execution, scheduling, and fault recovery.

The fascinating part isn't the two functions themselves. It's the decision about which complexities programmers should no longer have to deal with.

### 2. The Google File System (2003)

**Sanjay Ghemawat, Howard Gobioff, Jeffrey Leung**

[Google Research · Paper](https://research.google/pubs/the-google-file-system/)

Google's early distributed file system.

Its design starts with actual workloads: very large files, frequent hardware failures, and appends being more common than random overwrites.

Read it alongside MapReduce to see how workload assumptions can reshape infrastructure.

### 3. Bigtable: A Distributed Storage System for Structured Data (2006)

**Fay Chang et al.**

[Google Research · Paper](https://research.google/pubs/bigtable-a-distributed-storage-system-for-structured-data/)

A distributed storage system for structured data at scale.

Its data model is the interesting part: why organize information around rows, columns, and timestamps? Why not offer every feature of a traditional relational database?

Sometimes restraint is part of good design.

### 4. Resilient Distributed Datasets (2012)

**Matei Zaharia et al.**

[USENIX NSDI · Paper](https://www.usenix.org/conference/nsdi12/technical-sessions/presentation/zaharia)

An early research paper behind Apache Spark.

RDDs use deterministic transformations and lineage to reconstruct lost data partitions, making distributed in-memory computation fault-tolerant.

If you've worked with Spark, it's worth looking back at why it was designed this way.

### 5. Naiad: A Timely Dataflow System (2013)

**Derek Murray et al.**

[Microsoft Research · Paper](https://www.microsoft.com/en-us/research/publication/naiad-a-timely-dataflow-system-2/)

A dataflow system supporting batch, streaming, and iterative computation.

Could apparently different computation patterns share one execution model?

This one may require more background in distributed dataflow than the previous four.

## 02 / Systems always involve trade-offs

These are especially rewarding after building or operating real systems. Some complexity can be hidden; some is unavoidable.

### 6. End-to-End Arguments in System Design (1984)

**Jerome Saltzer, David Reed, David Clark**

[MIT · PDF](https://web.mit.edu/saltzer/www/publications/endtoend/endtoend.pdf)

A foundational argument about which layer of a system should be responsible for a function.

Can guarantees offered by a lower layer replace checks at the application level? The question remains relevant to networks, data pipelines, and software architecture.

### 7. A Note on Distributed Computing (1994)

**Jim Waldo et al.**

[Harvard · Paper](https://waldo.scholars.harvard.edu/publications/note-distributed-computing)

Why can't calling a remote object be treated exactly like a local call?

Latency, partial failures, and concurrency do not disappear behind a neat interface. A useful reminder that elegant abstractions have boundaries.

### 8. Dynamo: Amazon's Highly Available Key-value Store (2007)

**Giuseppe DeCandia et al.**

[Amazon Science · Paper](https://www.amazon.science/publications/dynamo-amazons-highly-available-key-value-store)

Amazon's highly available distributed key-value store.

It makes deliberate choices around fault handling, availability, and consistency. This is a good companion to Spanner.

### 9. Spanner: Google's Globally-Distributed Database (2012)

**James Corbett et al.**

[Google Research · Paper](https://research.google/pubs/spanner-googles-globally-distributed-database-2/)

Google's globally distributed database.

TrueTime is especially interesting: the system explicitly manages uncertainty in time to support externally consistent transactions.

A new infrastructure capability can sometimes change an entire architectural trade-off.

### 10. The Tail at Scale (2013)

**Jeffrey Dean, Luiz André Barroso**

[Google Research · Paper](https://research.google/pubs/the-tail-at-scale/)

Why can an overall request be slow even if most components respond quickly?

As requests fan out across many machines, a few stragglers can dominate end-to-end latency. This develops intuition about whole-system rather than individual-component performance.

### 11. Dapper: A Large-Scale Distributed Systems Tracing Infrastructure (2010)

**Benjamin Sigelman et al.**

[Google Research · Paper](https://research.google/pubs/dapper-a-large-scale-distributed-systems-tracing-infrastructure/)

How do engineers understand a request passing through dozens of services?

Dapper shows how distributed tracing can be designed as shared infrastructure instead of relying only on separate log statements.

### 12. Hints and Principles for Computer System Design (2020)

**Butler Lampson**

[Microsoft Research · Paper](https://www.microsoft.com/en-us/research/publication/hints-and-principles-for-computer-system-design-3/)

This one is a little different.

Lampson revisits lessons from decades of systems design, including simplicity, performance, dependability, and dealing with complexity.

It's the kind of paper worth returning to rather than reading only once.

## 03 / Rethinking old problems with new capabilities

These papers connect older systems ideas with newer computing workloads.

### 13. The Case for Learned Index Structures (2018)

**Tim Kraska et al.**

[Google Research · Paper](https://research.google/pubs/the-case-for-learned-index-structures/)

Could a database index be viewed as a predictive model?

The paper investigates learning where data is located. It doesn't make B+ trees obsolete, but it opens another way to think about a familiar data structure.

### 14. Efficient Memory Management for Large Language Model Serving with PagedAttention (2023)

**Woosuk Kwon et al.**

[ACM SOSP · Paper](https://doi.org/10.1145/3600006.3613165)

The influential vLLM paper.

It applies ideas from operating-system paging to KV-cache management in LLM serving, reducing memory waste and improving throughput.

A classic systems abstraction finds new life in a new computing environment.

### 15. SGLang: Efficient Execution of Structured Language Model Programs (2024)

**Lianmin Zheng et al.**

[NeurIPS · Paper](https://proceedings.neurips.cc/paper_files/paper/2024/hash/724be4472168f31ba1c9ac630f15dec8-Abstract-Conference.html)

A language and runtime for structured language-model programs.

As LLM applications move from individual calls to multi-step programs, are the usual execution models still appropriate? A useful entry point into modern AI systems research.

---

## If you only want to start with four

1. **MapReduce** — How much complexity can a good programming abstraction remove?
2. **The Google File System** — Why are real workloads more important than design convention?
3. **End-to-End Arguments** — Which complexities can't safely be hidden?
4. **Hints and Principles for Computer System Design** — How does an experienced systems designer think?

Not necessarily the four easiest papers, but they offer complementary perspectives.

I'll begin here, add my own notes as I go, and update the list as my interests change.

</div>

<div data-lang="zh" markdown="1">

最近对计算机系统的设计越来越感兴趣，尤其是那些用一个简单的想法，解决了一整类复杂问题的工作。

比如 MapReduce、Bigtable，还有后来把虚拟内存思想用到 LLM 推理中的 PagedAttention。

这些论文有个共同点：它们不只是把现有系统做得更快，而是尝试换一种方式理解问题。

我整理了 15 篇值得阅读的论文，主要涉及分布式计算、数据库、系统架构和 AI Infrastructure。既有几十年前的经典，也有近几年的研究。

这不是一份按重要性排序的榜单，也不是全部读完后的推荐。它更像是我给自己准备的阅读地图，附有论文原始出处。

## 01 / 从好的抽象开始

这几篇适合作为起点。它们展示了如何把复杂的底层机制封装成相对简单的接口。

### 1. MapReduce: Simplified Data Processing on Large Clusters (2004)

**Jeffrey Dean, Sanjay Ghemawat**

[Google Research · Paper](https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/)

如果只选一篇开始，我会选 MapReduce。

用户只需定义 Map 和 Reduce，系统则负责并行执行、任务调度和故障恢复。

有意思的不是 Map 或 Reduce 本身，而是作者决定把哪些复杂性从程序员面前拿走。

### 2. The Google File System (2003)

**Sanjay Ghemawat, Howard Gobioff, Jeffrey Leung**

[Google Research · Paper](https://research.google/pubs/the-google-file-system/)

Google 早期的分布式文件系统。

它的设计围绕真实工作负载展开：文件通常很大、硬件故障频繁，而且追加写入比随机修改更加常见。

适合和 MapReduce 连着读，看看工作负载如何影响基础设施的设计。

### 3. Bigtable: A Distributed Storage System for Structured Data (2006)

**Fay Chang et al.**

[Google Research · Paper](https://research.google/pubs/bigtable-a-distributed-storage-system-for-structured-data/)

一个面向大规模结构化数据的分布式存储系统。

值得关注的是它的数据模型：为什么采用这样的行、列和时间戳组织方式？为什么没有试图提供传统关系数据库的全部功能？

有时，克制本身就是设计的一部分。

### 4. Resilient Distributed Datasets (2012)

**Matei Zaharia et al.**

[USENIX NSDI · Paper](https://www.usenix.org/conference/nsdi12/technical-sessions/presentation/zaharia)

Apache Spark 背后的早期研究。

RDD 利用确定性转换及其依赖关系（Lineage）恢复丢失的数据分区，让分布式内存计算具有容错能力。

如果你熟悉 Spark 的使用，不妨反过来读读它最初为什么被设计成这样。

### 5. Naiad: A Timely Dataflow System (2013)

**Derek Murray et al.**

[Microsoft Research · Paper](https://www.microsoft.com/en-us/research/publication/naiad-a-timely-dataflow-system-2/)

一种支持批处理、流处理和迭代计算的数据流系统。

值得思考的是：这些看上去不同的计算模式，能否共享同一套执行模型？

相比前几篇，这篇可能需要更多数据流和分布式计算背景。

## 02 / 系统总是要做取舍

这一组论文比较适合在接触过实际系统开发后阅读。

它们讨论的不只是如何设计一个系统，还有为什么有些复杂性无法消除。

### 6. End-to-End Arguments in System Design (1984)

**Jerome Saltzer, David Reed, David Clark**

[MIT · PDF](https://web.mit.edu/saltzer/www/publications/endtoend/endtoend.pdf)

计算机系统领域非常经典的设计原则。

某种功能究竟应该放在系统的哪一层实现？底层提供的保证，是否足以替代应用端的检查？

虽然年代久远，但对今天的网络协议、数据管道和软件架构仍有参考价值。

### 7. A Note on Distributed Computing (1994)

**Jim Waldo et al.**

[Harvard · Paper](https://waldo.scholars.harvard.edu/publications/note-distributed-computing)

为什么不能像调用本地对象一样调用远程对象？

因为网络延迟、部分故障和并发行为是真实存在的，无法仅靠一个漂亮的接口让它们消失。

适合用来提醒自己：简洁的抽象也有边界。

### 8. Dynamo: Amazon's Highly Available Key-value Store (2007)

**Giuseppe DeCandia et al.**

[Amazon Science · Paper](https://www.amazon.science/publications/dynamo-amazons-highly-available-key-value-store)

Amazon 的高可用分布式键值存储系统。

它围绕可用性和故障处理作出一系列设计选择，并接受由此带来的一致性取舍。

可以和 Spanner 对照阅读。

### 9. Spanner: Google's Globally-Distributed Database (2012)

**James Corbett et al.**

[Google Research · Paper](https://research.google/pubs/spanner-googles-globally-distributed-database-2/)

Google 的全球分布式数据库。

最特别的部分是 TrueTime：系统明确处理时间的不确定性，并利用它实现外部一致性事务。

它展示了一个很有意思的思路：有时候，改变基础设施能够改变整个系统的设计空间。

### 10. The Tail at Scale (2013)

**Jeffrey Dean, Luiz André Barroso**

[Google Research · Paper](https://research.google/pubs/the-tail-at-scale/)

为什么一个服务中的大多数机器都很快，整个请求仍然可能很慢？

当请求需要经过大量组件时，少数慢操作就可能决定最终的响应时间。

这篇很适合培养从单个组件走向整个系统的性能直觉。

### 11. Dapper: A Large-Scale Distributed Systems Tracing Infrastructure (2010)

**Benjamin Sigelman et al.**

[Google Research · Paper](https://research.google/pubs/dapper-a-large-scale-distributed-systems-tracing-infrastructure/)

Google 的大规模分布式追踪系统。

当一个请求经过几十甚至上百个服务时，工程师怎样知道问题出在哪里？

Dapper 展示了如何把可观测性做成基础设施，而不是只靠各个服务分别打印日志。

### 12. Hints and Principles for Computer System Design (2020)

**Butler Lampson**

[Microsoft Research · Paper](https://www.microsoft.com/en-us/research/publication/hints-and-principles-for-computer-system-design-3/)

这篇和前面的论文有些不同。

Butler Lampson 总结了多年计算机系统设计中的经验，包括简洁性、效率、可靠性和如何处理复杂性。

它更像一本关于系统设计的思想笔记。可以不必从头到尾一次读完，而是隔一段时间重新翻看。

## 03 / 用新技术重新理解老问题

这一组更接近近年的 AI 和数据系统研究。

有意思的地方是，作者们经常把旧领域中的思想带到新的计算场景。

### 13. The Case for Learned Index Structures (2018)

**Tim Kraska et al.**

[Google Research · Paper](https://research.google/pubs/the-case-for-learned-index-structures/)

数据库索引能不能被看作一种预测模型？

这篇论文重新思考了传统索引的数据结构设计，探索如何利用机器学习预测数据的位置。

它没有证明 B+ 树已经过时，但提供了一个重新审视经典问题的角度。

### 14. Efficient Memory Management for Large Language Model Serving with PagedAttention (2023)

**Woosuk Kwon et al.**

[ACM SOSP · Paper](https://doi.org/10.1145/3600006.3613165)

vLLM 背后的代表性论文。

它把操作系统中的分页思想引入 LLM 的 KV Cache 管理，减少内存浪费，提高推理服务吞吐量。

经典系统思想在新的计算环境中重新发挥作用，是我很喜欢的一类研究。

### 15. SGLang: Efficient Execution of Structured Language Model Programs (2024)

**Lianmin Zheng et al.**

[NeurIPS · Paper](https://proceedings.neurips.cc/paper_files/paper/2024/hash/724be4472168f31ba1c9ac630f15dec8-Abstract-Conference.html)

为复杂的语言模型应用设计编程语言和执行运行时。

随着 LLM 应用从单次调用发展成包含多步推理、结构化生成和工具交互的程序，传统的执行方式是否仍然合适？

这篇可以作为了解现代 AI Systems Research 的一个起点。

---

## 如果只想先读四篇

我会从下面四篇开始：

1. **MapReduce** — 一个好的编程抽象能简化多少事情？
2. **The Google File System** — 为什么真实工作负载比传统设计习惯重要？
3. **End-to-End Arguments** — 哪些复杂性不能被隐藏？
4. **Hints and Principles for Computer System Design** — 有经验的系统设计者如何看待这些问题？

它们不一定是最容易的四篇，但能提供几种不同的系统设计视角。

我打算从这里开始阅读，并逐渐记录自己的理解。之后也许会加入新的论文，或者为其中一些论文单独写笔记。

这份清单会随着兴趣变化继续更新。

</div>
