---
layout: twoColumn
section: guides
type: The power of HAT data bundling
guide: 
    name: data-bundling
    step: 02-data-bundles
title: Data Bundles
description: Aggregating data in bundles
# Parameters used in code examples
hat: test.hubat.net
access_token: ACCESS_TOKEN
---

Data Bundles add a thin layer around combinators, useful in 2 ways:

1. Retrieving data into explicitly named properties from different combinators
2. Accepts `orderBy` and `limit` parameters to control how many data points are returned for a specific bundle property

Using previously covered examples of profile and location data, they are clearly very distinct, but an application may still benefit from having both at the same time. For instance, it may only care for the most recent information on user's profile and their 5 most recent locations:

```postman
"request": {
	"url": "https://{{page.hat}}/api/v2.6/data-bundle/localprofile",
	"method": "POST",
	"header": [
		{
			"key": "X-Auth-Token",
			"value": "{{page.access_token}}",
			"description": ""
		},
		{
			"key": "Content-Type",
			"value": "application/json",
			"description": ""
		}
	],
	"body": {
		"mode": "raw",
		"raw": "{\n\t\"profile\": {\n\t\t\"endpoints\": [\n\t\t\t{\n\t\t\t\t\"endpoint\": \"rumpel/profile\"\n\t\t\t}\n\t\t],\n\t\t\"limit\": 1\n\t},\n\t\"location\": {\n\t\t\"endpoints\": [\n\t\t\t{\n\t\t\t\t\"endpoint\": \"rumpel/locations\",\n\t\t\t\t\"mapping\": {\n\t\t            \"longitude\": \"data.locations.longitude\",\n\t\t            \"latitude\": \"data.locations.latitude\"\n\t\t\t\t}\n\t\t\t}\n\t\t],\n\t\t\"limit\": 5\n\t}\n}"
	},
	"description": "Data can be bundled together across different sources into a single object of interest - used for apps as well as the basis of reqesting data for Data Debits"
}
```

The response includes the specific data requested: 

```postmanresponse
"response": [
	{
		"name": "Bundled data",
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
		"body": "{\"profile\":[{\"endpoint\":\"rumpel/profile\",\"recordId\":\"9b136020-372a-4777-81f9-2c4ce6925aea\",\"data\":{\"profile\": {\"website\": {\"link\": \"https://example.com\",\"private\": \"false\"},\"nick\": {\"private\": \"true\",\"name\": \"\"},\"primary_email\": {\"value\": \"testuser@example.com\",\"private\": \"false\"},\"private\": \"false\",\"youtube\": {\"link\": \"\",\"private\": \"true\"},\"address_global\": {\"city\": \"London\",\"county\": \"\",\"country\": \"UK\",\"private\": \"true\"},\"age\": {\"group\": \"\",\"private\": \"true\"},\"personal\": {\"first_name\": \"\",\"private\": \"false\",\"preferred_name\": \"Test\",\"last_name\": \"User\",\"middle_name\": \"\",\"title\": \"\"},\"blog\": {\"link\": \"\",\"private\": \"false\"},\"facebook\": {\"link\": \"\",\"private\": \"false\"},\"address_details\": {\"no\": \"\",\"street\": \"\",\"private\": \"false\",\"postcode\": \"\"},\"emergency_contact\": {\"first_name\": \"\",\"private\": \"true\",\"relationship\": \"\",\"last_name\": \"\",\"mobile\": \"\"},\"alternative_email\": {\"private\": \"true\",\"value\": \"\"},\"fb_profile_photo\": {\"private\": \"false\"},\"twitter\": {\"link\": \"\",\"private\": \"false\"},\"about\": {\"body\": \"A short bio about me shown on my PHATA\",\"private\": \"false\",\"title\": \"Me the Test User\"},\"mobile\": {\"no\": \"\",\"private\": \"true\"},\"gender\": {\"type\": \"\",\"private\": \"true\"}}}}],\"location\":[{\"endpoint\":\"rumpel/locations\",\"recordId\":\"e965e022-6613-476a-a0cd-1f587a41b148\",\"data\":{\"longitude\":\"0.101014673709963\",\"latitude\":\"51.671358277138\"}},{\"endpoint\":\"rumpel/locations\",\"recordId\":\"fcf1a26b-e49f-4457-915b-156e14140f38\",\"data\":{\"longitude\":\"0.100905202634514\",\"latitude\":\"51.674001392439\"}},{\"endpoint\":\"rumpel/locations\",\"recordId\":\"8f7afa92-39e2-48ab-8028-f5aebaa9918e\",\"data\":{\"longitude\":\"0.080477950927866\",\"latitude\":\"51.6658257133844\"}},{\"endpoint\":\"rumpel/locations\",\"recordId\":\"d3a6f04b-4df6-4888-a7b0-c1d5ca272de9\",\"data\":{\"longitude\":\"0.0641066288762133\",\"latitude\":\"51.6641215101037\"}},{\"endpoint\":\"rumpel/locations\",\"recordId\":\"6a858d87-899e-4961-b722-0738d07c755e\",\"data\":{\"longitude\":\"0.0961801595986785\",\"latitude\":\"51.6712232446779\"}}]}"
	}
]
```

To keep the example simple, it does not include complex data combinators covered in the previous step, however you will notice that the `endpoints` property has exactly the same format as the body of a request for creating a new `combinator`.

---

Like Data Combinators, Data Bundles can only be directly used by _privileged_ applications suchas the personal data dashboard, however it leads us to [Data Debits for consented data sharing](../data-debits) as Bundles is the format used to specify the data requested from the user.

<nav class="pager-nav">
<a href="01-data-combinators.html">Previous Step: Data Combinators</a>
<a href="" style="display:none;"></a>
</nav>
