---
layout: twoColumn
section: guides
type: guide
guide:
    name: transfer-money-between-users
    step: '7'
title:  "Step 7: Check the status of your transfer"
---

# Step 7: Check the status of your transfer

You can check the status of the newly created transfer by retrieving the transfer by its URL.

#### Request and response (view schema in `raw`)
```raw
GET https://api.dwolla.com/transfers/d76265cd-0951-e511-80da-0aa34a9b2388
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

...

{
  "_links": {
    "self": {
      "href": "https://api-uat.dwolla.com/transfers/D76265CD-0951-E511-80DA-0AA34A9B2388"
    },
    "source": {
      "href": "https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C"
    },
    "destination": {
      "href": "https://api-uat.dwolla.com/customers/C7F300C0-F1EF-4151-9BBE-005005AC3747"
    }
  },
  "id": "D76265CD-0951-E511-80DA-0AA34A9B2388",
  "status": "pending",
  "amount": {
    "value": "225.00",
    "currency": "USD"
  },
  "created": "2015-09-02T00:30:25.580Z"
}
```
```ruby
transfer_url = 'https://api-uat.dwolla.com/transfers/d76265cd-0951-e511-80da-0aa34a9b2388'

# Using DwollaV2 - https://github.com/Dwolla/dwolla-v2-ruby (Recommended)
# For white label applications, an app_token can be used for this endpoint. (https://docsv2.dwolla.com/#application-access-token)
transfer = app_token.get transfer_url
transfer.status # => "pending"

# Using DwollaSwagger - https://github.com/Dwolla/dwolla-swagger-ruby
transfer = DwollaSwagger::TransfersApi.by_id(transfer_url)
transfer.status # => "pending"
```
```php
<?php
$transferUrl = 'https://api.dwolla.com/transfers/d76265cd-0951-e511-80da-0aa34a9b2388';

$transfersApi = new DwollaSwagger\TransfersApi($apiClient);

$transfer = $transfersApi->byId($transferUrl);
$transfer->status; # => "pending"
?>
```
```python
transfer_url = 'https://api.dwolla.com/transfers/d76265cd-0951-e511-80da-0aa34a9b2388'

# Using dwollav2 - https://github.com/Dwolla/dwolla-v2-python (Recommended)
# For white label applications, an app_token can be used for this endpoint. (https://docsv2.dwolla.com/#application-access-token)
transfer = app_token.get(transfer_url)
transfer.body['status'] # => 'pending'

# Using dwollaswagger - https://github.com/Dwolla/dwolla-swagger-python
transfers_api = dwollaswagger.TransfersApi(client)
transfer = transfers_api.by_id(transfer_url)
transfer.status # => 'pending'
```
```javascript
var transferUrl = 'https://api.dwolla.com/transfers/d76265cd-0951-e511-80da-0aa34a9b2388';

// For white label applications, an appToken can be used for this endpoint. (https://docsv2.dwolla.com/#application-access-token)
appToken
  .get(transferUrl)
  .then(res => res.body.status); // => 'pending'
```

That’s it!  You’ve successfully transferred money from Joe Buyer to Jane Merchant. Please continue to the Webhooks guide for information on implementing notifications for your customers about the transfer.

<nav class="pager-nav">
    <a href="06-create-transfer.html">Back: Overview</a>
    <a href="/guides/webhooks">Next guide: Webhooks</a>
</nav>
