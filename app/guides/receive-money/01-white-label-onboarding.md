---
layout: twoColumn
section: guides
guide: 
    name: receive-money
    step: 1a
type: guide
title:  "Step 1: White label onboarding"
---

# Step 1: Create a customer using the white label solution

### Step A: Create an access token.

Go to the <a href="https://tokengenerator.dwolla.com" target="_blank">token generator</a>. 

Use your application’s key and secret and select the following scopes: Send, Funding, Transactions, and ManageCustomers. When you get to the OAuth login log in screen, log in with your child Sandbox account. Once you agree to the permissions, you'll receive an access and refresh token pair that contains the proper scopes for creating and managing customers. More detail is available in [API docs](https://docsv2.dwolla.com/#oauth).

### Step B: Create a customer

Create a customer for the user that is going to pay you. At a minimum, provide the user’s full name and email address to create the customer. 

```raw
POST https://api-uat.dwolla.com/customers
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer 0Sn0W6kzNicvoWhDbQcVSKLRUpGjIdlPSEYyrHqrDDoRnQwE7Q
{
"firstName": "Joe", 
"lastName": "Buyer",
"email": "jbuyer@mail.net",
"ipAddress": "99.99.99.99"
}

HTTP/1.1 201 Created
Location: https://api-uat.dwolla.com/customers/247B1BD8-F5A0-4B71-A898-F62F67B8AE1C
```
```ruby
new_customer = DwollaSwagger::CustomersApi.create({:body => {
  :firstName => 'Joe',
  :lastName => 'Buyer',
  :email => 'jbuyer@mail.net',
  :ipAddress => '99.99.99.99'}})

p new_customer # => https://api-uat.dwolla.com/customers/247B1BD8-F5A0-4B71-A898-F62F67B8AE1C
```
```javascript
dwolla.then(function(dwolla) {
    dwolla.customers.create({
      "firstName": "Joe",
      "lastName": "Buyer",
      "email": "jbuyer@mail.net",
      "ipAddress": "99.99.99.99"})
      .then(function(data) {
          console.log(data); // https://api-uat.dwolla.com/customers/247B1BD8-F5A0-4B71-A898-F62F67B8AE1C
      });
});
```
```python
customers_api = dwollaswagger.CustomersApi(client)

new_customer = customers_api.create(body = {'firstName': 'Joe', 
                                            'lastName': 'Buyer',
                                            'email': 'jbuyer@mail.net',
                                            'ipAddress': '99.99.99.99'})

print(new_customer) # => https://api-uat.dwolla.com/customers/247B1BD8-F5A0-4B71-A898-F62F67B8AE1C
```
```php
<?php
$customersApi = new DwollaSwagger\CustomersApi($apiClient);

$new_customer = $customersApi->create([
  'firstName' => 'Joe',
  'lastName' => 'Buyer',
  'email' => 'jbuyer@mail.net',
  'ipAddress' => '99.99.99.99'
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
myNewCust.setIpAddress("99.99.99.99");

try {
    Unit$ r = cApi.create(myNewCust);
    System.out.println(r.getLocationHeader()); // => https://api-uat.dwolla.com/customers/247B1BD8-F5A0-4B71-A898-F62F67B8AE1C
}
catch (Exception e) {
    System.out.println("Something's up!");
}
```

When the customer is created, you’ll receive the customer URL in the location header. If using an SDK, the location will be returned to you upon calling `create()`.

**Important**: Provide the IP address of the end-user accessing your application as the ipAddress parameter. This enhances Dwolla’s ability to detect fraud. Sending random, hardcoded, or incorrect information in the ipAddress field will cause delays or throttling of requests.


### Step C: Attach a funding source to the customer

Next you will attach a verified funding source to the Customer, which will be done using Instant Account Verification (IAV). This method will give the Customer the ability to add and verify their bank account in a matter of seconds by authenticating with their online banking credentials. Once the Customer reaches the page in your application to add a bank account you'll ask Dwolla’s server to [generate an IAV token](http://docsv2.dwolla.com/#generate-an-iav-token-customer). 

Generate a single-use IAV token for our Customer:

```raw
curl -X POST 
\ -H "Content-Type: application/vnd.dwolla.v1.hal+json"
\ -H "Accept: application/vnd.dwolla.v1.hal+json"
\ -H "Authorization: Bearer 0Sn0W6kzNicvoWhDbQcVSKLRUpGjIdlPSEYyrHqrDDoRnQwE7Q"
\ "https://api-uat.dwolla.com/customers/247B1BD8-F5A0-4B71-A898-F62F67B8AE1C/iav-token"

HTTP/1.1 200 OK
{  
   "_links":{  
      "self":{  
         "href":"https://api-uat.dwolla.com/customers/247B1BD8-F5A0-4B71-A898-F62F67B8AE1C/iav-token"
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
    dwolla.customers.getCustomerIavToken({id: '247B1BD8-F5A0-4B71-A898-F62F67B8AE1C'})
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

Then, you’ll pass this single-use IAV token to the client-side of your application where it will be used in the JavaScript function `dwolla.iav.start`. This token will be used to authenticate the request asking Dwolla to render the IAV flow. Before calling this function you'll want to include `dwolla.js` in the HEAD of your page. 

```htmlnoselect
<head>
<script src="https://cdn.dwolla.com/1/dwolla.js"></script>
</head>
```

Next, you'll add in a container to the body of your page where you want to render the IAV flow.

```htmlnoselect
<div id="mainContainer">
  <input type="button" id="start" value="Add Bank">
