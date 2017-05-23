---
layout: twoColumn
section: documentation
type: documentation-api2
title:  "Data"
description: "Data v2"
---

# Authentication

Authentication happens the usual HAT way: with username and password sent inside headers, which responds with an Access Token used for further API calls

### HTTP Request
   
GET Authenticate
https://testing.hubat.net/users/access_token

`Authenticate with the HAT to get Access Token used in future requests`

### Headers

| Parameter    | Description                                                                                               |
|--------------|-----------------------------------------------------------------------------------------------------------|
| Accept       | application/json                                                                                          |
| username     | username used for authentication together with password, instead of access_token (user and platform only) |
| password     | password used for authentication together with username, instead of access_token (user and platform only) |

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
