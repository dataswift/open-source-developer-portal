---
layout: twoColumn
section: guides
type: Data Debits for consented data sharing
guide: 
    name: data-debits
    step: 01-data-debit-proposal
title: Data Debit Proposal
description: Proposing a Data Debit to a HAT
# Parameters used in code examples
hat: test.hubat.net
access_token: ACCESS_TOKEN
---

The first step in retrieving private data from a HAT is to submit a Data Debit request - `POST /api/v2/data-debit/DATA_DEBIT_ID`. The `DATA_DEBIT_ID` can be any valid URL path, however it needs to be unique on the HAT.

The general schema of a Data Debit is:

```jsonnoselect
{
	"bundle": {
		"name": [String],
		"bundle": [Data Bundle Object]
	},
	"startDate": [ISO8601 Date],
	"endDate": [ISO8601 Date],
	"rolling": [Boolean]
}
```

Parameter 	| Type 					| Meaning
|:----------|:----------------------|:----- |
DATA_DEBIT_ID | URL Path			| ID of the data debit - any valid URL path
name		| String				| Unique name of the data bundle
bundle		| Data Bundle Object	| Data Bundle specification - covered in a [separate guide](../data-bundling)
startDate	| ISO8601 Date			| When data sharing should start
endDate		| ISO8601 Date			| When data sharing should finish
rolling		| Boolean				| Whether to automatically extend data sharing after the current period ends

As a concrete example, the below request asks for user profile together with location data - an example we used in the past.

```postman
"request": {
	"url": "https://{{page.hat}}/api/v2/data-debit/userprofile",
	"method": "POST",
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
		"raw": "{\n\t\"bundle\": {\n\t\t\"name\": \"userprofile\",\n\t\t\"bundle\": {\n\t\t\t\"profile\": {\n\t\t\t\t\"endpoints\": [\n\t\t\t\t\t{\n\t\t\t\t\t\t\"endpoint\": \"rumpel/profile\"\n\t\t\t\t\t}\n\t\t\t\t],\n\t\t\t\t\"limit\": 1\n\t\t\t},\n\t\t\t\"location\": {\n\t\t\t\t\"endpoints\": [\n\t\t\t\t\t{\n\t\t\t\t\t\t\"endpoint\": \"rumpel/locations\",\n\t\t\t\t\t\t\"mapping\": {\n\t\t\t\t            \"longitude\": \"data.locations.longitude\",\n\t\t\t\t            \"latitude\": \"data.locations.latitude\"\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t],\n\t\t\t\t\"limit\": 5\n\t\t\t}\n\t\t}\n\t},\n\t\"startDate\": \"2017-05-13T09:32:47+00:00\",\n\t\"endDate\": \"2017-06-13T09:32:47+00:00\",\n\t\"rolling\": false\n}"
	},
	"description": "Propose a data debit with the bundle of data and validity"
}
```

If your request is valid and hence accepted by the HAT, the response will contain the HTTP `201 CREATED` status, with the full specification of the data debit in the request body. It is important to reiterate, that both the Data Debit ID and the Bundle name must be unique - the former identifies the relationship between the user and an application, while the latter identifies the specific data being exchanged.

<nav class="pager-nav">
<a href="./">Previous Step: Overview</a>
<a href="02-approve-data-debit.html">Next Step: Approve Data Debit</a>
</nav>
