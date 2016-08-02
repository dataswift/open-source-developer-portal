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

# Getting started

## Sandbox environment

The Sandbox environment is a complete replica of the Dwolla production environment, supporting all of the same API endpoints. Applications should be built and tested against the Sandbox environment before being used in production.

#### Differences from Dwolla production

- The Sandbox contains only test data and is completely separate from your production account
- Actual money is not sent or received as part of test transactions. Real financial data should never be used in the Sandbox
- The Sandbox web interface is available at `https://uat.dwolla.com/`
- All API V2 endpoints have a base URL of `https://api-uat.dwolla.com/` instead of `https://api.dwolla.com`

## Sandbox account

To get started, the first thing you need is a Sandbox account. You’ll be able to test your code end-to-end after creating test accounts, and use test credentials to make API requests and verify the responses.

## Overview

1. Create a Sandbox account with a valid email address belonging to you
2. Generate API credentials using your Sandbox account
2. Get an SDK and enable Sandbox mode

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="01-create-sandbox-account.html">Next step: Create a Sandbox account</a>
</nav>
