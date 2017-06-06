---
layout: twoColumn
section: guides
type: The power of HAT data bundling
guide: 
    name: data-bundling
    step: 01-data-combinators
title: Data Combinators
description: Complex HAT Data transformations
# Parameters used in code examples
hat: test.hubat.net
access_token: ACCESS_TOKEN
---

The API supports a notion of custom data "combinators", with the key feature being data transformation. It allows for:
- remapping data JSON from such different streams into structures chosen by the developer to facilitate consistent structures across unrelated sources
- combining data from multiple feeds into a single response stream
- ordering of data according to underlying JSON structure fields
- filtering of data according to underlying JSON values (including text-based search)
- it is achieved by registering a datapoint with a data mapping specification and `GET`ing data from the registered endpoint

### Remapping JSON structures

One of the simplest types of data manipulation is remapping of data structure. This is done by creating a *combinator* with a `POST` request to `/api/v2/combinator/COMBINATOR_NAME` having chosen a name for your data combinator. Combinator name can be any valid URL path, but must be unique - request will fail with an error otherwise.

A simple example extracting two fields, `longitude` and `latitude` from a rumpel locations endpoint and unwrapping them to a top-level object:

```postman
"request": {
	"url": "https://{{page.hat}}/api/v2/combinator/locations",
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
		"raw": "[\n\t{\n\t\t\"endpoint\": \"rumpel/locations\",\n\t\t\"mapping\": {\n            \"longitude\": \"data.locations.longitude\",\n            \"latitude\": \"data.locations.latitude\"\n\t\t}\n\t}\n]"
	},
	"description": "Data endpoints take data from existing datasets and combine multiple source, reformat data into different structures as per provided mapping, etc"
}
```

The created combinator can be used by simply sending `GET` to `/api/v2/combinator/COMBINATOR_NAME` endpoint:

