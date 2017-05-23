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
# POSTMAN EXAMPLE HERE

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

# POSTMAN EXAMPLE HERE
