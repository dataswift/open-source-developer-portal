---
layout: twoColumn
section: guides
type: Data Exchange Services
guide: 
    name: dex
    step: 03-offers
title: Data Offer brokering and setup
description: The utilities provided by DEX for requesting for data from HATs
# Parameters used in code examples
hat: test.hubat.net
access_token: ACCESS_TOKEN
offerId: OFFER_ID
---

An _Offer_ is one side of a data exchange agreement between the individual HAT owner and any other entity requesting data, the other side being the Data Debit. For the DEX, an Offer simply describes what data is requested and for how long. Applications do not have rights to directly create a Data Debit on a HAT, but instead ask DEX to do so on their behalf when the user _claims_ the Offer. It is important to note, however, that even DEX is not able to grant itself access to the data, but only request for data from a HAT by registering a Data Debit: the Data Debit is not active until the owner of the HAT _explicitly enables_ the Data Debit.

### Offer details

| Parameter          | Description                                                                                       |
|:-------------------|:--------------------------------------------------------------------------------------------------|
| offerId            | Alphanumeric Offer ID - must be unique                                                            |
| title              | Title of the Offer                                                                                |
| description        | Textual description of the Offer                                                                  |
| starts             | The (UNIX timestamp) Date and Time of when the Offer becomes available for claiming               |
| expires            | The Date and Time of when the Offer expires                                                       |
| collectionDuration | Duration of data collection (in milliseconds) from the moment a HAT claims the Offer              |
| dataConditions     | (Optional) conditions that need to be satisfied, i.e. contain data in the Data Bundle format      |
| requiredData       | The technical definition of the data required in the Data Bundle format                           |
| requiredMinUser    | The minimum number of users required to release access to all claiming HATs, confirming exchange  |
| requiredMaxUser    | The maximum number of users allowed to claim the offer, e.g. to control the maximum campaign cost |
| status             | Valid values include: "approved" and "rejected"                                                   |

The format of the Data Bundle is covered in the [guide on the power of HAT data bundling](../data-bundling/02-data-bundles.html)

### Register an Offer

