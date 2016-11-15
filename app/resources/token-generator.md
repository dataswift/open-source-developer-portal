---
layout: twoColumn
section: resources
type: tool
title:  "Token Generator"
description: "Generate an OAuth access token for Dwolla's bank transfer API."
---

# Token generator

The Dwolla API requires an OAuth access token for authorization. Whether you’re using the API for payouts or integrating with Dwolla White Label, sometimes you just need an access token for your own account without going through the hassle of creating an entire [OAuth flow](https://docsv2.dwolla.com/#request-user-authorization).

### Generate an access token for your own Dwolla account

To generate an account access token, navigate to the applications page within the Dashboard, located at [https://dashboard.dwolla.com/applications](https://dashboard.dwolla.com/applications) (the Sandbox equivalent is located at [https://dashboard-uat.dwolla.com/applications](https://dashboard-uat.dwolla.com/applications)). This page contains a list of existing applications you have created.

![Screenshot of Token Generator](/images/token-generator.png "Token Generator")

The **create token** button located beneath each application allows you to easily generate an access token. The token generated contains the scopes enabled on your application.

**Important:** Keep in mind that Dwolla’s implementation of the [OAuth 2.0](https://tools.ietf.org/html/rfc6749) standard uses short-lived access tokens and long-lived refresh tokens. The access token will expire one hour after it’s generated and you will have to generate a new one. Eventually, you'll need to implement a refresh strategy. Reference the [OAuth refresh strategies](https://developers.dwolla.com/resources/oauth-refresh-strategies.html) article for more information.
