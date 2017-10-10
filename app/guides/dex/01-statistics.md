---
layout: twoColumn
section: guides
type: Data Exchange Services
guide: 
    name: dex
    step: 01-statistics
title: DEX Statistics
description: DEX Statistics
# Parameters used in code examples
hat: test.hubat.net
access_token: ACCESS_TOKEN
---

HATs in the ecosystem report aggregated metadata about their data operations to DEX. Specifically, they report how many of specific values have been sent _to_ the HAT by Data Plugs, as well as how many have been retrieved _from_ the HAT with Data Debits. Furthermore, since Data Debits are the mechanism for third-parties to request data from the individual, they also report operations on Data Debits: creation, removal, enabling and disabling. This allows DEX to monitor commercial data exchanges for security, quality assurance and trust.

### Collecting available statistics

Current DEX statistics lookup for all available data points is a single, public (no authentication required) API call:

```postman
	"request": {
		"url": "https://dex.hubofallthings.com/stats",
		"method": "GET",
		"header": [],
		"body": {},
		"description": "DEX Data Statistics Lookup"
	}
```

Which responds with aggregated statistics:

```postmanresponse
	"response": [
		{
			"name": "Statistics",
			"status": "OK",
			"code": 200,
			"header": [
				{
					"key": "Content-Type",
					"value": "application/json",
					"name": "Content-Type",
					"description": ""
				}
			],
			"body": "[{\"title\":\"Data Plugs\",\"value\":7,\"updated\":1496407712243},{\"title\":\"Total Offer Claims\",\"value\":70,\"updated\":1496407712248},{\"title\":\"Data Out\",\"value\":24317796,\"updated\":1496407712246},{\"title\":\"Data In\",\"value\":3118189,\"updated\":1496407712239},{\"title\":\"Top Datapoints\",\"value\":17476332,\"children\":{\"longitude in locationv1 of rumpel\":{\"title\":\"longitude in locationv1 of rumpel\",\"value\":607523,\"updated\":1496407713864},\"...\":\"...\"},\"updated\":1496407713864},{\"title\":\"HATs\",\"value\":387,\"updated\":1496407712236}]"
		}
	]
```

### Retrieving data points available in HATs

The HAT store is very flexible in what data it accepts via its APIs for storage to limit the amount of setup required before a developer can start storing data in it, however that also means it may not be easy for others to find out what data is available for exchange. Therefore, DEX processes all incoming metadata to aggregate available data properties:

```postman
"request": {
	"method": "GET",
	"header": [],
	"body": {},
	"url": "https://dex.hubofallthings.com/stats/available-data",
	"description": ""
}
```

The full response can be rather long, so an example is included on a [separate page](01-statistics-example.html).

### Describing availalbe data

While the list of available data is very detailed, human-beings need proper, textual descriptions of what those data points are to be able to use them in meaningful ways. While it is not possible to derive a description just from the fact that a specific datapoint is being exchanged, DEX provides means to add those descriptions via a (currently authorized for management accounts only) API:

```postman
"request": {
	"url": "https://dex.hubofallthings.com/stats/available-data/descriptions",
	"description": "",
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
		"raw": "[\n\t{\n        \"namespace\": \"dex\",\n        \"description\": \"Data stored by the Data Exchange in individual HATs\",\n        \"endpoints\": [\n            {\n                \"endpoint\": \"databuyer\",\n                \"description\": \"DataBuyer service related information\",\n                \"fields\": [\n                    {\n                        \"name\": \"merchants[]\",\n                        \"description\": \"The list of merchants the user is following\",\n                        \"count\": 9\n                    },\n                    {\n                        \"name\": \"date\",\n                        \"description\": \"The date this record was updated on\",\n                        \"count\": 17\n                    }\n                ]\n            }\n        ]\n    }\n]"
	}
}
```

The response to the call is the entire data structure availalble, with the matching entities having updated descriptions.

### Private endpoints

The other endpoints are used by automatic communication between systems, e.g. the HATs reporting statistics events.

<nav class="pager-nav">
<a href="./">Overview</a>
<a href="02-dataplugs.html">Data Plug Management</a>
</nav>
