---
layout: twoColumn
section: guides
type: Raw Data I/O
guide: 
    name: raw_data_io
    step: overview
title: Overview
description: The Raw Data level provides a flexible substrate for users and develoeprs to import a varying range of data
product: hat
weight: 2
---

One of the core design principles of the HAT has been its ability to store any structure data. In *v2* of the API this ability got overhauled to simplify data input and minimise setup required before data can be saved.

Therefore, plain Data APIs consume any JSON:

- individual JSON values are saved as-is in a _data record_
- a _data record_ is a natural grouping of data, expected to relate to the way data is grouped at the source (e.g. all data together with metadata of a calendar event)
- records posted as an array get saved into separate records
- records can be further grouped to form complex data relationships (e.g. calendar events linked to a separate set of event attendees, each stored as a record), either at the time of saving the data or afterwards by referring to individual records by their IDs
- deleting of data records is supported by accepting a list of previously saved record IDs

The v2 API loosely replaces the notion of data `source` and `table` from the previous API version with `namespace` and `endpoint`, where:

- each application that is authorized to write any data into a HAT, can do so *only* within one or more `namespaces` designated for it, such as Rumpel only writing to the `rumpel` namespace. Applications are not authorized to write into each other's namespaces
- `endpoints` are defined by the application developer as required. Data is grouped under a combination of a `namespace` and an `endpoint` where the two together identify a set of data accessible via a URL path `/api/v2/data/namespace/endpoint`. An example would be `/api/v2/data/rumpel/locations` for all locations saved into a HAT by the Rumpel app
- data can thus be stored and retrieved using permitted credentials for the individual endpoints

You will need to acquire an access_token before calling any data APIs. Please refer to the [guide on HAT login for details on authentication](../hat_login/).

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="01-data-input.html">Next Step: Data Input</a>
</nav>
