---
layout: twoColumn
section: guides
type: Data Debits for consented data sharing
guide: 
    name: data-debits
    step: 04-update-data-debit
title: Optional - Update Data Debit
description: If changes are required to a Data Debit, you can submit a request for the user to review the updated version
# Parameters used in code examples
hat: test.hubat.net
access_token: ACCESS_TOKEN
---

Your data requirements may change over time, so what are your options in making sure they are reflected in your relationship with the individual HAT owner?

1. Request a new Data Debit with the updated requirements
2. Update an existing Data Debit

The latter option has the benefit of you building on the existing relationship with the individual: they see the scope of your request increasing, however they will recognise you as somebody they have already agreed to share data with. If you choose this option, you need to submit an updated Data Debit request by calling `PUT /api/v2/data-debit/DATA_DEBIT_ID`.

This example simply requests for more of the most recent locations, increasing the limit from 5 to 10:

```postman
"request": {
	"url": "https://{{page.hat}}/api/v2/data-debit/userprofile",
	"method": "PUT",
	"header": [
		{
			"key": "Content-Type",
			"value": "application/json",
			"description": ""
		},
		{
			"key": "X-Auth-Token",
			"value": "{{page.access_token}}",
			"description": ""
		}
	],
	"body": {
		"mode": "raw",
		"raw": "{\n\t\"bundle\": {\n\t\t\"name\": \"userprofilebigger\",\n\t\t\"bundle\": {\n\t\t\t\"profile\": {\n\t\t\t\t\"endpoints\": [\n\t\t\t\t\t{\n\t\t\t\t\t\t\"endpoint\": \"rumpel/profile\"\n\t\t\t\t\t}\n\t\t\t\t],\n\t\t\t\t\"limit\": 1\n\t\t\t},\n\t\t\t\"location\": {\n\t\t\t\t\"endpoints\": [\n\t\t\t\t\t{\n\t\t\t\t\t\t\"endpoint\": \"rumpel/locations\",\n\t\t\t\t\t\t\"mapping\": {\n\t\t\t\t            \"longitude\": \"data.locations.longitude\",\n\t\t\t\t            \"latitude\": \"data.locations.latitude\"\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t],\n\t\t\t\t\"limit\": 10\n\t\t\t}\n\t\t}\n\t},\n\t\"startDate\": \"2017-05-13T09:32:47+00:00\",\n\t\"endDate\": \"2017-06-13T09:32:47+00:00\",\n\t\"rolling\": false\n}"
	},
	"description": "Propose a data debit with the bundle of data and validity"
}
```



<nav class="pager-nav">
<a href="03-request-data-debit-values.html">Previous Step: Request Values</a>
<a href="" style="display: none;"></a>
</nav>
