---
layout: twoColumn
section: guides
type: Android Developer's Guide
guide:
    name: android-guide
    step: 03-01-fetch-existing-data-debits
title: "- Fetching Existing Data Debits"
description: Guide to getting existing data debits from the HAT on the Android platform
---
# Fetch Data Debits

You can fetch the available `Data Debits` by using the next function:

``` javascriptnoselect
HATDataDebitsService().getAvailableDataDebits(
            userToken: userToken,
            userDomain: userDomain,
            succesfulCallBack: gotDataDebits,
            failCallBack: failedGettingDataDebits)
```

* `userToken` is the user's token in order to authenticate with the `HAT`.
* `userDomain` is the user's `HAT address` in order to form the url to fetch the available `Data Debits`.
* `succesfulCallBack` is a callback. Is called when the request was successful with a type of `(List<DataDebitObject>, String?) -> Unit)`. The first parameter is a list of `DataDebitObject`. This is the structure of `Data Debits`. More on that in the next section. The second parameter is an optional `String`, the refreshed user token that the `HAT` returns.
* `failCallBack` is callback that is called when the request has failed. They type of the function is `((HATError) -> Unit)`. `HATError` is custom object describing the errors that have occurred during the querying of the `HAT`.

A successful response will have `statusCode` 200 and look like this:

``` jsonnoselect
[
    {
        "dataDebitKey": "97a0748f-bf81-4aaa-8f39-97ac2557d920",
        "dateCreated": "2018-01-02T15:22:42+0000",
        "permissions": [
            {
                "dateCreated": "2018-01-02T15:22:42+0000",
                "purpose": "This Data Debit is in a legacy format, and the HAT App is unable to display all the information associated with it fully. This may include a logo, title and full description",
                "start": "2018-01-02T15:23:02.000Z",
                "period": 86400000,
                "cancelAtPeriodEnd": true,
                "termsUrl": "",
                "bundle": {
                    "name": "97a0748f-bf81-4aaa-8f39-97ac2557d920",
                    "bundle": {
                        "iphone/locations": {
                            "endpoints": [
                                {
                                    "endpoint": "iphone/locations",
                                    "mapping": {
                                        "accuracy": "accuracy",
                                        "latitude": "latitude",
                                        "longitude": "longitude",
                                        "timestamp": "timestamp",
                                        "lastUpdated": "lastUpdated",
                                        "locations.accuracy": "locations.accuracy",
                                        "locations.latitude": "locations.latitude",
                                        "locations.longitude": "locations.longitude",
                                        "locations.timestamp": "locations.timestamp"
                                    },
                                    "filters": []
                                }
                            ]
                        },
                        "rumpel/locations/ios": {
                            "endpoints": [
                                {
                                    "endpoint": "rumpel/locations/ios",
                                    "mapping": {
                                        "speed": "speed",
                                        "course": "course",
                                        "altitude": "altitude",
                                        "latitude": "latitude",
                                        "longitude": "longitude",
                                        "dateSynced": "dateSynced",
                                        "dateCreated": "dateCreated",
                                        "dateCreatedLocal": "dateCreatedLocal",
                                        "verticalAccuracy": "verticalAccuracy",
                                        "horizontalAccuracy": "horizontalAccuracy"
                                    },
                                    "filters": []
                                }
                            ]
                        }
                    }
                },
                "accepted": false,
                "active": false,
                "end": "2018-01-03T15:23:02.000Z"
            }
        ],
        "requestClientName": "Data Exchange",
        "requestClientUrl": "https://dex.hubofallthings.com/",
        "requestClientLogoUrl": "https://dex.hubofallthings.com/assets//images/dex.png",
        "active": false,
        "accepted": false,
        "start": "2018-01-02T15:23:02.000Z",
        "end": "2018-01-03T15:23:02.000Z",
        "permissionsActive": null,
        "permissionsLatest": {
            "dateCreated": "2018-01-02T15:22:42+0000",
            "purpose": "This Data Debit is in a legacy format, and the HAT App is unable to display all the information associated with it fully. This may include a logo, title and full description",
            "start": "2018-01-02T15:23:02.000Z",
            "period": 86400000,
            "cancelAtPeriodEnd": true,
            "termsUrl": "",
            "bundle": {
                "name": "97a0748f-bf81-4aaa-8f39-97ac2557d920",
                "bundle": {
                    "iphone/locations": {
                        "endpoints": [
                            {
                                "endpoint": "iphone/locations",
                                "mapping": {
                                    "accuracy": "accuracy",
                                    "latitude": "latitude",
                                    "longitude": "longitude",
                                    "timestamp": "timestamp",
                                    "lastUpdated": "lastUpdated",
                                    "locations.accuracy": "locations.accuracy",
                                    "locations.latitude": "locations.latitude",
                                    "locations.longitude": "locations.longitude",
                                    "locations.timestamp": "locations.timestamp"
                                },
                                "filters": []
                            }
                        ]
                    },
                    "rumpel/locations/ios": {
                        "endpoints": [
                            {
                                "endpoint": "rumpel/locations/ios",
                                "mapping": {
                                    "speed": "speed",
                                    "course": "course",
                                    "altitude": "altitude",
                                    "latitude": "latitude",
                                    "longitude": "longitude",
                                    "dateSynced": "dateSynced",
                                    "dateCreated": "dateCreated",
                                    "dateCreatedLocal": "dateCreatedLocal",
                                    "verticalAccuracy": "verticalAccuracy",
                                    "horizontalAccuracy": "horizontalAccuracy"
                                },
                                "filters": []
                            }
                        ]
                    }
                }
            },
            "accepted": false,
            "active": false,
            "end": "2018-01-03T15:23:02.000Z"
        }
    }
]
```

