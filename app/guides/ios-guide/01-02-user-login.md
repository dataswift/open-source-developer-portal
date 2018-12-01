---
layout: twoColumn
section: guides
type: iOS Developer's Guide
guide: 
    name: ios-guide
    step: 01-02-user-login
title: "- Step 2 - Logging in the User"
description: Step 2 to authenticating HAT applications on the iOS platform
---
# Step 2 - Logging in the User

In the next step users will be asked to fill in the `password` for the particular `HAT Address`:

![alt text](https://github.com/Hub-of-all-Things/exchange-assets/blob/master/iOS-Guide-Images/Enter-Password.png?raw=true "type password")

This screen cannot be modified in any way. Users have to insert the password for the specified HAT and tap `LOGIN`

Note that the complete address is served via **SSL**, contains the name of the HAT as well as the application parameters - `application name`, `redirect url` and ` fallback redirect url`.

By tapping `LOGIN` the authentication process will begin. `HAT` will use one of the two `redirect url` that were included in the `request`, `success redirect` if everything went ok or `fallbackRedirectURL` if an error occurred. The application has to know how to respond in both scenarios.

In order to achieve that we have to add the `success redirect` and `fallbackRedirectURL` to the `Info.plist` file in the project.

In order to add them to the `Info.plist` file you have to add the **Key** `URL Types` as an **Array**.

![alt text](https://github.com/Hub-of-all-Things/exchange-assets/blob/master/iOS-Guide-Images/infoPlist-File.png?raw=true "add key to info.plist file")

 Then add one item in that array of type **Dictionary**. The first item of the dictionary will be the `URL Identifier` which is the reverse url domain of your project. eg. `com.hubofallthings.test`. The second item of the dictionary will be `URL Schemes` which is **Array** again. In this array you will add one String value and you will name it as you want. Best practice is to name as is the name of your app. This will be the url scheme of the your app. That means every time `iOS` intercepts a URL starting with this value, like `test://host` will hand the process to your app and your app will be responsible to either launch or not.

![alt text](https://github.com/Hub-of-all-Things/exchange-assets/blob/master/iOS-Guide-Images/URLTypes.png?raw=true "setup url types")

In order to decide if the app has to launch or not you have to add to your `AppDelegate` file the following function:

 ```javascriptnoselect
 func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool
 ```

 This is the function that `iOS` triggers when it receives a URL which matches the `URL Schemes` that you defined in your `Info.plist` file. You can find more info about it [here](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623112-application?language=objc).
 All that you have to do in this function is to check the URL and if you recognize it return `true` else return `false`.

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="01-03-user-verification.html">Next Step: Step 3 - Verifying the login</a>
</nav>