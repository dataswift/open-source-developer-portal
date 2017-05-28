---
layout: twoColumn
section: "Data Debits"
type: article
title:  "Update a data debit "
description: "Update a data debit "
---

## PUT - Update a data debit 
   
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
		"name": "userprofilebigger",
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
				"limit": 10
			}
		}
	},
	"startDate": "2017-05-13T09:32:47+00:00",
	"endDate": "2017-06-13T09:32:47+00:00",
	"rolling": false
}



```

#Postman Example Here
#Postman Example Here
