---
layout: twoColumn
section: guides
type: iOS Developer's Guide
guide: 
    name: ios-guide
    step: 03-03-approving-data-debit
title: "- Approving a Data Debit"
description: Guide to approving a data debit on the HAT on the iOS platform
---

# Approve Data Debits

Approving `Data Debits` is something that not all the apps can do directly. This has to do with the permissions of the apps. Currently only `HAT App` and web `Rumpel` cad approve `Data Debits`. Due to the restrictions this guide will explain how to use the generic way of doing it, that will work on all the apps. In order to approve a `Data Debit` you have to open in safari, if you aren't sure how to do it you can read [here](01-01-hat-login.html) the `URL` below:

```javascriptnoselect
"https://\(hatAddress)/#/data-debit/\(dataDebitID)/quick-confirm?redirect=\(appScheme)://\(dataDebitHost)&fallback=\(appScheme)/dataDebitFailure"
```

* `hatAddress` is the (fully qualified domain) address of the HAT, e.g. `test.hubofallthings.net`
* `dataDebitID` is the data debit id that you want to approve
* `appScheme` is the URL where the user should be sent to after completing authentication. ***Optional***. For an `iOS` application that would probably be: `\(applicationName)://success` and has to be added in the `info.plist` file of the project in Xcode as a known URL. You can read more [here](01-02-user-login.html)
* `dataDebitHost` is a string after the `://` part in the app url Scheme. For example `testapp://dataDebitHost`. With the `testapp://` `iOS` will launch your app. With the `dataDebitHost` you will know that this `URL` is specifically for the `Data Debits`

The process is the same as when logging user in. Safari will open, user will have to complete their password, and then one of the 2 redirect `URL` will be called depending if the request was successful or has failed for some reason. The app should know how to handle both scenarios. You can read more [here](01-02-user-login.html).

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="03-04-get-data-debit-values.html">Next Step: Getting Values of a Data Debit</a>
</nav>