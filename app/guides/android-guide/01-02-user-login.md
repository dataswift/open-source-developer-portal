---
layout: twoColumn
section: guides
type: Android Developer's Guide
guide:
    name: android-guide
    step: 01-02-user-login
title: "- Step 2 - Logging in the User"
description: Step 2 to authenticating HAT applications on the Android platform
---
# Step 2 - Logging in the User

In the next step users will be asked to fill in the `password` for the particular `HAT Address`:

![alt text](https://github.com/Hub-of-all-Things/exchange-assets/blob/master/iOS-Guide-Images/Enter-Password.png?raw=true "type password")

This screen cannot be modified in any way. Users have to insert the password for the specified HAT and tap `LOGIN`

Note that the complete address is served via **SSL**, contains the name of the HAT as well as the application parameters - `application name`, `redirect url` and ` fallback redirect url`.

By tapping `LOGIN` the authentication process will begin. `HAT` will use one of the two `redirect url` that were included in the `request`, `success redirect` if everything went ok or `fallbackRedirectURL` if an error occurred. The application has to know how to respond in both scenarios.

In order to achieve that we have to add the `success redirect` and `fallbackRedirectURL` to the `AndroidManifest` file in the project.

In order to add them to the `AndroidManifest` file you have to add the **Key** `URL Types` as a data.

```shellnoselect
<activity name="MainActivity" >
  <intent-filter>
    <data
        android:host="hatappfailed"
        android:scheme="hatapp" />
  </intent-filter>
</activity>
```
 This will be the url scheme of the your app. That means every time `Android` intercepts a URL starting with this value, like `test://host` will hand the process to your app and your app will be responsible to either launch or not.

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="01-03-user-verification.html">Next Step: Step 3 - Verifying the login</a>
</nav>
