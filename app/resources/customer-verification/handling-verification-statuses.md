---
layout: twoColumn
section: Customer verification
type: article
title:  "Handling verification statuses"
weight: 2
description: "How to verify a customer before sending a bank transfer with Dwolla's ACH API."
---

# Customer verification

## Handling verification statuses

There are various reasons a Customer will result in a status other than `verified` which you will want to account for after the Customer is created. For example, the `retry` status can occur when an individual mis-keys or uses incorrect identifying information upon Customer creation. 

#### Testing verification statuses in Sandbox: 
By submitting `verified`, `retry`, `document`, or `suspended` in the firstName parameter, you can create a new verified Customer with that status. To get a verified Customer with the `retry` status to `verified`, you need to POST to /customers/{id} with `verified` or anything else and the verified Customer will get `verified`.  The full SSN is required in the when updating a Customer with a `retry` verification status.  If only the last four of the SSN is submitted, Dwolla returns "invalid SSN", and initiating a POST again with a Full SSN will result in a `document` status.

### Handling status: `retry`

If the Customer has a status of `retry`, some information may have been miskeyed. You have one more opportunity to correct any mistakes. This time, you’ll need to provide the customer’s full SSN.

```raw
POST /customers/132681FA-1B4D-4181-8FF2-619CA46235B1
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

{
  "firstName": "Bill",
  "lastName": "Bibbit",
  "email": "bbibbit@nomail.net",
  "ipAddress": "10.10.10.10",
  "type": "personal",
  "address1": "221 Corrected Address St.",
  "address2": "Fl 8",
  "city": "Ridgewood",
  "state": "NY",
  "postalCode": "11385",
  "dateOfBirth": "1990-07-11",
  "ssn ": "202-99-1516"
}
```
```ruby
retry_customer = DwollaSwagger::CustomersApi.create({:body => {
      "firstName" => "Bill",
       "lastName" => "Bibbit",
          "email" => "bbibbit@nomail.net",
      "ipAddress" => "10.10.10.10",
           "type" => "personal",
       "address1" => "221 Corrected Address St.",
       "address2" => "Fl 8",
           "city" => "Ridgewood",
          "state" => "NY",
     "postalCode" => "11385",
    "dateOfBirth" => "1990-07-11",
            "ssn" => "202-99-1516"
}})

p retry_customer # => https://api.dwolla.com/customers/132681FA-1B4D-4181-8FF2-619CA46235B1
```
```javascript
dwolla.then(function(dwolla) {
    dwolla.customers.updateCustomer({
        "firstName": "Bill",
        "lastName": "Bibbit",
        "email": "bbibbit@nomail.net",
        "ipAddress": "10.10.10.10",
        "type": "personal",
        "address1": "221 Corrected Address St.",
        "address2": "Fl 8",
        "city": "Ridgewood",
        "state": "NY",
        "postalCode": "11385",
        "dateOfBirth": "1990-07-11",
        "ssn": "202-99-1516"
      })
      .then(function(data) {
          console.log(data); // https://api-uat.dwolla.com/customers/132681FA-1B4D-4181-8FF2-619CA46235B1
      });
});
```
```python
customers_api = dwollaswagger.CustomersApi(client)

retry_customer = customers_api.create(body = {
  "firstName": "Bill",
  "lastName": "Bibbit",
  "email": "bbibbit@nomail.net",
  "ipAddress": "10.10.10.10",
  "type": "personal",
  "address1": "221 Corrected Address St.",
  "address2": "Fl 8",
  "city": "Ridgewood",
  "state": "NY",
  "postalCode": "11385",
  "dateOfBirth": "1990-07-11",
  "ssn": "202-99-1516"
})

print(retry_customer) # => https://api.dwolla.com/customers/132681FA-1B4D-4181-8FF2-619CA46235B1
```
```php
<?php
$customersApi = DwollaSwagger\CustomersApi($apiClient);

$retryCustomer = $customersApi->create(array (
  'firstName' => 'Bill',
  'lastName' => 'Bibbit',
  'email' => 'bbibbit@nomail.net',
  'ipAddress' => '10.10.10.10',
  'type' => 'personal',
  'address1' => '221 Corrected Address St.',
  'address2' => 'Fl 8',
  'city' => 'Ridgewood',
  'state' => 'NY',
  'postalCode' => '11385',
  'dateOfBirth' => '1990-07-11',
  'ssn' => '202-99-1516',
););

print($retryCustomer); # => 132681FA-1B4D-4181-8FF2-619CA46235B1
?>
```

Check the Customer’s status again. The Customer will either be verified or in the `document` or `suspended` state of verification.

### Handling status: `document`

If the Customer has a status of `document`, then you'll need to upload additional pieces of information in order to verify the account. Use the [create a document](https://docsv2.dwolla.com/#create-a-document) endpoint when uploading a scan of the identifying document. The document will then be reviewed by Dwolla.

