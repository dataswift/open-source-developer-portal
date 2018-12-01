---
layout: twoColumn
section: guides
type: iOS Developer's Guide
guide: 
    name: ios-guide
    step: overview
title: iOS Developer's Guide
description: Guide to developing HAT applications on the iOS platform
product: hat
weight: 11
---
# Overview

## Build an iOS app

You can learn all about what an Application on HAT is in [Application management guide](https://developers.hubofallthings.com/guides/application-management/)

In order to build an `iOS` app that uses HAT APIs you first need to install the **HAT for iOS** library from [github](https://github.com/Hub-of-all-Things/HatForIOS). To do so you can either manually download the library and add it to your project via drag n drop or you can use [cocoapods](https://guides.cocoapods.org/using/getting-started.html) and install it *automagically*.

## Requirements

* Xcode 10
* Swift 4+
* In this guide there is no mention about how to set up the UI, so you have to be able to design a basic UI in order to make everything work


## Installing **HAT for iOS** library manually

In order to manually install the library you have to download the repo from github and add it to your project via drag n drop.

## Installing **HAT for iOS** library via Cocoapods

### Step 1
``(If you are using cocoapods already your can skip this step)``
Install cocoapods as described [here](https://guides.cocoapods.org/using/getting-started.html)

###Step 2
``(If you are using cocoapods already your can skip this step)``
If you are **not** using cocoapods in your project you have to initialize pods first. In order to do you have to run `pod init` via terminal in your root folder of your project. That command will create the necessary files in your project.

###Step 3
After initializing cocoapods there would be a new podfile file in your project. Open it and add `HatForIOS` pod in your main target like that:

```raw
pod 'HatForIOS', :git => 'https://github.com/Hub-of-all-Things/HatForIOS.git'
```

###Step 4
Open terminal again and run ```pod install``` in the root folder of your project. This will install `HatForIOS` pod in your project.

###Step 5
Remember to **always** run the *.xcworkspace* file and not the *.xcodeproj* file.

## Using the library

`HatForIOS` provides features that make your app to be able to `authenticate` with the HAT, `read/write` to the `HAT`, fetch and setup `Data Plugs` and `Applications`, fetch `Data debits` and use advanced features like `Combinators` and `Bundles`. 

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="01-00-authenticate-with-hat.html">Next Step: Authentication with HAT</a>
</nav>