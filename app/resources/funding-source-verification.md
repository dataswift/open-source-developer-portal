---
layout: twoColumn
section: resources
type: article
title:  "Funding source verification"
description: "Verify Customer funding sources using Instant Account Verification or micro-deposits to start sending and receiving payments by utilizing our open API with no per transaction fees."
---

# Funding source verification

Before a Dwolla account or white label Customer is eligible to transfer money from their bank or credit union account they need to verify ownership of the account, either via Instant Account Verification (IAV) or micro-deposits. This article demonstrates how to verify a bank or credit union account using either of these options. **Please note:** IAV is a premium feature only available for white label Customers. For more information about white label and IAV, please [contact sales](https://www.dwolla.com/contact).

In this article we use the example of verifying a white label Customer's bank account and detail the interaction between Dwolla, your application, and the white label Customer.

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

**Note:** Each bank account allows two attempts to enter the correct verification amounts. After two failed attempts, the bank account will be automatically removed and the process must be restarted by having the Customer [re-add](http://docsv2.dwolla.com/#new-funding-source-customer) their bank account. You can only initiate one set of micro-deposits at a time to a bank account.

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

## Instant account verification (IAV)
Instant Account Verification (IAV) gives you the ability to add and verify a Customer's bank account in a matter of seconds, which is much faster than the multiple days required for micro-deposits to transfer and then be verified by the Customer. Your application will utilize the client-side `dwolla.js` JavaScript library to render the IAV flow within a container in your application. 

### Generate a single-use IAV token for a Customer
To initiate the IAV flow, dwolla.js requires a single-use IAV token for a Customer. Your server initiates a POST request to Dwolla, specifying for which Customer you want to add/verify a bank account. Dwolla will respond with a non-expiring single-use `token`. This IAV token will be sent to the client and used to authenticate the HTTP request asking Dwolla to render the IAV flow. 

```raw
curl -X POST 
\ -H "Content-Type: application/vnd.dwolla.v1.hal+json"
\ -H "Accept: application/vnd.dwolla.v1.hal+json"
\ -H "Authorization: Bearer qe634nV7dIYpYDf3VGZPciziPU2BCboUZ7G7EG8XEyGswKkBV5"
\ "https://api.dwolla.com/customers/06B51D56-7A6C-4535-A0CC-2C0106F56BA6/iav-token"

HTTP/1.1 200 OK
{  
   "_links":{  
      "self":{  
         "href":"https://api.dwolla.com/customers/06b51d56-7a6c-4535-a0cc-2c0106f56ba6/iav-token"
      }
   },
   "token":"lr0Ax1zwIpeXXt8sJDiVXjPbwEeGO6QKFWBIaKvnFG0Sm2j7vL"
}
```
```ruby
# coming soon
```
```javascript
dwolla.then(function(dwolla) {
    dwolla.customers.getCustomerIavToken({id: '06b51d56-7a6c-4535-a0cc-2c0106f56ba6'})
    .then(function(data) {
       console.log(data.obj.token);
    });
});
```
```python
# coming soon
```
```php
// coming soon
```

### Include dwolla.js and add container for IAV
We'll begin the client-side implementation by including dwolla.js in the HEAD of our HTML page. Notice, we are utilizing development version 1 of dwolla.js, alternatively you can include the minified version of `<script src="https://cdn.dwolla.com/1/dwolla.min.js"></script>`. 

```htmlnoselect
<head>
<script src="https://cdn.dwolla.com/1/dwolla.js"></script>
</head>
```

Next, add the container to the body of the page where you want to render the IAV flow. Note: This container is responsive, meaning content is resized appropriately across all screen resolutions and devices.

```htmlnoselect
<div id="mainContainer">
	<input type="button" id="start" value="Add Bank">
</div>	

<div id="iavContainer"></div>
```


### Configure and call JavaScript function to start IAV
Now that you have initialized dwolla.js on your page you can configure and create the function that will call `dwolla.iav.start()`. For simplicity of this example, use jQuery and call the function to start IAV when the Customer clicks the "Add Bank" button on your page. To test IAV in the sandbox environment you will use the `dwolla.configure` helper function and pass in the value of `uat`. As you can see below, `dwolla.iav.start` takes three arguments: the iavContainer element where IAV will render, a string value of the single-use IAV token, and a callback function that will handle any error or response.


```javascriptnoselect
<script type="text/javascript">
$('#start').click(function() {
  var iavToken = '4adF858jPeQ9RnojMHdqSD2KwsvmhO7Ti7cI5woOiBGCpH5krY';
  dwolla.configure('uat');
  dwolla.iav.start('iavContainer', iavToken, function(err, res) {
    console.log('Error: ' + JSON.stringify(err) + ' -- Response: ' + JSON.stringify(res));
  });
});
</script>
```

In order to facilitate testing IAV in the Sandbox, we allow you to specify any value in the IAV text field inputs to proceed through the flow.

### Handle the error or response
The callback function (err, res) allows you to determine if there is an error with the request (i.e. `InvalidIavToken`) or if the response was successful.

* If there is an error: generate a new IAV token and re-attempt the IAV flow.
	* Example: `{code: "InvalidIavToken", message: "Invalid IAV token." }`
* If successful: You will receive a JSON response that includes a link to the newly created and verified funding source. You can then pass this value to either initiate a transfer or store the created resource in your database to be used later.
	* Example:  `{"_links":{"funding-source":{"href":"https://api-uat.dwolla.com/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197"}}}`
