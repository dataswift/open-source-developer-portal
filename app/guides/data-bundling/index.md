---
layout: twoColumn
section: guides
type: The power of HAT data bundling
guide: 
    name: data-bundling
    step: overview
title: Overview
description: Flexibly transforming, filtering and bundling data from any source
product: hat
weight: 3
---

Provided that the HAT stores any JSON-formatted data provided to it, it was important to us to design mechanisms for suitable data retrieval. Data bundling in the HAT allows for extremely flexible data transformations and filtering when retrieving data:

- picking specific parts (fields) of interest out of all the data available to avoid exposing data that is not required for the specific application. If you visualise data in a table, this would look like vertically slicing the table.
- filtering only the data that is required, based on values of the data stored. Using the table analogy, this would look like horizontally slicing the table.
- interleaving data from different, potentially heterogeneous endpoints - think about location data coming in from a range of different sources, when an application is only concerned with having most recent longitude and latitude, no matter which application it has come from
- restructuring the data to the desired JSON format on the fly, for example to unify the structure of data from different endpoints being interleaved or to reformat to something more convenient for the developer

The first step in the process is to understand Data Combinators.

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="01-data-combinators.html">Next Step: Data Combinators</a>
</nav>
