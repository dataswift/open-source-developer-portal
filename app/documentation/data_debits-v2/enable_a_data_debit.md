---
layout: twoColumn
section: "Data Debits"
type: article
title:  " Enable a Data Debit "
description: " Enable a Data Debit"
---

## GET -  Enable a Data Debit 
   
`https://testing.hubat.net/api/v2/data-debit/locationlocationlocation/enable/userprofilebigger`

Propose a data debit with the bundle of data and validity

### Headers

#### Content-Type
application/json
#### X-Auth-Token
{{accessToken}}

```postman

"request": {
						"url": "https://{{hat}}/api/v2/data-debit/locationlocationlocation/enable/userprofilebigger",
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
							"raw": "{\n\t\"bundle\": {\n\t\t\"name\": \"userprofile\",\n\t\t\"bundle\": {\n\t\t\t\"profile\": {\n\t\t\t\t\"endpoints\": [\n\t\t\t\t\t{\n\t\t\t\t\t\t\"endpoint\": \"rumpel/profile\"\n\t\t\t\t\t}\n\t\t\t\t],\n\t\t\t\t\"limit\": 1\n\t\t\t},\n\t\t\t\"location\": {\n\t\t\t\t\"endpoints\": [\n\t\t\t\t\t{\n\t\t\t\t\t\t\"endpoint\": \"rumpel/locations\",\n\t\t\t\t\t\t\"mapping\": {\n\t\t\t\t            \"longitude\": \"data.locations.longitude\",\n\t\t\t\t            \"latitude\": \"data.locations.latitude\"\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t],\n\t\t\t\t\"limit\": 5\n\t\t\t}\n\t\t}\n\t},\n\t\"startDate\": \"2017-05-13T09:32:47+00:00\",\n\t\"endDate\": \"2017-06-13T09:32:47+00:00\",\n\t\"rolling\": false\n}"
						},
						"description": "Propose a data debit with the bundle of data and validity"
					}

```
