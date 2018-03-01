---
layout: twoColumn
section: guides
type: Application management on the HAT
guide: 
    name: application-management
    step: 01-application-information-format
title: Application information reference
description: Detailed description of the different aspects of application encoded within the structure
product: hat
weight: 9
---

### Application

| Property    | Type                                              | Description                                                                                    |
|:------------|:--------------------------------------------------|:-----------------------------------------------------------------------------------------------|
| id          | String                                            | unique application identifier                                                                  |
| kind        | [ApplicationKind](#applicationkind)               | defines the kind of an application, potentially changing some of the application aspects below |
| info        | [ApplicationInfo](#applicationinfo)               | defines user-readable information about the app                                                |
| permissions | [ApplicationPermissions](#applicationpermissions) | defines what the application can do, in the form of roles granted and/or data debit requested  |
| setup       | [ApplicationSetup](#applicationsetup)             | how does one start using the app?                                                              |
| status      | [ApplicationStatus](#applicationstatus)           | how does the HAT tell if the app is active                                                     |

### ApplicationKind

Defines the kind of an application, potentially changing some of the application behaviour

| Property   | Type                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                   |
|:-----------|:-------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| kind       | String (`App`, `DataPlug` or `Tool`) | defines the kind of an application, potentially changing some of the application aspects below. Options include:<br> `App` - a full, external application that uses HAT as a backend <br> `DataPlug ` - a DataPlug that pulls data in from a remote source on behalf of the user <br> `Tool` - a tool that has UI integrated within a HAT application, but may need to rely on a separate backend service for processing data |
| url        | String                               | URL where general information about the application can be found                                                                                                                                                                                                                                                                                                                                                              |
| iosUrl     | String, Optional                     | URL where iOS-specific information about the application can be found, e.g. the Applciation's App Store page                                                                                                                                                                                                                                                                                                                  |
| androidUrl | String, Optional                     | URL where Android-specific information about the application can be found                                                                                                                                                                                                                                                                                                                                                     |

### ApplicationInfo

Defines user-readable information about the app

| Property    | Type                                        | Description                                                                                                                                                                                                                                            |
|:------------|:--------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| version     | String                                      | uses three-number, dot-separated versioning in the spirit of semantic versioning to track changes to application requirements and allow to signal backward-compatibility or required updates as the application evolves                                |
| published   | Boolean                                     | Boolean flag indicating whether this version if the application has been published                                                                                                                                                                     |
| name        | String                                      | human-readable name of the application                                                                                                                                                                                                                 |
| headline    | String                                      | one sentence description of what the application does                                                                                                                                                                                                  |
| description | [FormattedText](#formattedtext)             | formatted text (currently plaintext and optionally Markdown and HTML) with full details of the application                                                                                                                                             |
| dataPreview | List of DataFeedItem                        | a sequence of items main data feed structure, to show a generic preview of what data created by the application on the HAT will include                                                                                                                |
| graphics    | [ApplicationGraphics](#applicationgraphics) | graphical elements to build the UI from, primarily images. Each follows the format of a “Drawable” object, which has a url to the “normal” size image as well as optional ones sized as small, large and extra-large, targeting different screen sizes |

### FormattedText

Provides text formatted for the various formats used: plaintext, markdown, html...

| Property | Type             | Description                  |
|:---------|:-----------------|:-----------------------------|
| text     | String           | Plaintext (unformatted) text |
| markdown | String, Optional | Markdown-formatted text      |
| html     | String, Optional | HTML-formatted text          |

#### ApplicationGraphics

Graphical elements to build the UI from, primarily images. Each follows the format of a “Drawable” object, which has a url to the “normal” size image as well as optional ones sized as small, large and extra-large, targeting different screen sizes

| Property    | Type                  | Description                                     |
|:------------|:----------------------|:------------------------------------------------|
| banner      | [Drawable](#drawable) | Banner image to be shown in application listing |
| logo        | [Drawable](#drawable) | Logo of the app                                 |
| screenshots | List of [Drawable](#drawable)      | A list of screenshots demoing the application   |

#### Drawable

| Property | Type                   | Description                                                                              |
|:---------|:-----------------------|:-----------------------------------------------------------------------------------------|
| normal   | URL (String)           | URL to a normal-size (default) graphic element to use                                    |
| small    | URL (String), Optional | URL to a small-size graphic element to use, targeted at small screens (less than 576px)  |
| large    | URL (String), Optional | URL to a large graphic element to use, targeted at large screens (above 992px)           |
| xlarge   | URL (String), Optional | URL to an extra-large graphic element to use, targeted at largest screens (above 1200px) |

### ApplicationPermissions

defines what the application can do, in the form of roles granted and/or data debit requested

| Property     | Type                       | Description                                                                                                                                                                                                                                                               |
|:-------------|:---------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| rolesGranted | List of UserRole           | a list of roles granted for the application (/the HAT owner using the application), such as “Owner” or “DataDebit”. Although it would be the owner user in majority of cases when using those apps, they all have limited permissions depending on what has been approved |
| dataRequired | DataDebitRequest, Optional | a data debit request information for the application when it operates as a “Data Acquirer” and downloads the data somewhere else (e.g. Notables backend service). Such Data Debits always have an ID of "app-<application-id>"                                            |

### ApplicationSetup

Setup process - how does one start using the app?

| Property              | Type                             | Description                                                                                                                                     |
|:----------------------|:---------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------|
| kind                  | String                           | the kind of application setup: `Internal` or `External`                                                                                         |
| onboarding            | List of OnboardingStep, Optional | a few onboarding steps with simple heading, illustration, text, to explain to the user what the application does and how it interacts with them |
| preferences           | ApplicationPreferences           | a list of preferences, with default values                                                                                                      |
| url/iosUrl/androidUrl | URL (String), Optional           | identifying the setup URL for the different platforms available                                                                                 |


The main difference between `Internal` and `External` is that `Internal` setup happens without leaving the app, where all controls are presented in the controlling UI, while External is an external process, where the user is sent off to another interface to set up. In both cases, “Permissions” needs an explicit approval step

### ApplicationStatus

Status check process - how does the HAT tell if the app is active.

| Property                | Type                                                 | Description                                                                                                                             |
|:------------------------|:-----------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------|
| kind                    | String                                               | the kind of application status check: `Internal` or `External`                                                                          |
| compatibility           | Version                                              | indicates the lowest version number this version is compatible with, primarily - in case of permission changes                          |
| recentDataCheckEndpoint | HAT Data Endpoint (String), Optional                 | which HAT data endpoint to check for the most recent timestamp of data saved, e.g. to see that the application has recently been active |
| statusUrl               | URL (String), Set when `kind=External`               | identifying the status check URL. The URL is called with `x-auth-token` encoding user's token in a header                               |
| expectedStatus          | HTTP Status code (Numeric), Set when `kind=External` | identifying the expected status code in response to status check request                                                                |

In both cases, HAT has the responsibility of checking:
- if the application has been enabled
- if the currently set up version is compatible with the one available publicly
- timestamp of the most recent data available, if the setting is included
- whether the Data Debit has been setup, enabled and matches the currently required one
- making an authenticated call to status URL, checking the status reported by the remote system

