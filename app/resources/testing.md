---
layout: twoColumn
section: resources
type: article
title:  "Testing"
description: "In the Dwolla Sandbox environment, simulate various test cases using sentinel values or actionable buttons."
---

# Testing

## Overview
The Sandbox environment allows you to test the Dwolla Access API without any real-world impact, meaning that no real personal identifying information or financial data is used and bank transfer processing does not run as it would in production. Since dummy data is utilized in the Sandbox environment, Dwolla provides a way to simulate various test cases by providing either sentinel values that can be used when making API requests or buttons that trigger certain actions (e.g. simulate bank transfer processing).

### Simulate bank transfer processing
The Sandbox environment does not replicate any bank transfer processes, so a pending transfer will not clear or fail automatically after a few business days as it would in production. The transfer will simply remain in the pending state indefinitely. 

![Screenshot of process bank transfers button](/images/process-bank-transfers.png "Process bank transfers button")

A “Process bank transfers” button is available in the [Dwolla Dashboard](https://dashboard-uat.dwolla.com). This button allows you to simulate bank transfer processing in the Sandbox. Once the button is clicked, Dwolla will process or fail (see below for how-to trigger ACH failures) the last 500 bank transfers that occurred on your Sandbox account or the Access API Customer accounts you manage. **Note:** If a bank to bank transaction is initiated between two accounts, you'll want to click "Process bank transfers" twice in order to process both sides of the transaction (debit and credit). Processing for bank transfers will also include initiated micro-deposits. If your application is [subscribed to webhooks](https://docsv2.dwolla.com/#webhook-subscriptions), notifications will be sent, including all transfer or micro-deposit related events, letting your application know that transfers have processed or failed.

### Trigger ACH failures
Transfers to or from a bank account can fail for a number of reasons (e.g. insufficient funds, invalid account number, etc. ). When a bank transfer fails, the associated financial institution that rejected the transaction assigns an ACH return code and a transfer failure event is then triggered in Dwolla. Dwolla allows you to trigger various bank transfer failures by specifying an “R” code in the funding source `name` parameter when creating or [updating a funding source](https://docsv2.dwolla.com/#update-a-funding-source) for a Dwolla Account or Access API Customer. When a [transfer is initiated](https://docsv2.dwolla.com/#initiate-a-transfer) using a funding source that has an “R” code assigned to its name, a transfer failure event will trigger and the status will update to failed when you click the “Process bank transfers” button (as mentioned above). 

Dwolla allows you to pass in a few different sentinel values that are used to test different bank transfer failure scenarios. The list of available sentinel values cover the most common uses cases where ACH return codes can be triggered in production. Reference the list of codes in the following table:

| Return code | Description |
|-------------|-------------|
| R01 | Insufficient Funds: This value is used to simulate funds failing from the source bank account (ACH debit). |
| R03 | No Account/Unable to Locate Account: This value is primarily used to simulate funds failing to the destination bank account (ACH credit). The funding source will be automatically removed from Dwolla when this return code is triggered. |
| R01-late | This value is used to simulate funds failing from the source bank account post-settlement. Note: You must click “Process bank transfers” twice in order to test this scenario. |
| R03-late | This value is primarily used to simulate funds failing to the destination bank post-settlement. The funding source will be automatically removed from Dwolla when this return code is triggered. Note: You must click “Process bank transfers” twice in order to test this scenario. |

##### Example of using a sentinel value for testing bank transfer failures
This example assumes that a funding source has already been attached to an account. Once the funding source `name` has been updated to reflect the ACH failure scenario you want to test then you can [initiate a transfer](https://docsv2.dwolla.com/#initiate-a-transfer) to or from that funding source via the API.

```raw
POST https://api.dwolla.com/funding-sources/692486f8-29f6-4516-a6a5-c69fd2ce854c
Accept: application/vnd.dwolla.v1.hal+json
Content-Type: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

...

{
  "name": "R03"
}
```
```ruby
funding_source_url = 'https://api.dwolla.com/funding-sources/692486f8-29f6-4516-a6a5-c69fd2ce854c'
request_body = {
      "name" => "R03",
}

# Using DwollaV2 - https://github.com/Dwolla/dwolla-v2-ruby (Recommended)
funding_source = account_token.post "#{funding_source_url}", request_body
funding_source.name # => "R03"
```
```php
/**
 *  No example for this language yet. Coming soon.
 **/
```
```python
funding_source_url = 'https://api.dwolla.com/funding-sources/692486f8-29f6-4516-a6a5-c69fd2ce854c'
request_body = {
  "name": "R03"
}

# Using dwollav2 - https://github.com/Dwolla/dwolla-v2-python (Recommended)
funding_source = account_token.post('funding-sources', request_body)
funding_source.body['name'] # => 'R03'
```
```javascript
var fundingSourceUrl = 'https://api.dwolla.com/funding-sources/692486f8-29f6-4516-a6a5-c69fd2ce854c';
var requestBody = {
  name: "R03"
};

accountToken
  .post(fundingSourceUrl, requestBody)
  .then(res => res.body.name); // => "R03"
```

### Testing Customer verification statuses
There are various reasons an Access API Verified Customer will result in a status other than “verified” after the initial Customer creation which your app will want to be prepared to handle. In production, Dwolla will place the Verified Customer in either the `retry`, `document`, `verified`, or `suspended` state of verification after an initial identity verification check. To simulate the various statuses in the Sandbox, submit either `verified`, `retry`, `document`, or `suspended` in the firstName parameter in order to create a new Verified Customer with that status. Reference the example below, as well as our resource article on handling verification statuses.

##### Example of using a sentinel value for testing verification statuses
```raw
POST /customers
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

{
  "firstName": "retry",
  "lastName": "Doe",
  "email": "testRetry@nomail.net",
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
  'firstName' => 'retry',
  'lastName' => 'Doe',
  'email' => 'testRetry@nomail.net',
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
  :firstName => 'retry',
  :lastName => 'Doe',
  :email => 'testRetry@nomail.net',
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
  'firstName': 'retry',
  'lastName': 'Doe',
  'email': 'testRetry@nomail.net',
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
  firstName: 'retry',
  lastName: 'Doe',
  email: 'testRetry@nomail.net',
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

