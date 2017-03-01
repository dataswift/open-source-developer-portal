---
layout: twoColumn
section: Customer verification
type: article
title:  "Personal verified Customers"
weight: 0
description: "How to verify a customer before sending a bank transfer with Dwolla's ACH API."
---

## Personal verified Customers

### Create a verified personal Customer

To create a verified personal Customer, use the [create a customer](https://docsv2.dwolla.com/#create-a-customer) endpoint:

```raw
POST https://api-uat.dwoola.com/customers
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@nomail.net",
  "ipAddress": "10.10.10.10",
  "type": "personal",
  "address1": "99-99 33rd St",
  "city": "Some City",
  "state": "NY",
  "postalCode": "11101",
  "dateOfBirth": "1970-01-01",
  "ssn": "1234"
}

HTTP/1.1 201 Created
Location: https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
```
```php
<?php
$customersApi = new DwollaSwagger\CustomersApi($apiClient);

$customer = $customersApi->create([
  'firstName' => 'John',
  'lastName' => 'Doe',
  'email' => 'jdoe@nomail.net',
  'type' => 'personal',
  'address1' => '99-99 33rd St',
  'city' => 'Some City',
  'state' => 'NY',
  'postalCode' => '11101',
  'dateOfBirth' => '1970-01-01',

  # For the first attempt, only the
  # last 4 digits of SSN required

  # If the entire SSN is provided,
  # it will still be accepted
  'ssn' => '1234'
]);

$customer; # => "https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C"
?>
```
```ruby
request_body = {
  :firstName => 'John',
  :lastName => 'Doe',
  :email => 'jdoe@nomail.net',
  :type => 'personal',
  :address1 => '99-99 33rd St',
  :city => 'Some City',
  :state => 'NY',
  :postalCode => '11101',
  :dateOfBirth => '1970-01-01',

  # For the first attempt, only the
  # last 4 digits of SSN required

  # If the entire SSN is provided,
  # it will still be accepted

  :ssn => '1234'
}

# Using DwollaV2 - https://github.com/Dwolla/dwolla-v2-ruby (Recommended)
customer = app_token.post "customers", request_body
customer.headers[:location] # => "https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C"

# Using DwollaSwagger - https://github.com/Dwolla/dwolla-swagger-ruby
customer = DwollaSwagger::CustomersApi.create(:body => request_body)
customer # => "https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C"
```
```python
request_body = {
  'firstName': 'John',
  'lastName': 'Doe',
  'email': 'jdoe@nomail.net',
  'type': 'personal',
  'address1': '99-99 33rd St',
  'city': 'Some City',
  'state': 'NY',
  'postalCode': '11101',
  'dateOfBirth': '1970-01-01',
  # For the first attempt, only the
  # last 4 digits of SSN required
  # If the entire SSN is provided,
  # it will still be accepted
  'ssn': '1234'
}

# Using dwollav2 - https://github.com/Dwolla/dwolla-v2-python (Recommended)
customer = app_token.post('customers', request_body)
customer.headers['location'] # => 'https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C'

# Using dwollaswagger - https://github.com/Dwolla/dwolla-swagger-python
customers_api = dwollaswagger.CustomersApi(client)
customer = customers_api.create(body = request_body)
customer # => 'https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C'
```
```javascript
var requestBody = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'jdoe@nomail.net',
  type: 'personal',
  address1: '99-99 33rd St',
  city: 'Some City',
  state: 'NY',
  postalCode: '11101',
  dateOfBirth: '1970-01-01',
  // For the first attempt, only the
  // last 4 digits of SSN required
  // If the entire SSN is provided,
  // it will still be accepted
  ssn: '1234'
};

appToken
  .post('customers', requestBody)
  .then(res => res.headers.get('location')); // => 'https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F'
```

You’ll need to provide the Customer’s full name, email address, home address, date of birth, and the last four digits of their taxpayer identification number (for individuals, this is their Social Security Number).

Once you submit this request, Dwolla will perform some initial validation to check for formatting issues such as an invalid date of birth, invalid email format, etc. If successful, the response will be a HTTP 201/Created with the URL of the new Customer resource contained in the `Location` header.

### Check the status of the personal Customer

The successful creation of a Customer doesn’t necessarily mean the Customer is verified. When a Customer has been successfully verified by Dwolla, their status will be set to `verified`.

Let’s check to see if the Customer was successfully verified or not. We are going to use the location of the Customer resource that we just created, which is in `new_customer`.

```raw
GET https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

{
  "_links": {
    "self": {
      "href": "https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F",
      "type": "application/vnd.dwolla.v1.hal+json",
      "resource-type": "customer"
    },
    "receive": {
      "href": "https://api-uat.dwolla.com/transfers",
      "type": "application/vnd.dwolla.v1.hal+json",
      "resource-type": "transfer"
    },
    "edit-form": {
      "href": "https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F",
      "type": "application/vnd.dwolla.v1.hal+json; profile=\"https://github.com/dwolla/hal-forms\"",
      "resource-type": "customer"
    },
    "edit": {
      "href": "https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F",
      "type": "application/vnd.dwolla.v1.hal+json",
      "resource-type": "customer"
    },
    "funding-sources": {
      "href": "https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F/funding-sources",
      "type": "application/vnd.dwolla.v1.hal+json",
      "resource-type": "funding-source"
    },
    "transfers": {
      "href": "https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F/transfers",
      "type": "application/vnd.dwolla.v1.hal+json",
      "resource-type": "transfer"
    },
    "send": {
      "href": "https://api-uat.dwolla.com/transfers",
      "type": "application/vnd.dwolla.v1.hal+json",
      "resource-type": "transfer"
    }
  },
  "id": "FC451A7A-AE30-4404-AB95-E3553FCD733F",
  "firstName": "John",
  "lastName": "Doe",
  "email": "jdoe@nomail.net",
  "type": "personal",
  "status": "verified",
  "created": "2016-11-28T19:51:48.050Z",
  "address1": "99-99 33rd St",
  "address2": "Apt 8",
  "city": "Some City",
  "state": "NY",
  "postalCode": "11101",
  "phone": "5554321234"
}
```
```ruby
customer_url = 'https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F'

# Using DwollaV2 - https://github.com/Dwolla/dwolla-v2-ruby (Recommended)
customer = app_token.get customer_url
customer.status # => "verified"

# Using DwollaSwagger - https://github.com/Dwolla/dwolla-swagger-ruby
customer = DwollaSwagger::CustomersApi.get_customer(customer_url)
customer.status # => "verified"
```
```php
<?php
$customerUrl = 'https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F';

$customersApi = new DwollaSwagger\CustomersApi($apiClient);

$customer = $customersApi->getCustomer($customerUrl);
$customer->status; # => "verified"
?>
```
```python
customer_url = 'https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F'

# Using dwollav2 - https://github.com/Dwolla/dwolla-v2-python (Recommended)
customer = app_token.get(customer_url)
customer.body['status']

# Using dwollaswagger - https://github.com/Dwolla/dwolla-swagger-python
customers_api = dwollaswagger.CustomersApi(client)
customer = customers_api.get_customer(customer_url)
customer.status # => 'verified'
```
```javascript
var customerUrl = 'https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F';

appToken
  .get(customerUrl)
  .then(res => res.body.status); // => 'verified'
```

Our Customer was successfully verified! Other Customers, however, may require additional verification. Continue reading for instructions on providing additional information to verify these Customers.

* * *

#### View:

*   [Handling verification statuses](/resources/customer-verification/handling-verification-statuses.html)