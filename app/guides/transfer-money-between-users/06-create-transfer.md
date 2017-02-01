---
layout: twoColumn
section: guides
type: guide
guide:
    name: transfer-money-between-users
    step: '6'
title:  "Step 6: Create a transfer"
---

# Step 6: Create a transfer

[Create a transfer](https://docsv2.dwolla.com/#transfers) by specifying Joe Buyer’s funding source as the source and Jane Merchant’s funding source as the destination. 

```raw
POST https://api-uat.dwolla.com/transfers
Accept: application/vnd.dwolla.v1.hal+json
Content-Type: application/vnd.dwolla.v1.hal+json
Authorization: Bearer 0Sn0W6kzNicvoWhDbQcVSKLRUpGjIdlPSEYyrHqrDDoRnQwE7Q
{
    "_links": {
        "source": {
            "href": "https://api-uat.dwolla.com/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197"
        },
        "destination": {
            "href": "https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31"
        }
    },
    "amount": {
        "currency": "USD",
        "value": "225.00"
    }
}

HTTP/1.1 201 Created
Location: https://api-uat.dwolla.com/transfers/d76265cd-0951-e511-80da-0aa34a9b2388
```
```ruby
request_body = {
  :_links => {
    :source => {
      :href => "https://api-uat.dwolla.com/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197"
    },
    :destination => {
      :href => "https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31"
    }
  },
  :amount => {
    :currency => "USD",
    :value => "225.00"
  }
}

# Using DwollaV2 - https://github.com/Dwolla/dwolla-v2-ruby (Recommended)
# For white label applications, an app_token can be used for this endpoint. (https://docsv2.dwolla.com/#application-access-token)
transfer = app_token.post "transfers", request_body
transfer.headers[:location] # => "https://api.dwolla.com/transfers/d76265cd-0951-e511-80da-0aa34a9b2388"

# Using DwollaSwagger - https://github.com/Dwolla/dwolla-swagger-ruby
transfer = DwollaSwagger::TransfersApi.create(:body => request_body)
transfer # => "https://api.dwolla.com/transfers/d76265cd-0951-e511-80da-0aa34a9b2388"
```
```javascript
var requestBody = {
  _links: {
    source: {
      href: 'https://api-uat.dwolla.com/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197'
    },
    destination: {
      href: 'https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31'
    }
  },
  amount: {
    currency: 'USD',
    value: '225.00'
  }
};

// For white label applications, an appToken can be used for this endpoint. (https://docsv2.dwolla.com/#application-access-token)
appToken
  .post('transfers', requestBody)
  .then(res => res.headers.get('location')); // => 'https://api.dwolla.com/transfers/d76265cd-0951-e511-80da-0aa34a9b2388'
```
```python
request_body = {
  '_links': {
    'source': {
      'href': 'https://api-uat.dwolla.com/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197'
    },
    'destination': {
      'href': 'https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31'
    }
  },
  'amount': {
    'currency': 'USD',
    'value': '225.00'
  }
}

# Using dwollav2 - https://github.com/Dwolla/dwolla-v2-python (Recommended)
# For white label applications, an app_token can be used for this endpoint. (https://docsv2.dwolla.com/#application-access-token)
transfer = app_token.post('transfers', request_body)
transfer.headers['location'] # => 'https://api.dwolla.com/transfers/d76265cd-0951-e511-80da-0aa34a9b2388'

# Using dwollaswagger - https://github.com/Dwolla/dwolla-swagger-python
transfers_api = dwollaswagger.TransfersApi(client)
transfer = transfers_api.create(body = request_body)
transfer # => 'https://api.dwolla.com/transfers/d76265cd-0951-e511-80da-0aa34a9b2388'
```
```php
<?php
$transfer_request = array (
  '_links' => 
  array (
    'source' => 
    array (
      'href' => 'https://api-uat.dwolla.com/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197',
    ),
    'destination' => 
    array (
      'href' => 'https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31',
    ),
  ),
  'amount' => 
  array (
    'currency' => 'USD',
    'value' => '225.00',
  )
);

$transferApi = new DwollaSwagger\TransfersApi($apiClient);
$myAccount = $transferApi->create($transfer_request);

print($xfer); # => https://api-uat.dwolla.com/transfers/d76265cd-0951-e511-80da-0aa34a9b2388
?>
```



<nav class="pager-nav">
    <a href="05-attach-verified-bank.html">Back: Attach a verified funding source</a>
    <a href="07-check-transfer.html">Next step: Check the status of your transfer</a>
</nav>