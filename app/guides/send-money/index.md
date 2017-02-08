---
layout: twoColumn
section: guides
type: guide
guide: 
    name: send-money
    step: overview
title:  ACH transfers for your application
description: Send bank transfers programmatically with Dwolla's developer API. 
---

# Overview: Send money to your users

In this guide, we’ll cover the key points of transferring money:


- Create a receiving customer for the funds
- Associate a funding source (bank or credit union account) with the customer 
- Transfer fund to a customer's linked account

### Before you begin

You need to have a [Sandbox account](/guides/sandbox-setup) already set up. 

### Choose the experience you want for your customers

Dwolla offers two different paths for you to onboard your customers onto the payment platform. If you want to keep Dwolla in the background, choose our Access API. Otherwise, tap into Dwolla’s co-branded OAuth experience. [Contact sales](https://www.dwolla.com/contact) for information about pricing for each option. 

Regardless of which option you implement, the first step is to onboard recipients for your transfer, along with ensuring a funding source is added where money will be sent. Dwolla’s branded experience prompts your recipients for their bank or credit union account information. Otherwise, if you choose to integrate with the Access API, your application will need to capture the recipient's bank account information to pass through to Dwolla for secure storage.

### Next step: Choose your onboarding experience

*After this step you will be directed back to step 2 where the remaining process is the same.*
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
        <p>Dwolla captures your customer data.</p>
    </div>
</nav>
