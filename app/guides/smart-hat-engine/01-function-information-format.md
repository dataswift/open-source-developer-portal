---
layout: twoColumn
section: guides
type: Smart HAT Engine
guide: 
    name: smart-hat-engine
    step: 01-function-information-format
title: Function information reference
description: Detailed description of the different aspects of function encoded within the structure
product: she
weight: 1
---

Each function publishes its configuration through a Lambda function handler, this section provides the details on what information is included. Note that publishing of the function is managed by the HAT Service Provider and the information will always be reviewed.

### FunctionConfiguration

| Property   | Type                                                                                                               | Description                                                                                  |
|:-----------|:-------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------|
| id         | String                                                                                                             | unique function identifier                                                                   |
| info       | [FunctionInfo](#functioninfo)                                                                                      | defines user-visible information about the function, including any descriptions and graphics |
| developer  | [ApplicationDeveloper](/guides/application-management/01-application-information-format.html#applicationdeveloper) | defines function developer details                                                           |
| trigger    | [FunctionTrigger](#functiontrigger)                                                                                | when does the function process data                                                          |
| dataBundle | [EndpointDataBundle](/guides/data-bundling)                                                                        | the default bundle of data SHE function uses                                                 |
| status     | [FunctionStatus](#functionstatus)                                                                                  | status of the function on the given HAT                                                      |

### FunctionInfo

| Property            | Type                                                                                                                   | Description                                                                                                                                                                                                                                            |
|:--------------------|:-----------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| version             | String                                                                                                                 | version ID of the function, in 3-digit semantic versioning format                                                                                                                                                                                      |
| versionReleaseDate  | ISO8601 Date with Time                                                                                                 | the date this version of the function was released                                                                                                                                                                                                     |
| updateNodes         | [ApplicationUpdateNotes](/guides/application-management/01-application-information-format.html#applicationupdatenotes) | any update notes for the current function release                                                                                                                                                                                                      |
| name                | String                                                                                                                 | user-readable function name                                                                                                                                                                                                                            |
| headline            | String                                                                                                                 | headline (short description) of what the function does                                                                                                                                                                                                 |
| description         | [FormattedText](/guides/application-management/01-application-information-format.html#formattedtext)                   | long, formatted description of the function in plain text and optionally Markdown/HTML                                                                                                                                                                 |
| termsUrl            | String                                                                                                                 | URL to the terms between HAT owner and the function developer                                                                                                                                                                                          |
| supportContact      | String                                                                                                                 | support contact details, email address                                                                                                                                                                                                                 |
| graphics            | [ApplicationGraphics](/guides/application-management/01-application-information-format.html#applicationgraphics)       | graphical elements to build the UI from, primarily images. Each follows the format of a “Drawable” object, which has a url to the “normal” size image as well as optional ones sized as small, large and extra-large, targeting different screen sizes |
| dataPreviewEndpoint | String, Optional                                                                                                       | if function's data can be previewed directly in the HAT App, HAT API endpoint designated for the preview                                                                                                                                               |

### FunctionTrigger

| Property    | Type                                                               | Description                                                                                                              |
|:------------|:-------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------|
| triggerType | String (`periodic`, `individual` or `manual`)                      | defines how the HAT should invoke the function as described below (periodically, for each individual record or manually) |
| period      | ISO8601 Period or Number (milliseconds), only with `periodic` type | if executing periodically, the approximate period between subsequent executions                                          |

### FunctionStatus

| Property         | Type                             | Description                                                             |
|:-----------------|:---------------------------------|:------------------------------------------------------------------------|
| available        | Boolean                          | whether or not the function is currently available for use on the HAT   |
| enabled          | Boolean                          | whether or not the function has been enabled by the HAT owner           |
| lastExecution    | ISO8601 Date with Time, Optional | the last time the function was successfully executed (not set if never) |
| executionStarted | ISO8601 Date with Time, Optional | if currently executing, time when the current execution started         |



<nav class="pager-nav">
    <a href="/">Overview</a>
    <a href="" style="display:none;"></a>
</nav>
