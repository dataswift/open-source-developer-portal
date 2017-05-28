---
layout: twoColumn
section: "Data Debits"
type: article
title:  "Propose a Data Debit"
description: "Propose a Data Debit"
---

## POST -  Propose a Data Debit
   
`https://testing.hubat.net/api/v2/data-debit/locationlocationlocation`

Propose a data debit with the bundle of data and validity

### Headers

#### Content-Type
application/json
#### X-Auth-Token
{{accessToken}}

###Body 

```


{
	"bundle": {
		"name": "userprofile",
		"bundle": {
			"profile": {
				"endpoints": [
					{
						"endpoint": "rumpel/profile"
					}
				],
				"limit": 1
			},
			"location": {
				"endpoints": [
					{
						"endpoint": "rumpel/locations",
						"mapping": {
				            "longitude": "data.locations.longitude",
				            "latitude": "data.locations.latitude"
						}
					}
				],
				"limit": 5
			}
		}
	},
	"startDate": "2017-05-13T09:32:47+00:00",
	"endDate": "2017-06-13T09:32:47+00:00",
	"rolling": false
}



```

```postman

"request": {
						"url": "https://{{hat}}/api/v2/data-debit/locationlocationlocation",
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
							"raw": "{\n\t\"bundle\": {\n\t\t\"name\": \"userprofile\",\n\t\t\"bundle\": {\n\t\t\t\"profile\": {\n\t\t\t\t\"endpoints\": [\n\t\t\t\t\t{\n\t\t\t\t\t\t\"endpoint\": \"rumpel/profile\"\n\t\t\t\t\t}\n\t\t\t\t],\n\t\t\t\t\"limit\": 1\n\t\t\t},\n\t\t\t\"location\": {\n\t\t\t\t\"endpoints\": [\n\t\t\t\t\t{\n\t\t\t\t\t\t\"endpoint\": \"rumpel/locations\",\n\t\t\t\t\t\t\"mapping\": {\n\t\t\t\t            \"longitude\": \"data.locations.longitude\",\n\t\t\t\t            \"latitude\": \"data.locations.latitude\"\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t],\n\t\t\t\t\"limit\": 5\n\t\t\t}\n\t\t}\n\t},\n\t\"startDate\": \"2017-05-13T09:32:47+00:00\",\n\t\"endDate\": \"2017-06-13T09:32:47+00:00\",\n\t\"rolling\": false\n}"
						},
						"description": "Propose a data debit with the bundle of data and validity"
					}

```
