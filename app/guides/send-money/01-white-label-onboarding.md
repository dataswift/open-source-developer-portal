---
layout: twoColumn
section: guides
guide: 
    name: send-money
    step: 1a
type: guide
title:  "Step 1: White label onboarding"
---

# Step 1: Create recipients using white label solution

In this experience, end users create their accounts entirely within your application and you prompt for their bank or credit union account information. Dwolla will securely store this sensitive information.

### Step A. Generate an OAuth account access token
Navigate to the <a href="https://uat.dwolla.com/applications" target="_blank">applications page</a> to generate an account access token. 

Before selecting the "Create token" button, make sure your created application has the following scopes enabled: `Send`, `Funding`, `Transactions`, and `ManageCustomers`. Once you select the Create token button, you'll receive an access and refresh token pair that contains the proper scopes for creating and managing Customers. More detail for implementing the OAuth flow can be found in [API docs](https://docsv2.dwolla.com/#oauth).

### Step B. Create a Customer

Create a Customer for each user you’d like to transfer funds to. At a minimum, provide the user’s full name, email address, and IP address to create the Customer. More detail is available in [API docs](https://docsv2.dwolla.com/#customers).

```raw
POST https://api-uat.dwolla.com/customers
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer 0Sn0W6kzNicvoWhDbQcVSKLRUpGjIdlPSEYyrHqrDDoRnQwE7Q
{
  "firstName": "Jane",
  "lastName": "Merchant",
  "email": "jmerchant@nomail.net",
  "ipAddress": "99.99.99.99"
}

HTTP/1.1 201 Created
Location: https://api-uat.dwolla.com/customers/c7f300c0-f1ef-4151-9bbe-005005aa3747
```
```ruby
request_body = {
  :firstName => 'Jane',
  :lastName => 'Merchant',
  :email => 'jmerchant@nomail.net',
  :ipAddress => '99.99.99.99'
}

# Using DwollaV2 - https://github.com/Dwolla/dwolla-v2-ruby (Recommended)
customer = account_token.post "customers", request_body
customer.headers[:location] # => "https://api-uat.dwolla.com/customers/c7f300c0-f1ef-4151-9bbe-005005aa3747"

# Using DwollaSwagger - https://github.com/Dwolla/dwolla-swagger-ruby
customer = DwollaSwagger::CustomersApi.create(:body => request_body)
customer # => "https://api-uat.dwolla.com/customers/c7f300c0-f1ef-4151-9bbe-005005aa3747"
```
```javascript
var requestBody = {
  firstName: 'Jane',
  lastName: 'Merchant',
  email: 'jmerchant@nomail.net',
  ipAddress: '99.99.99.99'
};

accountToken
  .post('customers', requestBody)
  .then(function(res) {
    res.headers.get('location'); // => 'https://api-uat.dwolla.com/customers/c7f300c0-f1ef-4151-9bbe-005005aa3747'
  });
```
```python
request_body = {
  'firstName': 'Jane',
  'lastName': 'Merchant',
  'email': 'jmerchant@nomail.net',
  'ipAddress': '99.99.99.99'
}

# Using dwollav2 - https://github.com/Dwolla/dwolla-v2-python (Recommended)
customer = account_token.post('customers', request_body)
customer.headers['location'] # => 'https://api-uat.dwolla.com/customers/c7f300c0-f1ef-4151-9bbe-005005aa3747'

# Using dwollaswagger - https://github.com/Dwolla/dwolla-swagger-python
customers_api = dwollaswagger.CustomersApi(client)
customer = customers_api.create(body = request_body)
customer # => 'https://api-uat.dwolla.com/customers/c7f300c0-f1ef-4151-9bbe-005005aa3747'
```
```php
<?php
$customersApi = new DwollaSwagger\CustomersApi($apiClient);

$customer = $customersApi->create([
  'firstName' => 'Jane',
  'lastName' => 'Merchant',
  'email' => 'jmerchant@nomail.net',
  'ipAddress' => '99.99.99.99'
]);

print($customer); # => "https://api-uat.dwolla.com/customers/c7f300c0-f1ef-4151-9bbe-005005aa3747"
?>
```
```java
CustomersApi cApi = new CustomersApi(a);

CreateCustomer newCustomerData = new CreateCustomer();

myNewCust.setFirstName("Jane");
myNewCust.setLastName("Merchant");
myNewCust.setEmail("jmerchant@nomail.net");
myNewCust.setIpAddress("99.99.99.99");

try {
    Unit$ r = cApi.create(myNewCust);
    System.out.println(r.getLocationHeader()); // => https://api-uat.dwolla.com/customers/c7f300c0-f1ef-4151-9bbe-005005aa3747
}
catch (Exception e) {
    System.out.println("Something's up!");
}
```

When the Customer is created, you’ll receive the Customer URL in the location header. If using an SDK, the location will be returned to you upon calling `create()`.

*Important*: Provide the IP address of the end-user accessing your application as the ipAddress parameter. This enhances Dwolla’s  ability to detect fraud. Sending random, hardcoded, or incorrect information in the ipAddress field may cause delays or throttling of requests.

### Step C. Attach a funding source to the Customer

The next step is to attach a bank or credit union account to the Customer by providing the bank account’s routing number, account number, account type, and an arbitrary name. 

Funds transferred to this Customer will be automatically swept into the funding source. The example below shows sample bank information, but you will include actual routing, account, and bank name after prompting your customer for this information within your application. Possible values for “type” can be either “checking” or “savings”. More detail is available in [API docs](https://docsv2.dwolla.com/#funding-sources). 

```raw
POST https://api.dwolla.com/customers/c7f300c0-f1ef-4151-9bbe-005005aa3747/funding-sources
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer 0Sn0W6kzNicvoWhDbQcVSKLRUpGjIdlPSEYyrHqrDDoRnQwE7Q
{
    "routingNumber": "222222226",
    "accountNumber": "123456789",
    "type": "checking",
    "name": "Jane Merchant - Checking 6789"
}

HTTP/1.1 201 Created
Location: https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31
```
```ruby
customer_url = 'https://api-uat.dwolla.com/customers/c7f300c0-f1ef-4151-9bbe-005005aa3747'
request_body = {
  routingNumber: '222222226',
  accountNumber: '123456789',
  type: 'checking',
  name: 'Jane Merchant - Checking 6789'
}

# Using DwollaV2 - https://github.com/Dwolla/dwolla-v2-ruby (Recommended)
funding_source = account_token.post "#{customer_url}/funding-sources", request_body
funding_source.headers[:location] # => "https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31"

# Using DwollaSwagger - https://github.com/Dwolla/dwolla-swagger-ruby
funding_source = DwollaSwagger::FundingsourcesApi.create_customer_funding_source(customer_url, :body => request_body)
funding_source # => "https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31"
```
```javascript
var customerUrl = 'https://api-uat.dwolla.com/customers/c7f300c0-f1ef-4151-9bbe-005005aa3747';
var requestBody = {
  'routingNumber': '222222226',
  'accountNumber': '123456789',
  'type': 'checking',
  'name': 'Jane Merchant - Checking 6789'
};

accountToken
  .post(`${customerUrl}/funding-sources`, requestBody)
  .then(function(res) {
    res.headers.get('location'); // => 'https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31'
  });
```
```python
customer_url = 'https://api-uat.dwolla.com/customers/c7f300c0-f1ef-4151-9bbe-005005aa3747'
request_body = {
  'routingNumber': '222222226',
  'accountNumber': '123456789',
  'type': 'checking',
  'name': 'Jane Merchant - Checking 6789'
}

# Using dwollav2 - https://github.com/Dwolla/dwolla-v2-python (Recommended)
customer = account_token.post('%s/funding-sources' % customer_url, request_body)
customer.headers['location'] # => 'https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31'

# Using dwollaswagger - https://github.com/Dwolla/dwolla-swagger-python
funding_api = dwollaswagger.FundingsourcesApi(client)
funding_source = funding_api.create_customer_funding_source(customer_url, body = request_body)
funding_source # => 'https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31'
```
```php
<?php
$fundingApi = new DwollaSwagger\FundingsourcesApi($apiClient);

$new_fs = $fundingApi->createCustomerFundingSource([
  "routingNumber" => "222222226",
  "accountNumber" => "123456789",
  "type" => "checking",
  "name" => "Jane Merchant - Checking 6789"
], "https://api-uat.dwolla.com/customers/c7f300c0-f1ef-4151-9bbe-005005aa3747");

print($new_fs); # => https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31
?>
```

The created funding source URL is returned in the location header.

<nav class="pager-nav">
    <a href="./">Back: Overview</a>
    <a href="02-fetch-funding-sources.html">Next step: Fetch funding sources</a>
</nav>