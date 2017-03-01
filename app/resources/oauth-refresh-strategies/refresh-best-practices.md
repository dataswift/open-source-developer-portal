---
layout: twoColumn
section: OAuth refresh strategies
type: article
title: "Refresh best practices"
weight: 2
description: "Manage OAuth access tokens for Dwolla's bank transfer API."
---

# OAuth refresh strategies - Transfer

## Best practices 

You should be able to deal with scenarios where a token is invalid even if you assume it is valid—e.g., if a user account revokes access to your application on dwolla.com. Check that the error is “Invalid access token” and that you are correctly passing in your token when calling Dwolla before requesting a new access/refresh token from Dwolla. 

- Consider possible race conditions where multiple threads attempt to use the same refresh token at the same time. In this case, one thread will succeed and cause the other thread’s request to fail. 
- Make sure you know the difference between a generic error and “Expired access token”. Be prepared to catch an expired access token error and refresh if needed. 
- Handle timeouts and non-successful requests to Dwolla.
- If refreshing authorization for many accounts at the same time, it’s important that you make each request sequentially instead of all at once.  For instance, if you attempt 10,000 refresh token requests at the same time, you’ll get responses, but many will result in timeouts, which mean you won’t know what the new access token and refresh token are.
