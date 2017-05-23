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
# POSTMAN EXAMPLE HERE

