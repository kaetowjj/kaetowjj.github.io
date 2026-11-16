---
title: "Research Track: From Token Consumption to Agent System Design"
title_zh: "研究方向：从 Token 消耗到 Agent 系统设计"
description: "A personal research agenda on shared context, memory, and computational reuse in multi-agent LLM systems, inspired by the cost of coding agents."
description_zh: "从 Coding Agent 的使用成本出发，探索多 Agent 系统的共享上下文、记忆管理和计算复用，并整理相关论文与工程实践路线。"
date: 2026-11-16
updated: 2026-11-16
category: Learning
tags: ["ai-agents", "llm-systems", "research"]
math: false
changelog:
  - date: 2026-11-16
    en: "Initial bilingual essay and research reading list."
    zh: "首次发布双语研究随笔与论文阅读清单。"
---

<div data-lang="en" markdown="1">

## Where this interest began

The starting point was quite ordinary: I was running out of my ChatGPT Plus usage allowance.

While developing this personal website with Codex, I moved from a single conversation to a multi-agent workflow. A coordinator could divide the work among agents responsible for exploration, implementation, testing, and independent review. This helped with a problem I had encountered in long conversations: the agent would gradually lose track of earlier details and decisions.

But using GPT-6.1 Sol with multiple agents introduced another problem. My usage allowance disappeared much faster than I expected. Even for a personal website, several agents investigating, implementing, and reviewing changes could be expensive in terms of model usage.

I initially wanted to save tokens. That led me to a broader question about how agent systems should be designed.

## First attempts: reduce unnecessary work

The first approach was to change the workflow rather than the model itself.

Not every task needs a team of agents. Correcting a sentence, publishing an essay, or editing a YAML file can usually be handled by one agent. Ordinary development may benefit from a focused explorer or reviewer. An architectural change, privacy-sensitive modification, or deployment migration may justify a more comprehensive workflow.

I began exploring several ways to allocate the available computation more deliberately:

- **Task classification and adaptive execution:** classify work by complexity, dependencies, and risk; escalate only when the initial approach is insufficient.
- **Agent routing:** select the roles and number of agents actually needed for a task.
- **Model routing:** use efficient models for routine work and stronger models for difficult reasoning, subject to the runtime's supported models and reasoning settings.
- **Context routing and prompt construction:** let the coordinator select relevant project rules, files, evidence, and acceptance criteria, and construct self-contained instructions for each subagent instead of forwarding an entire conversation.
- **Persistent project memory:** keep decisions, architecture, task status, and verified findings in versioned project files. Reuse evidence while it remains valid, rather than repeatedly investigating the same issue.

These ideas became part of the multi-agent workflow I was designing for this site. A GitHub Actions pipeline provides a separate quality gate, so saving model usage does not mean removing software tests or release checks.

But these are mainly ways of avoiding unnecessary work. They do not fully answer what happens when several agents genuinely need to process the same information.

## An analogy with CPU shared caches

I started thinking about conventional computer architecture. Multiple CPU cores have private execution state and can share higher-level caches and main memory. Independent execution does not require separate physical copies of all common data.

Could something similar be useful for LLM agents?

Imagine a developer, reviewer, and tester working on a repository. All three need the project's conventions, interfaces, and relevant source code. Yet each also needs its own role instructions, task state, and independent reasoning.

There are at least two different kinds of sharing to consider.

**Application-level shared memory** means sharing project documents, structured facts, task records, and evidence. It can reduce redundant information gathering and help agents recover from interrupted sessions. But reading the same shared document into several model contexts may still require repeated inference computation.

**Inference-level computational reuse** means reusing intermediate model states, such as the Transformer key-value (KV) cache. A serving system can reuse the cache of an identical token prefix rather than recomputing it for every request.

The CPU analogy is useful, but it is not exact. A token's KV representation depends on the preceding context and the model parameters. Two agents can read identical text after different role prompts and obtain different internal states. Different models normally cannot directly exchange arbitrary KV caches either.

This means that a shared file system, a shared logical memory, and a shared physical inference cache are three different things.