</div>  

<div id="iavContainer"></div>
```

Now that you have `dwolla.js` initialized on the page and the container created where you'll render the IAV flow, you'll create a JavaScript function that responds to the Customer clicking the "Add bank" button on your page. Once the Customer clicks "Add Bank", your application will call `dwolla.iav.start()` passing in the following arguments: the iavContainer element where IAV will render, a string value of your single-use IAV token, and a callback function that will handle any error or response.

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

The Customer will complete the IAV flow by authenticating with their online banking credentials. You'll know their bank account was successfully added and verified if you receive a JSON response in your callback that includes a link to the newly created funding source. 

* Sample response:  `{"_links":{"funding-source":{"href":"https://api-uat.dwolla.com/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197"}}}`

Great! The funding source should now be verified.

### Step E: Create a transfer

Once the customer has verified their funding source, we can transfer funds from their bank account to your Dwolla account.   You’ll need to supply your access token from step A, the customer’s ID from step B, and the customer’s funding source ID from step C:

```raw
POST https://api-uat.dwolla.com/transfers
Accept: application/vnd.dwolla.v1.hal+json
Content-Type: application/vnd.dwolla.v1.hal+json
Authorization: Bearer 0Sn0W6kzNicvoWhDbQcVSKLRUpGjIdlPSEYyrHqrDDoRnQwE7Q
{
    "_links": {
        "source": {
            "href": "https://api-uat.dwolla.com/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197"
        },
        "destination": {
            "href": "https://api-uat.dwolla.com/accounts/AB443D36-3757-44C1-A1B4-29727FB3111C"
        }
    },
    "amount": {
        "currency": "USD",
        "value": "225.00"
    }
}

HTTP/1.1 201 Created
Location: https://api-uat.dwolla.com/transfers/d76265cd-0951-e511-80da-0aa34a9b2388
```
```ruby
transfer_request = {
  :_links => {
      :destination => {:href => 'https://api-uat.dwolla.com/accounts/AB443D36-3757-44C1-A1B4-29727FB3111C'},
      :source => {:href => 'https://api-uat.dwolla.com/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197'}
  },
  :amount => {:currency => 'USD', :value => 225.00}
}

xfer = DwollaSwagger::TransfersApi.create({:body => transfer_request})
p xfer # => https://api-uat.dwolla.com/transfers/d76265cd-0951-e511-80da-0aa34a9b2388
```
```javascript
dwolla.then(function(dwolla) {
    dwolla.transfers.create({
      "_links": {
          "destination": {
              "href": "https://api-uat.dwolla.com/accounts/AB443D36-3757-44C1-A1B4-29727FB3111C"
          },
          "source": {
              "href": "https://api-uat.dwolla.com/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197"
          }
      },
      "amount": {
          "currency": "USD",
          "value": "225.00"
      }
      }).then(function(data) {
          console.log(data.obj); // https://api.dwolla.com/transfers/74c9129b-d14a-e511-80da-0aa34a9b2388
      })
})
```
```python
transfer_request = {
    "_links": {
        "source": {
            "href": "https://api-uat.dwolla.com/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197"
        },
        "destination": {
            "href": "https://api-uat.dwolla.com/accounts/AB443D36-3757-44C1-A1B4-29727FB3111C"
        }
    },
    "amount": {
        "currency": "USD",
        "value": "225.00"
    }
}

transfers_api = dwollaswagger.TransfersApi(client)
xfer = transfers_api.create(body=transfer_request)

print(xfer) # => https://api-uat.dwolla.com/transfers/d76265cd-0951-e511-80da-0aa34a9b2388
```
```php
<?php
$transfer_request = array (
  '_links' => 
  array (
    'source' => 
    array (
      'href' => 'https://api-uat.dwolla.com/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197',
    ),
    'destination' => 
    array (
      'href' => 'https://api-uat.dwolla.com/accounts/AB443D36-3757-44C1-A1B4-29727FB3111C',
    ),
  ),
  'amount' => 
  array (
    'currency' => 'USD',
    'value' => '225.00',
  )
);

$transferApi = new DwollaSwagger\TransfersApi($apiClient);
$myAccount = $transferApi->create($transfer_request);

print($xfer); # => https://api-uat.dwolla.com/transfers/d76265cd-0951-e511-80da-0aa34a9b2388
?>
```


<nav class="pager-nav">
    <a href="./">Back: Overview</a>
    <a href="02-check-transfer.html">Next step: Check transfer status</a>
</nav>