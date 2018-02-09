---
layout: twoColumn
section: guides
type: Building a Data Plug
guide: 
    name: building-data-plug
    step: overview
title: Building a Data Plug
description: How to build a new Data Plug for claiming data into a HAT using an example
product: dataplugs
weight: 8
---

In the HAT ecosystem, Data Plug is a minimal API-to-API web service with the primary purpose of fetching 
data from 3<sup>rd</sup> party API and pushing it to individuals's HAT. Due to the security considerations and limited 
scope of required functionality, each data plug is granted a write-only access to any particular HAT. Authorisation to post
data is obtained *via* an API call to [DEX service](/guides/dex/02-dataplugs.html) and requires prior registration of the plug.
Furthermore, plugs are able to post data to a limited namespace corresponding to their registration name. 

In order to create a fully functioning Data Plug, the following general requirements need to be met:

- Obtain user's authorisation to access their data *via* the 3<sup>rd</sup> party API
- Obtain authorisation to write data to the individual's HAT
- Implement general logic to move data from the API to the HAT
- Implement logic to maintain track of synchronised data for each endpoint

Solutions for the above requirements can be implemented with any backend technology stack as long as the API requirements
can be met.

### Open Source Data Plugs

Aiming to streamline the process of Data Plug development, we've created an [open source repository](https://github.com/Hub-of-all-Things/DataPlugs) 
that generalises a lot of the solutions to common tasks. While the code is written in Scala and uses the [Play Framework](https://www.playframework.com),
a functioning Data Plug can still be built with a limit knowledge of either of these technologies.

Currently, the codebase is centered around a "core" implementation that automates most of the processes related to 
authorisation and data synchronisation. Each individual plug then extends the core and adds it's own API-specific logic 
to deliver a fully functioning service. 

The focus of this tutorial is to give a brief introduction into how open source codebase is set up, give examples of 
how certain logical aspects are implemented and provide enough information to bootstrap your own Data Plug as quickly
as possible.

Contents of the tutorial:

- <a href="01-authentication.html">Step 1: Authentication</a>
- <a href="02-endpoint-setup.html">Step 2: Adding Endpoint Interfaces</a>
- <a href="03-data-validation.html">Step 3: Data Validation</a>
- <a href="04-collecting-endpoint-variants.html">Step 4: Collecting Endpoint Variants</a>
- <a href="05-putting-it-together.html">Step 5: Putting It Together</a>

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="01-authentication.html">Next Step: Authentication</a>
</nav>
