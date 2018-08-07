---
layout: twoColumn
section: "Data"
type: article
title:  "Data Records"
description: "Data Records"
---

## GET - Data Records
   
`https://testing.hubat.net/api/v2.6/data/rumpel/locations`

Getting data records without additional filters

### Headers

#### Content-Type
application/json
#### X-Auth-Token
{{accessToken}}

```postman

"request": {
						"url": "https://{{hat}}/api/v2.6/data/rumpel/locations",
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
						"description": "getting data records without additional filters"
					}

```
