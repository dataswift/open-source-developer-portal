---
layout: twoColumn
section: Bank transfer workflow
type: article
title:  "Transfer failures"
weight: 1
description: "Bank transfer API to programmatically send money online"
---

# Bank transfer workflow

## Transfer failures

There are several reasons transfers can fail, a few of which are outlined below. When a transfer fails it is usually a result of an ACH failure which is assigned an ACH return code after being rejected from the financial institution. A few common failure cases include:

- **Insufficient Funds:** Pending transfers can fail due to insufficient funds from the source bank account. 
- **No Account/Unable to Locate Account:** The recipient of a transfer has closed their bank account or has incorrectly entered their bank account/routing number when attaching their funding source.
- **Customer Advises Not Authorized:** The owner of a bank account has told their bank that this transfer was unauthorized.

### What occurs in the Dwolla system when a bank transfer fails?

Bank accounts will automatically be removed from the Dwolla system for all ACH return codes except an `R01`. If subscribed to webhooks, your application will receieve a webhook with the `funding_source_removed` event along with the `transfer_failed` event.

When a bank transfer fails from a verified account (e.g. [Traditional CIP Verified](/resources/account-types/traditional-accounts.html) or [White Label Verified Customer](/resources/account-types/white-label-accounts.html) to a recipient), funds will return to the sending account’s Dwolla balance. For other transfer scenarios, funds will return to the source bank account. 

### Retrieving the reason for a failed bank transfer

When a bank transfer fails its status will be updated to `failed`. If your application is subscribed to webhooks you’ll receive a notification of the `transfer_failed` event which contains a link to the transfer resource. To get the return code and reason for the transfer failure you’ll first get the transfer by its ID. 

#### Request:
```raw
GET https://api-uat.dwolla.com/transfers/3b4e3062-ef91-e511-80dc-0aa34a9b2388
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```
```ruby
transfer = DwollaSwagger::TransfersApi.by_id('https://api-uat.dwolla.com/transfers/3b4e3062-ef91-e511-80dc-0aa34a9b2388')
```
```javascript
dwolla.then(function(dwolla) {
    dwolla.transfers.byId({id: '3b4e3062-ef91-e511-80dc-0aa34a9b2388'})
    .then(function(data) {
        // See response below
    })
});
```
```python
transfer_api = dwollaswagger.TransfersApi(client)
transfer = transfer_api.by_id('https://api-uat.dwolla.com/transfers/3b4e3062-ef91-e511-80dc-0aa34a9b2388')
```
```php
<?php
$transferApi = new DwollaSwagger\TransfersApi($apiClient);
$transfer = $transferApi->by_id('https://api-uat.dwolla.com/transfers/3b4e3062-ef91-e511-80dc-0aa34a9b2388')
?>
```

#### Response (view schema in 'raw'):

```raw
Schema

{
  "_links": {
    "self": {
      "href": "https://api-uat.dwolla.com/transfers/3b4e3062-ef91-e511-80dc-0aa34a9b2388"
    },
    "source": {
      "href": "https://api-uat.dwolla.com/accounts/ad5f2162-404a-4c4c-994e-6ab6c3a13254"
    },
    "destination": {
      "href": "mailto:liz@nomail.com"
    },
    "failure": {
      "href": "https://api-uat.dwolla.com/transfers/3b4e3062-ef91-e511-80dc-0aa34a9b2388/failure"
    }
  },
  "id": "3b4e3062-ef91-e511-80dc-0aa34a9b2388",
  "status": "failed",
  "amount": {
    "value": "20.00",
    "currency": "usd"
  },
  "created": "2015-11-23T14:35:04.483Z"
}
```
```ruby
# Access desired information in response object fields
p transfer.status # => failed
```
```javascript
console.log(data.obj._embedded[0].status); // failed
```
```python
# Access desired information in response object fields
print(transfer.status) # => failed
```
```php
<?php
# Access desired information in response object fields
print($transfer->status) # => failed
?>
```
Dwolla returns a `failure` link within the response that can be used to lookup the ACH return code and corresponding description.

