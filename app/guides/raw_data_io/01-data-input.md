---
layout: twoColumn
section: guides
type: Raw Data I/O
guide: 
    name: raw_data_io
    step: 01-data-input
title: Data Input
description: Saving data into the HAT
# Parameters used in code examples
hat: test.hubat.net
access_token: ACCESS_TOKEN
---


Data Input can happen in one of two ways:

1. Saving one or more homogeneous data records into a single endpoint
2. Saving multipe data records that can be potentially heterogeneous, related, or both

### Saving homogeneous data records

A data entry request for a single endpoint (`/hat/locations`), with multiple records inserted in one go. The data provided in the example is merely an illustration - the HAT will accept *any well-formed JSON data*. Note the request is authenticated with an `ACCESS_TOKEN` obtained previously and the token has been issued for the namespace of `hat` specifically.

```postman
"request": {
	"url": "https://{{page.hat}}/api/v2/data/hat/locations",
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
		"raw": "[\n  {\n    \"id\": 85998,\n    \"name\": \"record 1\",\n    \"lastUpdated\": \"2017-04-23T16:11:17.000Z\",\n    \"data\": {\n      \"locations\": {\n        \"latitude\": \"51.671358277138\",\n        \"longitude\": \"0.101014673709963\",\n        \"accuracy\": \"10.0\",\n        \"timestamp\": \"2017-04-23T16:11:17+0000\"\n      }\n    }\n  },\n  {\n    \"id\": 85997,\n    \"name\": \"record 3\",\n    \"lastUpdated\": \"2017-04-23T16:18:04.000Z\",\n    \"data\": {\n      \"locations\": {\n        \"latitude\": \"51.6658257133844\",\n        \"longitude\": \"0.080477950927866\",\n        \"accuracy\": \"1414.0\",\n        \"timestamp\": \"2017-04-23T16:18:04+0000\"\n      }\n    }\n  },\n  {\n    \"id\": 85996,\n    \"name\": \"record 2\",\n    \"lastUpdated\": \"2017-04-23T16:12:58.000Z\",\n    \"data\": {\n      \"locations\": {\n        \"latitude\": \"51.674001392439\",\n        \"longitude\": \"0.100905202634514\",\n        \"accuracy\": \"1414.0\",\n        \"timestamp\": \"2017-04-23T16:12:58+0000\"\n      }\n    }\n  }\n]"
	},
	"description": "Storing a ist of data records (locations in the example) in one go"
}
```

If the data gets saved, the response includes the full data, wrapped in the Record data structure:
- `endpoint` field that includes the specific endpoint the record was assigned to
- `recordId` - UUID of the data record
- `data` - the data JSON structure exactly as submitted

```postmanresponse
"response": [
	{
		"name": "Data saved",
		"status": "Created",
		"code": 201,
		"header": [
			{
				"key": "Content-Type",
				"value": "application/json",
				"name": "Content-Type",
				"description": "The mime type of this content"
			}
		],
		"body": "[{\"endpoint\":\"locations\",\"recordId\":\"f8c011d1-98f0-4e5f-89a6-64b949724eba\",\"data\":{\"id\":185998,\"data\":{\"locations\":{\"accuracy\":\"10.0\",\"latitude\":\"51.671358277138\",\"longitude\":\"0.101014673709963\",\"timestamp\":\"2017-04-23T16:11:17+0000\"}},\"name\":\"record 1\",\"lastUpdated\":\"2017-04-23T16:11:17.000Z\"},\"links\":[]},{\"endpoint\":\"locations\",\"recordId\":\"0a79bef4-9a8e-4d19-937d-9a759fc2981b\",\"data\":{\"id\":185997,\"data\":{\"locations\":{\"accuracy\":\"1414.0\",\"latitude\":\"51.6658257133844\",\"longitude\":\"0.080477950927866\",\"timestamp\":\"2017-04-23T16:18:04+0000\"}},\"name\":\"record 3\",\"lastUpdated\":\"2017-04-23T16:18:04.000Z\"},\"links\":[]},{\"endpoint\":\"locations\",\"recordId\":\"b6ebcdc3-235e-4e8c-834c-eec08beb55cd\",\"data\":{\"id\":185996,\"data\":{\"locations\":{\"accuracy\":\"1414.0\",\"latitude\":\"51.674001392439\",\"longitude\":\"0.100905202634514\",\"timestamp\":\"2017-04-23T16:12:58+0000\"}},\"name\":\"record 2\",\"lastUpdated\":\"2017-04-23T16:12:58.000Z\"},\"links\":[]}]"
	}
]
```

If there are any problems with your JSON (e.g. it is malformed), you will receive a `Bad Request` response code with the details of the error in the body of the response. If, for example, such data (as decided by its hash) already exists in the HAT, none of the data in the request will be saved and you will receive a message indicating so:

```postmanresponse
"response": [
	{
		"name": "Error: duplicate data received",
		"status": "Bad Request",
		"code": 400,
		"header": [
			{
				"key": "Content-Type",
				"value": "application/json",
				"name": "Content-Type",
				"description": ""
			}
		],
		"body": "{\"message\":\"Duplicate Data\",\"cause\":\"Could not insert data - Duplicate data\"}"
	}
]
```

