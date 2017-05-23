---
layout: twoColumn
section: Data - v2
type: article
title:  "Bulk-upload a large chunk of data to the same endpoint"
description: "Bulk-upload a large chunk of data to the same endpoint"
---

## POST -  Bulk-upload a large chunk of data to the same endpoint
   
`https://testing.hubat.net/api/v2/data/rumpel/locations`

Storing a ist of data records (locations in the example) in one go

### Headers

#### Content-Type
application/json
#### X-Auth-Token
{{accessToken}}

###Body 

```

[
  {
    "id": 85998,
    "name": "record 1",
    "lastUpdated": "2017-04-23T16:11:17.000Z",
    "data": {
      "locations": {
        "latitude": "51.671358277138",
        "longitude": "0.101014673709963",
        "accuracy": "10.0",
        "timestamp": "2017-04-23T16:11:17+0000"
      }
    }
  },
  {
    "id": 85997,
    "name": "record 3",
    "lastUpdated": "2017-04-23T16:18:04.000Z",
    "data": {
      "locations": {
        "latitude": "51.6658257133844",
        "longitude": "0.080477950927866",
        "accuracy": "1414.0",
        "timestamp": "2017-04-23T16:18:04+0000"
      }
    }
  },
  {
    "id": 85996,
    "name": "record 2",
    "lastUpdated": "2017-04-23T16:12:58.000Z",
    "data": {
      "locations": {
        "latitude": "51.674001392439",
        "longitude": "0.100905202634514",
        "accuracy": "1414.0",
        "timestamp": "2017-04-23T16:12:58+0000"
      }
    }
  }
]


```

# POSTMAN EXAMPLE HERE

#Example - Save Different Data

`https://testing.hubat.net/api/v2/data/rumpel/profile`

Using Rumpel profile as an exmaple, can save the whole object as a single API call


### Headers

#### Content-Type
application/json
#### X-Auth-Token
{{accessToken}}

###Body 

```


{"profile": {
        "website": {
          "link": "https://smart-e.org",
          "private": "false"
        },
        "nick": {
          "private": "true",
          "name": ""
        },
        "primary_email": {
          "value": "andrius.aucinas@hatdex.org",
          "private": "false"
        },
        "private": "false",
        "youtube": {
          "link": "",
          "private": "true"
        },
        "address_global": {
          "city": "London",
          "county": "",
          "country": "UK",
          "private": "true"
        },
        "linkedin": {
          "link": "https://www.linkedin.com/in/andriusaucinas",
          "private": "false"
        },
        "birth": {
          "private": "false",
          "date": "12 July"
        },
        "home_phone": {
          "no": "07593030685",
          "private": "true"
        },
        "google": {
          "link": "",
          "private": "true"
        },
        "age": {
          "group": "",
          "private": "true"
        },
        "personal": {
          "first_name": "",
          "private": "false",
          "preferred_name": "Andrius",
          "last_name": "Aucinas",
          "middle_name": "",
          "title": "Dr"
        },
        "blog": {
          "link": "https://smart-e.org/blog",
          "private": "false"
        },
        "facebook": {
          "link": "facebook.com/aucinas",
          "private": "false"
        },
        "address_details": {
          "no": "",
          "street": "",
          "private": "false",
          "postcode": ""
        },
        "emergency_contact": {
          "first_name": "",
          "private": "true",
          "relationship": "",
          "last_name": "",
          "mobile": ""
        },
        "alternative_email": {
          "private": "true",
          "value": ""
        },
        "fb_profile_photo": {
          "private": "false"
        },
        "twitter": {
          "link": "twitter.com/andriusa",
          "private": "false"
        },
        "about": {
          "body": "I am a co-founder and the Head of Engineering at the Hub of All Things (HAT). In the team I lead all engineering work on building the ecosystem, ranging across the full stack, cloud infrastructure, third-party resource integration while maintaining the team's flexibility and agility to adjust to business needs while pushing the boundaries of the most bleeding-edge technologies. I have earlier co-founded and was the CTO of Cambridge Coding Academy and finished a PhD (as well as BA) at the University of Cambridge.",
          "private": "false",
          "title": "Andrius Aucinas"
        },
        "mobile": {
          "no": "",
          "private": "true"
        },
        "gender": {
          "type": "",
          "private": "true"
        }
      }}



```

# POSTMAN EXAMPLE HERE
