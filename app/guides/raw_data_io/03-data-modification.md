---
layout: twoColumn
section: guides
type: Raw Data I/O
guide: 
    name: raw_data_io
    step: 03-data-modification
title: Data Modification
description: Modifying data on the HAT
# Parameters used in code examples
hat: test.hubat.net
access_token: ACCESS_TOKEN
---

### Updating

Data can be updated by sending a `PUT` request to the `/api/v2/data` endpoint with the complete Data Record structure in the request body:

```postman
"request": {
	"url": "https://{{page.hat}}/api/v2/data",
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
		"raw": "[{\"endpoint\":\"hat/locations\",\"recordId\":\"e965e022-6613-476a-a0cd-1f587a41b148\",\"data\":{\"id\":85998,\"data\":{\"locations\":{\"accuracy\":\"1000.0\",\"latitude\":\"51.671358277138\",\"longitude\":\"0.101014673709963\",\"timestamp\":\"2017-04-23T16:11:17+0000\"}},\"name\":\"record 1\",\"lastUpdated\":\"2017-04-23T16:11:17.000Z\"}}]"
	},
	"description": "Deleting a record happens via a request providing the record's ID"
}
```

The above request is expected to effectively update only the `accuracy` field of the record already stored, however in practice the provided data replaces the whole record already stored in the HAT.

### Deleting

Data is deleted by sending a `DELETE` request to the `/api/v2/data` endpoint with IDs of the records to be deleted in query parameters:

```postman
"request": {
	"url": "https://{{page.hat}}/api/v2/data?records=3474369e-2317-4ea2-9bc8-198700a1f9cb&records=6dcff611-45cb-49a9-82ca-318b9e5a3c17",
	"method": "DELETE",
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
	"description": "Deleting a record happens via a request providing the record's ID"
}
```

If you are deleting multiple records in one go, just add a `records` parameter for each record ID. The response will contain an error if you are not authorized to delete any of the provided records or if any of the records do not exist - no records will be deleted in this case.

<nav class="pager-nav">
<a href="02-data-retrieval.html">Previous Step: Data Retrieval</a>
<a href="04-next-steps.html">Next Step: Consented Data Exchange</a>
</nav>