*Note: all data entry operations are _transactional_, i.e. insertion of all data provided in the request succeeds or the whole request fails and no data gets inserted.*

To illustrate HAT's acceptance of _any valid JSON data_, here is another example, saving very different profile data in the same `namespace`, but a different `endpoint`:

```postman
"request": {
	"url": "https://{{page.hat}}/api/v2/data/rumpel/profile",
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
		"raw": "{\"profile\": {\n        \"website\": {\n          \"link\": \"https://example.com\",\n          \"private\": \"false\"\n        },\n        \"nick\": {\n          \"private\": \"true\",\n          \"name\": \"\"\n        },\n        \"primary_email\": {\n          \"value\": \"testuser@example.com\",\n          \"private\": \"false\"\n        },\n        \"private\": \"false\",\n        \"youtube\": {\n          \"link\": \"\",\n          \"private\": \"true\"\n        },\n        \"address_global\": {\n          \"city\": \"London\",\n          \"county\": \"\",\n          \"country\": \"UK\",\n          \"private\": \"true\"\n        },\n        \"age\": {\n          \"group\": \"\",\n          \"private\": \"true\"\n        },\n        \"personal\": {\n          \"first_name\": \"\",\n          \"private\": \"false\",\n          \"preferred_name\": \"Test\",\n          \"last_name\": \"User\",\n          \"middle_name\": \"\",\n          \"title\": \"\"\n        },\n        \"blog\": {\n          \"link\": \"\",\n          \"private\": \"false\"\n        },\n        \"facebook\": {\n          \"link\": \"\",\n          \"private\": \"false\"\n        },\n        \"address_details\": {\n          \"no\": \"\",\n          \"street\": \"\",\n          \"private\": \"false\",\n          \"postcode\": \"\"\n        },\n        \"emergency_contact\": {\n          \"first_name\": \"\",\n          \"private\": \"true\",\n          \"relationship\": \"\",\n          \"last_name\": \"\",\n          \"mobile\": \"\"\n        },\n        \"alternative_email\": {\n          \"private\": \"true\",\n          \"value\": \"\"\n        },\n        \"fb_profile_photo\": {\n          \"private\": \"false\"\n        },\n        \"twitter\": {\n          \"link\": \"\",\n          \"private\": \"false\"\n        },\n        \"about\": {\n          \"body\": \"A short bio about me shown on my PHATA\",\n          \"private\": \"false\",\n          \"title\": \"Me the Test User\"\n        },\n        \"mobile\": {\n          \"no\": \"\",\n          \"private\": \"true\"\n        },\n        \"gender\": {\n          \"type\": \"\",\n          \"private\": \"true\"\n        }\n      }}"
	},
	"description": "Using Rumpel profile as an exmaple, can save the whole object as a single API call"
}
```


### Saving related data records

Heterogeneous data records can be inserted simultaneously using the batch-data API endpoint. One example where such data insertion is useful is HAT notes, where a text-based note is saved with an attached "nudge" - a time-based reminder connected to the note. It is important to keep notes and nudges logically separate, because both can be used independently, e.g. a nudge can be attached to certain locations, photos, posts...

```postman
"request": {
	"url": "https://{{page.hat}}/api/v2/data-batch",
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
		"raw": "[\n\t{\n\t\"endpoint\": \"rumpel/notable\",\n\t\"data\": {\n\t    \"id\": 84995,\n\t    \"lastUpdated\": \"2017-04-23T14:21:51+01:00\",\n\t    \"data\": {\n\t      \"notablesv1\": {\n\t        \"authorv1\": {\n\t          \"phata\": \"testing.hubat.net\"\n\t        },\n\t        \"created_time\": \"2017-04-10T14:19:59:+01:00\",\n\t        \"shared\": \"true\",\n\t        \"shared_on\": \"twitter\",\n\t        \"message\": \"Showcasing the new HAT APIs\",\n\t        \"public_until\": \"2017-05-11T14:21:54+01:00\",\n\t        \"updated_time\": \"2017-04-23T14:21:58+01:00\",\n\t        \"kind\": \"note\"\n\t      }\n\t\t}\n\t},\n\t\"links\": [\n\t\t{\n\t\t\t\"endpoint\": \"rumpel/nudge\",\n\t\t\t\"data\": {\n\t\t\t    \"type\": \"time\",\n\t\t\t    \"nudge\": \"Share APIs with the world\",\n\t\t\t    \"time\": \"2017-04-30T14:22:52+01:00\"\n\t\t\t}\n\t\t}\n\t]\n\t}\n]"
	},
	"description": "Sending multiple records to the HAT simultaneously, potentially for separate \"endpoints\" as well as linked, all in one call"
}
```

The response will include the main data record with the note as well as a separate data record with the nudge, linked to the main one.

Data records do not necessarily need to be linked up when being inserted. This can be done later by referring to the records using their IDs:

```postman
"request": {
	"url": "https://{{page.hat}}/api/v2/data-link?records=6dcff611-45cb-49a9-82ca-318b9e5a3c17",
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
		"raw": "{}"
	},
	"description": "Links up data records for a notion of related data, e.g. a note associated with a specific nudge"
}
```

<nav class="pager-nav">
<a href="./">Previous Step: Overview</a>
<a href="02-data-retrieval.html">Next Step: Data Retrieval</a>
</nav>
