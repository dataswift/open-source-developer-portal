---
layout: twoColumn
section: guides
type: guide
guide: 
    name: sandbox-setup
    step: overview
title:  Get started with integrating bank transfers into your application
description: Test free programmatic bank transfers with Dwolla's bank transfer API in our developer sandbox. 
---

# Getting started in Sandbox

## Sandbox environment

The Sandbox environment is a complete replica of the Dwolla production environment, supporting all of the same API endpoints. Applications should be tested against the Sandbox environment before being used in production.

#### Differences from production environment

- The Sandbox contains only test data and is completely separate from your production account
- Actual money is not sent or received as part of test transactions. Real financial data should never be used in the Sandbox
- All API v2 endpoints have a base URL of `https://api-uat.dwolla.com/` instead of `https://api.dwolla.com/`

## Sandbox setup

During Sandbox account creation, Dwolla will associate a funding source, add $1000 to the account balance, and create an Application. You are then redirected to our Sandbox Dashboard at `https://dashboard-uat.dwolla.com/` where you can view your API key and secret and [generate OAuth tokens](/resources/token-generator.html).

- Use a valid email address to [create your Sandbox account](https://uat.dwolla.com/oauth/v2/authenticate?client_id=xxXlsnHdGTnA2U5evWXB9cDnxMHeGbIuNxdGX7aKLON4uVciPe&response_type=code&redirect_uri=https%3A%2F%2Fdashboard-uat.dwolla.com%2Fcallback&scope=send%7Cbalance%7Caccountinfofull%7Ccontacts%7Cfunding%7Crequest%7Ctransactions%7Cscheduled%7Cmanagecustomers%7Cmanageapplications&verified_account=true&state=DwollaSandboxDashboard)
- To simplify development, learn about configuring and using our [SDKs](/pages/sdks.html)

You’re ready to start sending money in Sandbox! You can jump straight into the [API docs](https://docsv2.dwolla.com/) or continue to the next guide below.

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="/guides/send-money">Next guide: Send money to your users</a>
</nav>
