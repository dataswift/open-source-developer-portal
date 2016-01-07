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

### Step A. Create an access token.
Go to the <a href="https://tokengenerator.dwolla.com" target="_blank">token generator</a>. 

Use your application’s key and secret and select the following scopes: Send, Funding, Transactions, and ManageCustomers. When you get to the OAuth login log in screen, log in with your child Sandbox account. Once you agree to the permissions, you'll receive an access and refresh token pair that contains the proper scopes for creating and managing customers. More detail is available in [API docs](https://docsv2.dwolla.com/#oauth).

### Step B. Create a customer

Create a customer for each user you’d like to transfer funds to. At a minimum, provide the user’s full name, email address, and IP address to create the customer. More detail is available in [API docs](https://docsv2.dwolla.com/#customers).

```raw
POST https://api-uat.dwolla.com/customers
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer 0Sn0W6kzNicvoWhDbQcVSKLRUpGjIdlPSEYyrHqrDDoRnQwE7Q
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@email.com",
  "ipAddress": "127.0.0.1"
}

HTTP/1.1 201 Created
Location: https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C
```
```ruby
new_customer = DwollaSwagger::CustomersApi.create({:body => {
  :firstName => 'Bob',
  :lastName => 'Merchant',
  :email => 'bmerchant@nomail.net',
  :ipAddress => '127.0.0.1'
}})

p new_customer # => https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C
```
```javascript
dwolla.then(function(dwolla) {
    dwolla.customers.create({
      "firstName": "Bob",
      "lastName": "Merchant",
      "email": "bmerchant@nomail.net",
      "ipAddress": "99.99.99.99"})
      .then(function(data) {
          console.log(data); // https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
      });
});
```
```python
customers_api = dwollaswagger.CustomersApi(client)

new_customer = customers_api.create(body = {
  'firstName': 'Bob', 
  'lastName': 'Merchant',
  'email': 'bmerchant@nomail.net',
  'ipAddress': '127.0.0.1'
})

print(new_customer) # => https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C
```
```php
<?php
$customersApi = new DwollaSwagger\CustomersApi($apiClient);

$new_customer = $customersApi->create([
  'firstName' => 'Bob',
  'lastName' => 'Merchant',
  'email' => 'bmerchant@nomail.net',
  'ipAddress' => '127.0.0.1'
]);

print($new_customer); # => https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C
?>
```
```java
CustomersApi cApi = new CustomersApi(a);

CreateCustomer newCustomerData = new CreateCustomer();

myNewCust.setFirstName("Bob");
myNewCust.setLastName("Merchant");
myNewCust.setEmail("bmerchant@nomail.com");
myNewCust.setIpAddress("127.0.0.1");

try {
    Unit$ r = cApi.create(myNewCust);
    System.out.println(r.getLocationHeader()); // => https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C
}
catch (Exception e) {
    System.out.println("Something's up!");
}
```

When the customer is created, you’ll receive the customer URL in the location header. If using an SDK, the location will be returned to you upon calling `create()`.

*Important*: Provide the IP address of the end-user accessing your application as the ipAddress parameter. This enhances Dwolla’s  ability to detect fraud. Sending random, hardcoded, or incorrect information in the ipAddress field will cause delays or throttling of requests.

### Step C. Attach a funding source to the customer

The next step is to attach a bank or credit union account to the customer by providing the bank account’s routing number, account number, and account type. 

Funds transferred to this customer will be automatically swept into the funding source. The example below shows sample bank information, but you will include actual routing, account, and bank name after prompting your customer for this information within your application. Possible values for “type” can be either “checking” or “savings”. More detail is available in [API docs](https://docsv2.dwolla.com/#funding-sources). 

```raw
POST https://api.dwolla.com/customers/C7F300C0-F1EF-4151-9BBE-005005AC3747/funding-sources
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer 0Sn0W6kzNicvoWhDbQcVSKLRUpGjIdlPSEYyrHqrDDoRnQwE7Q
{
    "routingNumber": "222222226",
    "accountNumber": "123456789",
    "type": "checking",
    "name": "John Doe - Checking"
}

HTTP/1.1 201 Created
Location: https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31
```
```ruby
new_fs = DwollaSwagger::FundingsourcesApi.create_customer_funding_source \ 
('https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C', {:body => {
                                                    :routingNumber => '222222226',
                                                    :accountNumber => '123456789',
                                                    :type => 'checking',
                                                    :name => 'John Doe - Checking'
                                                 }})

p new_fs # => https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31
```
```javascript
dwolla.then(function(dwolla) {
    dwolla['funding-sources'].createCustomerFundingSource({
      "routingNumber": "222222226",
      "accountNumber": "123456789",
      "type": "checking",
      "name": "John Doe - Checking"
    }).then(function(data) {
       console.log(data); // https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31
    });
});
```
```python
funding_api = dwollaswagger.FundingsourcesApi(client)

new_fs = funding_api.create_customer_funding_source('https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C', body = {"routingNumber": "222222226",
        "accountNumber": "123456789",
        "type": "checking",
        "name": "John Doe - Checking"})

p new_fs # => https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31
```
```php
<?php
$fundingApi = new DwollaSwagger\FundingsourcesApi($apiClient);

$new_fs = $fundingApi->createCustomerFundingSource(
       ["routingNumber": "222222226",
        "accountNumber": "123456789",
        "type": "checking",
        "name": "John Doe - Checking"], "https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C");

print($new_fs); # => https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31
?>
```

The created funding source URL is returned in the location header.

<nav class="pager-nav">
    <a href="./">Back: Overview</a>
    <a href="02-fetch-funding-sources.html">Next step: Fetch funding sources</a>
</nav>