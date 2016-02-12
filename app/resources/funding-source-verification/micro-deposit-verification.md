---
layout: twoColumn
section: Funding source verification
type: article
title:  "Micro-deposit verification"
weight: 0
description: "Programmatically verify a bank to initiate a bank transfer."
---

# Funding source verification

## Micro-deposit verification
If you choose to verify using micro-deposits, Dwolla will transfer two deposits of less than $0.10 to the Customer's linked bank or credit union account. After [initiating micro-deposits](#initiate-micro-deposits), these two random amounts should post to the Customer’s bank account in 1-2 business days. Once the Customer sees these deposits in their account, they need to verify the two deposit amounts in your application. If subscribed to [webhooks](/guides/webhooks), your application will be notified throughout this process with the triggered events of `customer_microdeposits_added` and either `customer_microdeposits_completed` or `customer_microdeposits_failed`.

### Get the funding source
Once the Customer has [added the bank account](http://docsv2.dwolla.com/#new-funding-source-customer) you need to retrieve the funding source and follow the link to `initiate-micro-deposits`. A link to `initiate micro-deposits` will appear when an unverified `bank` is eligible to receive micro-deposits. 

```raw
GET https://api.dwolla.com/funding-sources/692486f8-29f6-4516-a6a5-c69fd2ce854c
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

...

{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/funding-sources/692486f8-29f6-4516-a6a5-c69fd2ce854c"
    },
    "customer": {
      "href": "https://api.dwolla.com/customers/36e9dcb2-889b-4873-8e52-0c9404ea002a"
    },
    "initiate-micro-deposits": {
      "href": "https://api.dwolla.com/funding-sources/692486f8-29f6-4516-a6a5-c69fd2ce854c/micro-deposits"
    }
  },
  "id": "692486f8-29f6-4516-a6a5-c69fd2ce854c",
  "status": "unverified",
  "type": "bank",
  "name": "Test checking account",
  "created": "2015-10-23T20:37:57.137Z"
}
```
```ruby
fund_source = 'https://api.dwolla.com/funding-sources/692486f8-29f6-4516-a6a5-c69fd2ce854c'

retrieved = DwollaSwagger::FundingsourcesApi.id(fund_source)
p retrieved.name # => "Test checking account"
```
```php
<?php
$fund_source = 'https://api.dwolla.com/funding-sources/692486f8-29f6-4516-a6a5-c69fd2ce854c';

$fsApi = DwollaSwagger\FundingsourcesApi($apiClient);

$retrieved = $fsApi->id($fund_source);
print($retrieved->name); # => "Test checking account"
?>
```
```python
fund_source = 'https://api.dwolla.com/funding-sources/692486f8-29f6-4516-a6a5-c69fd2ce854c'

fs_api = dwollaswagger.FundingsourcesApi(client)
retrieved = fs_api.id(fund_source)

print(retrieved.name) # => Test checking account
```
```javascript
dwolla.then(function(dwolla) {
    dwolla['funding-sources'].id({id: '692486f8-29f6-4516-a6a5-c69fd2ce854c'})
    .then(function(data) {
       console.log(data.obj._embedded.name); // Test checking account
    });
});
```

### Initiate micro-deposits 
After you follow the link to `initiate-micro-deposits` Dwolla will trigger two micro-deposits. The `retrieved` variable from the previous step holds the location of the Customer's Funding Source and is passed over to the `micro_deposits()` function. If the request is successful, Dwolla returns a `HTTP 201` and a link to the resource `fundingsources/{id}/micro-deposits` in the location header, which can be later used to verify micro-deposit amounts. If your application is subscribed to webhooks, a webhook will be sent with the event topic of `customer-micro-deposits-added`, notifying your application that micro-deposits are en route to the Customer’s bank account.

```raw
POST https://api-uat.dwolla.com//funding-sources/e52006c3-7560-4ff1-99d5-b0f3a6f4f909/micro-deposits
Authorization: Bearer 8tJjM7iTjujLthkbVPMUcHLqMNw4uv5kG712g9j1RRBHplGpwo
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Cache-Control: no-cache

HTTP/1.1 201 Created
Location: https://api.dwolla.com/funding-sources/e52006c3-7560-4ff1-99d5-b0f3a6f4f909/micro-deposits
```
```ruby
DwollaSwagger::FundingsourcesApi.micro_deposits(retrieved)
```
```javascript
dwolla.then(function(dwolla) {
    dwolla['funding-sources'].microDeposits({id: 'e52006c3-7560-4ff1-99d5-b0f3a6f4f909'})
    .then(function(data) {
       console.log(data.status); // 201
    });
});
```
```python
fs_api = dwollaswagger.FundingsourcesApi(client)
fs_api.micro_deposits(retrieved)
```
```php
<?php
$fsApi = new DwollaSwagger\FundingsourcesApi($apiClient);
$fsApi->micro_deposits($retrieved);
?>
```

### Verify micro-deposits
In the Dwolla production environment, you must wait until the micro-deposits actually post to the Customer’s bank account before the account can be verified, which can take 1-2 business days. However, in the Sandbox environment, any amount **below** $0.10 will allow you to verify the account immediately. This operation is successful unless an exception is thrown:

`amount1`: `0.03`

`amount2`: `0.09`

```raw
POST /funding-sources/e52006c3-7560-4ff1-99d5-b0f3a6f4f909/micro-deposits 
Authorization: Bearer 8tJjM7iTjujLthkbVPMUcHLqMNw4uv5kG712g9j1RRBHplGpwo
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json

{
    "amount1": {
        "value": "0.03",
        "currency": "USD"
    },
    "amount2": {
        "value": "0.09",
        "currency": "USD"
    }
}

HTTP/1.1 200 OK
{
  "_links": {
    "self": {
      "href": "https://api-uat.dwolla.com/funding-sources/e52006c3-7560-4ff1-99d5-b0f3a6f4f909/micro-deposits"
    }
  }
}
```
```ruby
DwollaSwagger::FundingsourcesApi.verify_micro_deposits_exist(retrieved, {
    "amount1" => {
           "value" => "0.03",
        "currency" => "USD"
    },
    "amount2" => {
           "value" => "0.09",
        "currency" => "USD"
    }
})
```
```javascript
dwolla.then(function(dwolla) {
    dwolla['funding-sources'].microDeposits({id: 'e52006c3-7560-4ff1-99d5-b0f3a6f4f909', body: {
        "amount1": {
            "value": "0.03",
            "currency": "USD"
        },
        "amount2": {
            "value": "0.09",
            "currency": "USD"
        }
    }})
    .then(function(data) {
       console.log(data.status); // 200
    });
});
```
```python
fs_api = dwollaswagger.FundingsourcesApi(client)

fs_api.verify_micro_deposits_exist(retrieved, {
    "amount1": {
        "value": "0.03",
        "currency": "USD"
    },
    "amount2": {
        "value": "0.09",
        "currency": "USD"
    }
})
```
```php
<?php
$fsApi = new DwollaSwagger\FundingsourcesApi($apiClient);

$fsApi->verify_micro_deposits_exist($retrieved, array (
  'amount1' => 
  array (
    'value' => '0.03',
    'currency' => 'USD',
  ),
  'amount2' => 
  array (
    'value' => '0.09',
    'currency' => 'USD',
  ),
));
?>
```