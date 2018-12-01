---
layout: twoColumn
section: guides
type: iOS Developer's Guide
guide: 
    name: ios-guide
    step: 01-00-authenticate-with-hat
title: Authentication with HAT
description: Guide to authenticating HAT applications on the iOS platform
---
# Authentication with Hat

The `HAT` is an API-only service, meaning it does not enforce a specific `Application` or `User Interface` to expose the data to the user. Instead, authentication happens using the HAT APIs and the [Javascript Web Token](https://jwt.io) (`JWT`). Each HAT runs as a separate server and has a publicly-reachable address (such as `https://test.hubofallthings.net`). All calls in this documentation are therefore executed against an individual HAT. You can learn more in the [HAT documentation](https://developers.hubofallthings.com/guides/hat_login/).

# Steps

The steps in logging in with a HAT are:

1. You send the user to `/hatlogin` endpoint on their hat, such as `https://test.hubofallthings.net`
2. The HAT owner enters their login details in the login screen and verifies the service they are logging into
3. User gets redirected back to the address you have provided with authentication token in a query parameter. You validate the token against the HAT’s public key and know that the user owns the specific HAT and log them in.

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="01-01-hat-login.html">Next Step: Step 1 - Redirecting user to HAT Login</a>
</nav>