```raw
GET https://api-uat.dwolla.com/transfers/e6d9a950-ac9e-e511-80dc-0aa34a9b2388/failure
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

...

{
  "_links": {
    "self": {
      "href": "https://api-uat.dwolla.com/transfers/e6d9a950-ac9e-e511-80dc-0aa34a9b2388/failure"
    }
  },
  "code": "R1",
  "description": "Insufficient Funds"
}
```
```ruby
transfer = 'e6d9a950-ac9e-e511-80dc-0aa34a9b2388'

failure_reason = DwollaSwagger::TransfersApi.failure_by_id(transfer)
p failure_reason.code # => "R01"
```
```php
<?php
$transfer = 'e6d9a950-ac9e-e511-80dc-0aa34a9b2388';

$TransfersApi = DwollaSwagger\TransfersApi($apiClient);

$failureReason = $TransfersApi->failureById($transfer);
print($failureReason->status); # => "R01"
?>
```
```python
transfer = 'e6d9a950-ac9e-e511-80dc-0aa34a9b2388'

transfers_api = dwollaswagger.TransfersApi(client)
failure_reason = transfers_api.by_id(transfer)

print(failure_reason.code) # => R01
```
```javascript
dwolla.then(function(dwolla) {
    dwolla.Transfers.failureById({id: 'e6d9a950-ac9e-e511-80dc-0aa34a9b2388'})
    .then(function(data) {
        console.log(data.obj._embedded.code); // R01
    })
})
```

