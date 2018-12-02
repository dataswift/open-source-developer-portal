---
layout: twoColumn
section: guides
type: Android Developer's Guide
guide:
    name: android-guide
    step: 02-01-write-data
title: "- Writing Data to HAT"
description: Guide to writing data to the HAT on the Android platform
---

`Hat API Android` offers a general method to create network requests:

``` javascriptnoselect
HATNetworkManager().postRequest(
  url,
  body: String,
  headers: Map<String, String>,
  completion: completionCallback)
```

* `url` the URL to send the request to
* `method` the HTTP method of the request, you can find the different methods [here](https://restfulapi.net/http-methods/)
* `contentType` the content-type of the request, you can find more [here](https://www.w3.org/Protocols/rfc1341/4_Content-Type.html)
* `headers` the additional headers of the request, this field can be an empty dictionary, `mapOf("","")`
* `completion` a callback function to execute when the request has finished. The *result type* of the callback can either be `isSuccess(var statusCode: Int?, var error: Error?, var json: Json?, var resultString: String?, var token: String?){
)` if the request was successful or  `HasFailed(var statusCode: Int?, var error: Error?, var json: Json?, var resultString: String?, var token: String?)` if the request has failed

The result type is an `enum`. Depending if the request was a success or a failure it will have the right type.
When the request was successful the result type will include:
* A boolean value `isSuccess`, indicating if the request was successful. It may be that the request triggers the successful result type but the isSuccess is false, maybe the response was 404 for example
* The `statusCode` of the request. Usually the `200..299` range is a success and `400..599` is failure. You can learn more about the different status codes [here](https://httpstatuses.com)
* The `result` is `Json` type of `Fuel`, can be found [here](https://github.com/kittinunf/Fuel)
* The `token` is a refreshed token returned from the `HAT`. It's *optional* and sometimes can be null or empty.

When the request has failed the result type will include:
* The `error` that has occurred with the request, e.g. no internet connection or time out
* The `statusCode` of the request. Usually the `200..299` range is a success and `400..599` is failure. You can learn more about the different status codes [here](https://httpstatuses.com)
* The `result` is `JSON` type of `Fuel`, can be found [here](https://github.com/kittinunf/Fuel). Usually it will hold more info about the failure.

# Write data

Let's say we want to save the `randomStructure` below in our `HAT`:

``` jsonnoselect
{
  "value 1": "random",
  "Int value": 0
}
```

The `URL` that the data will be saved is `https://$hatAddress/api/v2.6/data/$path`

If the `hatAddress` is `test.hubofallthings.net` and the `path` is `randomdata` then the `URL` will be: `https://test.hubofallthings.net/api/v2.6/data/testapp/randomdata`.

The `path` is formed by your app name, `testapp`, and the rest of the path, `randomdata`. It can also be `folder/something/data/random`. How deep the path will be depends from the data structure that your app use to navigate to different files.

One more thing that we need in order to write data to the `HAT` is the user's token in the headers of the request. The header you need to add is `x-auth-token` along with the token retrieved from the `KeyStore`. **NEVER** save the token in a not encrypted database.

Using the function from `Hat API Android` that will be

``` javascriptnoselect
HATNetworkManager().postRequest(
  "https://test.hubofallthings.net/api/v2.6/data/testapp/randomdata",
  parameters: randomStructure,
  headers: mapOf("x-auth-token" to token,"Content-Type" to "application/json"),
  completion: completionCallback)
```

Based on the type of the `completionCallback` you might have gotten the data back or you might got an error. Your app should know how to react in both scenarios:

``` javascriptnoselect
when (result){
  is ResultType.IsSuccess->{

    //do something....
  }
  is ResultType.HasFailed->{

    //do something....
  }
}

```

A successful response will have `statusCode` 201 and look like this:

``` jsonnoselect
{
    "endpoint": "randomdata",
    "recordId": "cf2c4ad5-bbb2-4a0e-8aaa-d3be8b76e115",
    "data": {
      "value 1": "random",
      "Int value": 0
    }
}
```

* `endpoint` is the `path` that the the file resides, `https://$hatAddress/api/v2.6/data/$path`
* `recordId` is the record identifier in the `HAT`. It's useful for when want to delete the file for example.
* `data` is the data structure that you have saved in the `HAT`

A request that has failed will look like this:

``` jsonnoselect
{
  "error": "Not Authenticated",
  "message": "Not Authenticated"
}
```

* `error` is the error that has occurred.
* `message` a more descriptive message about the `error` that has occurred

# Read data

If we want to read data we are going to use the same request again but `method` will be `GET` instead of `POST`:

``` javascriptnoselect
HATNetworkManager().getRequest(
  url,
  parameters: List<Pair<"key", value?>>,
  headers: Map<String, String>?,
  completion: completionCallback)
```

If we make the same assumptions again, the `hatAddress` is `test.hubofallthings.net`, the `path` is `randomdata` and the `x-auth-token` in the headers includes the token then the call will look like below:

``` javascriptnoselect
HATNetworkManager().getRequest(
  "https://test.hubofallthings.net/api/v2.6/data/testapp/randomdata",
  parameters: List<Pair<String, Any?>>,
  headers: mapOf("x-auth-token" to token,"Content-Type" to "application/json"),
  completion: completionCallback)
```

Notice that since we want to read data and not write, we don't include any parameters.


Based on the type of the `completionCallback` you might have gotten the data back or you might got an error. Your app should know how to react in both scenarios:

``` javascriptnoselect
when (result){
  is ResultType.IsSuccess->{

    //do something....
  }
  is ResultType.HasFailed->{

    //do something....
  }
}

```

A successful response will have `statusCode` 200 and look like that:

``` jsonnoselect
{
    "endpoint": "randomdata",
    "recordId": "cf2c4ad5-bbb2-4a0e-8aaa-d3be8b76e115",
    "data": {
      "value 1": "random",
      "Int value": 0
    }
}
```

* `endpoint` is the `path` that the the file resides, `https://$hatAddress/api/v2.6/data/$path`
* `recordId` is the record identifier in the `HAT`. It's useful for when want to delete the file for example.
* `data` is the data structure that you have saved in the `HAT`

A request that has failed will look like this:

``` jsonnoselect
{
  "error": "Not Authenticated",
  "message": "Not Authenticated"
}
```

* `error` is the error that has occurred.
* `message` a more descriptive message about the `error` that has occurred

# Update data

Let's say that we want to change our original example:

``` jsonnoselect
{
  "value 1": "random",
  "Int value": 0
}
```

To something like this:

``` jsonnoselect
{
  "value 1": "random",
  "newValue": true,
  "Int value": 1
}
```

In order to update the data the HTTP `method` has to change to `PUT`:

``` javascriptnoselect
HATNetworkManager.putRequest(
  url,
  body: String,
  headers: Map<String, String>,
  completion: completionCallback)
```

If we make the same assumptions again, the `hatAddress` is `test.hubofallthings.net` and request and the `x-auth-token` in the headers includes the token then the call will look like below:

``` javascriptnoselect
HATNetworkManager().putRequest(
  "https://test.hubofallthings.net/api/v2.6/data",
  body: body,
  headers: ["x-auth-token" to token, "Content-Type" to "application/json"],
  completion: completionCallback)
```

Where `parameters` is an array of `Key-value pair` of type `Map<String: Any>` representing the new structure that we want to update. Mind the brackets, it has to be an array even if it's just one element.

Based on the type of the `completionCallback` you might have gotten the data back or you might got an error. Your app should know how to react in both scenarios:

``` javascriptnoselect
when (result){
  is ResultType.IsSuccess->{

    //do something....
  }
  is ResultType.HasFailed->{

    //do something....
  }
}

```

A successful response will have `statusCode` 201 and look like this:

``` jsonnoselect
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

* `endpoint` is the `path` that the the file resides, `https://$hatAddress/api/v2.6/data/$path`
* `recordId` is the record identifier in the `HAT`. It's useful for when want to delete the file for example.
* `data` is the data structure that you have saved in the `HAT`

A request that has failed will look like this:

``` jsonnoselect
{
  "error": "Not Authenticated",
  "message": "Not Authenticated"
}
```

* `error` is the error that has occurred.
* `message` a more descriptive message about the `error` that has occurred

# Delete data

If now we want to delete the file we have just created we need to create a `DELETE` request:

``` javascriptnoselect
HATNetworkManager().deleteRequest(
  url,
  body: String,
  headers: Map<String, String>,
  completion: completionCallback)
```

If we make the same assumptions again, the `hatAddress` is `test.hubofallthings.net` and request and the `x-auth-token` in the headers includes the token then the call will look like below:

``` javascriptnoselect
HATNetworkManager().deleteRequest(
  "https://test.hubofallthings.net/api/v2.6/data",
  body: body,
  headers: mapOf("x-auth-token" to token),
  completion: completionCallback)
```

Where `body` in this case is the `recordId` of the entry we want to delete. We can also delete multiple entries with one request using more parameters. If the `recordId` is 5 then the `body` will be

``` jsonnoselect
{
  "records": 5
}
```

A successful response will have `statusCode` 200 and look like this:

``` jsonnoselect
{
    "message": "All records deleted"
}
```

A request that has failed will look like this:

``` javascript
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
