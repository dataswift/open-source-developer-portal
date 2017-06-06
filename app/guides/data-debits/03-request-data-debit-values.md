---
layout: twoColumn
section: guides
type: Data Debits for consented data sharing
guide: 
    name: data-debits
    step: 03-request-data-debit-values
title: Request Data Debit Values
description: Requesting values for an approved Data Debit
# Parameters used in code examples
hat: test.hubat.net
access_token: ACCESS_TOKEN
---

The most important step for an application developer is to access data. Once a Data Debit has been both proposed and approved by the HAT owner, it is achieved with a simple `GET /api/v2/data-debit/DATA_DEBIT_ID/values` call.

Using the previous example:

```postman
"request": {
	"url": "https://{{page.hat}}/api/v2/data-debit/userprofile/values",
	"method": "GET",
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
		"raw": ""
	},
	"description": ""
}
```

If the data debit is enabled, the response is exactly the same as if you were using Data Bundles directly:

```postmanresponse
"response": [
	{
		"name": "Data Debit values",
		"status": "OK",
		"code": 200,
		"header": [
			{
				"key": "Content-Type",
				"value": "application/json",
				"name": "Content-Type",
				"description": "The mime type of this content"
			}
		],
		"body": "{\"profile\":[{\"endpoint\":\"rumpel/profile\",\"recordId\":\"9b136020-372a-4777-81f9-2c4ce6925aea\",\"data\":{\"profile\": {\"website\": {\"link\": \"https://example.com\",\"private\": \"false\"},\"nick\": {\"private\": \"true\",\"name\": \"\"},\"primary_email\": {\"value\": \"testuser@example.com\",\"private\": \"false\"},\"private\": \"false\",\"youtube\": {\"link\": \"\",\"private\": \"true\"},\"address_global\": {\"city\": \"London\",\"county\": \"\",\"country\": \"UK\",\"private\": \"true\"},\"age\": {\"group\": \"\",\"private\": \"true\"},\"personal\": {\"first_name\": \"\",\"private\": \"false\",\"preferred_name\": \"Test\",\"last_name\": \"User\",\"middle_name\": \"\",\"title\": \"\"},\"blog\": {\"link\": \"\",\"private\": \"false\"},\"facebook\": {\"link\": \"\",\"private\": \"false\"},\"address_details\": {\"no\": \"\",\"street\": \"\",\"private\": \"false\",\"postcode\": \"\"},\"emergency_contact\": {\"first_name\": \"\",\"private\": \"true\",\"relationship\": \"\",\"last_name\": \"\",\"mobile\": \"\"},\"alternative_email\": {\"private\": \"true\",\"value\": \"\"},\"fb_profile_photo\": {\"private\": \"false\"},\"twitter\": {\"link\": \"\",\"private\": \"false\"},\"about\": {\"body\": \"A short bio about me shown on my PHATA\",\"private\": \"false\",\"title\": \"Me the Test User\"},\"mobile\": {\"no\": \"\",\"private\": \"true\"},\"gender\": {\"type\": \"\",\"private\": \"true\"}}}}],\"location\":[{\"endpoint\":\"rumpel/locations\",\"recordId\":\"e965e022-6613-476a-a0cd-1f587a41b148\",\"data\":{\"latitude\":\"51.671358277138\",\"longitude\":\"0.101014673709963\"}},{\"endpoint\":\"rumpel/locations\",\"recordId\":\"8f7afa92-39e2-48ab-8028-f5aebaa9918e\",\"data\":{\"latitude\":\"51.6658257133844\",\"longitude\":\"0.080477950927866\"}},{\"endpoint\":\"rumpel/locations\",\"recordId\":\"fcf1a26b-e49f-4457-915b-156e14140f38\",\"data\":{\"latitude\":\"51.674001392439\",\"longitude\":\"0.100905202634514\"}},{\"endpoint\":\"rumpel/locations\",\"recordId\":\"6a858d87-899e-4961-b722-0738d07c755e\",\"data\":{\"latitude\":\"51.6712232446779\",\"longitude\":\"0.0961801595986785\"}},{\"endpoint\":\"rumpel/locations\",\"recordId\":\"d3a6f04b-4df6-4888-a7b0-c1d5ca272de9\",\"data\":{\"latitude\":\"51.6641215101037\",\"longitude\":\"0.0641066288762133\"}},{\"endpoint\":\"rumpel/locations\",\"recordId\":\"f5ecf3b2-acb8-415b-bbc0-c461ae4b6d02\",\"data\":{\"latitude\":\"51.6638846789036\",\"longitude\":\"0.0876670796424967\"}},{\"endpoint\":\"rumpel/locations\",\"recordId\":\"0a34f819-04fa-4ca3-b487-83dbfd88bc5e\",\"data\":{\"latitude\":\"51.6638664482643\",\"longitude\":\"0.0804444774986063\"}},{\"endpoint\":\"rumpel/locations\",\"recordId\":\"25fbf064-a84f-47be-aa6d-58e5e8834648\",\"data\":{\"latitude\":\"51.6654130770375\",\"longitude\":\"0.0760907493532413\"}},{\"endpoint\":\"rumpel/locations\",\"recordId\":\"6875b1e8-3210-4b18-abaa-a50d4af688a4\",\"data\":{\"latitude\":\"51.650111765824\",\"longitude\":\"0.0816392546856438\"}},{\"endpoint\":\"rumpel/locations\",\"recordId\":\"082f2805-013c-490f-be5f-d9cdccea0231\",\"data\":{\"latitude\":\"51.6679758858417\",\"longitude\":\"0.073134033009478\"}}]}"
	}
]
```

If, on the other hand, you try to request data from a Data Debit that has not been enabled, you will receive an error:

```postmanresponse
"response": [
	{
		"name": "Data Debit disabled",
		"status": "Bad Request",
		"code": 400,
		"header": [
			{
				"key": "Content-Type",
				"value": "application/json",
				"name": "Content-Type",
				"description": "The mime type of this content"
			}
		],
		"body": "{\"message\":\"Bad Request\",\"cause\":\"Data Debit locationlocationlocation not enabled\"}"
	}
]
```

That's it! You have now successfully received data from a HAT user using a Data Debit agreement.

<nav class="pager-nav">
<a href="02-approve-data-debit.html">Previous Step: Approve Data Debit</a>
<a href="04-update-data-debit.html">Optional Step: Update Data Debit</a>
</nav>
