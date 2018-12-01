---
layout: twoColumn
section: guides
type: iOS Developer's Guide
guide: 
    name: ios-guide
    step: 04-03-data-plugs-applications-state
title: "- State of the Application and DataPlug"
description: Guide to states of Data Plugs and Applications on the HAT on the iOS platform
---
# State of the Application and DataPlug

`Application` and `DataPlug` can be in multiple states. Setup, failing, need updating, disabled. In order for you to respond in state changes you can use the following snippet:

``` swift
/**
     Returns a ApplicationConnectionState according to the application state

     - parameter application: The application to check the state of

     - returns: An ApplicationConnectionState case depending in the status of the app
     */
    static func getState(application: HATApplicationObject) -> ApplicationConnectionState {

        if application.setup && (application.needsUpdating ?? false) {

            return .needsUpdating
        } else if application.enabled && !application.active {

            return .failing
        } else if application.enabled && application.active {

            if application.mostRecentData == nil && application.application.kind.kind != "App" {

                return .fetching
            }

            return .connected
        }

        return .notConnected
    }
```

* `connected` is the case when the `Application` or `DataPlug` is `enabled`, `active` and it doesn't `needsUpdating`
* `fetching` is the case with the `Application` or `DataPlug` is `enabled`, `active`, it's an `App` and the `mostRecentData` is `nil`. This means that no data have been saved in the `HAT` yet
* `needsUpdating` is the case when the `Application` or `DataPlug` is marked as `needsUpdating` in the API response. Then user has to go through the setup process again
* `failing` is the case when there is a problem in the `Application` or `DataPlug`. Setting up again might or might not help. In case this persists please contact us: `contact@hatdex.org`
* `notConnected` is the case when the `Application` or `DataPlug` has never been setup before


<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="04-04-data-plugs-applications-disable.html">Next Chapter: Disabling Data Plugs and Applications</a>
</nav>