---
layout: twoColumn
title:  "What is the HAT and why Build on It?"
description: "What is the HAT and why Build on It?"
---


<nav class="grid-nav">
    
    <div class="icon-logo-hat-large grid-nav__item grid-nav__item--large">
        <h3>Why build something on the HAT</h3>
        <ul>
        <li>Rich, horizontal data across a range of different sources</li>
        <li>Industry-grade security out of the box</li>
        <li>API-as-a-backend for fast prototyping and MVP creation</li>
        <li>Build what cannot be built with data not available before</li>
        <li>Customer acquisition support within the growing network</li>
        <li>Robust and versatile middleware for your applications</li>
        <li>Top-tier engineering and developers</li>
        </ul>
    </div>

    {% for page in filteredPages %}
        {% if page.guide.step == "overview" %}
            {% capture expectedUrl %}/{{ section }}/{{ page.guide.name }}{% endcapture %}
            <a href="{{expectedUrl}}" class="icon-logo-{{page.product}} grid-nav__item">
                <h3>{{page.type}}</h3>
                <p>{{page.description}}</p>
            </a>
        {% endif %}
    {% endfor %}
</nav>

<ul class="article-list">
    <li>
        <h3><a href="why/what_is_hat.html">About the HAT</a></h3>
        <p>Learn more about the Hub of All Things, and the technology behind it.</p>
    </li>
    <li>
        <h3><a href="why/why_build_something_on_the_hat.html">Why the HAT?</a></h3>
        <p>What are the benefits of bulding your business on the HAT?</p>
    </li>
    <li>
        <h3><a href="why/hat_platform_process_architecture.html">HAT Architecture</a></h3>
        <p>HAT Ecosystem Architecture and Processes - how the whole system ticks</p>
    </li>
</ul>

# The technology stack

The HATDeX Technology Suite ensures the HAT Platform is fully reconfigurable for the various use cases of personal data, across all sectors of the economy. It is designed and built to reduce the complexity of handling personal data and yet agile enough to allow the easy integration of its products into existing services.

<nav class="grid-nav">
    <a href="tech-stack/HAT_core.html" class="icon-logo-hat grid-nav__item">

<h3>HAT</h3>
        
<p>A Private ‘Microserver’ Data Account (PMDA)
&diams; Provisioned and customisable by any brand owner
&diams; Allows brand owner to have direct relationship with their customers and their data
&diams; Containerised database legally owned by individuals
&diams; Open-source core, built on the Internet and open standards, 
&diams; Portable across cloud systems</p>

    </a>
    <a href="tech-stack/rumpel.html" class="icon-logo-rumpel grid-nav__item">

<h3>Rumpel</h3>
        
<p> Generic dashboard for all HAT owners
&diams; Open sourced, Mozilla-licensed
&diams; White labelled provision for HAT providers to be integrated with their own app user accounts
&diams; Rumpel is the control centre for the HAT owner’s personal data </p>

    </a>
    
    <a href="tech-stack/milliner.html" class="icon-logo-milliner grid-nav__item">

<h3>Milliner</h3>
<p>Provisions HAT PMDAs on different cloud infrastructure
&diams; Integration of other PDS onto HAT platform
&diams; Enabling brand owners to be the Private Data Account provider
&diams; Enable brand owners and organisations to own the relationships with their customers, both business and end users</p>

    </a>
    <a href="tech-stack/dex.html" class="icon-logo-dex grid-nav__item">

<h3>DEX</h3>

<p> Enables the sharing of data points between HATs and organisations through APIs
&diams; Data Transaction Logging
&diams; Reports statistics across the ecosystem
&diams; HAT Access brokering for applications and developers</p>


    </a>
    <a href="tech-stack/databuyer.html" class="icon-logo-databuyer grid-nav__item">

<h3>DataBuyer</h3>

<p> Revolutionary way of exchanging and requesting for data
&diams; Offer benefits for past data, streaming data, future data
&diams; Insights for researchers, recommenders and marketing firms
&diams; Direct relationship &amp; contract with HAT owner 
&diams; Built on DEX</p>

    </a>

</nav>
