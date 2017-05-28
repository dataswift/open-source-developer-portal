---
layout: twoColumn
section: "Linked Data"
type: article
title:  "Retrieve linked data points as per registered endpoint "
description: "Retrieve linked data points as per registered endpoint "
---

## GET -  Retrieve linked data points as per registered endpoint 
   
`https://testing.hubat.net/api/v2/combinator/notables`

All requested linked objects are retrieved as specified in the endpoint query when registering it

### Headers

#### Content-Type
application/json
#### X-Auth-Token
{{accessToken}}

```postman

"request": {
						"url": "https://{{hat}}/api/v2/combinator/notables",
						"method": "GET",
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
						"description": "All requested linked objects are retrieved as specified in the endpoint query when registering it"
					}

```
