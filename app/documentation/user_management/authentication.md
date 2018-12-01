---
layout: twoColumn
section: "User Management"
type: article
title:  "Authentication"
description: "Authentication"
---

# Authentication

For both the Data import and export, the virtualised database will required permissions to ensure that a User has authorised certain API consumers to add or read the data from the various Tables within the database. For this, separate “Apps” that represent API User accounts will be present within each User’s HAT Microserver. Each App will own several permission sets within the database, which will determine which Tables the API consumers are able to access, in addition to the permissions the API consumers have on those Tables.

### Acquiring Access Token
    
The tokens used are JWT tokens and you can see the values set by the HAT (such as the issuer) at jwt.io. To acquire an access token, you should make a GET request to /user/access_token endpoint and the request should contain headers with username and pass (password). The response will contain the access token and user ID.

### Validating Access Token
    
Tokens are signed by the HAT’s public key using RSA algorithm so that their authenticity can be independently verified. To make sure the provided access token works with the specific HAT, make a GET request containing a header with X-Auth-Token to /users/access_token/validate endpoint. In case of a valid access token, your response will say "message": "Authenticated" and in a case of an invalid access token, you will get "message": "The supplied authentication is invalid" and "cause": "...".

### HTTP Request
   
GET http://hat.hubofallthings.net/

### Query Parameters

| Parameter    | Description                                                                                               |
|--------------|-----------------------------------------------------------------------------------------------------------|
| access_token | your access token used to authenticate                                                                    |
| username     | username used for authentication together with password, instead of access_token (user and platform only) |
| pass         | password used for authentication together with username, instead of access_token (user and platform only) |

### Creating a HAT

```postman
"request": {
				"url": "https://{{cluster}}/api/signup",
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json",
						"description": ""
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"fullName\": \"{{userName}} {{userLastName}}\",\n\t\"username\": \"{{hat}}\",\n\t\"email\": \"{{userEmail}}\",\n\t\"pass\": \"{{userPassword}}\",\n\t\"passRepeat\": \"{{userPassword}}\"\n}"
				},
				"description": "Register a new HAT with a cluster"
			}
```
