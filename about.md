---
title: About
nav: about
permalink: /about/
stylesheet: /assets/css/about.css
---
<div class="page-heading"><p class="eyebrow">THE PERSON BEHIND THE NOTES</p><h1><span data-en="About" data-zh="关于">About</span><span class="brand-dot">.</span></h1></div>
{% include about-profile.html %}
<div class="prose" data-lang="en" markdown="1">
### Education
[Institution · degree · dates]
### Experience
[Organization · role · dates]
### Beyond engineering
[Your interests and photography practice.]
### Contact
[Add an email address and LinkedIn URL in _data/profile.yml.]
</div>
<div class="prose" data-lang="zh" markdown="1">
### 教育经历
[院校 · 学位 · 时间]
### 工作经历
[机构 · 职位 · 时间]
### 工程之外
[介绍你的兴趣与摄影实践。]
### 联系方式
[在 _data/profile.yml 中添加邮箱和 LinkedIn 链接。]
</div>
{% if site.data.profile.email != '' %}<p><a href="mailto:{{ site.data.profile.email | escape }}">{{ site.data.profile.email | escape }}</a></p>{% endif %}

<script type="module" src="{{ "/assets/js/about-avatar.mjs" | relative_url }}"></script>
