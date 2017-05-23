---
layout: twoColumn
section: Linked Data - v2
type: article
title:  "Save an example nudge"
description: "Save an example nudge"
---

## POST - Save an example nudge 
   
`https://testing.hubat.net/api/v2/data/rumpel/nudge`

An example of a nudge created separately, but to be attached to a note

### Headers

#### Content-Type
application/json
#### X-Auth-Token
{{accessToken}}

###Body 

```

{
    "type": "time",
    "nudge": "Share APIs with the world",
    "time": "2017-04-30T14:21:52+01:00"
}


```

# POSTMAN EXAMPLE HERE