* `dataDebitKey` is the data debit key, defined when creating the `Data Debit`, it's unique across `HAT`
* `dateCreated` is the date that this `Data Debit` was created. The date is in `ISO` format as `String`
* `permissions` is the `permissions` info for this `Data Debit`. What `URLs` it has access, from which date to which date, etc.:
  1. `dateCreated` is the date that this `Data Bundle` was created. The date is in `ISO` format as `String`
  2. `purpose` is a short description for the `Data Bundle` explaining it's purpose. ***optional***
  3. `start` is the start date that this `Data Bundle` has become active. The date is in `ISO` format. ***Optional***
  4. `end` is the start date that this `Data Bundle` will surpass the assigned duration stated in `period`. The date is in `ISO` format. ***Optional***
  5. `cancelAtPeriodEnd` is a flag indicating if the permissions will auto cancel when the `Data Debit` will end
  6. `termsUrl` is a `URL` to show to the user the terms and conditions for this `Data Bundle`
  7. `period` the duration that the `Data Bundle` can be active. In seconds
  8. `active` is indicating if the `Data Bundle` is active
  9. `accepted` is indicating if the `Data Bundle` has been accepted
  10. `bundle` is the part where the permissions are defined. Like what `endpoints` this `Data Debit` will have access to, which fields from that `endpoint`, a `name`, under what circumstances etc.:
    1. `name` is name of the `bundle`. This has to be unique.
    2. `bundle` is a `Dictionary` of type `Dictionary<String, DataOfferRequiredDataDefinitionBundleKeyV2>`, it allows to define multiple different `endpoints` by giving a different name. This means that you can combine multiple and different `endpoints` each with it's own requirements:
      1. `endpoints` is an array of `DataOfferRequiredDataDefinitionBundleKeyEndpointsV2` containing the `HAT URLs` to include, a desired `mapping` or `filtering` for the fields:
        1. `endpoint` the actual `endpoint` that you would like access to, for example `rumpel/profile`
        2. `mapping` is the selected fields from this `endpoint` that you would like to have in the `Data Debit`
        3. `filters` lets you filter a field by some requirements. For example you can define something like `age` between 18 and 35. ***Optional***:
          1. `field` is the field that you would like to apply filtering to
          2. `transformation` is the transformation type to be done on the field. There are 4 different options: ***Optional***
            1. `identity` keep the value as-is, effect is the same as if transformation was not defined
            2. `datetimeExtract` with `part` - extract part of a date from an ISO 8601 formatted date field
            3. `timestampExtract` with `part` - extract part of a date from a UNIX timestamp date field
            4. `searchable` convert the field to searchable text. Must be used together with the find operator below
          3. `operator` is the type of the filtering. There are 4 different types with different structure each. You can read more into it be checking out `HATOperator` class in `HatForiOS` [here](https://github.com/Hub-of-all-Things/HatForIOS/blob/master/HAT/Objects/HATOperators.swift). ***Optional***:
            1. `find` it allows you to search a particular `String`, field name: `search`. Also you can nest more `operators`, field name: `operator`
            2. `contains` it allows you to search if a particular substring is contained into a `String`, field name: `value` of type `Bool`
            3. `between` it allows you to search if an `Int` is between 2 values named `upper` and `lower`
            4. `in` together with `value` field set to check if field is in (is contained by) `value`
        4. `links` each `endpoint` can contain other `endpoint` objects. ***Optional***
      2. `orderBy` lets you define the field to order the data. ***Optional***
      3. `ordering` lets you define the `ordering` of the data. `ascending` or `descending`. ***Optional***
      4. `limit` is an `Int` which lets you define how many data points you like from this `endpoint`. ***Optional***
  11. `conditions` check `bundle` for the structure. The purpose is that the `Data Bundle` can have some conditions, that have to be fulfilled first, attached to it in order to become `active`. ***Optional***
* `requestClientName` is the name of the client that created this `Data Debit`
* `requestClientUrl` is the `URL` to the website of the client
* `requestClientLogoUrl` is a `URL` for the logo of the client
* `requestDescription` is a description for the `Data Debit`. ***Optional***
* `requestApplicationId` If the `Data Debit` is tied to an `Application` this will be the application id. Else it's nil. ***Optional***
* `active` is indicating if the `Data Debit` is active
* `accepted` is indicating if the `Data Debit` has been accepted
* `start` is the date that this `Data Debit` has started. The date is in `ISO` format as `String`. ***Optional***
* `end` is the date that this `Data Debit` will end. The date is in `ISO` format as `String`. ***Optional***
* `permissionsActive` Latest **active** `permissions`. Look at `permissions`. ***Optional***
* `permissionsLatest` Latest `permissions`. Look at `permissions`

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
<a href="03-02-create-data-debit.html">Next Step: Creating a Data Debit</a>
</nav>
