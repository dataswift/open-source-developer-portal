---
layout: twoColumn
section: Combinators
type: article
title:  "Propose A New data Endpoint"
description: "Propose A New data Endpoint"
---

## POST -  Propose A New data Endpoint
   
`https://testing.hubat.net/api/v2/combinator/android/locations`

Data endpoints take data from existing datasets and combine multiple source, reformat data into different structures as per provided mapping, etc


### Headers

#### Content Type
application/json
#### X-Auth-Token
{{accessToken}}


###Body

```



[
	{
		"endpoint": "rumpel/locations",
		"mapping": {
            "longitude": "data.locations.longitude",
            "latitude": "data.locations.latitude"
		}
	}
]


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

#Example - Propose a new Data Endpoint - morning commute 

`https://testing.hubat.net/api/v2/combinator/locations/morningcommute`

### Headers

#### Content Type
application/json
#### X-Auth-Token
{{accessToken}}


###Body

```

[
	{
		"endpoint": "rumpel/locations",
		"filters": [
			{
				"field": "data.locations.timestamp",
				"transformation": {
					"transformation": "datetimeExtract",
					"part": "hour"
				},
				"operator": {
					"operator": "between",
					"lower": 7,
					"upper": 9
				}
			}	
		]
	}
]



```

```postman

"request": {
						"url": "https://{{hat}}/api/v2/combinator/locations/morningcommute",
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
							"raw": "[\n\t{\n\t\t\"endpoint\": \"rumpel/locations\",\n\t\t\"filters\": [\n\t\t\t{\n\t\t\t\t\"field\": \"data.locations.timestamp\",\n\t\t\t\t\"transformation\": {\n\t\t\t\t\t\"transformation\": \"datetimeExtract\",\n\t\t\t\t\t\"part\": \"hour\"\n\t\t\t\t},\n\t\t\t\t\"operator\": {\n\t\t\t\t\t\"operator\": \"between\",\n\t\t\t\t\t\"lower\": 7,\n\t\t\t\t\t\"upper\": 9\n\t\t\t\t}\n\t\t\t}\t\n\t\t]\n\t}\n]"
						},
						"description": "Data endpoints offer a way of filtering data, e.g. only taking locations between 7 and 9 AM"
					}

```
