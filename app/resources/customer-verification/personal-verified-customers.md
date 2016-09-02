---
layout: twoColumn
section: Customer verification
type: article
title:  "Personal verified Customers"
weight: 0
description: "How to verify a customer before sending a bank transfer with Dwolla's ACH API."
---

# Customer verification

## Personal verified Customers

### Create a verified personal Customer

To create a verified personal Customer, use the [create a customer](https://docsv2.dwolla.com/#create-a-customer) endpoint:

```raw
POST /customers
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@nomail.net",
  "ipAddress": "10.10.10.10",
  "type": "personal",
  "address1": "99-99 3rd St.",
  "city": "Ridgewood",
  "state": "NY",
  "postalCode": "11385",
  "dateOfBirth": "1990-07-11",
  "ssn": "1516"
}

HTTP/1.1 201 Created
Location: https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
```
```ruby
new_customer = DwollaSwagger::CustomersApi.create({:body => {
      "firstName" => "John",
       "lastName" => "Doe",
          "email" => "johndoe@nomail.net",
      "ipAddress" => "10.10.10.10",
           "type" => "personal",
       "address1" => "99-99 3rd St.",
           "city" => "Ridgewood",
          "state" => "NY",
     "postalCode" => "11385",
    "dateOfBirth" => "1990-07-11",
            "ssn" => "1516"
}})

p new_customer # => https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
```
```javascript
// No example for this language yet.
```
```python
customers_api = dwollaswagger.CustomersApi(client)

new_customer = customers_api.create(body = {
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@nomail.net",
  "ipAddress": "10.10.10.10",
  "type": "personal",
  "address1": "99-99 3rd St.",
  "city": "Ridgewood",
  "state": "NY",
  "postalCode": "11385",
  "dateOfBirth": "1990-07-11",
  "ssn": "1516"
})

print(new_customer) # => https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
```
```php
<?php
$customersApi = DwollaSwagger\CustomersApi($apiClient);

$newCustomer = $customersApi->create(array (
  'firstName' => 'John',
  'lastName' => 'Doe',
  'email' => 'johndoe@nomail.net',
  'ipAddress' => '10.10.10.10',
  'type' => 'personal',
  'address1' => '99-99 3rd St.',
  'city' => 'Ridgewood',
  'state' => 'NY',
  'postalCode' => '11385',
  'dateOfBirth' => '1990-07-11',
  'ssn' => '1516',
));

print($newCustomer); # => https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
?>
```

You’ll need to provide the Customer’s full name, email address, home address, date of birth, and the last four digits of their taxpayer identification number (for individuals, this is their Social Security Number).

Once you submit this request, Dwolla will perform some initial validation to check for formatting issues such as an invalid date of birth, invalid email format, etc. If successful, the response will be a HTTP 201/Created with the URL of the new Customer resource contained in the `Location` header.

### Check the status of the personal Customer

The successful creation of a Customer doesn’t necessarily mean the Customer is verified. When a Customer has been successfully verified by Dwolla, their status will be set to `verified`.

Let’s check to see if the Customer was successfully verified or not. We are going to use the location of the Customer resource that we just created, which is in `new_customer`.

```raw
GET https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

HTTP 200 OK
{
  "_links": {
    "self": {
      "href": "https://api-uat.dwolla.com/customers/132681FA-1B4D-4181-8FF2-619CA46235B1"
    },
    "receive": {
      "href": "https://api-uat.dwolla.com/transfers"
    },
    "funding-sources": {
      "href": "https://api-uat.dwolla.com/customers/132681FA-1B4D-4181-8FF2-619CA46235B1/funding-sources"
    },
    "transfers": {
      "href": "https://api-uat.dwolla.com/customers/132681FA-1B4D-4181-8FF2-619CA46235B1/transfers"
    },
    "send": {
      "href": "https://api-uat.dwolla.com/transfers"
    }
  },
  "id": "132681FA-1B4D-4181-8FF2-619CA46235B1",
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@nomail.net",
  "type": "personal",
  "status": "verified",
  "created": "2015-09-29T19:47:28.920Z"
}
```
```ruby
retrieved_customer = DwollaSwagger::CustomersApi.get_customer(new_customer)

p retrieved_customer.verified # => true
```
```javascript
// No example for this language yet.
```
```python
customers_api = dwollaswagger.CustomersApi(client)

retrieved_customer = customers_api.get_customer(new_customer)

print(retrieved_customer.verified) # => True
```
```php
<?php
$customersApi = DwollaSwagger\CustomersApi($apiClient);

$retrievedCustomer = $customersApi->getCustomer($newCustomer);

print($newCustomer->verified); # => true
?>
```

Our Customer was successfully verified! Other Customers, however, may require additional verification. Continue reading for instructions on providing additional information to verify these Customers.

* * *

#### View:

*   [Handling verification statuses](/resources/customer-verification/handling-verification-statuses.html)