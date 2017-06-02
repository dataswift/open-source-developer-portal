---
layout: twoColumn
section: documentation
type: API v2
title:  "Authentication"
description: "Authentication v2"
---

# Authentication

Authentication happens the usual HAT way: with username and password sent inside headers, which responds with an Access Token used for further API calls

### HTTP Request
   
GET Authenticate
https://testing.hubat.net/users/access_token

`Authenticate with the HAT to get Access Token used in future requests`

### Headers

#### Accept
application/json

#### username
testing

#### password
labai-geras-slaptazodis


```postman

"request": {
						"url": "https://{{hat}}/users/access_token",
						"method": "GET",
						"header": [
							{
								"key": "Accept",
								"value": "application/json",
								"description": ""
							},
							{
								"key": "username",
								"value": "{{username}}",
								"description": ""
							},
							{
								"key": "password",
								"value": "{{password}}",
								"description": ""
							}
						],
						"body": {
							"mode": "raw",
							"raw": ""
						},
						"description": "Authenticate with the HAT to get Access Token used in future requests"
					}

```
