---
layout: twoColumn
section: resources
type: article
title:  OAuth refresh strategies
description: "Manage OAuth access tokens for Dwolla's bank transfer API."
---

# OAuth refresh strategies

Dwolla’s implementation of the <a href="https://tools.ietf.org/html/rfc6749" target="_blank">OAuth 2.0</a> standard uses short-lived access tokens and long-lived refresh tokens. When a user account grants authorization to your application, Dwolla will issue an access token which expires in 1 hour and a refresh token which expires in 60 days. You’ll likely want to access a user account for longer than 1 hour, which means you’ll want to implement a way to refresh authorization. 

**Note**: A user account can represent your own account or an account that belongs to a user of your application. Follow these strategies even if you’re only using OAuth in order to access  your own account via the API.

**Important**: We recommend securely storing access/refresh tokens in a database with the associated user account. 

There are two recommended strategies for managing short-lived access tokens. If your application relies heavily on calling the Dwolla API several times in a day, we recommend setting up a cron job to refresh authorization constantly during the day. However, if for example, your application only calls Dwolla’s API once a day or once a month, we recommend refreshing your token pair prior to making any API call.

* * *

#### View:

*   [Preemptively refresh authorization](/resources/oauth-refresh-strategies/preemptively-refresh.html)
*   [Refresh on-demand](/resources/oauth-refresh-strategies/refresh-on-demand.html)
*   [Refresh best practices](/resources/oauth-refresh-strategies/refresh-best-practices.html)