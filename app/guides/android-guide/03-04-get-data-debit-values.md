---
layout: twoColumn
section: guides
type: Android Developer's Guide
guide:
    name: android-guide
    step: 03-04-get-data-debit-values
title: "- Getting Values of a Data Debit"
description: Guide to getting values of a data debit on the HAT on the Android platform
---
# Get Data Debit values

You can fetch the values of a specific `Data Debit` by using the next function:

``` javascriptnoselect
HATDataDebitsService().getDataDebitValues(
  dataDebitKey: dataDebitKey,
  userToken: userToken,
  userDomain: userDomain,
  succesfulCallBack: gotDataDebits,
  failCallBack: failedGettingDataDebits)
```

* `dataDebitKey` is the data debit key that we want the values from.
* `userToken` is the user's token in order to authenticate with the `HAT`.
* `userDomain` is the user's `HAT address` in order to form the url to fetch the values of the `Data Debit`.
* `succesfulCallBack` is a callback function, that is called when the request was successful, with a type of `((HATDataDebitValuesObject, String?) -> Unit)`. This is the structure of `Data Debit Values`. More on that in the next section. The second parameter is an optional `String`, the refreshed user token that the `HAT` returns.
* `failCallBack` is callback that is called when the request has failed. They type of the function is `((HATError, String?) -> Unit)`. `HATError` is custom object describing the errors that have occurred during the querying of the `HAT`. The second parameter is the dataDebitKey.

A successful response will have `statusCode` 200 and look like this:

``` jsonnoselect
  {
    "bundle": {
        "profile": [
            {
                "endpoint": "rumpel/profile",
                "recordId": "137e0409-effc-454f-b1f0-56fe87ad7762",
                "data": {
                    "name": "",
                    "nick": "",
                    "photo_url": "https://testing.hubat.net/api/v2.6/files/content/rumpel1537454603415.jpg"
                }
            }
        ],
        "notables": [
            {
                "endpoint": "rumpel/notablesv1",
                "recordId": "d1d26a7d-0c7f-4ba2-8caa-13a4b5671444",
                "data": {
                    "kind": "note",
                    "author": {
                        "name": "",
                        "phata": "testing.hubat.net",
                        "nickname": "",
                        "photo_url": ""
                    },
                    "shared": true,
                    "message": "oooo",
                    "shared_on": [
                        "phata"
                    ],
                    "created_time": "2018-11-08T11:24:58Z",
                    "updated_time": "2018-11-08T11:24:58Z"
                }
            }
        ]
      }
    }
```

Inside the `bundle` there are 2 different values. `profile` and `notables`. Those 2 values are `Arrays` that contain the actual data for each `endpoint` specified when this `Data Debit` was created. In this example the 2 structures are the `profile` and `notables`.

A request that has failed will look like this:

``` jsonnoselect
{
  "error": "Not Authenticated",
  "message": "Not Authenticated"
}
```

* `error` is the error that has occurred.
* `message` a more descriptive message about the `error` that has occurred

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="04-00-data-plugs-applications.html">Next Chapter: Data Plugs and Applications</a>
</nav>
