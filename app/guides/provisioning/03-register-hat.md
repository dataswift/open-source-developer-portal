---
layout: twoColumn
section: guides
type: Provisioning
guide: 
    name: provisioning
    step: 03-register-hat
title: Step 3 - Register HAT with DEX
description: Sign a user up with Milliner
---

The final step is to register the HAT with the DEX to allow it to connect dataplugs, sign up for offers and otherwise become a member of the HAT ecosystem.

The 2 parameters passed to DEX are
* `hatAddress` - containing the fully-qualified address of the HAT.
* `applicationId` - the id of the application assigned to you during the onboarding process.

All other details (such as the HAT's public key) are fetched by DEX or registration fails if the HAT is not available.

```postman
	"request": {
		"url": "https://dex.hubofallthings.com/api/users/registerHat",
		"method": "POST",
		"header": [
			{
				"key": "Content-Type",
				"value": "application/json",
				"description": ""
			}
		],
		"body": {
			"mode": "raw",
			"raw": "{\n\t\"hatAddress\": \"testhat.hubat.net\",\n\t\"applicationId\": \"myApplicationId\"\n}"
		},
		"description": "Register a HAT with MarketSquare to allow it to connect dataplugs, sign up for offers and otherwise become a member of the HAT ecosystem"
	}
```

<nav class="pager-nav">
<a href="02-create-hat.html">Previous Step: Start the HAT</a>
<a href="04-out-of-the-box.html">Next Step: HATs out of the box</a>
</nav>
