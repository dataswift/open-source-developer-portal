---
layout: twoColumn
section: guides
type: guide
guide:
    name: transfer-money-between-users
    step: '5'
title:  "Step 5: Attach a verified funding source"
---

# Step 5: Attach a verified funding source

Next you will attach a verified funding source for Joe Buyer, which will be done using Instant Account Verification (IAV). This method will give Joe Buyer the ability to add and verify his bank account in a matter of seconds by authenticating with his online banking credentials. Once Joe Buyer reaches the page in your application to add a bank account you'll ask Dwolla’s server to [generate an IAV token](http://docsv2.dwolla.com/#generate-an-iav-token-customer). 

Generate a single-use IAV token for our Customer, Joe Buyer:

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

```html
<head>
<script src="https://cdn.dwolla.com/1/dwolla.js"></script>
</head>
```

Next, you'll add in a container to the body of your page where you want to render the IAV flow.

```html
<div id="mainContainer">
  <input type="button" id="start" value="Add Bank">
</div>  

<div id="iavContainer"></div>
```

Now that you have `dwolla.js` initialized on the page and the container created where you'll render the IAV flow, you'll create a JavaScript function that responds to Joe clicking the "Add bank" button on your page. Once Joe clicks "Add Bank", your application will call `dwolla.iav.start()` passing in the following arguments: the iavContainer element where IAV will render, a string value of your single-use IAV token, and a callback function that will handle any error or response.

```js
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

Joe Buyer will complete the IAV flow by authenticating with his online banking credentials. You'll know his bank account was successfully added and verified if you receive a JSON response in your callback that includes a link to the newly created funding source. 

* Sample response:  `{"_links":{"funding-source":{"href":"https://api-uat.dwolla.com/funding-sources/80275e83-1f9d-4bf7-8816-2ddcd5ffc197"}}}`

Great! Joe Buyer’s funding source is now verified and ready to send money.

<nav class="pager-nav">
    <a href="./04-create-unverified-customer.html">Back: Create an unverified customer</a>
    <a href="06-create-transfer.html">Next step: Create a transfer</a>
</nav>