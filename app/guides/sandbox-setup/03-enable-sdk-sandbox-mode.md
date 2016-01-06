---
layout: twoColumn
section: guides
type: guide
guide: 
    name: sandbox-setup
    step: '4'
title:  Get started with integrating ACH transfers into your application
description: Use this guide to start sending payments from your application by utilizing our open API with no per transaction fees. 
---

# Using an SDK? Enable Sandbox mode

To use the Sandbox environment with our API V2 SDKs, just provide `https://api-uat.dwolla.com/` as the hostname.

```raw
not available
```
```javascript
var client = require('swagger-client');

var dwolla = new client({
    url: 'https://api-uat.dwolla.com/swagger.json',
    authorizations: {
        dwollaHeaderAuth: new client.ApiKeyAuthorization('Authorization', 'Bearer your_token', 'header')
    },
    usePromise: true
});
```
```ruby
require 'dwolla_swagger'

DwollaSwagger::Swagger.configure do |config|
    config.host = 'api-uat.dwolla.com'
end
```
```python
client = dwollaswagger.ApiClient('https://api-uat.dwolla.com')
```
```php
<?php
require('../path/to/vendor/autoload.php');

$apiClient = new DwollaSwagger\ApiClient("https://api-uat.dwolla.com/");
```


You’re all set! With Sandbox mode enabled, you’re ready to start sending money in the Sandbox. 

<nav class="pager-nav">
    <a href="./02-create-application.html">Back: Create an application</a>
    <a href="/guides/send-money">Next guide: Send money to your users</a>
</nav>