There is another issue: consistency. If a developer changes an interface, an explorer's earlier findings or a reviewer's assumptions may become stale. Sharing every agent's mutable context could also expose a reviewer to the implementer's conclusions and weaken the value of independent review.

A possible direction is to share stable knowledge and versioned evidence while keeping task-specific reasoning private. At the inference layer, reusable cache blocks could be shared where the model and context permit it. Changes would invalidate only the affected evidence or cache state, rather than forcing the entire system to start over.

This is a design hypothesis, not an implemented system or an experimental result.

## Research question

**How can multi-agent systems share knowledge and computation without sacrificing task isolation, consistency, and independent reasoning?**

This is a research direction I want to explore in 2027, alongside my broader reading in computer systems, technology history, and judgment.

I have not yet decided whether the most promising starting point is an application-level context manager, inference-level cache sharing, or workflow-aware scheduling. I would rather read the existing research and test a small system before committing to a particular solution.

## Reading list: foundations

The first three papers establish the basic mechanisms.

1. **Efficient Memory Management for Large Language Model Serving with PagedAttention** — SOSP 2023. [Paper](https://doi.org/10.1145/3600006.3613165) · [vLLM](https://github.com/vllm-project/vllm). Study block allocation, reference counting, fragmentation, and how ideas from virtual memory can improve KV-cache management and batching.
2. **MemGPT: Towards LLMs as Operating Systems** — 2023, arXiv. [Paper](https://arxiv.org/abs/2310.08560) · [Letta](https://github.com/letta-ai/letta). Study logical memory hierarchies and the movement of information into and out of a limited context window. This is a different problem from physical KV-cache sharing.
3. **SGLang: Efficient Execution of Structured Language Model Programs** — NeurIPS 2024. [Paper](https://proceedings.neurips.cc/paper_files/paper/2024/hash/724be4472168f31ba1c9ac630f15dec8-Abstract-Conference.html) · [Implementation](https://github.com/sgl-project/sglang). Study RadixAttention and how an inference runtime can exploit the shared prefixes, branches, and control flow of LLM programs.

## Reading list: multi-agent computational sharing

4. **KVCOMM: Online Cross-context KV-cache Communication for Efficient LLM-based Multi-agent Systems** — NeurIPS 2025. [Paper](https://proceedings.neurips.cc/paper_files/paper/2025/hash/1a074a28c3a6f2056562d00649ae6416-Abstract-Conference.html) · [Implementation](https://github.com/FastMAS/KVCOMM). This is the closest paper to my original question. It uses reference cache examples to adjust representations of overlapping content under different prefixes. I want to understand the accuracy assumptions, the cost of maintaining these references, and how well the approach generalizes.
5. **DroidSpeak: KV Cache Sharing Across Fine-tuned Model Variants** — NSDI 2026. [Paper](https://www.usenix.org/conference/nsdi26/presentation/liu-yuhan). The system selectively recomputes layers while reusing other cached layers across models with the same architecture. Read it to understand the relationship between model differences, recomputation, and quality. It does not establish that arbitrary heterogeneous models can share caches.
6. **LRAgent: Efficient KV Cache Sharing for Multi-LoRA LLM Agents** — ICML 2026. [Paper](https://proceedings.mlr.press/v306/jeon26b.html). The approach separates the shared pretrained contribution to the cache from adapter-dependent contributions and uses a specialized attention kernel. It connects my earlier experience with LoRA fine-tuning to inference systems.
7. **Learning Agent Execution for KV-Cache Management in Agentic Serving (CacheScout)** — 2026, preprint. [Paper](https://arxiv.org/abs/2608.14624). An agent-aware cache manager learns execution transitions and uses them to inform eviction and prefetching. I want to compare its approach with recency-based replacement and explore what happens when agent workflows change.

These are reading targets, not claims that I have reproduced their results. Conference papers and preprints should be evaluated against their actual assumptions and benchmarks.

## Existing engineering solutions to explore

There are already useful systems at several layers. They do not all solve the same problem.

| System | Mechanism | What I want to investigate |
| --- | --- | --- |
| [vLLM](https://github.com/vllm-project/vllm) · [Prefix caching](https://docs.vllm.ai/en/stable/features/automatic_prefix_caching/) | Paged KV-cache allocation and automatic prefix reuse | Identical versus different prompt prefixes, cache hits, memory and prefill latency |
| [SGLang](https://github.com/sgl-project/sglang) | RadixAttention and structured execution | Shared prefixes across branches and agent requests |
| [KVCOMM](https://github.com/FastMAS/KVCOMM) | Cross-context KV-cache alignment | Reuse when agents have different prompt prefixes |
| [Letta](https://github.com/letta-ai/letta) · [Memory block tutorial](https://docs.letta.com/tutorials/attaching-detaching-blocks/) · [Shared memory](https://github.com/letta-ai/letta-docs-md/blob/main/concepts/shared-memory/index.md) | Application-level shared memory blocks and Git-backed shared memory repositories | Shared knowledge, access boundaries, versioning and updates |
| [LangGraph](https://github.com/langchain-ai/langgraph) · [Workflow design](https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph) | Graph-based execution, shared state and persistence | Task dependencies, state handoffs and recovery |

Letta and LangGraph are starting points for logical agent memory and orchestration. vLLM, SGLang, and KVCOMM address inference computation. Combining the two levels is a separate engineering question.

## A small experimental plan for 2027

I would like to start with a controlled application-level experiment using this website, and then move to an open-model serving experiment.

**Phase one: coding-agent workflows.** Compare a single agent, a fixed multi-agent team, adaptive agent and model routing, and scoped context routing with versioned evidence reuse. Use comparable tasks and acceptance criteria, such as bug fixes or small features, and record actual agent launches, repeated investigations, validation attempts, elapsed time, and model usage where observable.

**Phase two: inference serving.** Use a small open model with vLLM or SGLang. Compare requests with caching disabled, an identical common prefix, and overlapping content after different prefixes. Separate cold-cache and warm-cache measurements. Keep the model and decoding settings comparable. If feasible, investigate the cross-context sharing methods from the papers rather than assuming ordinary prefix caching can handle arbitrary overlap.

**Phase three: consistency and isolation.** Use a versioned project snapshot and a shared evidence store. Change one interface or source file and measure which evidence needs to be refreshed. Test whether an independent reviewer can still detect defects without being given the developer's conclusions as ground truth.

Metrics would include input and output tokens, prefill latency, time to first token, cache-hit rate, GPU memory, throughput, task completion time, and correctness. The important distinction is that reducing input tokens and reducing repeated computation are not the same. Cache reuse may improve serving efficiency without reducing a subscription's usage allowance proportionally. Codex's internal caching and quota accounting are not part of the mechanisms I can directly control.

I would also like to compare single-model and heterogeneous-model routing, rather than assuming that the cheapest model allocation or the highest cache-hit rate necessarily produces the best overall system.

## Questions to keep open

- Which knowledge should be shared, and which reasoning state must remain private?
- Can a versioned context hierarchy offer useful isolation and inexpensive reuse at the same time?
- What makes an investigation result stale, and how can invalidation be limited to dependent tasks?
- Is the cost of coordinating several agents justified by measurable improvements in task quality?
- How should a runtime trade off model specialization against cache reuse?
- Can workflow dependencies predict future cache demand better than conventional recency-based policies?
- How can independent review remain effective when agents share evidence or model representations?

The research interest began with a subscription limit. It has become an opportunity to connect the systems I use every day with the underlying problems of memory management, scheduling, and computational reuse.

I do not want to decide the answer before doing the reading and experiments. I want to find out which parts of the problem have already been solved, which are still open, and whether I can build something small enough to understand and measure.

</div>

<div data-lang="zh" markdown="1">

## 研究兴趣的起点

这个研究方向的起点其实很简单：我的 ChatGPT Plus 套餐不够用了。

在使用 Codex 开发个人网站时，我尝试从单 Agent、多轮对话的开发方式转向 Multi-Agent 工作流。主 Agent 负责分解任务和协调进度，子 Agent 分别承担代码调查、开发、测试和独立审查。这有助于解决我在长对话中遇到的一个问题：Agent 逐渐忘记之前的细节和设计决策。

但使用 GPT-6.1 Sol 执行多 Agent 任务时，另一个问题出现了。即使只是维护一个个人网站，几个 Agent 分别调查、开发和审查代码，也很容易耗尽我的 Codex 使用额度。

最初我只是想节约 Token。这个问题后来逐渐延伸到了 Agent 系统应该如何设计。

## 先从减少不必要的工作开始

最初的尝试是改变开发工作流，而不是修改模型本身。

并不是每一个任务都需要一支 Agent 团队。修改一句文案、发布一篇随笔或编辑 YAML 数据，通常可以由单 Agent 完成。普通开发任务可能需要一个专门的调查或审查 Agent；架构变更、隐私相关修改以及部署迁移，才值得使用更完整的多 Agent 工作流。

我开始思考如何更合理地分配有限的计算资源：

- **任务分级与自适应执行（Adaptive Execution）**：根据复杂度、依赖关系和风险划分任务，只有在原有方式不足以解决问题时才升级。
- **Agent Routing**：根据任务选择实际需要的 Agent 角色和数量。
- **Model Routing**：将常规工作交给高效率模型，将复杂推理交给更强的模型，具体取决于运行环境支持的模型和推理设置。
- **Context Routing 与 Prompt 构造**：让主 Agent 自动判断子任务需要哪些项目规则、文件、证据和验收条件，生成范围明确、自包含的提示词，而不是转发整个对话。
- **持久化项目记忆**：将架构、设计决策、任务状态和已验证的调查结论保存在版本化的项目文件中，在证据仍然有效时复用它们。

这些思路逐渐成为我为个人网站设计的多 Agent 开发规范的一部分。同时，GitHub Actions 提供独立的质量门禁，使节约模型使用量不等于减少测试或取消发布检查。

不过，这些方法主要解决的是如何避免不必要的工作。它们并没有完全回答另一个问题：如果多个 Agent 确实需要处理相同的信息，为什么这些信息仍然需要被反复计算？

## 从 CPU 共享缓存想到 Agent 共享上下文

在思考这个问题时，我想到了传统计算机体系结构。

多个 CPU 核心拥有各自的执行状态，也可以共享更高层级的缓存和主内存。独立执行任务，并不意味着每个核心都必须为所有公共数据保存一份独立的物理副本。

多个 LLM Agent 是否也可以采用类似的设计？

假设一个软件项目中存在 Developer、Reviewer 和 Tester 三个 Agent。它们需要了解相同的项目规范、接口和相关源代码，但也需要各自独立的角色指令、任务状态和推理过程。

这里至少有两种不同的共享方式。

**应用层共享记忆**指多个 Agent 共享项目文档、结构化事实、任务记录和调查证据。这能够减少重复的信息收集，也能帮助 Agent 从中断的会话中恢复。但如果每个 Agent 都要将同一份文档加载到自己的上下文中，仍然可能产生重复的模型计算。

**推理层计算复用**指复用模型内部的中间状态，例如 Transformer 的 KV Cache。推理服务可以复用相同 Token 前缀已经计算出的缓存，而不需要为每个请求重新计算一遍。

CPU 缓存的类比有启发性，但不能完全照搬。Token 的 KV 表示与前序上下文和模型参数有关。两个 Agent 即使读取完全相同的文字，如果角色 Prompt 不同，也可能得到不同的内部表示。不同模型之间通常也不能直接交换任意 KV Cache。

因此，共享文件系统、共享逻辑记忆以及共享物理推理缓存，是三个不同的问题。

另外还有一致性问题。假如 Developer 修改了一个接口，Explorer 之前的调查结论或者 Reviewer 的已有假设可能就不再有效。如果多个 Agent 共享所有可变上下文，也可能使审查者受到开发者结论的影响，削弱独立审查的价值。

一个可能的方向是：共享稳定的项目知识与版本化证据，保留各个 Agent 私有的任务推理；在推理层，只在模型和上下文条件允许时共享缓存块。当信息变化时，仅使受影响的证据或缓存失效，而不是让整个系统重新开始。

这目前只是一个设计设想，并不是我已经实现的系统或经过实验验证的结论。

## 一个希望继续研究的问题

**How can multi-agent systems share knowledge and computation without sacrificing task isolation, consistency, and independent reasoning?**

多 Agent 系统如何在不牺牲任务隔离、状态一致性和独立推理能力的前提下，共享知识与计算？

这是我希望在 2027 年进一步探索的研究方向，也是我的技术、历史与判断力阅读计划中的一个专题。

我暂时还没有确定应该优先研究应用层的上下文管理器、推理层的 KV Cache 共享，还是理解 Agent 工作流的缓存调度。比起过早确定技术方案，我更希望先了解现有研究，再通过小规模的工程实验形成自己的判断。

## 论文阅读：基础系统机制

先从三篇论文理解已有的基础机制。

1. **Efficient Memory Management for Large Language Model Serving with PagedAttention** — SOSP 2023。[论文](https://doi.org/10.1145/3600006.3613165) · [vLLM](https://github.com/vllm-project/vllm)。理解缓存块分配、引用计数、内存碎片，以及操作系统的虚拟内存思想如何用于 KV Cache 管理和批处理。
2. **MemGPT: Towards LLMs as Operating Systems** — 2023，arXiv。[论文](https://arxiv.org/abs/2310.08560) · [Letta](https://github.com/letta-ai/letta)。了解逻辑记忆层次以及信息如何在有限的上下文窗口内外移动。它与物理层的 KV Cache 共享是不同的问题。
3. **SGLang: Efficient Execution of Structured Language Model Programs** — NeurIPS 2024。[论文](https://proceedings.neurips.cc/paper_files/paper/2024/hash/724be4472168f31ba1c9ac630f15dec8-Abstract-Conference.html) · [开源实现](https://github.com/sgl-project/sglang)。理解 RadixAttention，以及推理 Runtime 如何利用 LLM 程序的共享前缀、分支和控制流。

## 论文阅读：多 Agent 系统中的计算共享

4. **KVCOMM: Online Cross-context KV-cache Communication for Efficient LLM-based Multi-agent Systems** — NeurIPS 2025。[论文](https://proceedings.neurips.cc/paper_files/paper/2025/hash/1a074a28c3a6f2056562d00649ae6416-Abstract-Conference.html) · [开源实现](https://github.com/FastMAS/KVCOMM)。这是与我最初的问题最直接相关的论文。它利用缓存参考样本调整不同前缀下重叠内容的表示。我希望了解这种方法的准确性假设、维护参考样本的开销及其泛化能力。
5. **DroidSpeak: KV Cache Sharing Across Fine-tuned Model Variants** — NSDI 2026。[论文](https://www.usenix.org/conference/nsdi26/presentation/liu-yuhan)。系统在架构相同的模型之间选择性地重新计算部分层，同时复用其他层的缓存。重点关注模型差异、重新计算成本和推理质量的关系。这并不意味着任意异构模型都可以共享缓存。
6. **LRAgent: Efficient KV Cache Sharing for Multi-LoRA LLM Agents** — ICML 2026。[论文](https://proceedings.mlr.press/v306/jeon26b.html)。将缓存中的共享预训练模型贡献与 Adapter 相关贡献分离，并设计专门的 Attention Kernel。这也让我此前接触的 LoRA 微调技术与推理系统研究产生了联系。
7. **Learning Agent Execution for KV-Cache Management in Agentic Serving（CacheScout）** — 2026，预印本。[论文](https://arxiv.org/abs/2608.14624)。通过学习 Agent 之间的执行转换关系指导缓存淘汰与预取。我希望比较它与基于近期访问的替换策略，并观察 Agent 工作流变化时的表现。

这些是我的阅读目标，不代表我已经复现了论文结果。正式会议论文和预印本都需要结合实际假设与实验条件来理解。

## 值得了解的现有工程方案

目前已有一些可以参考的系统，但它们解决的问题并不完全相同。

| 系统 | 核心机制 | 希望研究的内容 |
| --- | --- | --- |
| [vLLM](https://github.com/vllm-project/vllm) · [前缀缓存](https://docs.vllm.ai/en/stable/features/automatic_prefix_caching/) | 分页式 KV Cache 分配与自动前缀复用 | 相同与不同前缀的缓存命中、内存占用和 Prefill 延迟 |
| [SGLang](https://github.com/sgl-project/sglang) | RadixAttention 与结构化程序执行 | 多个 Agent 请求和程序分支之间的公共前缀复用 |
| [KVCOMM](https://github.com/FastMAS/KVCOMM) | 跨上下文 KV Cache 对齐 | Agent 具有不同 Prompt 前缀时的计算复用 |
| [Letta](https://github.com/letta-ai/letta) · [Memory Block 教程](https://docs.letta.com/tutorials/attaching-detaching-blocks/) · [共享记忆](https://github.com/letta-ai/letta-docs-md/blob/main/concepts/shared-memory/index.md) | 应用层共享记忆块与基于 Git 的共享记忆仓库 | 公共知识、访问边界、版本管理及更新 |
| [LangGraph](https://github.com/langchain-ai/langgraph) · [工作流设计](https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph) | 基于图的任务执行、共享状态与持久化 | 任务依赖、状态交接和故障恢复 |

Letta 和 LangGraph 可以作为研究逻辑记忆与任务编排的起点；vLLM、SGLang 和 KVCOMM 则主要面向推理计算。如何将这两个层级结合起来，仍然是一个独立的工程问题。

## 2027 年的小规模实验计划

我希望先利用个人网站开展应用层的对照实验，再使用开源模型研究推理层机制。

**第一阶段：Coding Agent 工作流。** 比较单 Agent、固定多 Agent 团队、自适应 Agent 与模型路由，以及基于版本化证据复用的上下文路由。在任务范围和验收标准尽量一致的情况下，记录实际 Agent 启动次数、重复调查、验证次数、任务耗时以及能够获取的模型使用量。

**第二阶段：推理服务。** 使用小型开源模型与 vLLM 或 SGLang，比较关闭缓存、使用相同公共前缀、以及在不同前缀下处理重叠内容的请求。区分冷缓存和热缓存，尽量保持模型及解码设置一致。如果条件允许，再研究论文中的跨上下文复用方法，而不是假设普通前缀缓存可以处理任意重叠内容。

**第三阶段：一致性与隔离。** 使用版本化的项目快照和共享证据，修改一个接口或源文件，观察哪些证据必须刷新。同时测试独立 Reviewer 在不将 Developer 的结论视为事实的情况下，能否发现实现中的缺陷。

实验指标可以包括输入与输出 Token、Prefill 延迟、首 Token 延迟、缓存命中率、GPU 内存占用、吞吐量、任务完成时间以及正确性。

这里有一个重要区别：减少输入 Token 与减少重复计算并不是一回事。缓存复用可以提高推理服务效率，但不一定会让商业订阅的使用额度按相同比例减少。Codex 的内部缓存机制和额度计算也不是我能够直接控制的部分。

我还希望比较同模型和异构模型路由，而不是假设最便宜的模型组合或最高的缓存命中率一定能带来最好的整体效果。

## 值得继续思考的问题

- 哪些知识应该共享，哪些推理状态应该保持私有？
- 版本化的上下文层次能否同时提供任务隔离与低成本复用？
- 调查证据什么时候失效，能否将失效范围限制在受影响的任务？
- 多 Agent 的协调成本是否能够通过可测量的任务质量提升得到补偿？
- 如何在模型专业化与缓存复用之间做出权衡？
- Agent 的工作流依赖关系能否比传统的近期访问策略更准确地预测未来缓存需求？
- 当多个 Agent 共享证据或者模型内部表示时，如何保证独立审查仍然有效？

这个研究兴趣起初来自一个订阅额度的问题。现在，它逐渐成为一个机会，让我从每天使用的 AI 开发工具出发，去理解背后的内存管理、调度和计算复用问题。

我不想在阅读与实验之前就确定答案。我更希望弄清楚哪些问题已经有人解决，哪些仍然开放，以及自己能否构建一个足够小、可以理解和测量的系统。

</div>
