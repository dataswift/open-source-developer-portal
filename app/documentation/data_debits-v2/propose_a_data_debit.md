---
layout: twoColumn
section: Data Debits - V2
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

# POSTMAN EXAMPLE HERE