```postman
"request": {
	"url": "https://{{page.hat}}/api/v2/combinator/locations?take=5",
	"method": "GET",
	"header": [
		{
			"key": "X-Auth-Token",
			"value": "{{page.access_token}}",
			"description": ""
		}
	],
	"body": {},
	"description": "Data for registered endpoints can be collected like with the plain data routes, but prefixing the path with `endpoint/` instead of `data/, however using same filters such as the one for limiting the number of results returned"
}
```

It responds with the same data structure as plain data APIs: with a list of data records wrapped with the basic record details and the data itself remapped according to the registered combinator.

```postmanresponse
"response": [
	{
		"name": "Remapped data example",
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
		"body": "[{\"endpoint\":\"rumpel/locations\",\"recordId\":\"e965e022-6613-476a-a0cd-1f587a41b148\",\"data\":{\"longitude\":\"0.101014673709963\",\"latitude\":\"51.671358277138\"}},{\"endpoint\":\"rumpel/locations\",\"recordId\":\"fcf1a26b-e49f-4457-915b-156e14140f38\",\"data\":{\"longitude\":\"0.100905202634514\",\"latitude\":\"51.674001392439\"}},{\"endpoint\":\"rumpel/locations\",\"recordId\":\"8f7afa92-39e2-48ab-8028-f5aebaa9918e\",\"data\":{\"longitude\":\"0.080477950927866\",\"latitude\":\"51.6658257133844\"}},{\"endpoint\":\"rumpel/locations\",\"recordId\":\"d3a6f04b-4df6-4888-a7b0-c1d5ca272de9\",\"data\":{\"longitude\":\"0.0641066288762133\",\"latitude\":\"51.6641215101037\"}},{\"endpoint\":\"rumpel/locations\",\"recordId\":\"6a858d87-899e-4961-b722-0738d07c755e\",\"data\":{\"longitude\":\"0.0961801595986785\",\"latitude\":\"51.6712232446779\"}}]"
	}
]
```

### Combining data from multiple endpoints

Combinators are also very useful when you want to combine data from different endpoints using the same format. In this case, you define multiple entries in the list of endpoints:

```postman
"request": {
	"url": "https://{{page.hat}}/api/v2/combinator/locations",
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
		"raw": "[\n\t{\n\t\t\"endpoint\": \"rumpel/locations\",\n\t\t\"mapping\": {\n            \"longitude\": \"data.locations.longitude\",\n            \"latitude\": \"data.locations.latitude\"\n\t\t}\n\t},\n		\t{\n\t\t\"endpoint\": \"ios/locations\",\n\t\t\"mapping\": {\n            \"longitude\": \"phoneLocation.longitude\",\n            \"latitude\": \"phoneLocation.latitude\"\n\t\t}\n\t}\n]"
	},
	"description": ""
}
```

### Fetching linked data

The guide on [raw data I/O](../raw_data_io) covered linked data entry, but did not explain how such data can be retrieved. This is also achieved using data `combinators`, by providing a list of `links` with `endpoints` from which linked data should be included. This way no unexpected data will be included when requesting data.

```postman
"request": {
	"url": "https://{{page.hat}}/api/v2/combinator/notables",
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
		"raw": "[\n\t{\n\t\t\"endpoint\": \"rumpel/notable\",\n\t\t\"links\": [\n\t\t\t{\"endpoint\": \"rumpel/nudge\"}\n\t\t]\n\t}\n]"
	},
	"description": "Endpoints queries need to explicitly list any potentially linked data they would want to retrieve"
}
```

A response to fetch data from this combinator results in something like:

```postmanresponse
"response": [
	{
		"name": "Sample Linked Records",
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
		"body": "[{\"endpoint\":\"rumpel/notable\",\"recordId\":\"5a2547ec-63cc-47c7-938d-f4c1e2cad930\",\"data\":{\"id\":84995,\"data\":{\"notablesv1\":{\"kind\":\"note\",\"shared\":\"true\",\"message\":\"Showcasing the new HAT APIs\",\"authorv1\":{\"phata\":\"testing.hubat.net\"},\"shared_on\":\"twitter\",\"created_time\":\"2017-04-10T14:19:59:+01:00\",\"public_until\":\"2017-05-11T14:21:54+01:00\",\"updated_time\":\"2017-04-23T14:21:58+01:00\"}},\"lastUpdated\":\"2017-04-23T14:21:51+01:00\"},\"links\":[{\"endpoint\":\"rumpel/nudge\",\"recordId\":\"db3868d4-d042-45b4-af12-744f81d6d631\",\"data\":{\"time\":\"2017-04-30T14:22:52+01:00\",\"type\":\"time\",\"nudge\":\"Share APIs with the world\"}}]}]"
	}
]
```


### Data Filtering

The combinators API allows for powerful filtering of data according to the recorded values. The combinator gets created by `POST`ing a request to `/api/v2/combinator/COMBINATOR_NAME` as previously, however for each source of data you may also define one or more `filters` in addition to the `endpoint` and `transformation` used to remap the data:

```postman
"request": {
	"url": "https://{{page.hat}}/api/v2/combinator/locations/morningcommute",
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
		"raw": "[\n\t{\n\t\t\"endpoint\": \"rumpel/locations\",\n\t\t\"filters\": [\n\t\t\t{\n\t\t\t\t\"field\": \"data.locations.timestamp\",\n\t\t\t\t\"transformation\": {\n\t\t\t\t\t\"transformation\": \"datetimeExtract\",\n\t\t\t\t\t\"part\": \"hour\"\n\t\t\t\t},\n\t\t\t\t\"operator\": {\n\t\t\t\t\t\"operator\": \"between\",\n\t\t\t\t\t\"lower\": 7,\n\t\t\t\t\t\"upper\": 9\n\t\t\t\t}\n\t\t\t}\t\n\t\t]\n\t}\n]"
	},
	"description": "Data endpoints offer a way of filtering data, e.g. only taking locations between 7 and 9 AM"
}
```

The above example extracts hour part of the location timestamp and filters for records with the hour beteen 7 amd 9. If you add multiple filters, they act like logical `AND` operator: a data record has to match all filters to be included in the result. Every `filter` consists of three fields:

- `field` - the JSON path of the field to use for filtering - it can be a simple JSON value, an array or an object, make sure it makes sense for the filtering you are trying to do
- `transformation` - optionally transforms the field in question before applying a filter, with currently supported transformations including:
	- `identity` - keep the value as-is, effect is the same as if `transformation` was not defined
	- `datetimeExtract` with `part` - extract part of a date from an ISO 8601 formatted date field
	- `timestampExtract` with `part` - extract part of a date from a UNIX timestamp date field
	- `searchable` - convert the field to searchable text. Must be used together with the `find` operator below
- `operator` - the filtering operator:
	- `in` together with `value` field set to check if `field` is in (is contained by) `value`
	- `contains` together with `value` field set to check if `field` contains `value`
	- `between` together with `lower` and `upper` values set which checks if the `lower` < `field` < `upper`
	- `find` together with `search` field set to the search string to perform text-based searc on. Must be used together with the `searchable` transformation above

---

The illustrated ways of creating data combinators hopefully provide you with a comprehensive tool to extract data in any way you like. The next step is to build up a layer of bundles on top of them to allow for retrieving a bigger variety of data in one big bundle.

<nav class="pager-nav">
<a href="./">Previous Step: Overview</a>
<a href="02-data-bundles.html">Next Step: Data Bundles</a>
</nav>
