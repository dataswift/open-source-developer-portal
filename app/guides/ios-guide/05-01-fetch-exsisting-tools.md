---
layout: twoColumn
section: guides
type: iOS Developer's Guide
guide: 
    name: ios-guide
    step: 05-01-fetch-existing-tools
title: "- Getting Existing Tools"
description: Guide to Listing existing Tools on the HAT on the iOS platform
---
# Fetch Tools

You can easily fetch the available tools using the following function:

``` swift
HATToolsService.getAvailableTools(
            userDomain: userDomain,
            userToken: userToken,
            completion: gotAppsFromDex,
            failCallBack: errorGettingApps)
```

* `userDomain` is the user's `HAT address` in order to form the url to fetch the available `Tools`.
* `userToken` is the user's token in order to authenticate with the `HAT`.
* `completion` is a callback function that is called when the request was successful with a type of `@escaping (([HATToolsObject], String?) -> Void)`. The first parameter is an array of `HATToolsObject`. This is the structure of `Tools`. More on that in the next section. The second parameter is an optional `String`, the refreshed user token that the `HAT` returns.
* `failCallBack` is callback that is called when the request has failed. They type of the function is `@escaping ((HATTableError) -> Void)`. `HATTableError` is custom object describing the errors that have occurred during the querying of the tables in the database.

A successful response will have `statusCode` 200 and look like this:

``` JSON
[
    {
        "id": "sentiment-tracker",
        "info": {
            "version": "1.0.0",
            "versionReleaseDate": "2018-01-01T12:00:00.000Z",
            "name": "Sentiment Tracker",
            "headline": "Sentiment in your words",
            "description": {
                "text": "Sentiment Tracker analyses your texts on Facebook, Twitter and Notables to work out how negative or positive your postings are."
            },
            "termsUrl": "https://hatdex.org/terms-of-service-hat-owner-agreement",
            "supportContact": "contact@hatdex.org",
            "graphics": {
                "banner": {
                    "normal": ""
                },
                "logo": {
                    "normal": "https://github.com/Hub-of-all-Things/exchange-assets/blob/master/Sentiments/logo.png?raw=true"
                },
                "screenshots": [
                    {
                        "normal": "https://github.com/Hub-of-all-Things/exchange-assets/blob/master/Sentiments/Screenshot1.jpg?raw=true"
                    },
                    {
                        "normal": "https://github.com/Hub-of-all-Things/exchange-assets/blob/master/Sentiments/Screenshot2.jpg?raw=true"
                    }
                ]
            },
            "dataPreviewEndpoint": "/she/feed/she/sentiments"
        },
        "developer": {
            "id": "hatdex",
            "name": "HAT Data Exchange Ltd",
            "url": "https://hatdex.org",
            "country": "United Kingdom"
        },
        "trigger": {
            "triggerType": "individual"
        },
        "dataBundle": {
            "name": "data-feed-counter",
            "bundle": {
                "she/insights/emotions": {
                    "endpoints": [
                        {
                            "endpoint": "she/insights/emotions",
                            "mapping": {
                                "message": "text",
                                "timestamp": "timestamp"
                            }
                        }
                    ],
                    "orderBy": "timestamp",
                    "ordering": "descending",
                    "limit": 20
                },
                "notables/feed": {
                    "endpoints": [
                        {
                            "endpoint": "rumpel/notablesv1",
                            "mapping": {
                                "message": "message",
                                "timestamp": "created_time"
                            }
                        }
                    ],
                    "orderBy": "created_time",
                    "ordering": "descending",
                    "limit": 20
                },
                "she/insights/emotions/negative": {
                    "endpoints": [
                        {
                            "endpoint": "she/insights/emotions/negative",
                            "mapping": {
                                "message": "text",
                                "timestamp": "timestamp"
                            }
                        }
                    ],
                    "orderBy": "timestamp",
                    "ordering": "descending",
                    "limit": 20
                },
                "twitter/tweets": {
                    "endpoints": [
                        {
                            "endpoint": "twitter/tweets",
                            "mapping": {
                                "message": "text",
                                "timestamp": "lastUpdated"
                            }
                        }
                    ],
                    "orderBy": "lastUpdated",
                    "ordering": "descending",
                    "limit": 20
                },
                "facebook/feed": {
                    "endpoints": [
                        {
                            "endpoint": "facebook/feed",
                            "mapping": {
                                "message": "message",
                                "timestamp": "created_time"
                            }
                        }
                    ],
                    "orderBy": "created_time",
                    "ordering": "descending",
                    "limit": 20
                },
                "she/insights/emotions/neutral": {
                    "endpoints": [
                        {
                            "endpoint": "she/insights/emotions/neutral",
                            "mapping": {
                                "message": "text",
                                "timestamp": "timestamp"
                            }
                        }
                    ],
                    "orderBy": "timestamp",
                    "ordering": "descending",
                    "limit": 20
                },
                "she/insights/emotions/positive": {
                    "endpoints": [
                        {
                            "endpoint": "she/insights/emotions/positive",
                            "mapping": {
                                "message": "text",
                                "timestamp": "timestamp"
                            }
                        }
                    ],
                    "orderBy": "timestamp",
                    "ordering": "descending",
                    "limit": 20
                }
            }
        },
        "status": {
            "available": true,
            "enabled": true,
            "lastExecution": "2018-11-12T10:29:36.724Z"
        }
    }
]
```

