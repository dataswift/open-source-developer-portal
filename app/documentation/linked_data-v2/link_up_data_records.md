---
layout: twoColumn
section: "Linked Data"
type: article
title:  "Link up data records"
description: "Link up data records"
---

## POST - Link up data records 
   
`https://testing.hubat.net/api/v2/data-link?records[]={{recordsParameter}}`

Links up data records for a notion of related data, e.g. a note associated with a specific nudge

### Headers

#### Content-Type
application/json
#### X-Auth-Token
{{accessToken}}

```postman

"request": {
						"url": "https://{{hat}}/api/v2/data-link?records[]={{recordsParameter}}",
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
							"raw": "{}"
						},
						"description": "Links up data records for a notion of related data, e.g. a note associated with a specific nudge"
					}

```
