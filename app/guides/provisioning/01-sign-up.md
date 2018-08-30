---
layout: twoColumn
section: guides
type: Provisioning
guide: 
    name: provisioning
    step: 01-sign-up
title: Step 1 - Sign user up with Milliner
description: Sign a user up with Milliner
---

To sign a user up, you should submit their details to *Milliner*. For testing you are welcome to use the development cluster at `hubat.net`, but becoming a HAT Service Provider you will be issued with a separate address.

```postman
	"request": {
		"url": "https://<cluster>/api/signup",
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
			"raw": "{\n\t\"fullName\": \"Name LastName\",\n\t\"username\": \"testhat\",\n\t\"email\": \"email@example.com\",\n\t\"pass\": \"very-strong-password\",\n\t\"passRepeat\": \"very-strong-password\"\n}"
		},
		"description": "Register a new HAT with a cluster"
	}
```

If signing up is successful, you will receive a simple response:

```postmanresponse
	"response": [
		{
			"name": "Successful Signup",
			"code": 200,
			"header": [
				{
					"key": "Content-Type",
					"value": "application/json",
					"name": "Content-Type",
					"description": ""
				}
			],
			"cookie": [],
			"body": "{\"status\":\"OK\",\"message\":\"Signup for testhat saved\"}"
		}
	]
```

Alternatively, the response will signal an error through HTTP response status and contain detail as to the nature of the error in the message body

```postmanresponse
	"response": [
		{
			"name": "Error: invalid username",
			"status": "Bad Request",
			"code": 400,
			"header": [
				{
					"key": "Content-Type",
					"value": "application/json",
					"name": "Content-Type",
					"description": "The mime type of this content"
				}
			],
			"cookie": [],
			"body": "{\"message\":\"Invalid username\",\"cause\":\"Username must not contain spaces, uppercase letters or special characters, 22 characters maximum\"}"
		},
		{
			"name": "Error: Duplicate Signup",
			"status": "Bad Request",
			"code": 400,
			"header": [
				{
					"key": "Content-Type",
					"value": "application/json",
					"name": "Content-Type",
					"description": "The mime type of this content"
				}
			],
			"cookie": [],
			"body": "{\"message\":\"Duplicate Signup\",\"cause\":\"HAT with such username or email already exists\"}"
		}
	]
```

<nav class="pager-nav">
<a href="./">Overview</a>
<a href="02-create-hat.html">Next Step: Start the HAT</a>
</nav>
