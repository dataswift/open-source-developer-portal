---
layout: twoColumn
section: Bundles
type: article
title:  "Retrieve Registered Bundle Data"
description: "Retrieve Registered Bundle Data"
---

## GET - Retrieve registered bundle data 

`https://testing.hubat.net/api/v2/data-bundle/localprofil`

Data bundle gets retrieved as per registered bundle specification

### Headers

#### X-Auth-Token
{{accessToken}}
#### Content-Type
application/json


```postman

"request": {
						"url": "https://{{hat}}/api/v2/data-bundle/localprofile",
						"method": "GET",
						"header": [
							{
								"key": "X-Auth-Token",
								"value": "{{accessToken}}",
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
						"description": "Data bundle gets retrieved as per registered bundle specification"
					}

```
