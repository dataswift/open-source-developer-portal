---
layout: twoColumn
section: guides
type: guide
guide:
    name: transfer-money-between-users
    step: '1'
title:  "Step 1: Generate an access token"
---

# Step 1: Generate an access token for your account

Visit [https://dashboard-uat.dwolla.com/applications](https://dashboard-uat.dwolla.com/applications) to generate an access token for your account. 

Press the **create token** button located beneath an application to generate a token with the scopes enabled that application. 

**Important:** Keep in mind that Dwolla’s implementation of the [OAuth 2.0](https://tools.ietf.org/html/rfc6749) standard uses short-lived access tokens and long-lived refresh tokens. The access token will expire one hour after it’s generated and you will have to generate a new one. Eventually, you'll need to implement a refresh strategy. Reference the [OAuth refresh strategies](https://developers.dwolla.com/resources/oauth-refresh-strategies.html) article for more information.

<nav class="pager-nav">
    <a href="./">Back: Overview</a>
    <a href="02-create-verified-customer.html">Next step: Create a verified customer</a>
</nav>