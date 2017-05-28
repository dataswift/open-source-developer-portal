---
layout: twoColumn
section: "Linked Data"
type: article
title:  " Save an example notable record "
description: " Save an example notable record "
---

## POST -  Save an example notable record 

`https://testing.hubat.net/api/v2/data/rumpel/notable`

Saves a notable, taking the saved record ID for later use

### Headers

#### Content-Type
application/json
#### X-Auth-Token
{{accessToken}}


###Body

```

{
    "id": 84995,
    "lastUpdated": "2017-04-23T14:21:50+01:00",
    "data": {
      "notablesv1": {
        "authorv1": {
          "phata": "testing.hubat.net"
        },
        "created_time": "2017-04-10T14:20:52+01:00",
        "shared": "true",
        "shared_on": "twitter",
        "message": "Showcasing the new HAT APIs",
        "public_until": "2017-05-11T14:21:54+01:00",
        "updated_time": "2017-04-23T14:21:58+01:00",
        "kind": "note"
      }
    }
}


```

```postman

"request": {
						"url": "https://{{hat}}/api/v2/data/rumpel/notable",
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
							"raw": "{\n    \"id\": 84995,\n    \"lastUpdated\": \"2017-04-23T14:21:50+01:00\",\n    \"data\": {\n      \"notablesv1\": {\n        \"authorv1\": {\n          \"phata\": \"testing.hubat.net\"\n        },\n        \"created_time\": \"2017-04-10T14:20:52+01:00\",\n        \"shared\": \"true\",\n        \"shared_on\": \"twitter\",\n        \"message\": \"Showcasing the new HAT APIs\",\n        \"public_until\": \"2017-05-11T14:21:54+01:00\",\n        \"updated_time\": \"2017-04-23T14:21:58+01:00\",\n        \"kind\": \"note\"\n      }\n    }\n}"
						},
						"description": "Saves a notable, taking the saved record ID for later use"
					}

```
