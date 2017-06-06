---
layout: twoColumn
section: guides
type: Data Debits for consented data sharing
guide: 
    name: data-debits
    step: 02-approve-data-debit
title: Approve Data Debit
description: Data Debit needs to be approved by the HAT user
# Parameters used in code examples
hat: test.hubat.net
access_token: ACCESS_TOKEN
---

An application developer is not authorized to approve data debits, however that, like other operations on the HAT, is managed using an API call: `GET /api/v2/data-debit/DATA_DEBIT_ID/enable/BUNDLE_NAME`. Specifically, it requires both the Data Debit ID and the Bundle name to be set to accurately identify the data that is being shared.

```postman
"request": {
	"url": "https://{{page.hat}}/api/v2/data-debit/userprofile/enable/userprofile",
	"method": "GET",
	"header": [
		{
			"key": "X-Auth-Token",
			"value": "{{page.access_token}}",
			"description": ""
		}
	],
	"body": {
		"mode": "raw",
		"raw": ""
	},
	"description": "Propose a data debit with the bundle of data and validity"
}
```

<nav class="pager-nav">
<a href="01-data-debit-proposal.html">Previous Step: Data Debit Request</a>
<a href="03-request-data-debit-values.html">Next Step: Request Values</a>
</nav>