### List of possible return codes and descriptions
<table class="table table-bordered table-striped">
	<thead>
		<tr>
			<th>Return Code</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>R01</td>
			<td>Insufficient Funds</td>
		</tr>
		<tr>
			<td>R02</td>
			<td>Account Closed</td>
		</tr>
		<tr>
			<td>R03</td>
			<td>No Account/Unable to Locate Account</td>
		</tr>
		<tr>
			<td>R04</td>
			<td>Invalid Account Number Structure</td>
		</tr>
		<tr>
			<td>R05</td>
			<td>Unauthorized Debit to Consumer Account Using Corporate SEC Code</td>
		</tr>
		<tr>
			<td>R06</td>
			<td>Returned per ODFI's Request</td>
		</tr>
		<tr>
			<td>R07</td>
			<td>Authorization Revoked by Customer</td>
		</tr>
		<tr>
			<td>R08</td>
			<td>Payment Stopped</td>
		</tr>
		<tr>
			<td>R09</td>
			<td>Uncollected Funds</td>
		</tr>
		<tr>
			<td>R10</td>
			<td>Customer Advises Not Authorized, Improper, or Ineligible</td>
		</tr>
		<tr>
			<td>R11</td>
			<td>Check Truncation Entry Returned</td>
		</tr>
		<tr>
			<td>R12</td>
			<td>Account Sold to Another DFI</td>
		</tr>
		<tr>
			<td>R13</td>
			<td>Invalid ACH Routing Number</td>
		</tr>
		<tr>
			<td>R14</td>
			<td>Representative Payee Deceased or Unable to Continue in that Capacity</td>
		</tr>
		<tr>
			<td>R15</td>
			<td>Beneficiary or Account Holder (Other Than a Representative Payee) Deceased</td>
		</tr>
		<tr>
			<td>R16</td>
			<td>Account Frozen</td>
		</tr>
		<tr>
			<td>R17</td>
			<td>File Record Edit Criteria</td>
		</tr>
		<tr>
			<td>R18</td>
			<td>Improper Effective Entry Date</td>
		</tr>
		<tr>
			<td>R19</td>
			<td>Amount Field Error</td>
		</tr>
		<tr>
			<td>R20</td>
			<td>Non-Transaction Account</td>
		</tr>
		<tr>
			<td>R21</td>
			<td>Invalid Company Identification</td>
		</tr>
		<tr>
			<td>R22</td>
			<td>Invalid Individual ID Number</td>
		</tr>
		<tr>
			<td>R23</td>
			<td>Credit Entry Refused by Receiver</td>
		</tr>
		<tr>
			<td>R24</td>
			<td>Duplicate Entry</td>
		</tr>
		<tr>
			<td>R25</td>
			<td>Addenda Error</td>
		</tr>
		<tr>
			<td>R26</td>
			<td>Mandatory Field Error</td>
		</tr>
		<tr>
			<td>R27</td>
			<td>Trace Number Error</td>
		</tr>
		<tr>
			<td>R28</td>
			<td>Routing Number Check Digit Error</td>
		</tr>
		<tr>
			<td>R29</td>
			<td>Corporate Customer Advises Not Authorized</td>
		</tr>
		<tr>
			<td>R30</td>
			<td>RDFI Not Participant in Check Truncation Program</td>
		</tr>
		<tr>
			<td>R31</td>
			<td>Permissible Return Entry (CCD and CTX only)</td>
		</tr>
		<tr>
			<td>R32</td>
			<td>RDFI Non-Settlement</td>
		</tr>
		<tr>
			<td>R33</td>
			<td>Return of XCK Entry</td>
		</tr>
		<tr>
			<td>R34</td>
			<td>Limited Participation DFI</td>
		</tr>
		<tr>
			<td>R35</td>
			<td>Return of Improper Debit Entry</td>
		</tr>
		<tr>
			<td>R36</td>
			<td>Return of Improper Credit Entry</td>
		</tr>
		<tr>
			<td>R37</td>
			<td>Source Document Presented for Payment</td>
		</tr>
		<tr>
			<td>R38</td>
			<td>Stop Payment on Source Document</td>
		</tr>
		<tr>
			<td>R39</td>
			<td>Improper Source Document/Source Document Presented for Payment</td>
		</tr>
		<tr>
			<td>R40</td>
			<td>Return of ENR Entry by Federal Government Agency</td>
		</tr>
		<tr>
			<td>R41</td>
			<td>Invalid Transaction Code</td>
		</tr>
		<tr>
			<td>R42</td>
			<td>Routing Number/Check Digit Error</td>
		</tr>
		<tr>
			<td>R43</td>
			<td>Invalid DFI Account Number</td>
		</tr>
		<tr>
			<td>R44</td>
			<td>Invalid Individual ID Number/Identification Number</td>
		</tr>
		<tr>
			<td>R45</td>
			<td>Invalid Individual Name/Company Name</td>
		</tr>
		<tr>
			<td>R46</td>
			<td>Invalid Representative Payee Indicator</td>
		</tr>
		<tr>
			<td>R47</td>
			<td>Duplicate Enrollment</td>
		</tr>
		<tr>
			<td>R50</td>
			<td>State Law Affecting RCK Acceptance</td>
		</tr>
		<tr>
			<td>R51</td>
			<td>Item Related to RCK Entry is Ineligible or RCK Entry is Improper</td>
		</tr>
		<tr>
			<td>R52</td>
			<td>Stop Payment on Item Related to RCK Entry</td>
		</tr>
		<tr>
			<td>R53</td>
			<td>Item and RCK Entry Presented for Payment</td>
		</tr>
		<tr>
			<td>R61</td>
			<td>Misrouted Return</td>
		</tr>
		<tr>
			<td>R67</td>
			<td>Duplicate Return</td>
		</tr>
		<tr>
			<td>R68</td>
			<td>Untimely Return</td>
		</tr>
		<tr>
			<td>R69</td>
			<td>Field Error(s)</td>
		</tr>
		<tr>
			<td>R70</td>
			<td>Permissible Return Entry Not Accepted/Return Not Requested by ODFI</td>
		</tr>
		<tr>
			<td>R71</td>
			<td>Misrouted Dishonored Return</td>
		</tr>
		<tr>
			<td>R72</td>
			<td>Untimely Dishonored Return</td>
		</tr>
		<tr>
			<td>R73</td>
			<td>Timely Original Return</td>
		</tr>
		<tr>
			<td>R74</td>
			<td>Corrected Return</td>
		</tr>
		<tr>
			<td>R75</td>
			<td>Return Not a Duplicate</td>
		</tr>
		<tr>
			<td>R76</td>
			<td>No Errors Found</td>
		</tr>
		<tr>
			<td>R80</td>
			<td>IAT Entry Coding Error</td>
		</tr>
		<tr>
			<td>R81</td>
			<td>Non-Particpant in IAT Program</td>
		</tr>
		<tr>
			<td>R82</td>
			<td>Invalid Foreign Receiving DFI Identification</td>
		</tr>
		<tr>
			<td>R83</td>
			<td>Foreign Receiving DFI Unable to Settle</td>
		</tr>
		<tr>
			<td>R84</td>
			<td>Entry Not Processed by Gateway</td>
		</tr>
	</tbody>
</table>