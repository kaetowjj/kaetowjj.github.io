---
title: "How to Find a Research Direction"
title_zh: "如何找到自己的研究方向？"
description: "A practical essay on finding research problems through reading, engineering experience, experiments, and sustained curiosity."
description_zh: "从论文阅读、工程实践、动手实验与长期好奇心出发，探索如何逐渐找到值得研究的问题。"
date: 2026-11-11
updated: 2026-11-11
category: Learning
tags: [research, learning, computer-science]
math: false
---

<div data-lang="en" markdown="1">

Choosing a research direction is not quite the same as choosing a technology to learn.

Learning a technology usually comes with a fairly clear path: read documentation, understand the basics, build something, and gradually become proficient. Research often begins with a question for which there is no satisfactory answer. The hard part is not only finding an answer, but deciding which questions are worth asking.

A common dilemma for someone new to research is whether to choose a field first and then search for problems, or begin with interesting problems and let a research direction emerge.

Perhaps the more useful approach is to let the two shape each other over time.

## From curiosity to a research problem

In his well-known talk [You and Your Research](https://www.cs.virginia.edu/~robins/YouAndYourResearch), Richard Hamming discussed the value of keeping important problems in mind over a long period.

At Bell Labs, he deliberately set aside time to think about such questions rather than spending every moment on immediate tasks.

An easy distinction to overlook is that **an interesting problem, an important problem, and a researchable problem are not necessarily the same thing.**

"How can computer systems become simpler?" is an intriguing question, but it is too broad to investigate directly.

Narrowing it down helps: Why must distributed systems manage so much state? Which parts are needed to preserve correctness? Could a computation model reduce explicit state management?

Now the outline of a research problem begins to appear.

A promising problem generally addresses a real limitation, has not been satisfactorily resolved by existing work, and can be examined through analysis, experiments, or system building.

So the first step toward a research direction may not be deciding what to study, but **learning to turn vague curiosity into questions that can actually be investigated.**

## Read papers to understand how problems were found

Foundational papers record more than successful solutions. They also reveal how researchers understood the problem in front of them.

Consider MapReduce. Its most interesting feature is not simply the Map and Reduce operations. It is the observation that many distributed computing tasks share enough structure for the same framework to handle them.

Application developers no longer need to reimplement scheduling, partitioning, communication, and fault recovery for each job.

When reading a paper like this, it is useful to put the final solution aside for a moment and reconstruct the authors' situation:

- What was the main technical bottleneck at the time?
- Why were existing approaches unsatisfactory?
- What recurring pattern or fundamental constraint did the authors notice?
- What improved under the new design, and what did it sacrifice?
- If the problem were tackled today, would the original assumptions still hold?

The Motivation, Design, and Limitations sections can be just as valuable as the experimental results.

Over time, connections between papers begin to matter. Some research tries to eliminate complexity; other research shows why particular complexities cannot be eliminated.

Recognizing those connections is more useful than memorizing an isolated architecture or algorithm. It helps build a picture of a field—and suggests where unanswered questions might lie.

## Research interests often begin with practical work

Many influential computer systems projects began with recurring engineering difficulties rather than a grand theoretical ambition.

Early Apache Spark research is one example.

When Hadoop MapReduce was widely used, iterative computation and interactive analysis still suffered from performance and usability limitations.

Matei Zaharia and his collaborators studied those limitations and developed Resilient Distributed Datasets (RDDs), using the lineage of data transformations to support efficient in-memory computation and fault recovery.

The pattern is useful:

**Encounter a problem → notice it recurring → identify the common cause → propose a better abstraction → test it.**

Not every engineering problem deserves to become academic research, though.

Optimizing a database query or fixing a broken pipeline is usually normal engineering work. But if similar problems recur across many systems, and existing solutions share a weakness, there may be a more general opportunity.

The important move is to step away from a particular implementation and look for principles that apply elsewhere.

Engineering practice can be a place to observe research problems, not just a place to accumulate experience.

## Don't just read—build something

In [How to Do Great Work](https://paulgraham.com/greatwork.html), Paul Graham describes exploring a field by learning what is already known, reaching the frontier, noticing gaps, and trying to investigate them.

Reading papers alone, however, doesn't tell us whether we actually enjoy working in a particular area.

Admiring distributed systems design is not the same as enjoying distributed failures. Understanding a database optimization algorithm is not necessarily the same as wanting to spend months investigating query plans and benchmark results.

Research contains a great deal of uncertainty, repetition, failure, and apparently unproductive work.

One of the best ways to test an interest is to build something.

After reading MapReduce, implement a tiny execution framework. After reading about RDDs, try lineage-based recovery. After reading about learned indexes, compare traditional and learned approaches over different data distributions.

These experiments do not need to produce new research immediately.

Their value is in making hidden implementation details visible and revealing questions the paper cannot fully explore.

When an experiment contradicts expectations, investigating why may teach more than a successful reproduction.

## When is an interest worth pursuing for years?

A research direction is generally broader and more stable than a particular research question.

Distributed Systems is a field. Fault Tolerance is a research area within it. "How can failed tasks be recovered with less overhead under a particular dataflow execution model?" begins to look like a specific research problem.

There is no need to identify a perfectly precise question on day one. Instead, consider whether the interest can sustain deeper exploration.

**Does the interest last?** Is it exciting only while reading an elegant paper, or does it remain compelling after encountering its difficult details and limitations?

**Does the problem matter?** Could a solution help a class of systems, introduce a useful method, or improve our understanding of a phenomenon?

**Is there research space?** A topic may be important but already well served. Recent literature is needed to distinguish a genuine open problem from a rediscovery of existing work.

**Is it feasible?** Some work demands specialized hardware, massive clusters, or proprietary datasets. Open-source systems, public datasets, and modest compute resources can offer a more practical starting point.

An interest need not satisfy every criterion immediately. Exploration is partly the process of finding where these considerations intersect.

## Give a research interest time to develop

For someone without a clear direction, a year or two can be treated as a period of exploration, not a deadline for producing publications.

Start by reading broadly across a few neighboring fields: databases, distributed systems, operating systems, or AI systems. Try to understand the questions each area is asking.

Keep a question log alongside the reading. Record confusing design decisions, mechanisms that seem unnecessarily complicated, and assumptions worth checking.

As one area becomes more compelling, narrow the scope and follow recent work to understand the research frontier.

The next important shift is from reading to experimentation: reproduce existing results, build prototypes, and investigate how approaches behave under different conditions.

When a problem continues to hold up, conduct a more systematic literature review. Clarify what is known, the hypothesis to test, the resources required, and what a genuine contribution could look like.

This is also when discussions with researchers or potential supervisors become more concrete. Instead of asking which field to choose, there is a specific problem to discuss.

The process need not follow a strict schedule. One paper may lead to months of exploration; dozens of others may not.

## Stay interested in problems, not labels

Research field names shift as technology develops.

Questions that once belonged separately to databases, operating systems, and distributed computing can converge again under new hardware and workloads.

LLM serving is a good example. PagedAttention borrows ideas from virtual memory to manage the KV cache used during language-model inference. Important work in an emerging field can come from reusing a mature idea from another.

There is little reason to become attached too early to a particular technology label.

A more lasting question may be: **what kind of problems are genuinely enjoyable to work on?**

Some researchers enjoy proving algorithms correct. Others like pushing performance limits, designing simple interfaces for complicated requirements, or making systems dependable and secure.

These preferences may guide a research career more reliably than today's fashionable technology.

There may never be a single moment when a research interest is suddenly "found." More often, it becomes clearer through reading, building, failing, revising assumptions, and asking better questions.

What matters in the end is not finding a field that sounds impressive, but finding **a problem still worth working on after its difficulties become clear.**

---

## Further reading

- [Richard Hamming — You and Your Research](https://www.cs.virginia.edu/~robins/YouAndYourResearch)
- [Paul Graham — How to Do Great Work](https://paulgraham.com/greatwork.html)
- [Matei Zaharia et al. — Resilient Distributed Datasets](https://www.usenix.org/conference/nsdi12/technical-sessions/presentation/zaharia)
- [Jeffrey Dean & Sanjay Ghemawat — MapReduce](https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/)
- [Woosuk Kwon et al. — Efficient Memory Management for Large Language Model Serving with PagedAttention](https://doi.org/10.1145/3600006.3613165)

</div>

<div data-lang="zh" markdown="1">

选择一个研究方向，和选择一项想要学习的技术，并不是一回事。

学习技术通常有相对明确的路径：读文档、理解原理、完成项目，逐渐掌握它。而研究往往始于一个尚未得到满意解答的问题。困难的地方不仅在于找到答案，还在于判断哪些问题值得提出。

对于刚开始接触科研的人来说，一个常见的困惑是：究竟应该先选择研究领域，再寻找问题，还是先从感兴趣的问题出发，逐渐形成研究方向？

或许更合理的方式，是让两者在持续探索中相互影响。

## 从好奇到研究问题

Richard Hamming 在著名演讲 [You and Your Research](https://www.cs.virginia.edu/~robins/YouAndYourResearch) 中，谈到优秀研究者会持续思考领域内的重要问题。

他在贝尔实验室工作时，曾经有意识地留出时间思考这些问题，而不是把全部精力投入日常任务。

这里有个容易忽略的区别：**感兴趣的问题、重要的问题和适合研究的问题，并不完全相同。**

例如，“怎样让计算机系统变得更简单”是一个有趣而宏大的问题，但它很难直接形成一项研究。

如果进一步追问：

为什么分布式系统需要维护如此复杂的状态？哪些状态是保证正确性所必需的？是否存在一种计算模型，能够减少显式状态管理？

问题才逐渐出现可研究的轮廓。

一个好的研究问题通常需要具备几个性质：它涉及真实存在的局限，已有方法尚未充分解决，并且有可能通过理论分析、实验或系统构建进行验证。

因此，寻找研究方向的第一步，未必是决定研究什么，而是**学会把模糊的好奇心转化为具体的问题。**

## 阅读论文，是为了理解问题如何被发现

经典论文不仅记录了成功的解决方案，也保留了研究者当时对问题的理解。

以 MapReduce 为例，它最引人注目的地方不只是 Map 和 Reduce 两个操作，而是作者识别出大量分布式计算任务具有可以统一处理的共同结构。

任务调度、数据分区、故障恢复和机器间通信，并不需要每个应用开发者都重新实现。

于是，一个相对简单的编程模型，将大量复杂性转移到了框架内部。

阅读这样的论文，可以尝试暂时忽略它最终采用的方案，先理解作者当时面对的处境：

- 当时最主要的技术瓶颈是什么？
- 为什么已有解决方案无法令人满意？
- 作者发现了什么共同规律或关键约束？
- 新设计改善了什么，又牺牲了什么？
- 如果今天重新解决这个问题，原有假设是否仍然成立？

尤其值得阅读的是论文中的 Motivation、Design 和 Limitations，而不只是实验结果。

随着阅读积累，不同论文之间会逐渐产生联系。某些研究尝试消除复杂性，另一些研究则证明某些复杂性无法消除。

这些联系比孤立地记住某种算法或架构更有价值。

它们帮助读者建立对整个领域的理解，也为新的研究问题提供线索。

## 研究兴趣往往来自实际工作

计算机系统领域有很多重要的研究，起点并不是一个宏大的理论目标，而是反复出现的工程困难。

Apache Spark 的早期研究就是一个例子。

在 Hadoop MapReduce 已经广泛使用的时期，迭代计算与交互式分析仍然存在明显的性能和使用成本问题。

Matei Zaharia 和合作者从这些实际局限出发，提出了 Resilient Distributed Datasets（RDD），利用数据转换的依赖关系实现高效的内存计算与故障恢复。

这种研究方式提供了一条很有参考价值的路径：

**遇到问题 → 发现它反复出现 → 分析共同原因 → 寻找新的抽象 → 通过实验验证。**

不过，并非每个工程难题都值得发展成学术研究。

优化一次数据库查询、修复一个数据管道故障，通常只是正常的工程工作。

但如果大量不同的系统都面临相似问题，而现有解决方法存在共同局限，那么其中可能存在更普遍的研究机会。

关键在于从特定实现中抽离出来，寻找可以推广的规律。

实际工作不仅是积累经验的地方，也可能是观察研究问题的窗口。

## 不要只阅读，也要尝试构建

Paul Graham 在 [How to Do Great Work](https://paulgraham.com/greatwork.html) 中讨论过一种探索过程：深入学习一个领域，逐渐抵达已有知识的边界，发现其中的空缺，然后尝试探索。

但仅仅阅读论文，很难判断自己是否真的喜欢某个研究领域。

欣赏分布式系统的设计，不等于喜欢处理分布式系统的故障。

理解数据库优化算法的原理，也不意味着愿意花几个月分析执行计划、设计实验和反复测量性能。

真正的研究包含大量不确定性、失败、重复验证和看似没有进展的工作。

因此，判断兴趣最有效的方法之一，就是亲自动手。

例如，阅读 MapReduce 后，可以构建一个简化的执行框架；阅读 RDD 后，可以尝试实现一个基于 Lineage 的故障恢复机制；阅读 Learned Indexes 后，可以在不同数据分布下比较传统索引和学习型索引的表现。

这些实验不需要立即产生原创成果。

它们更重要的作用，是帮助理解论文没有完全展开的工程细节，并暴露新的问题。

当一个实验结果与预期不符时，继续追问原因，有时比成功复现结果更有价值。

## 如何判断一个兴趣值得长期研究？

研究方向通常比具体研究题目更加稳定。

例如，Distributed Systems 是一个领域；Fault Tolerance 是其中的研究方向；而“如何在某种数据流执行模型下，以更低开销恢复部分失败任务”，才可能逐渐发展为具体研究问题。

不必一开始就找到最精确的题目，但可以观察一个兴趣是否具有持续深入的空间。

首先看**兴趣的持续性**。

某个方向是否只在阅读一篇精彩论文时令人兴奋？还是在了解其中的困难、限制和已有研究后，仍然愿意继续探索？

其次是**问题的重要性**。

研究成果是否有可能改善一类系统，提供新的方法，或者帮助人们更准确地理解某种现象？

然后是**研究空间**。

一个方向可能非常重要，但已经拥有成熟而有效的解决方案。此时就需要进一步阅读近年的论文，了解尚未解决的问题，而不能只依靠直觉判断其新颖性。

最后是**现实可行性**。

有些研究需要大规模计算集群、特殊硬件或大量专有数据。对于个人研究者，能够使用开源软件、公开数据与有限计算资源开展的研究，往往是更实际的起点。

这些条件不需要一开始全部满足。探索的过程，本身就是逐渐找到它们交集的过程。

## 给研究兴趣一段自然形成的时间

如果尚未确定研究方向，可以把一到两年视为一个探索周期，而不是必须完成学术成果的期限。

最初几个月适合广泛阅读。选择几个相邻领域，例如数据库、分布式系统、操作系统和 AI Systems，先理解它们各自面对什么问题。

阅读经典论文时，可以同步建立一个问题日志。记录尚未理解的设计、觉得不合理的机制，以及值得进一步调查的疑问。

随着某个领域的吸引力逐渐增强，便可以缩小范围，开始阅读近几年的论文，了解研究前沿。

接下来最重要的变化，是从阅读转向实验：复现现有工作，构建原型，寻找已有方案在不同条件下的表现与局限。

当一个问题值得继续研究时，再进行系统性的文献调查，明确已有成果、可验证的假设、所需资源和可能的贡献。

到了这个阶段，和研究者或潜在导师交流会更有意义，因为已经可以围绕具体问题展开讨论，而不只是询问有哪些研究方向值得选择。

整个过程不必严格按照时间表推进。有时一篇论文就能引出持续数月的探索，有时读了几十篇论文，也还需要更多实践才能找到值得深入的问题。

## 保持对问题的兴趣，而不是对领域名称的执着

研究领域的名称会随着技术发展不断变化。

曾经分属数据库、操作系统和分布式计算的问题，可能因为新的硬件和计算需求而重新交汇。

LLM Serving 就是一个很好的例子。

PagedAttention 借鉴操作系统的虚拟内存管理思想，解决语言模型推理中的 KV Cache 内存管理问题。它说明，新兴领域的重要突破，有时恰恰来自对经典计算机系统思想的重新应用。

因此，研究兴趣不必始终与某一个技术标签绑定。

比起过早决定自己属于哪个领域，更有价值的可能是逐渐了解：究竟偏爱什么类型的问题？

有人喜欢证明算法的正确性，有人喜欢探索性能极限，有人擅长从复杂需求中创造简洁的接口，也有人更关心系统的可靠性与安全性。

这些长期稳定的问题偏好，可能比某项热门技术更能指引研究方向。

研究兴趣也许没有一个明确的发现时刻。

它更可能是在不断阅读、构建、失败、修正和重新提问的过程中，逐渐变得清晰。

最终需要找到的，不是一个看起来足够重要的研究领域，而是**一个即使了解了其中的困难，仍然愿意长期投入的问题。**

---

## 延伸阅读

- [Richard Hamming — You and Your Research](https://www.cs.virginia.edu/~robins/YouAndYourResearch)
- [Paul Graham — How to Do Great Work](https://paulgraham.com/greatwork.html)
- [Matei Zaharia et al. — Resilient Distributed Datasets](https://www.usenix.org/conference/nsdi12/technical-sessions/presentation/zaharia)
- [Jeffrey Dean & Sanjay Ghemawat — MapReduce](https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/)
- [Woosuk Kwon et al. — Efficient Memory Management for Large Language Model Serving with PagedAttention](https://doi.org/10.1145/3600006.3613165)

</div>
