---
layout: twoColumn
section: "Data"
type: article
title:  "Filter data records up to a maximum number"
description: "Filter data records up to a maximum number"
---

## GET - Filter data records up to a maximum number
   
`https://testing.hubat.net/api/v2.6/data/rumpel/locations?take=3`

Getting the 3 most recent data records

### Headers

#### Content-Type
application/json
#### X-Auth-Token
{{accessToken}}

```postman

"request": {
						"url": "https://{{hat}}/api/v2.6/data/rumpel/locations?take=3",
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
							"raw": ""
						},
						"description": "getting the 3 most recent data records"
					}

```
