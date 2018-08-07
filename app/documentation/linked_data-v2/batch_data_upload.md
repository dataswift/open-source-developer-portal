---
layout: twoColumn
section: "Linked Data"
type: article
title:  "Batch data upload "
description: "Batch data upload "
---

## POST - Batch data upload 
   
`https://testing.hubat.net/api/v2.6/data-batch`

Sending multiple records to the HAT simultaneously, potentially for separate "endpoints" as well as linked, all in one call


### Headers

#### Content-Type
application/json
#### X-Auth-Token
{{accessToken}}

###Body
```


[
	{
	"endpoint": "rumpel/notable",
	"data": {
	    "id": 84995,
	    "lastUpdated": "2017-04-23T14:21:51+01:00",
	    "data": {
	      "notablesv1": {
	        "authorv1": {
	          "phata": "testing.hubat.net"
	        },
	        "created_time": "2017-04-10T14:19:59:+01:00",
	        "shared": "true",
	        "shared_on": "twitter",
	        "message": "Showcasing the new HAT APIs",
	        "public_until": "2017-05-11T14:21:54+01:00",
	        "updated_time": "2017-04-23T14:21:58+01:00",
	        "kind": "note"
	      }
		}
	},
	"links": [
		{
			"endpoint": "rumpel/nudge",
			"data": {
			    "type": "time",
			    "nudge": "Share APIs with the world",
			    "time": "2017-04-30T14:22:52+01:00"
			}
		}
	]
	}
]

```

```postman

"request": {
						"url": "https://{{hat}}/api/v2.6/data-batch",
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json",
								"description": ""
							},
							{
								"key": "X-Auth-Token",
								"value": "{{accessToken}}",
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
