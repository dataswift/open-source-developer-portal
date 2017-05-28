---
layout: twoColumn
section: Bundles
type: article
title:  "Propose Data Bundles"
description: "Propose Data Bundles"
---

## POST -  Propose data bundles
   
`https://testing.hubat.net/api/v2/data-bundle/localprofile`

Data can be bundled together across different sources into a single object of interest - used for apps as well as the basis of reqesting data for Data Debits


### Headers

#### X-Auth-Token
{{accessToken}}
#### Content-Type
application/json


###Body

```

{
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

```

```postman

"request": {
						"url": "https://{{hat}}/api/v2/data-bundle/localprofile",
						"method": "POST",
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
						"description": "Data can be bundled together across different sources into a single object of interest - used for apps as well as the basis of reqesting data for Data Debits"
					}

```
