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

An Application on the HAT is represented with a comprehensive structure encoding all key aspects of its interaction with the HAT and the HAT owner:

- ID - unique application identifier
- Kind of an app - defines the kind of an application, potentially changing some of the application aspects below. Options include:
    - App - a full, external application that uses HAT as a backend
    - DataPlug - a DataPlug that pulls data in from a remote source on behalf of the user
    - Tool - a tool that has UI integrated within a HAT application, but may need to rely on a separate backend service for processing data
- Info - defines user-readable information about the app
    - Version - uses three-number, dot-separated versioning in the spirit of semantic versioning to track changes to application requirements and allow to signal backward-compatibility or required updates as the application evolves
    - Name - human-readable name of the application
    - Headline - one sentence description of what the application does
    - Description - formatted text (currently plaintext and optionally Markdown and HTML) with full details of the application
    - Data Preview - a sequence of items main data feed structure, to show a generic preview of what data created by the application on the HAT will include
    - Graphics - graphical elements to build the UI from, primarily images. Each follows the format of a “Drawable” object, which has a url to the “normal” size image as well as optional ones sized as small, large and extra-large, targeting different screen sizes
        - banner
        - logo
        - screenshots
- Permissions - defines what the application can do, in the form of roles granted and/or data debit requested
    - roles granted - a list of roles granted for the application (/the HAT owner using the application), such as “Owner” or “DataDebit”. Although it would be the owner user in majority of cases when using those apps, they all have limited permissions depending on what has been approved
    - data required - a data debit request information for the application when it operates as a “Data Acquirer” and downloads the data somewhere else (e.g. Notables backend service). Such Data Debits always have an ID of "app-$id"
- Setup process - how does one start using the app?
    - Internal - set up without leaving the app, where all controls are in the next screens
        - Onboarding steps (optional) - a few onboarding steps with simple heading, illustration, text, to explain to the user what the application does and how it interacts with them
        - Application preferences (optional)
            - a list of preferences, with default 
            - side note: dooes a tickle in backend on updating settings to make the app update itself
    - External - completely external process, where the user is sent off to another interface to set up. App store, web, such as notables app or data plugs respectively. All details the same as Internal, but with additional properties
        - url/iosUrl/androidUrl for the setup link on the different platforms
    - In both cases, “Permissions” needs an explicit approval step
- Status check process - how does the HAT tell if the app is “setup”
    - Simple HAT-side setting check + version compatibility check, e.g. “needs updating” if data debit requirements have changed. Also include time last data recorded from tool
    - External address ping for status information (e.g. checking plugs if they can still talk to the source)
    - In both cases there are commonalities:
        - compatibility indicates the lower version number this version is compatible with (primarily - in terms of permissions)
        - recent data check endpoint - which HAT data endpoint to check for the most recent timestamp of data saved (e.g. to see that the application has recently been active)


### Specific examples

*Facebook Plug* in the above would be of type “DataPlug” and have version, name, textual description information as currently, potentially with no screenshots. Data Preview would have two sections (feed + static) and include sample data from Leila Trilby. If the user is connected, “Data Preview” would be named “Data” and show user’s own info. Data Used by application would be set to “None” for reading and “facebook” for writing. Set up process - external and status check process external as well as simple enabled/disabled status check.

*Notables* app would be of type “Application” with platform set to iOS (currently) and list information as per designed example. Data used by application would be set to be taken externally, and able to read/write notables from rumpel namespace AND have a data debit definition for the backing service. When the user logs into the Notables app, the app is responsible to pass on the user’s token to its backend to use for data debit value retrieval. Setup process would again be “External” (via app store) and would only a simple check within the HAT (enabled/disabled)

*Weather* would be of type “Tool” and list information as per designed example. Data Used would be set to be taken externally and able to write into “weather” namespace and read according to a data debit (calendar only? only calendar locations and time?). Setup is internal, explaining what the app does with onboarding steps and providing a choice on when to provide weather updates (e.g. 7 am every morning). Data Debit approval perhaps should be the last step after “onboarding” or part of the tweaking screen.

*MadHATTERS* as a content publishing solution would be almost identical to weather, but without data reading ability, which should be reflected in the interface (as “safe”). Setup with onboarding also internal, with settings to tweak for when they want to have the updates.

*Ads* very similar as well, but an open question on whether ad-matching is done HAT-side or outside (changing the data requirements section. Setup internal, with more knobs to tweak for when they would like to see ads, how many, what kind, etc.

*Rumpel* as a SuperApp (assuming a different starting SuperApp) setup would be "Application", with the "Owner" level permission requested in the above manifest. It is required that a warning is shown before pushing the user off to the external flow that it has full access to HAT, etc. 

## Management

All HAT Application management is performed through the endpoints to list, setup and disable the apps as well as in certain cases - get the application token for the frontend to use in authenticating with a remote service.


### Listing applications

Applications are listed at `/api/v2/applications` - returns the full list of approved applications, wrapped in HAT application status


This method is the only one needed to call to get a comprehensive list of applications along with their status on the HAT:
1. Fetches all available applications from the “Trusted Application Provider” (normally DEX)
2. Fetches the list of applications set up on the HAT
3. For each application that has been set up, executes a status check as indicated in the detailed structure description:
    1. Checks if set-up application version number is compatible with the current one
    2. Fetches timestamp of the most recent data if the setting is present
    3. For “Internal” status checks, checks if the required data debit is setup and active, in which case the app is considered “active”. For “External” status checks, generates the corresponding application token and makes an API request to the configured endpoint internally, setting status to “active” if it receives expected status code

The resulting list contains for each application:
- the application details as described above
- setup (true/false) indicating whether the application has been setup
- active (true/false) indicating whether the application is active
- (optional) needsUpdating (true/false) indicating whether application needs to be updated by calling the “setup” endpoint again and asking the user to review any permission changes. Only present if the application has previously been setup
- (optional) mostRecentData (timestamp) recording timestamp of the most recent data record available in the configured endpoint


An individual application information is accessible at `/api/v2/applications/:application-id` but this shouldn’t be needed in most cases. It will have exactly the same information and format as a single item in the list returned by `/api/v2/applications`.

### Setting up

Application is set up by calling GET `/api/v2/applications/:application/setup`

Most of the steps of setting up an application with a HAT happen transparently after calling the `setup` endpoint, for both “Internal” and “External” applications:
- extracting the Data Debit request from the app definition, saving or updating the existing data debit as well as enabling it
- updating the internally recorded status of the application, to mark it as setup and record version number setup
- refreshing status of the application

It is up the the UI to display the onboarding screens and collect user preferences. When the application is “Internal”, there is no further setup that should or could be carried out.

If, on the other hand, the application is “External”, configuration may include a default (web) url, an iOS-specific or an Android-specific url identifying the application to be launched. In this case the url is chosen by the UI depending on where it is running, i.e. an iOS application should not choose to redirect the user to an Android-specific url. To log the user in, they should then be redirected to “hatname/hatlogin?name=app-id&redirect=url” address.

Similarly an application gets disabled by calling `/api/v2/applications/:application/disable`. This takes care of recording the fact on the HAT, disabling any data debits and stops tokens issued to that application from working with the HAT.


### Obtaining application token

For some applications (services), especially those that have “External” setup flow, you may need the application’s token, which can be obtained by calling `/api/v2/applications/:application/access-token`. This endpoint is, however, very restricted and by default for any application, including those with “Owner” level access, will return “Forbidden” status.





<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="" style="display:none;"></a>
</nav>
