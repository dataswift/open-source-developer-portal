---
layout: twoColumn
section: guides
type: Provisioning
guide: 
    name: provisioning
    step: 02-create-hat
title: Step 2 - Create the HAT
description: Create all HAT resources with Milliner
---

HAT along with its separate Database only gets created when Milliner is instructed to do so via an authenticated request.

The three key parameters for creating a HAT include:

- `CLUSTER` which is the name of your HAT cluster, we can use `hubat.net` for testinng
- `HAT_ADDRESS` as the fully-qualified address of the HAT being created, such as `testhat.hubat.net`
- `SECRET` sent in the `X-Auth-Token` header - the shared secret you have been given to authenticate with Milliner. For the `hubat.net` testing cluster the value is currently `sd3_i*w7dv-#eobog)vr*iw%ht@7fw(=dc=uv4=m3bzq69sf_9`

*Note: You should never expose `SECRET` publicly, and hence never do provisioning purely from a frontend service.*

```postman
	"request": {
		"url": "https://<cluster>/api/manage/hat/create/<HAT_ADDRESS>",
		"method": "GET",
		"header": [
			{
				"key": "Content-Type",
				"value": "application/json",
				"description": ""
			},
			{
				"key": "X-Auth-Token",
				"value": "SECRET",
				"description": ""
			}
		],
		"body": {
			"mode": "raw",
			"raw": ""
		},
		"description": "Create the registered HAT on the cluster"
	}
```

<nav class="pager-nav">
<a href="01-sign-up">Previous Step: Sign user up</a>
<a href="03-register-hat.html">Next Step: Register HAT with DEX</a>
</nav>
