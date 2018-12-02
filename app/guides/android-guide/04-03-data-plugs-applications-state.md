---
layout: twoColumn
section: guides
type: Android Developer's Guide
guide:
    name: android-guide
    step: 04-03-data-plugs-applications-state
title: "- State of the Application and DataPlug"
description: Guide to states of Data Plugs and Applications on the HAT on the Android platform
---
# State of the Application and DataPlug

`Application` and `DataPlug` can be in multiple states. Setup, failing, need updating, disabled. In order for you to respond in state changes you can use the following snippet:

```javascriptnoselect
/**
     Returns a ApplicationConnectionState according to the application state

     - parameter application: The application to check the state of

     - returns: An ApplicationConnectionState case depending in the status of the app
     */
     fun getState(applcation : HATApplicationObject) : ApplicationConnectionState {
         return if (applcation.setup && applcation.needsUpdating != null && applcation.needsUpdating!!) {
             ApplicationConnectionState.Update
         } else if (applcation.enabled && !applcation.active) {
             ApplicationConnectionState.Failing
         } else if (applcation.enabled && applcation.active) {
             if(applcation.mostRecentData != null)
                 ApplicationConnectionState.Running
             else
                 ApplicationConnectionState.Fetching
         } else {
             ApplicationConnectionState.Untouched
         }
     }

    enum class ApplicationConnectionState{
      Update,
      Failing,
      Running,
      Fetching,
      Untouched
    }
```

* `Running` is the case when the `Application` or `DataPlug` is `enabled`, `active` and it doesn't `needsUpdating`
* `Fetching` is the case with the `Application` or `DataPlug` is `enabled`, `active`, it's an `App` and the `mostRecentData` is `null`. This means that no data have been saved in the `HAT` yet
* `Update` is the case when the `Application` or `DataPlug` is marked as `needsUpdating` in the API response. Then user has to go through the setup process again
* `Failing` is the case when there is a problem in the `Application` or `DataPlug`. Setting up again might or might not help. In case this persists please contact us: `contact@hatdex.org`
* `Untouched` is the case when the `Application` or `DataPlug` has never been setup before


<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="04-04-data-plugs-applications-disable.html">Next Chapter: Disabling Data Plugs and Applications</a>
</nav>
