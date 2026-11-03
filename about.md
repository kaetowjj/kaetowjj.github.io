---
title: A Little Background.
nav: about
permalink: /about/
stylesheet: /assets/css/about.css
page_class: about-refined
---
<div class="page-heading"><h1>{% include bi.html en="A Little Background." zh="一些经历。" %}</h1></div>
{% include about-profile.html hide_intro=true %}
<div class="background">
<section class="background-education" markdown="0">
<h2>{% include bi.html en="Education" zh="教育经历" %}</h2>
<div class="background-item"><span class="background-date">2022–2024</span><div><h3>{% include bi.html en="University of New South Wales (UNSW)" zh="新南威尔士大学" %}</h3><p>{% include bi.html en="Master of Information Technology (Artificial Intelligence)" zh="信息技术硕士（人工智能方向）" %}</p></div></div>
<div class="background-item"><span class="background-date">2017–2021</span><div><h3>{% include bi.html en="Heilongjiang University" zh="黑龙江大学" %}</h3><p>{% include bi.html en="Network Engineering — Bachelor's Degree" zh="网络工程本科" %}</p></div></div>
</section>
<section class="background-experience" markdown="0">
<h2>{% include bi.html en="Experience" zh="工作经历" %}</h2>
<div class="background-item"><span class="background-date">{% include bi.html en="2025.07–Present" zh="2025.07–至今" %}</span><div><h3>{% include bi.html en="Shanghai Pudong Development Bank (SPD Bank), Guangzhou Branch" zh="上海浦东发展银行广州分行" %}</h3><p>{% include bi.html en="Technology / Data" zh="信息科技 / 数据方向" %}</p></div></div>
</section>
<section class="background-contact" markdown="0">
<h2>{% include bi.html en="Contact" zh="联系邮箱" %}</h2>
{% if site.data.profile.email != '' %}<p><a href="mailto:{{ site.data.profile.email | escape }}">{{ site.data.profile.email | escape }}</a></p>{% endif %}
</section>
</div>
<script type="module" src="{{ '/assets/js/about-avatar.mjs' | relative_url }}"></script>
