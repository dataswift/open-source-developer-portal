---
layout: twoColumn
section: Linked Data - v2
type: article
title:  "New endpoint for linked data retrieval "
description: "New endpoint for linked data retrieval "
---

## POST - New endpoint for linked data retrieval 

`https://testing.hubat.net/api/v2/combinator/notables`

Endpoints queries need to explicitly list any potentially linked data they would want to retrieve

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
		"links": [
			{"endpoint": "rumpel/nudge"}
		]
	}
]


```

#Postman Example Here
