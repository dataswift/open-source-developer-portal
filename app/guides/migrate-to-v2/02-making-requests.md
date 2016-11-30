---
layout: twoColumn
section: guides
type: guide
guide: 
    name: migrate-to-v2
    step: '2'
title: Migrate to v2
description: Underlying principles of Dwolla's v2 API and guidance on upgrading your application from Dwolla's legacy v1 API. 
---

# Making requests

Since you are talking to a new API, the components that make up a request such as the base URL, headers, and request payload will vary slightly. Interacting with v2 is fairly straightforward, and you should be aware of the following items when calling the API:

* The base URL has changed in API v2 from `https://www.dwolla.com/oauth/rest/` to simply `https://api.dwolla.com/`
* All requests should supply the `Accept` header with a value of: application/vnd.dwolla.v1.hal+json. This new header tells Dwolla how to interpret the request (specifically what format you expect in the response) and provides the ability to easily version the API if needed!
* When data is supplied in a POST body, the `Content-Type` header is required with a value of: application/vnd.dwolla.v1.hal+json or simply application/json. The Content-Type header describes the data in the body of the request(e.g. JSON).

#### Comparison of request and response between v1 and v2

##### v1
```noselect
POST https://www.dwolla.com/oauth/rest/transactions/send
Content-Type: application/json
Authorization: Bearer <TOKEN HERE>

{
  "amount": 50,
  "destinationId": "812-114-7461",
  "destinationType": "Dwolla",
  "fundsSource": "balance",
  "notes": "This is a note",
  "pin": 1234
}

...

HTTP/1.1 200 OK
{
  "Success": true,
  "Message": "Success",
  "Response": 1598519,
  "_links": null
}
```
#####v2
```noselect
POST https://api.dwolla.com/transfers
Accept: application/vnd.dwolla.v1.hal+json
Content-Type: application/json
Authorization: Bearer <TOKEN HERE>

{
    "_links": {
        "source": {
            "href": "https://api.dwolla.com/funding-sources/24c4828a-6609-4cb9-8aa0-08b0bd79c0e0"
        },
        "destination": {
            "href": "https://api.dwolla.com/accounts/fb7cfa0d-5cb5-4e13-9b60-34fa73be266b"
        }
    },
    "amount": {
        "currency": "USD",
        "value": "842.00"
    },
    "metadata": {
        "foo": "bar"
    }
}

...

HTTP/1.1 201 Created
Location: https://api.dwolla.com/transfers/05689560-d480-e611-80e8-0aa34a9b2388

```

<nav class="pager-nav">
    <a href="01-api-v2-principles.html">Back: API v2 principles</a>
    <a href="03-authentication.html">Next step: Authentication</a>
</nav>
