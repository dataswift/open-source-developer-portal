---
layout: twoColumn
section: guides
type: iOS Developer's Guide
guide: 
    name: ios-guide
    step: 04-02-setup-data-plugs-applications
title: "- Setting Up Data Plugs and Applications"
description: Guide to setting up Data Plugs and Applications on the HAT on the iOS platform
---
# Set up Application

Setting up an application is similar to the log in process. First you have to check the `kind`, is it `App`, or `DataPlug`. The 2 of them are different in how you set them up:


In case of an `App` you first have to check if the app is already installed on user's device. To do that you have to check with

```javascriptnoselect
UIApplication.shared.canOpenURL(appURL)
```
where `appURL` is the `iosUrl` from the `Application` -> `setup`. If user has the app installed, then you have to form a `URL` like this:

```javascriptnoselect
"https://\(hatAddress)/#/hatlogin?name=\(appID)&redirect=\(appURL)&fallback=\(fallback)"
```
* `hatAddress` is the (fully qualified domain) address of the HAT, e.g. `test.hubofallthings.net`
* `appID` is the id of the application to setup.
* `appURL` is the URL where the user should be sent to after completing authentication. In this case is the `iosURL`
* `fallback` is the URL where the user should be sent to in case the authentication has failed. ***Optional***. For an `iOS` application that would probably be: `\(applicationName)://failed` and has to be added in the `info.plist` file of the project in Xcode as a known URL

As you will probably have noticed this is exactly the same `URL` as the login `URL` and there is a reason for that. The setup process goes through web. So like during the login process, user will be asked to insert their password before continuing to the next step. The next step is accepting the `terms and conditions` and giving the `permissions` the app requires to function. After that if everything went smooth `HAT` will redirect back to the success `redirect`. The `redirect url` will now include a parameter which is the token for the particular app. `iOS` will ask user if they want to launch the particular app. If user selects yes then the app will be launched. If there was a problem `HAT` will redirect to the `fallback` url and you have to hide safari and show a message that something went wrong.

In case you don't know how to handle `SFSafariViewController` you can read [here](01-01-hat-login.html)

In case user does not have the app installed you first have to redirect them to the `App Store` in order for them to download the app. The `URL` that you have to use the `url` in `Application` -> `kind`. Again the only thing you have to do is open it using safari. When user has installed the app they may then tap again to set up the `Application`

# Set up Data Plug

Setting up a `Data Plug` is a lot simpler than setting up an `Application`. You just open the `url` in `Application` -> `kind` with safari and follow the instructions. Again user will first have to enter the password. After that each `Data Plug` has a different way of asking permissions and registering with the `HAT`.

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="04-03-data-plugs-applications-state.html">Next Step: State of the Application and Data Plug</a>
</nav>