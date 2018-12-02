---
layout: twoColumn
section: guides
type: Android Developer's Guide
guide:
    name: android-guide
    step: 05-02-enable-disable-tools
title: "- Enabling/Disabling Tools"
description: Guide to Enabling/Disabling Tools on the HAT on the Android platform
---
# Enable Tool

You can easily enable a tool by using the function below:

``` javascriptnoselect
HATToolsService().enableTool(
      toolName: selectedTool.id,
      userDomain: userDomain,
      userToken: userToken,
      completion: toolStatusChanged,
      failCallBack: errorInteractingWithTool)
```

* `toolName` is the `id` of the tool. It can be the same as the `name` or not
* `userDomain` is the user's `HAT address` in order to form the url to enable the `Tool`.
* `userToken` is the user's token in order to authenticate with the `HAT`.
* `completion` is a callback. Is called when the request was successful with a type of `((HATToolsObject, String?) -> Unit)`. The first parameter is the now enabled `HATToolsObject`. The second parameter is an optional `String`, the refreshed user token that the `HAT` returns.
* `failCallBack` is callback that is called when the request has failed. They type of the function is `((HATError) -> Unit)`. `HATError` is custom object describing the errors that have occurred during the querying of the tables in the database.

A successful response will have `statusCode` 200 and look like this:

``` jsonnoselect
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
        "lastExecution": "2018-11-13T12:36:59.061Z"
    }
}
```

A request that has failed will look like this:

``` jsonnoselect
{
  "error": "Not Authenticated",
  "message": "Not Authenticated"
}
```

* `error` is the error that has occurred.
* `message` a more descriptive message about the `error` that has occurred

# Disable Tool

``` javascriptnoselect
HATToolsService().disableTool(
      toolName: selectedTool.id,
      userDomain: userDomain,
      userToken: userToken,
      completion: toolStatusChanged,
      failCallBack: errorInteractingWithTool)
```

* `toolName` is the `id` of the tool. It can be the same as the `name` or not
* `userDomain` is the user's `HAT address` in order to form the url to disable the `Tool`.
* `userToken` is the user's token in order to authenticate with the `HAT`.
* `completion` is a callback function that is called when the request was successful with a type of `((HATToolsObject, String?) -> Unit)`. The first parameter is the now disabled `HATToolsObject`. The second parameter is an optional `String`, the refreshed user token that the `HAT` returns.
* `failCallBack` is callback that is called when the request has failed. They type of the function is `((HATError) -> Unit)`. `HATError` is custom object describing the errors that have occurred during the querying of the tables in the database.

A successful response will have `statusCode` 200 and look like this:

``` jsonnoselect
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
        "enabled": false,
        "lastExecution": "2018-11-13T12:36:59.061Z"
    }
}
```

You can read more about what the structure is [here](FetchTools.md).

A request that has failed will look like this:

``` jsonnoselect
{
  "error": "Not Authenticated",
  "message": "Not Authenticated"
}
```

* `error` is the error that has occurred.
* `message` a more descriptive message about the `error` that has occurred
