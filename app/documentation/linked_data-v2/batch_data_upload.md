---
layout: twoColumn
section: "Linked Data"
type: article
title:  "Batch data upload "
description: "Batch data upload "
---

## POST - Batch data upload 
   
`https://testing.hubat.net/api/v2/data-batch`

Sending multiple records to the HAT simultaneously, potentially for separate "endpoints" as well as linked, all in one call


### Headers

#### Content-Type
application/json
#### X-Auth-Token
{{accessToken}}

###Body
```


[
	{
	"endpoint": "rumpel/notable",
	"data": {
	    "id": 84995,
	    "lastUpdated": "2017-04-23T14:21:51+01:00",
	    "data": {
	      "notablesv1": {
	        "authorv1": {
	          "phata": "testing.hubat.net"
	        },
	        "created_time": "2017-04-10T14:19:59:+01:00",
	        "shared": "true",
	        "shared_on": "twitter",
	        "message": "Showcasing the new HAT APIs",
	        "public_until": "2017-05-11T14:21:54+01:00",
	        "updated_time": "2017-04-23T14:21:58+01:00",
	        "kind": "note"
	      }
		}
	},
	"links": [
		{
			"endpoint": "rumpel/nudge",
			"data": {
			    "type": "time",
			    "nudge": "Share APIs with the world",
			    "time": "2017-04-30T14:22:52+01:00"
			}
		}
	]
	}
]

```

#Postman Example Here
#Postman Example Here
