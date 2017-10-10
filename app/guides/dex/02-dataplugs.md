---
layout: twoColumn
section: guides
type: Data Exchange Services
guide: 
    name: dex
    step: 02-dataplugs
title: DataPlug Managmenet
description: DataPlug Managmenet
# Parameters used in code examples
hat: test.hubat.net
access_token: ACCESS_TOKEN
dataplugId: DATAPLUG_ID
---

DataPlugs are the microservices that bring data from other digital resources into HATs. However, to ensure users' privacy in the distributed ecosystem, DEX requires DataPlugs to be registered before they can be _plugged into_ a HAT.

DEX records some basica data about every plug:

| Parameter       | Description                                                        | Required/Generated |
|:----------------|:-------------------------------------------------------------------|:-------------------|
| uuid            | UUID of the DataPlugem                                             | Generated          |
| providerId      | date when the field was created                                    | Generated          |
| created         | date when the DataPlug was registered                              | Generated          |
| name            | Alpha-numerical name of the Plug                                   | Required           |
| description     | Textual description of what the Plug Does                          | Required           |
| url             | Address of the plug for users to visit to connect                  | Required           |
| illustrationUrl | Logo of the plug, typically shown in the UI for connecting plugs   | Required           |
| passwordHash    | Hash of the DataPlug's password, set up with a HAT when connecting | Required           |
| approved        | Whether or not the plug has been approved within the DEX           | Required           |


To register a new DataPlug, you will need to (contact)[mailto:contact@hatdex.org] us, providing the required details. Your plug will then be reviewed to check if it matches the ecosystem's privacy requirements, only sends the personal data to the users' HATs and nowhere else, actually works, etc.

### Listing DataPlugs

All DataPlugs are public, listed by the DEX:

```postman
"request": {
	"method": "GET",
	"header": [
		{
			"key": "Content-Type",
			"value": "application/json",
			"description": ""
		},
		{
			"key": "X-Auth-Token",
			"value": "{{page.access_token}}",
			"description": ""
		}
	],
	"body": {},
	"url": "https://dex.hubofallthings.com/api/dataplugs",
	"description": ""
}
```


Providing a list of all DataPlugs and their details.

### Connecting a DataPlug

Because the HATs are distributed and are likely to be created before you register your own DataPlug, HATs do not necessarily recognise the plug and your authentication would fail initially. When your DataPlug is registered, you as the owner of the plug receive a set of credentials to use with the DEX and your account is associated with the plug as the "owner" account. Before you can connect to a HAT, you need to ask DEX to connect:

```postman
"request": {
	"method": "GET",
	"header": [
	{
		"key": "X-Auth-Token",
		"value": "{{page.access_token}}",
		"description": ""
	}
	],
	"body": {},
	"url": "https://dex.hubofallthings.com/api/dataplugs/{{page.dataplugId}}/connect",
	"description": ""
}
```

Once DEX responds with `200 OK` status and a message saying that the DataPlug has been connected, you can connect directly to the HAT with username matching the `name` of your plug and the password corresponding to the `passwordHash`.


<nav class="pager-nav">
<a href="01-statistics.html">Ecosystem Statistics</a>
<a href="02-dataplugs.html">Data Offers</a>
</nav>