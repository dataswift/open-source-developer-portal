---
layout: twoColumn
section: "Linked Data"
type: article
title:  "New endpoint for linked data retrieval "
description: "New endpoint for linked data retrieval "
---

## POST - New endpoint for linked data retrieval 

`https://testing.hubat.net/api/v2/combinator/notables`

Endpoints queries need to explicitly list any potentially linked data they would want to retrieve

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
		"links": [
			{"endpoint": "rumpel/nudge"}
		]
	}
]


```

```postman

"request": {
						"url": "https://{{hat}}/api/v2/combinator/notables",
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
							"raw": "[\n\t{\n\t\t\"endpoint\": \"rumpel/notable\",\n\t\t\"links\": [\n\t\t\t{\"endpoint\": \"rumpel/nudge\"}\n\t\t]\n\t}\n]"
						},
						"description": "Endpoints queries need to explicitly list any potentially linked data they would want to retrieve"
					}

```
