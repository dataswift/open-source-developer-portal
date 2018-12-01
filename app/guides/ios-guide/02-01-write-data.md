---
layout: twoColumn
section: guides
type: iOS Developer's Guide
guide: 
    name: ios-guide
    step: 02-01-write-data
title: "- Writing Data to HAT"
description: Guide to writing data to the HAT on the iOS platform
---

`Hat for iOS` offers a general method to create network requests:

``` swift
HATNetworkManager.asynchronousRequest(
  url,
  method: .post,
  encoding: Alamofire.JSONEncoding.default,
  contentType: "text/string",
  parameters: ["key": value],
  headers: ["key": value],
  completion: completionCallback)
```

* `url` the URL to send the request to
* `method` the HTTP method of the request, you can find the different methods [here](https://restfulapi.net/http-methods/)
* `encoding` the encoding method of the request, default types of `Alamofire`
* `contentType` the content-type of the request, you can find more [here](https://www.w3.org/Protocols/rfc1341/4_Content-Type.html)
* `parameters` the parameters of the request, this field can be an empty dictionary, `[:]`. Also if the request method is `POST` then this will be the body of the request and the actual data structure that will be saved on the `HAT`
* `headers` the additional headers of the request, this field can be an empty dictionary, `[:]`
* `completion` a callback function to execute when the request has finished. The *result type* of the callback can either be `isSuccess(isSuccess: Bool, statusCode: Int?, result: JSON, token: String?)` if the request was successful or  `error(error: Error, statusCode: Int?, result: JSON?)` if the request has failed

The result type is an `enum`. Depending if the request was a success or a failure it will have the right type.
When the request was successful the result type will include:
* A boolean value `isSuccess`, indicating if the request was successful. It may be that the request triggers the successful result type but the isSuccess is false, maybe the response was 404 for example
* The `statusCode` of the request. Usually the `200..299` range is a success and `400..599` is failure. You can learn more about the different status codes [here](https://httpstatuses.com)
* The `result` is `JSON` type of `SwiftyJSON`, can be found [here](https://github.com/SwiftyJSON/SwiftyJSON)
* The `token` is a refreshed token returned from the `HAT`. It's ***optional*** and sometimes can be nil or empty.

When the request has failed the result type will include:
* The `error` that has occurred with the request, e.g. no internet connection or time out
* The `statusCode` of the request. Usually the `200..299` range is a success and `400..599` is failure. You can learn more about the different status codes [here](https://httpstatuses.com)
* The `result` is `JSON` type of `SwiftyJSON`, can be found [here](https://github.com/SwiftyJSON/SwiftyJSON). Usually it will hold more info about the failure.

# Write data

Let's say we want to save the `randomStructure` below in our `HAT`:

``` JSON
{
  "value 1": "random",
  "Int value": 0
}
```

The `URL` that the data will be saved is `https://\(hatAddress)/api/v2.6/data/\(path)`

If the `hatAddress` is `test.hubofallthings.net` and the `path` is `randomdata` then the `URL` will be: `https://test.hubofallthings.net/api/v2.6/data/testapp/randomdata`.

The `path` is formed by your app name, `testapp`, and the rest of the path, `randomdata`. It can also be `folder/something/data/random`. How deep the path will be depends from the data structure that your app use to navigate to different files.

One more thing that we need in order to write data to the `HAT` is the user's token in the headers of the request. The header you need to add is `x-auth-token` along with the token retrieved from the `Keychain`. **NEVER** save the token in a not encrypted database.

Using the function from `Hat-for-iOS` that will be

``` swift
HATNetworkManager.asynchronousRequest(
  "https://test.hubofallthings.net/api/v2.6/data/testapp/randomdata",
  method: .post,
  encoding: Alamofire.JSONEncoding.default,
  contentType: "application/json",
  parameters: randomStructure,
  headers: ["x-auth-token": token],
  completion: completionCallback)
```

Based on the type of the `completionCallback` you might have gotten the data back or you might got an error. Your app should know how to react in both scenarios:

``` swift
switch response {

case .error(let error, let statusCode, let result):

    // do something....
case .isSuccess(let isSuccess, let statusCode, let result, let token):

    // do something....
}
```

A successful response will have `statusCode` 201 and look like this:

``` JSON
{
    "endpoint": "randomdata",
    "recordId": "cf2c4ad5-bbb2-4a0e-8aaa-d3be8b76e115",
    "data": {
      "value 1": "random",
      "Int value": 0
    }
}
```

* `endpoint` is the `path` that the the file resides, `https://\(hatAddress)/api/v2.6/data/\(path)`
* `recordId` is the record identifier in the `HAT`. It's useful for when want to delete the file for example.
* `data` is the data structure that you have saved in the `HAT`

A request that has failed will look like this:

``` JSON
{
  "error": "Not Authenticated",
  "message": "Not Authenticated"
}
```

* `error` is the error that has occurred.
* `message` a more descriptive message about the `error` that has occurred

# Read data

If we want to read data we are going to use the same request again but `method` will be `GET` instead of `POST`:

``` swift
HATNetworkManager.asynchronousRequest(
  url,
  method: .get,
  encoding: Alamofire.JSONEncoding.default,
  contentType: "text/string",
  parameters: ["key": value],
  headers: ["key": value],
  completion: completionCallback)
```

If we make the same assumptions again, the `hatAddress` is `test.hubofallthings.net`, the `path` is `randomdata` and the `x-auth-token` in the headers includes the token then the call will look like below:

``` swift
HATNetworkManager.asynchronousRequest(
  "https://test.hubofallthings.net/api/v2.6/data/testapp/randomdata",
  method: .get,
  encoding: Alamofire.JSONEncoding.default,
  contentType: "application/json",
  parameters: [:],
  headers: ["x-auth-token": token],
  completion: completionCallback)
```

Notice that since we want to read data and not write, we don't include any parameters.


Based on the type of the `completionCallback` you might have gotten the data back or you might got an error. Your app should know how to react in both scenarios:

``` swift
switch response {

case .error(let error, let statusCode, let result):

    // do something....
case .isSuccess(let isSuccess, let statusCode, let result, let token):

    // do something....
}
```

A successful response will have `statusCode` 200 and look like that:

``` JSON
{
    "endpoint": "randomdata",
    "recordId": "cf2c4ad5-bbb2-4a0e-8aaa-d3be8b76e115",
    "data": {
      "value 1": "random",
      "Int value": 0
    }
}
```

* `endpoint` is the `path` that the the file resides, `https://\(hatAddress)/api/v2.6/data/\(path)`
* `recordId` is the record identifier in the `HAT`. It's useful for when want to delete the file for example.
* `data` is the data structure that you have saved in the `HAT`

A request that has failed will look like this:

``` JSON
{
  "error": "Not Authenticated",
  "message": "Not Authenticated"
}
```

* `error` is the error that has occurred.
* `message` a more descriptive message about the `error` that has occurred

# Update data

Let's say that we want to change our original example:

``` JSON
{
  "value 1": "random",
  "Int value": 0
}
```

To something like this:

``` JSON
{
  "value 1": "random",
  "newValue": true,
  "Int value": 1
}
```

In order to update the data the HTTP `method` has to change to `PUT`:

``` swift
HATNetworkManager.asynchronousRequest(
  url,
  method: .put,
  encoding: Alamofire.JSONEncoding.default,
  contentType: "text/string",
  parameters: ["key": value],
  headers: ["key": value],
  completion: completionCallback)
```

If we make the same assumptions again, the `hatAddress` is `test.hubofallthings.net` and request and the `x-auth-token` in the headers includes the token then the call will look like below:

``` swift
HATNetworkManager.asynchronousRequest(
  "https://test.hubofallthings.net/api/v2.6/data",
  method: .put,
  encoding: Alamofire.JSONEncoding.default,
  contentType: "application/json",
  parameters: parameters,
  headers: ["x-auth-token": token],
  completion: completionCallback)
```

Where `parameters` is an array of `Key-value pair` of type `[String: Any]` representing the new structure that we want to update. Mind the brackets, it has to be an array even if it's just one element.

Based on the type of the `completionCallback` you might have gotten the data back or you might got an error. Your app should know how to react in both scenarios:

``` swift
switch response {

case .error(let error, let statusCode, let result):

    // do something....
case .isSuccess(let isSuccess, let statusCode, let result, let token):

    // do something....
}
```

A successful response will have `statusCode` 201 and look like this:

``` JSON
{
    "endpoint": "randomdata",
    "recordId": "cf2c4ad5-bbb2-4a0e-8aaa-d3be8b76e115",
    "data": {
      "value 1": "random",
      "newValue": true,
      "Int value": 1
    }
}
```

* `endpoint` is the `path` that the the file resides, `https://\(hatAddress)/api/v2.6/data/\(path)`
* `recordId` is the record identifier in the `HAT`. It's useful for when want to delete the file for example.
* `data` is the data structure that you have saved in the `HAT`

A request that has failed will look like this:

``` JSON
{
  "error": "Not Authenticated",
  "message": "Not Authenticated"
}
```

* `error` is the error that has occurred.
* `message` a more descriptive message about the `error` that has occurred

# Delete data

If now we want to delete the file we have just created we need to create a `DELETE` request:

``` swift
HATNetworkManager.asynchronousRequest(
  url,
  method: .delete,
  encoding: Alamofire.JSONEncoding.default,
  contentType: "text/string",
  parameters: ["key": value],
  headers: ["key": value],
  completion: completionCallback)
```

If we make the same assumptions again, the `hatAddress` is `test.hubofallthings.net` and request and the `x-auth-token` in the headers includes the token then the call will look like below:

``` swift
HATNetworkManager.asynchronousRequest(
  "https://test.hubofallthings.net/api/v2.6/data",
  method: .delete,
  encoding: Alamofire.JSONEncoding.default,
  contentType: "application/json",
  parameters: parameters,
  headers: ["x-auth-token": token],
  completion: completionCallback)
```

Where `parameters` in this case is the `recordId` of the entry we want to delete. We can also delete multiple entries with one request using more parameters. If the `recordId` is 5 then the `parameters` will be

``` JSON
{
  "records": 5
}
```

A successful response will have `statusCode` 200 and look like this:

``` JSON
{
    "message": "All records deleted"
}
```

A request that has failed will look like this:

``` JSON
{
  "error": "Not Authenticated",
  "message": "Not Authenticated"
}
```

* `error` is the error that has occurred.
* `message` a more descriptive message about the `error` that has occurred

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="02-02-file-upload.html">Next Step: Uploading Files to HAT</a>
</nav>