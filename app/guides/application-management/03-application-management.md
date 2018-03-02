---
layout: twoColumn
section: guides
type: Application management on the HAT
guide: 
    name: application-management
    step: 03-application-management
title: Application management
description: How application management is controlled from a HAT owner application
product: hat
weight: 9
---

All HAT Application management is performed through the endpoints to list, setup and disable the apps as well as in certain cases - get the application token for the frontend to use in authenticating with a remote service.


### Listing applications

Applications are listed at `/api/v2/applications` - returns the full list of approved applications, wrapped in HAT application status


This method is the only one needed to call to get a comprehensive list of applications along with their status on the HAT:

1. Fetches all available applications from the “Trusted Application Provider” (normally DEX)
2. Fetches the list of applications set up on the HAT
3. For each application that has been set up, executes a status check as indicated in the detailed structure description:
    1. Checks if set-up application version number is compatible with the current one
    2. Fetches timestamp of the most recent data if the setting is present
    3. For `Internal` status checks, checks if the required data debit is setup and active, in which case the app is considered “active”. For `External` status checks, generates the corresponding application token and makes an API request to the configured endpoint internally, setting status to “active” if it receives expected status code

The resulting list contains for each application:

| Property       | Type                                                              | Description                                                                                                                                                                                              |
|:---------------|:------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| application    | [Application](01-application-information-format.html#Application) | Application details                                                                                                                                                                                      |
| setup          | Boolean                                                           | indicating whether the application has been setup                                                                                                                                                        |
| active         | Boolean                                                           | indicating whether the application is active                                                                                                                                                             |
| needsUpdating  | Boolean, Optional                                                 | indicating whether application needs to be updated by calling the “setup” endpoint again and asking the user to review any permission changes. Only present if the application has previously been setup |
| mostRecentData | Date, ISO-8601, Optional                                          | timestamp of the most recent data record available in the configured endpoint                                                                                                                            |

An individual application information is accessible at `/api/v2/applications/:application-id` but this shouldn’t be needed in most cases. It will have exactly the same information and format as a single item in the list returned by `/api/v2/applications`.

### Setting up

Application is set up by calling GET `/api/v2/applications/:application/setup`

Most of the steps of setting up an application with a HAT happen transparently after calling the `setup` endpoint, for both `Internal` and `External` applications:

- extracting the Data Debit request from the app definition, saving or updating the existing data debit as well as enabling it
- updating the internally recorded status of the application, to mark it as setup and record version number setup
- refreshing status of the application

It is up the the UI to display the onboarding screens and collect user preferences. When the application is `Internal`, there is no further setup that should or could be carried out.

If, on the other hand, the application is `External`, configuration may include a default (web) url, an iOS-specific or an Android-specific url identifying the application to be launched. In this case the url is chosen by the UI depending on where it is running, i.e. an iOS application should not choose to redirect the user to an Android-specific url. To log the user in, they should then be redirected to “hatname/hatlogin?name=app-id&redirect=url” address.

Similarly an application gets disabled by calling `/api/v2/applications/:application/disable`. This takes care of recording the fact on the HAT, disabling any data debits and stops tokens issued to that application from working with the HAT.


### Obtaining application token

For some applications (services), especially those that have `External` setup flow, you may need the application’s token, which can be obtained by calling `/api/v2/applications/:application/access-token`. This endpoint is, however, very restricted and by default for any application, including those with “Owner” level access, will return “Forbidden” status.



<nav class="pager-nav">
	<a href="02-application-developers.html">For Application Developers</a>
	<a href="https://documenter.getpostman.com/view/110376/RVnPKPbQ">API Reference</a>
</nav>
