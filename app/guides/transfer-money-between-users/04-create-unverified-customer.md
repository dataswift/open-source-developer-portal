---
layout: twoColumn
section: guides
type: guide
guide:
    name: transfer-money-between-users
    step: '4'
title:  "Step 4: Creating an unverified customer"
---

# Step 4: Creating an Unverified Customer

Now that we’ve created a customer for Jane Merchant and associated a funding source, we’ll do the same for Joe Buyer, but this time we’ll create an `Unverified Customer`, and a verified funding source which is capable of sending money.

Provide the user’s full name, email address, and IP address to create the customer. More detail is available in [API docs](https://docsv2.dwolla.com/#customers). 

```raw
POST https://api-uat.dwolla.com/customers
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer 0Sn0W6kzNicvoWhDbQcVSKLRUpGjIdlPSEYyrHqrDDoRnQwE7Q
{
"firstName": "Joe", 
"lastName": "Buyer",
"email": "jbuyer@mail.net"
}

HTTP/1.1 201 Created
Location: https://api-uat.dwolla.com/customers/247B1BD8-F5A0-4B71-A898-F62F67B8AE1C
```
```ruby
request_body = {
  :firstName => 'Joe',
  :lastName => 'Buyer',
  :email => 'jbuyer@mail.net',
  :ipAddress => '99.99.99.99'
}

# Using DwollaV2 - https://github.com/Dwolla/dwolla-v2-ruby (Recommended)
customer = app_token.post "customers", request_body
customer.headers[:location] # => "https://api-uat.dwolla.com/customers/247B1BD8-F5A0-4B71-A898-F62F67B8AE1C"

# Using DwollaSwagger - https://github.com/Dwolla/dwolla-swagger-ruby
customer = DwollaSwagger::CustomersApi.create(:body => request_body)
customer # => "https://api-uat.dwolla.com/customers/247B1BD8-F5A0-4B71-A898-F62F67B8AE1C"
```
```javascript
var requestBody = {
  firstName: 'Joe',
  lastName: 'Buyer',
  email: 'jbuyer@mail.net',
  ipAddress: '99.99.99.99'
};

appToken
  .post('customers', requestBody)
  .then(res => res.headers.get('location')); // => 'https://api-uat.dwolla.com/customers/247B1BD8-F5A0-4B71-A898-F62F67B8AE1C'
```
```python
request_body = {
  'firstName': 'Joe',
  'lastName': 'Buyer',
  'email': 'jbuyer@mail.net',
  'ipAddress': '99.99.99.99'
}

# Using dwollav2 - https://github.com/Dwolla/dwolla-v2-python (Recommended)
customer = app_token.post('customers', request_body)
customer.headers['location'] # => 'https://api-uat.dwolla.com/customers/247B1BD8-F5A0-4B71-A898-F62F67B8AE1C'

# Using dwollaswagger - https://github.com/Dwolla/dwolla-swagger-python
customers_api = dwollaswagger.CustomersApi(client)
customer = customers_api.create(body = request_body)
customer # => 'https://api-uat.dwolla.com/customers/247B1BD8-F5A0-4B71-A898-F62F67B8AE1C'
```
```php
<?php
$customersApi = new DwollaSwagger\CustomersApi($apiClient);

$new_customer = $customersApi->create([
  'firstName' => 'Joe',
  'lastName' => 'Buyer',
  'email' => 'jbuyer@mail.net'
]);

print($new_customer); # => https://api-uat.dwolla.com/customers/247B1BD8-F5A0-4B71-A898-F62F67B8AE1C
?>
```
```java
CustomersApi cApi = new CustomersApi(a);

CreateCustomer newCustomerData = new CreateCustomer();

myNewCust.setFirstName("Joe");
myNewCust.setLastName("Buyer");
myNewCust.setEmail("jbuyer@mail.com");

try {
    Unit$ r = cApi.create(myNewCust);
    System.out.println(r.getLocationHeader()); // => https://api-uat.dwolla.com/customers/247B1BD8-F5A0-4B71-A898-F62F67B8AE1C
}
catch (Exception e) {
    System.out.println("Something's up!");
}
```

When the customer is created, you’ll receive the customer URL in the location header. If using an SDK, the location will be returned to you upon calling `create()`.

**Important**: Provide the IP address of the end-user accessing your application as the ipAddress parameter. This enhances Dwolla’s ability to detect fraud. 


<nav class="pager-nav">
    <a href="./03-attach-unverified-bank.html">Back: Attach an unverified funding source</a>
    <a href="05-attach-verified-bank.html">Next step: Attach a verified funding source</a>
</nav>