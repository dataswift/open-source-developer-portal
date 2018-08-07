---
layout: twoColumn
section: guides
type: Raw Data I/O
guide: 
    name: raw_data_io
    step: 02-data-retrieval
title: Data Retrieval
description: Retrieving Data from the HAT
# Parameters used in code examples
hat: test.hubat.net
access_token: ACCESS_TOKEN
---

In this guide we only look at retrieving simple data that is only available to the owner of the HAT and hence usable only by certified dashboard applications. For other kinds of data access, jump to the [section on consented data exchange](03-data-retrieval.html) where you will find further pointers.

In the simple case, data from the HAT is retrieved using a `GET` request to the `/api/v2.6/data/namespace/endpoint`.

The endpoint takes the following parameters:

Parameter | Default | Meaning
|:------------- |-------------:| ----- |
take		| 1000	| Limit to how many records the requester will take
skip		| 0		| How many records to skip - used together with `take` to implement data paging
orderBy		| 		| The field in the JSON structure according to which data should be ordered. If, for example, you wish to order data by time, we recommend to include UNIX timestamp in the data as a number
recordId	|		| ID of the record when looking up data for one specific item


```postman
"request": {
	"url": "https://{{page.hat}}/api/v2.6/data/hat/locations?take=3",
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
	"description": "getting the 3 most recent data records"
}
```

Which returns top 3 results sorted by default ordering:

```postmanresponse
"response": [
	{
		"id": "0ff8df0b-fd8f-45c1-a5d6-2f64d44804e0",
		"name": "Sample data output",
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
		"body": "[{\"endpoint\":\"rumpel/locations\",\"recordId\":\"e965e022-6613-476a-a0cd-1f587a41b148\",\"data\":{\"id\":85998,\"data\":{\"locations\":{\"accuracy\":\"10.0\",\"latitude\":\"51.671358277138\",\"longitude\":\"0.101014673709963\",\"timestamp\":\"2017-04-23T16:11:17+0000\"}},\"name\":\"record 1\",\"lastUpdated\":\"2017-04-23T16:11:17.000Z\"}},{\"endpoint\":\"rumpel/locations\",\"recordId\":\"fcf1a26b-e49f-4457-915b-156e14140f38\",\"data\":{\"id\":85996,\"data\":{\"locations\":{\"accuracy\":\"1414.0\",\"latitude\":\"51.674001392439\",\"longitude\":\"0.100905202634514\",\"timestamp\":\"2017-04-23T16:12:58+0000\"}},\"name\":\"record 2\",\"lastUpdated\":\"2017-04-23T16:12:58.000Z\"}},{\"endpoint\":\"rumpel/locations\",\"recordId\":\"8f7afa92-39e2-48ab-8028-f5aebaa9918e\",\"data\":{\"id\":85997,\"data\":{\"locations\":{\"accuracy\":\"1414.0\",\"latitude\":\"51.6658257133844\",\"longitude\":\"0.080477950927866\",\"timestamp\":\"2017-04-23T16:18:04+0000\"}},\"name\":\"record 3\",\"lastUpdated\":\"2017-04-23T16:18:04.000Z\"}}]"
	}
]
```


<nav class="pager-nav">
<a href="01-data-input.html">Previous Step: Data Input</a>
<a href="03-data-modification.html">Next Step: Data Modification</a>
</nav>
