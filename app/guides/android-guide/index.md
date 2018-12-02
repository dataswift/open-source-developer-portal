---
layout: twoColumn
section: guides
type: Android Developer's Guide
guide:
    name: android-guide
    step: overview
title: Android Developer's Guide
description: Guide to developing HAT applications on the Android platform
product: hat
weight: 11
---
# Overview

# Build an Android app

You can learn all about what an Application on HAT is in [Application management guide](https://developers.hubofallthings.com/guides/application-management/)

In order to build an ```Android``` app that uses HAT APIs you first need to install the **HAT API Android** library from [github](https://github.com/Hub-of-all-Things/HAT-API-Android). To do so you can either manually download the library and add it to your project or you can use [maven](https://dl.bintray.com/lizchandler/HAT-API-Android/).

## Requirements

* Android studio 3.2
* Kotlin 1.3
* In this guide there is no mention about how to set up the UI, so you have to be able to design a basic UI in order to make everything work


# Install manually

In order to manually install the library you have to download the repo from github and add it to your project via drag n drop.

# Install via Maven

**Step 1**

In the top level gradle file , add the jitpack repository link

```javascriptnoselect
allprojects {
  repositories{
    maven { url "https://jitpack.io" }
  }
}
```

**Step 2**

In your app level gradle file , implement the library dependency

```javascriptnoselect
implementation 'com.hubofallthings.android.hatApi:hat:<latest-version>'
```

**Step 3**

Now you have to sync the project to download the library.

**Step 4**

Add internet permission into the AndroidManifest

```shellnoselect
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.hubofallthings.myProject">
<uses-permission android:name="android.permission.INTERNET" />

```

# Using the library

`HAT-API-Android` provides features that make your app to be able to `authenticate` with the HAT, `read/write` to the `HAT`, fetch and setup `Data Plugs` and `Applications`, fetch `Data debits` and use advanced features like `Combinators` and `Bundles`.


<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="01-00-authenticate-with-hat.html">Next Step: Authentication with HAT</a>
</nav>
