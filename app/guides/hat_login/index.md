---
layout: twoColumn
section: guides
type: HAT Login
guide: 
    name: hat_login
    step: overview
title: Log in with HAT
description: Allow your users to log in with their HAT
---

The HAT is an API-only service, meaning it does not enforce a specific Application or User Interface to expose the data to the user. Instead, authentication happens using the HAT APIs and the [Javascript Web Token](https://jwt.io) (JWT). Each HAT runs as a separate server and has a publicly-reachable address (such as `https://test.hubofallthings.net`). All calls in this documentation are therefore executed against an individual HAT. The same login mechanism is used across all applications in the ecosystem, including:

- The primary HAT dashboard, such as
	- [Rumpel](https://rumpel.hubofallthings.com)
	- or the mobile counterpart [RumpelLite](https://itunes.apple.com/gb/app/rumpel-lite/id1147137249?mt=8)
- Data Plugs, e.g.:
	- [Twitter](https://twitter-plug.hubofallthings.com)
	- [Facebook](https://social-plug.hubofallthings.com)
	- [Google Calendar](https://googlecalendar-plug.hubofallthings.com)
- Other websites:
	- HAT service subscription management at [Hatters](https://hatters.hubofallthings.com/signin)
	- The opinions and polling service [B.Heard](https://www.bheard.com/login)

The list goes on, but importantly the HAT differentiates services into two kinds: *approved* and *generic*:

- approved ones have been configured with a HAT and may have special permissions such as accessing HAT data (such as Rumpel) or entering new data (Data Plugs)
- generic services that only need to validate that the individual owns a specific HAT.

The steps in logging in with a HAT are:

1. You send the user to `/hatlogin` endpoint on their hat, such as `https://test.hubofallthings.net`
2. The HAT owner enters their login details in the login screen and verifies the service they are logging into
3. User gets redirected back to the address you have provided with authentication token in a query parameter. You validate the token against the HAT's public key and know that the user owns the specific HAT and log them in

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="01-send-hat-login.html">Next step: Send user for HAT login</a>
</nav>