#### Document Types
**Personal verified Customers:** a scanned photo of the Customer's identifying document can be specified as documentType: `passport`, `license` (state issued driver's license), or `idCard` (other U.S. government-issued photo id card).

**Business verified Customers:** Documents that are used to help identify a business are specified as documentType `other`. Business Identifying documents can include the following:
* Partnership, General Partnership: EIN Letter (IRS-issued SS4 confirmation letter).
* Limited Liability Corporation (LLC), Corporation: EIN Letter (IRS-issued SS4 confirmation letter).
* Sole Proprietorship: one or more of the following, as applicable to your sole proprietorship: Fictitious Business Name Statement; EIN documentation (IRS-issued SS4 confirmation letter); Color copy of a valid government-issued photo ID (e.g., a driver’s license, passport, or state ID card).

```raw
curl -X POST 
\ -H "Authorization: Bearer tJlyMNW6e3QVbzHjeJ9JvAPsRglFjwnba4NdfCzsYJm7XbckcR" 
\ -H "Accept: application/vnd.dwolla.v1.hal+json" 
\ -H "Cache-Control: no-cache" 
\ -H "Content-Type: multipart/form-data" 
\ -F "documentType=passport" 
\ -F "file=@foo.png" 
\ 'https://api-uat.dwolla.com/customers/132681FA-1B4D-4181-8FF2-619CA46235B1/documents'

HTTP/1.1 201 Created
Location: https://api-uat.dwolla.com/documents/11fe0bab-39bd-42ee-bb39-275afcc050d0
```
```ruby
# No SDK support. Coming soon
```
```javascript
// No SDK support. Coming soon
```
```python
# No SDK support. Coming soon
```
```php
// No SDK support. Coming soon
```

If the document was successfully uploaded, the response will be a HTTP 201|Created with the URL of the new document resource contained in the Location header.

```noselect
HTTP/1.1 201 Created
Location: https://api-uat.dwolla.com/documents/11fe0bab-39bd-42ee-bb39-275afcc050d0
```

You’ll also get a webhook with a `customer_verification_document_uploaded` event to let you know the document was successfully uploaded.

Once created, the document will be reviewed by Dwolla. When our team has made a decision, we’ll create either a `customer_verification_document_approved` or `customer_verification_document_failed`event (possibly followed by another `customer_verification_document_needed`).

If the document was sufficient, the Customer will be verified. If not, we may need additional documentation.

If the document was found to be fraudulent or doesn’t match the identity of the Customer, they will be suspended.

#### Document failure
If you receive a `customer_verification_document_failed` webhook, you’ll need to upload another document. The document can fail if, for example, the Customer uploaded the wrong type of document or the `.jpg` or `.png` file supplied was not readable (i.e. blurry, not well lit, or cuts off a portion of the identifying image). To retrieve the failure reason for the document upload, you’ll retrieve the document by its id. Contained in the response will be a `failureReason` which corresponds to one of the following values:
* ScanNotReadable
* ScanNotUploaded
* ScanIdTypeNotSupported
* ScanNameMismatch
* ScanFailedOther
* FailedOther

#### Request and response:

```raw
GET https://api-uat.dwolla.com/documents/669863fc-eccf-4172-bdd6-79fba5d43f84
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer tJlyMNW6e3QVbzHjeJ9JvAPsRglFjwnba4NdfCzsYJm7XbckcR

...

{
  "_links": {
    "self": {
      "href": "https://api-uat.dwolla.com/documents/669863fc-eccf-4172-bdd6-79fba5d43f84"
    }
  },
  "id": "669863fc-eccf-4172-bdd6-79fba5d43f84",
  "status": "reviewed",
  "type": "license",
  "created": "2016-01-29T21:22:22.000Z",
  "failureReason": "ScanNotReadable"
}
```
```ruby
a_document = 'https://api.dwolla.com/documents/669863fc-eccf-4172-bdd6-79fba5d43f84'

retrieved = DwollaSwagger::DocumentsApi.get_customer(a_document)
p retrieved.failureReason # => "ScanNotReadable"
```
```javascript
// No SDK support. Coming soon
```
```python
a_document = 'https://api.dwolla.com/documents/669863fc-eccf-4172-bdd6-79fba5d43f84'

documents_api = dwollaswagger.DocumentsApi(client)

retrieved = documents_api.get_customer(a_document)
print(retrieved.failureReason) # => "ScanNotReadable"

```
```php
<?php
$aDocument = 'https://api.dwolla.com/documents/669863fc-eccf-4172-bdd6-79fba5d43f84';

$documentsApi = DwollaSwagger\DocumentsApi($apiClient);

$retrieved = $documentsApi->getCustomer($aDocument);
print($retrieved->failureReason); # => "ScanNotReadable"
?>
```

### Handling status: `suspended`

If the Customer is `suspended`, there’s no further action you can take to correct this using the API. You’ll need to contact support@dwolla.com for assistance.
