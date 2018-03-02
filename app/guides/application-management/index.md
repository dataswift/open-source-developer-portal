---
layout: twoColumn
section: guides
type: Application management on the HAT
guide: 
    name: application-management
    step: overview
title: Application management on the HAT
description: How HAT applications are set up and managed
product: hat
weight: 9
---

An Application on the HAT is represented with a comprehensive structure encoding all key aspects of its interaction with the HAT and the HAT owner. It includes:

- A unique identifier
- The kind of an app, such as a mobile application, a DataPlug or a tool internal to the HAT
- High-level information, including description and the various graphics, such as the logo and demo screenshots
- Permissions - the level of access the app should have within a HAT when authenticated
- Setup process, defining the steps of setting up the application with a HAT
- Status check process, defining the procedure of checking if the application is active

It is easier to illustrate the different aspects with specific examples:

*Facebook Data Plug* in the above would be of type “DataPlug” and include information such as version, name, textual description, potentially with no screenshots as plugs typically do not have a user interface. To give HAT owner an idea of what data it pulls in, it would include a "data preview" with some sample data. Permissions would say that the application has rights to write to the `facebook` namespace on the HAT, but does not read any data and has no Data Debit associated. When setting up any Data Plug the owner typically needs to authorize data fetching with the source (Facebook), therefore it needs an "External" setup, indicating the address to redirect user to. Finally, data fetching authorization can be disabled at the source, therefore to make sure that a plug is still active, an "External" status check is needed.

*Notables* app would be of type “Application” with platform set to iOS and list information similar to Data Plugs, but screenshots should also be provided. Notables is an example of where the service consists of a user application as well as a backend service handling requests to share notables on social media as well as take them down. It therefore needs permissions to 1) write data to `rumpel` namespace, where notables are stored, 2) read data from `rumpel` namespace to render all notables as well as owner's profile information, 3) set up dataplugs and 4) associated data debit which allows backend service to access shared notables. Setup in this case is also external - HAT owner needs to be redirected to the Notables application. URL the user gets redirected to includes access token as a query parameter. Finally, external status check ensures that the backend can periodically get a new access token to fetch data from the HAT.

*Weather* is an example of external API integration to enrich HAT owner's experience. It would be of type “Tool” and list information including screenshots of what it looks like within a HAT owner app. It needs a Data Debit for backend service to fetch information relevant to weather forecasts, e.g. calendar event times and locations and recent user's locations. Setup is "Internal", guiding the HAT owner through a few onboarding screens and transparently setting up the rest. Status Check is "External" to check the remote service and pass the user's authentication token to it.

*Rumpel* as an "Owner" application - details include similar level of information as Notables, however it requires "Owner" level permissions. Since owner applications should not be sending data to exernal serviecs, status check is also "Internal" and only checks if the application is enabled.

Contents of this guide:

- [Application information reference](01-application-information-format.html)
- [Integration for App Developers](02-application-developers.html)
- [Application Management](03-application-management.html)
- [API reference](https://documenter.getpostman.com/view/110376/RVnPKPbQ)

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="01-application-information-format.html">Application information reference</a>
</nav>