To be able to register an Offer directly with DEX, your account will need to have `MarketPlace` role granted. Normally you would use the graphical interface provided by e.g. the [DataBuyer service](https://databuyer.hubofallthings.com) to create your Offer.

Offer is created by sending all the details as described above to DEX, for example:

```postman
"request": {
	"method": "POST",
	"header": [
		{
			"key": "X-Auth-Token",
			"value": "{{page.access_token}}",
			"description": ""
		},
		{
			"key": "Content-Type",
			"value": "application/json",
			"description": ""
		}
	],
	"body": {
		"mode": "raw",
		"raw": "{\n    \"offerId\": \"789d1dff-ce8d-4c6e-a201-e89ee9d7f5cf\",\n    \"title\": \"Location fetching offer\",\n    \"description\": \"Location fetch test\",\n    \"starts\": 1507503600000,\n    \"expires\": 1510099200000,\n    \"collectionDuration\": 86400000,\n    \"requiredData\": {\n        \"name\": \"789d1dff-ce8d-4c6e-a201-e89ee9d7f5cf\",\n        \"bundle\": {\n            \"iphone/locations\": {\n                \"endpoints\": [\n                    {\n                        \"endpoint\": \"iphone/locations\",\n                        \"mapping\": {\n                            \"accuracy\": \"accuracy\",\n                            \"latitude\": \"latitude\",\n                            \"longitude\": \"longitude\",\n                            \"timestamp\": \"timestamp\",\n                            \"lastUpdated\": \"lastUpdated\"\n                        },\n                        \"filters\": []\n                    }\n                ]\n            }\n        }\n    },\n    \"requiredMinUser\": 1,\n    \"requiredMaxUser\": 10,\n    \"status\": \"approved\"\n}"
	},
	"url": "https://dex.hubofallthings.com/api/v2/offer",
	"description": ""
}
```

Only after the Offer has been registered (DEX responds with status `201 CREATED`), it can be claimed by users.

### Claim an Offer

Claiming an offer through DEX, or rather registering a claim, can be done by either the HAT, or by the owner of the Offer (i.e. the account that has registered it):

- Claim by the HAT is done by sending a request with a fresh and appropriate Access Token (one that has been issued for the use with DEX) to `GET /api/v2/offer/:id/claim`, where `:id` is the Offer ID that is being claimed.
- Claim by the Offer owner is done by sending a request with an Access Token issued to the owner account, to the endpoint `PUT /api/v2/offer/:id/registerClaim?hat=address`, where `:id` is the Offer ID and `address` is the HAT address.

An example of registering an offer claim is below:

```postman
"request": {
	"method": "PUT",
	"header": [
		{
			"key": "X-Auth-Token",
			"value": "{{page.access_token}}",
			"description": ""
		}
	],
	"body": {},
	"url": "https://dex.hubofallthings.com/api/v2/offer/{{page.offerId}}/registerClaim?hat={{page.hat}}",
	"description": "Uses Offer owner's credentials (the marketplace, from DEX point of view) to register an offer claim, triggering a data debit being created"
}
```

To which, if the claim is processed successfully, DEX responds with the details of the claim:

```postmanresponse
"response": [
	{
		"name": "Register claim for HAT",
		"status": "OK",
		"code": 200,
		"header": [
			{
				"key": "Content-Type",
				"value": "application/json",
				"name": "Content-Type",
				"description": "The mime type of this content"
			}
		],
		"body": "{\"offerId\":\"{{page.offerId}}\",\"user\":{\"address\":\"{{page.hat}}\",\"publicKey\":\"-----BEGIN PUBLIC KEY-----\\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmbpD4OytlMcWRuGHgfy8\\nq9I9GT46Sh3FwuZQkicCMqMWaV9ukwo6mW+e4UciNh5acXf2qEnQdbRHCxNVe90G\\njTzVCPcFvigE/Tn9icNzISludwA4/uiAbaFwJg9dvXVphQuxZdq5dEIDAvPcqwUk\\nJBCX+CLBP1a0CWiB/ACbaVwYm2bZApZe52BLiw7ejvM6UvQoOjOYiRiVGJKdgUgm\\nWIruC+bMcbhbNpf/11M0+YCi/d51OSwup/nyEweoa6deTrMdFyMosnlcknEaWx9t\\nNPU3Agub9SNZVKkXTYgRXzoQu8k/BC331uKII1pi6atqLjQGkY4rY6fXJ3Db3NYI\\n9QIDAQAB\\n-----END PUBLIC KEY-----\\n\"},\"relationship\":\"claim\",\"confirmed\":false,\"dataDebitId\":\"{{page.offerId}}\",\"dateCreated\":1507651701435}"
	}
]
```


### List offer claims

The final step in the Offer Claim process after the claim and the user accepting the Data Debit on their side, is getting credentials issued by DEX for collecting data from confirmed HATs. The call needs to be authenticated with the Offer owner's Access Token as well:

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
	"url": "https://dex.hubofallthings.com/api/v2/offer/{{page.offerId}}/claims",
	"description": ""
}
```

The DEX response includes access credentials and the list of all confirmed claims:

```postmanresponse
"response": [
	{
		"name": "List confirmed Offer claims",
		"status": "OK",
		"code": 200,
		"header": [
			{
				"key": "Content-Type",
				"value": "application/json",
				"name": "Content-Type",
				"description": "The mime type of this content"
			}
		],
		"body": "{\"credentials\":{\"offerId\":\"{{page.offerId}}\",\"login\":\"location-test-offer\",\"passwordPlain\":\"PASSWORD\",\"passwordHash\":\"$2a$10$nCwNyaQYYZ8wvJN5GCXf/OBVHhFl0fy6VpOL.FKtxXx17FZJhNS2O\",\"dateCreated\":1506608497820},\"claims\":[{\"offerId\":\"{{page.offerId}}\",\"user\":{\"address\":\"{{page.hat}}\",\"publicKey\":\"-----BEGIN PUBLIC KEY-----\\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmbpD4OytlMcWRuGHgfy8\\nq9I9GT46Sh3FwuZQkicCMqMWaV9ukwo6mW+e4UciNh5acXf2qEnQdbRHCxNVe90G\\njTzVCPcFvigE/Tn9icNzISludwA4/uiAbaFwJg9dvXVphQuxZdq5dEIDAvPcqwUk\\nJBCX+CLBP1a0CWiB/ACbaVwYm2bZApZe52BLiw7ejvM6UvQoOjOYiRiVGJKdgUgm\\nWIruC+bMcbhbNpf/11M0+YCi/d51OSwup/nyEweoa6deTrMdFyMosnlcknEaWx9t\\nNPU3Agub9SNZVKkXTYgRXzoQu8k/BC331uKII1pi6atqLjQGkY4rY6fXJ3Db3NYI\\n9QIDAQAB\\n-----END PUBLIC KEY-----\\n\"},\"relationship\":\"claim\",\"confirmed\":true,\"dataDebitId\":\"{{page.offerId}}\",\"dateCreated\":1506608497636}]}"
	}
]
```


<nav class="pager-nav">
<a href="02-dataplugs.html">Data Plugs</a>
<a href="04-accounts.html">HAT DEX users</a>
</nav>