* `id` is the `Tool` id on the `HAT`. You need this when you want to enable or disable a `Tool`
* `info` Has all the information you will need to present the `Tool`. It is been formed by 10 values:
  1. `version` is the version number of the `Tool`. `Tools` like `Applications` and `DataPlugs` can be updated. This will result a new version
  2. `versionReleaseDate` is the date that the latest version was pushed in `ISO` format
  3. `name` is the official name of the `Tool`
  4. `headline` is a small text to compliment the `name`. Used like a subtitle
  5. `description` allows you to describe your app better with a longer text. Also it has support for different formats of text, `text`, `markdown` and `html`. Except `text` the others are ***optional***
  6. `termsUrl` is a `URL` of the terms and conditions. Users must be able to read them if they wish
  7. `supportContact` a support email. Users will use this email to contact you
  8. `dataPreview` is actually an array of `SheFeed` structures. This is used to preview items, if any, instead of making another network request to fetch those items. ***Optional***
  9. `graphics` is a structure formed by 3 values:
    1. `banner` is the `URL` of the banner image
    2. `logo` is the `URL` of the app logo image
    3. `screenshots` is the `URL` of the app's screenshots used to showcase what this app offers.
    All of the above 3 values use the same structure. `HAT` images can be categorized as `small`, `normal`, `large` and `xlarge`. Except `normal` all are ***optional*** values
  10. `dataPreviewEndpoint` is a `URL` that you can use to fetch the 'feed' of the `Tool`. You have to form the `URL` like this: `"https://\(hatAddress)/api/v2.6\(dataPreviewEndpoint)"`
* `developer` consists of some basic info about the developer. This includes: `id`, `name`, `url` and `country`
* `status` is formed by 4 values describing the state of the `Tool`:
  1. `available` indicates if the `Tool` is available. A `Tool` can be unavailable for example when in testing. Default value is false
  2. `enabled` indicates if the `Tool` is enabled by the user. Default value is false
  3. `lastExecution` is an ***optional*** `String` that has a date in an `ISO` format indicating the date that the `Tool` run for the last time.
  4. `executionStarted` is an ***optional*** `String` that has a date in an `ISO` format indicating the date that the `Tool` started running for the last time
* `dataBundle` is the permissions needed in order for the `Tool` to run. You can read more [here](FetchDataDebits.md)
* `trigger` describes the frequency that the `Tool` will be executed. `Tools` are not running all the time. The possible values are: `periodic`, `individual` and `manual`

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
<a href="05-02-enable-disable-tools.html">Next Step: Enabling/Disabling Tools</a>
</nav>