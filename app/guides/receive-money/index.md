---
layout: twoColumn
section: guides
type: guide
guide: 
    name: receive-money
    step: overview
title:  Receive bank transfers within your application
description: Programmatically collect money from customer bank accounts with bank transfers. 
---

# Overview: Receive money from your users

In this guide, we’ll cover the key points of collecting money from your customers by utilizing our open API with no per transaction fees.

- Create a sending customer for the funds
- Associate a verified funding source (bank or credit union account) with the customer
- Transfer funds from the customer’s linked account 

*Prerequisite*: complete the [Getting started guide](/guides/sandbox-setup).

### Choose the experience your want for your customers

Dwolla offers two different paths for you to onboard your customers onto the payment platform. If you want to keep Dwolla in the background, choose our Access API. Otherwise, tap into Dwolla’s co-branded OAuth experience. [Contact sales](https://www.dwolla.com/contact) for information about pricing for each option. 

Regardless of which option you implement, the first step is to create senders for your transfer, along with a funding source where the money will be pulled from. Dwolla’s Co-branded experience prompts your senders for their bank or credit union account information. Otherwise, if you choose to integrate with the Access API, your application will need to capture these fields to pass through to Dwolla for secure storage.

<nav class="decision-nav">
    <div>
        <a href="01-white-label-onboarding.html">
            <div class="icon-decision-nav-white-label"></div>
            Access API
        </a>
        <p>You capture customer data and pass it to Dwolla.</p>
    </div>
    <div>
        <a href="01-direct-onboarding.html">
            <div class="icon-decision-nav-direct"></div>
            Co-branded
        </a>
        <p>Dwolla captures your customers data.</p>
    </div>
</nav>
