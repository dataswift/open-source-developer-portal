---
layout: twoColumn
section: guides
type: iOS Developer's Guide
guide: 
    name: ios-guide
    step: 03-02-create-data-debit
title: "- Creating a Data Debit"
description: Guide to creating a data debit on the HAT on the iOS platform
---

# Create Data Debit

You can also create a `Data Debit` by using the function below:

```javascriptnoselect
let endpoint = DataOfferRequiredDataDefinitionBundleKeyEndpointsV2(endpoint: "rumpel/profile")
let bundle = DataOfferRequiredDataDefinitionObjectV2(
  name: "test1",
  bundle: ["rumpel/profile": DataOfferRequiredDataDefinitionBundleKeyV2(endpoints: [endpoint])])

let dataDebitToCreate = DataDebitCreationObject(
  dataDebitKey: "test1",
  purpose: "none",
  start: "2018-11-14T23:51:40+0000",
  period: 432000000,
  termsUrl: "none",
  cancelAtPeriodEnd: false,
  requestClientName: "none",
  requestClientUrl: "none",
  requestClientLogoUrl: "none",
  bundle: bundle)
```

* `endpoint`is the `HAT endpoint` you would like access to. `DataOfferRequiredDataDefinitionBundleKeyEndpointsV2` also allows you to setup mapping and filtering if you wish. Minimum requirement is to specify the endpoint you want to use

* `bundle` we can say it is a grouping of different `endpoints` under one category. You can define one category, with the `name` parameter, but you can have multiple `endpoints` in the `bundle` section. Note that `name` has to be **unique**

* `dataDebitKey` is a key to the specific `Data debit`. This has to be **unique**
* `purpose` is a small description of the purpose for this `Data Debit`
* `start` is the start date that this `Data Debit` can become available. The date is in `ISO` format
* `period` is the duration that the `Data Debit` will be active in seconds
* `termsUrl` is the `URL` for the terms and conditions for this `Data Debit`
* `cancelAtPeriodEnd` is a bool flag for if the `Data Debit` should be cancelled with the `period` passes
* `requestClientName` is the name of the client that created this `Data Debit`
* `requestClientUrl` is the `URL` to the website of the client
* `requestClientLogoUrl` is a `URL` for the logo of the client
* `bundle` is the description of what endpoints we want to have access to

A successful response will have `statusCode` 201 and look like this:

```jsonnoselect
{
    "dataDebitKey": "test1",
    "dateCreated": "2018-11-14T23:51:40+0000",
    "permissions": [
        {
            "dateCreated": "2018-11-14T23:51:40+0000",
            "purpose": "none",
            "start": "2018-11-14T23:51:40+0000",
            "period": 432000000,
            "cancelAtPeriodEnd": false,
            "termsUrl": "none",
            "conditions": {
                "name": "data-debit-id-test-name",
                "bundle": {
                    "test": {
                        "endpoints": [
                            {
                                "endpoint": "rumpel/profile"
                            }
                        ]
                    }
                }
            },
            "bundle": {
                "name": "data-debit-id-test1",
                "bundle": {
                    "test": {
                        "endpoints": [
                            {
                                "endpoint": "rumpel/profile"
                            }
                        ]
                    }
                }
            },
            "accepted": false,
            "active": false,
            "end": null
        }
    ],
    "requestClientName": "none",
    "requestClientUrl": "none",
    "requestClientLogoUrl": "none",
    "requestDescription": "none",
    "active": false,
    "accepted": false,
    "start": "2018-04-18T09:26:57.000Z",
    "end": null,
    "permissionsActive": null,
    "permissionsLatest": {
      "dateCreated": "2018-11-14T23:51:40+0000",
      "purpose": "none",
      "start": "2018-11-14T23:51:40+0000",
      "period": 432000000,
      "cancelAtPeriodEnd": false,
      "termsUrl": "none",
      "conditions": {
          "name": "data-debit-id-test-name",
          "bundle": {
              "test": {
                  "endpoints": [
                      {
                          "endpoint": "rumpel/profile"
                      }
                  ]
              }
          }
      },
      "bundle": {
          "name": "data-debit-id-test1",
          "bundle": {
              "test": {
                  "endpoints": [
                      {
                          "endpoint": "rumpel/profile"
                      }
                  ]
              }
          }
      },
      "accepted": false,
      "active": false,
      "end": null
    }
}
```

For explanation of what the above structure means you can read [here](03-01-fetch-existing-data-debits.html).

A request that has failed will look like this:

```jsonnoselect
{
  "error": "Not Authenticated",
  "message": "Not Authenticated"
}
```

* `error` is the error that has occurred.
* `message` a more descriptive message about the `error` that has occurred

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="03-03-approve-data-debit.html">Next Step: Approving a Data Debit</a>
</nav>
