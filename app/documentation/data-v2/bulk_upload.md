---
layout: twoColumn
section: "Data"
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

```postman

"request": {
						"url": "https://{{hat}}/api/v2/data/rumpel/locations",
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
							"raw": "[\n  {\n    \"id\": 85998,\n    \"name\": \"record 1\",\n    \"lastUpdated\": \"2017-04-23T16:11:17.000Z\",\n    \"data\": {\n      \"locations\": {\n        \"latitude\": \"51.671358277138\",\n        \"longitude\": \"0.101014673709963\",\n        \"accuracy\": \"10.0\",\n        \"timestamp\": \"2017-04-23T16:11:17+0000\"\n      }\n    }\n  },\n  {\n    \"id\": 85997,\n    \"name\": \"record 3\",\n    \"lastUpdated\": \"2017-04-23T16:18:04.000Z\",\n    \"data\": {\n      \"locations\": {\n        \"latitude\": \"51.6658257133844\",\n        \"longitude\": \"0.080477950927866\",\n        \"accuracy\": \"1414.0\",\n        \"timestamp\": \"2017-04-23T16:18:04+0000\"\n      }\n    }\n  },\n  {\n    \"id\": 85996,\n    \"name\": \"record 2\",\n    \"lastUpdated\": \"2017-04-23T16:12:58.000Z\",\n    \"data\": {\n      \"locations\": {\n        \"latitude\": \"51.674001392439\",\n        \"longitude\": \"0.100905202634514\",\n        \"accuracy\": \"1414.0\",\n        \"timestamp\": \"2017-04-23T16:12:58+0000\"\n      }\n    }\n  }\n]"
						},
						"description": "Storing a ist of data records (locations in the example) in one go"
					}

```

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

```postman

"request": {
						"url": "https://{{hat}}/api/v2/data/rumpel/profile",
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
							"raw": "{\"profile\": {\n        \"website\": {\n          \"link\": \"https://smart-e.org\",\n          \"private\": \"false\"\n        },\n        \"nick\": {\n          \"private\": \"true\",\n          \"name\": \"\"\n        },\n        \"primary_email\": {\n          \"value\": \"andrius.aucinas@hatdex.org\",\n          \"private\": \"false\"\n        },\n        \"private\": \"false\",\n        \"youtube\": {\n          \"link\": \"\",\n          \"private\": \"true\"\n        },\n        \"address_global\": {\n          \"city\": \"London\",\n          \"county\": \"\",\n          \"country\": \"UK\",\n          \"private\": \"true\"\n        },\n        \"linkedin\": {\n          \"link\": \"https://www.linkedin.com/in/andriusaucinas\",\n          \"private\": \"false\"\n        },\n        \"birth\": {\n          \"private\": \"false\",\n          \"date\": \"12 July\"\n        },\n        \"home_phone\": {\n          \"no\": \"07593030685\",\n          \"private\": \"true\"\n        },\n        \"google\": {\n          \"link\": \"\",\n          \"private\": \"true\"\n        },\n        \"age\": {\n          \"group\": \"\",\n          \"private\": \"true\"\n        },\n        \"personal\": {\n          \"first_name\": \"\",\n          \"private\": \"false\",\n          \"preferred_name\": \"Andrius\",\n          \"last_name\": \"Aucinas\",\n          \"middle_name\": \"\",\n          \"title\": \"Dr\"\n        },\n        \"blog\": {\n          \"link\": \"https://smart-e.org/blog\",\n          \"private\": \"false\"\n        },\n        \"facebook\": {\n          \"link\": \"facebook.com/aucinas\",\n          \"private\": \"false\"\n        },\n        \"address_details\": {\n          \"no\": \"\",\n          \"street\": \"\",\n          \"private\": \"false\",\n          \"postcode\": \"\"\n        },\n        \"emergency_contact\": {\n          \"first_name\": \"\",\n          \"private\": \"true\",\n          \"relationship\": \"\",\n          \"last_name\": \"\",\n          \"mobile\": \"\"\n        },\n        \"alternative_email\": {\n          \"private\": \"true\",\n          \"value\": \"\"\n        },\n        \"fb_profile_photo\": {\n          \"private\": \"false\"\n        },\n        \"twitter\": {\n          \"link\": \"twitter.com/andriusa\",\n          \"private\": \"false\"\n        },\n        \"about\": {\n          \"body\": \"I am a co-founder and the Head of Engineering at the Hub of All Things (HAT). In the team I lead all engineering work on building the ecosystem, ranging across the full stack, cloud infrastructure, third-party resource integration while maintaining the team's flexibility and agility to adjust to business needs while pushing the boundaries of the most bleeding-edge technologies. I have earlier co-founded and was the CTO of Cambridge Coding Academy and finished a PhD (as well as BA) at the University of Cambridge.\",\n          \"private\": \"false\",\n          \"title\": \"Andrius Aucinas\"\n        },\n        \"mobile\": {\n          \"no\": \"\",\n          \"private\": \"true\"\n        },\n        \"gender\": {\n          \"type\": \"\",\n          \"private\": \"true\"\n        }\n      }}"
						},
						"description": "Using Rumpel profile as an exmaple, can save the whole object as a single API call"
					}

```
