---
layout: twoColumn
section: guides
type: guide
guide:
    name: transfer-money-between-users
    step: '3'
title:  "Step 3: Attach an unverified funding source"
---

# Step 3: Attach an unverified funding source

Next, we’ll add Jane Merchant’s bank or credit union account as an unverified funding source.  Unverified funding sources can only receive funds, not send. 

The example below shows sample bank information, but you will include actual bank name, routing, and account numbers after prompting your customer for this information within your application. Possible values for `type` can be either “checking” or “savings”. More detail is available in [API docs](https://docsv2.dwolla.com/#create-a-funding-source-for-a-customer). 

```raw
POST https://api.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C/funding-sources
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer 0Sn0W6kzNicvoWhDbQcVSKLRUpGjIdlPSEYyrHqrDDoRnQwE7Q
{
    "routingNumber": "222222226",
    "accountNumber": "123456789",
    "type": "checking",
    "name": "Jane Merchant"
}

HTTP/1.1 201 Created
Location: https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31
```
```ruby
customer_url = 'https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C'
request_body = {
  routingNumber: '222222226',
  accountNumber: '123456789',
  type: 'checking',
  name: 'Jane Merchant'
}

# Using DwollaV2 - https://github.com/Dwolla/dwolla-v2-ruby (Recommended)
funding_source = app_token.post "#{customer_url}/funding-sources", request_body
funding_source.headers[:location] # => "https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31"

# Using DwollaSwagger - https://github.com/Dwolla/dwolla-swagger-ruby
funding_source = DwollaSwagger::FundingsourcesApi.create_customer_funding_source(customer_url, :body => request_body)
funding_source # => "https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31"
```
```javascript
var customerUrl = 'https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C';
var requestBody = {
  'routingNumber': '222222226',
  'accountNumber': '123456789',
  'type': 'checking',
  'name': 'Jane Merchant'
};

appToken
  .post(`${customerUrl}/funding-sources`, requestBody)
  .then(res => res.headers.get('location')); // => 'https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31'
```
```python
customer_url = 'https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C'
request_body = {
  'routingNumber': '222222226',
  'accountNumber': '123456789',
  'type': 'checking',
  'name': 'Jane Merchant'
}

# Using dwollav2 - https://github.com/Dwolla/dwolla-v2-python (Recommended)
customer = app_token.post('%s/funding-sources' % customer_url, request_body)
customer.headers['location'] # => 'https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31'

# Using dwollaswagger - https://github.com/Dwolla/dwolla-swagger-python
funding_api = dwollaswagger.FundingsourcesApi(client)
funding_source = funding_api.create_customer_funding_source(customer_url, body = request_body)
funding_source # => 'https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31'
```
```php
<?php
$fsApi = new DwollaSwagger\FundingsourcesApi($apiClient);

$customer = 'https://api.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C/funding-sources'
$new_fs = $fsApi->createCustomerFundingSource($customer, array (
  'routingNumber' => '222222226',
  'accountNumber' => '123456789',
  'type' => 'checking',
  'name' => 'Jane Merchant',
));

print($new_fs); # => https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31
?>
```

The created funding source URL is returned in the location header.

<nav class="pager-nav">
    <a href="./02-create-verified-customer.html">Back: Create a verified customer</a>
    <a href="04-create-unverified-customer.html">Next step: Create an unverified customer</a>
</nav>
