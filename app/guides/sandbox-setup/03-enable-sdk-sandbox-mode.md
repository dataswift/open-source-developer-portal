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

To use the Sandbox environment with our API V2 SDKs, either set the environment to `sandbox` or provide `https://api-uat.dwolla.com/` as the hostname if using a Swagger client.

```raw
not available
```
```javascript
var dwolla = require('dwolla-v2');

var client = new dwolla.Client({
  id: process.env.DWOLLA_ID,
  secret: process.env.DWOLLA_SECRET,
  environment: 'sandbox',
});
```
```ruby
# Using DwollaV2 - https://github.com/Dwolla/dwolla-v2-ruby (Recommended)
require 'dwolla_v2'

$dwolla = DwollaV2::Client.new(id: ENV["DWOLLA_ID"], secret: ENV["DWOLLA_SECRET"]) do |config|
  config.environment = :sandbox
end

# Using DwollaSwagger - https://github.com/Dwolla/dwolla-swagger-ruby
require 'dwolla_swagger'

DwollaSwagger::Swagger.configure do |config|
    config.host = 'api-uat.dwolla.com'
end
```
```python
# Using dwollav2 - https://github.com/Dwolla/dwolla-v2-python (Recommended)
client = dwollav2.Client(
  id = os.environ['DWOLLA_ID'],
  secret = os.environ['DWOLLA_SECRET'],
  environment = 'sandbox'
)

# Using dwollaswagger - https://github.com/Dwolla/dwolla-swagger-python
client = dwollaswagger.ApiClient('https://api-uat.dwolla.com')
```
```php
/**
 * Using DwollaSwagger - https://github.com/Dwolla/dwolla-swagger-php
 */
<?php
require('../path/to/vendor/autoload.php');

$apiClient = new DwollaSwagger\ApiClient("https://api-uat.dwolla.com/");
?>
```

You’re all set! With Sandbox mode enabled, you’re ready to start sending money in the Sandbox. 

<nav class="pager-nav">
    <a href="./02-create-application.html">Back: Create an application</a>
    <a href="/guides/send-money">Next guide: Send money to your users</a>
</nav>