---
layout: twoColumn
section: guides
type: Data Exchange Services
guide: 
    name: dex
    step: overview
title: HAT Data Exchange services
description: How to use key DEX Services for application management
product: dex
weight: 5
# Parameters used in code examples
username: DEX_USERNAME
password: DEX_PASSWORD
access_token: ACCESS_TOKEN
---

The DEX (data exchange) service of HATDeX consists of:

- Data Exchange processes
- Data Transaction Logging, and statistics across the ecosystem
- HAT Access brokering for applications and develoeprs

These processes log all activities in the HAT ecosystem, responds to HAT requests to create Data Debits, installs Data Plugs, holds data transactions, verifies exchanges and quickly, accurately and securely sends and receives data between parties.

It reports the ecosystem statistics as well as integrating datasets and data services for third parties into the system.

The core aspects are:

1. [Statistics logging and reporting](01-statistics.html)
2. [Data Plug management](02-dataplugs.html)
3. [Data Offer brokering and setup](03-offers.html)
4. [New HAT onboarding](04-accounts.html)

Together they provide functionality for most applications to benefit from the Data Exchange, however if your needs aren't covered here, or if you need some help working out what you need, just [get in touch](mailto:contact@hatdex.org)!

### Authentication

DEX uses the same authentication methods as the HAT. When your DEX account is created, you are given a `username` and a `password`, which you use to retrieve an `access_token`:

```postman
"request": {
	"method": "GET",
	"header": [
		{
			"key": "username",
			"value": "{{page.username}}",
			"name": "username",
			"description": ""
		},
		{
			"key": "password",
			"value": "{{page.password}}",
			"name": "password",
			"description": ""
		}
	],
	"body": {},
	"url": "https://dex.hubofallthings.com/api/users/access_token",
	"description": ""
}
```

You use this token for all subsequent API requests to DEX by including it as a `X-Auth-Token` header.
