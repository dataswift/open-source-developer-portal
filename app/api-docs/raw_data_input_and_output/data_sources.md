---
layout: twoColumn
section: raw_data_input_and_output
type: access-api-article
title:  "Funding source verification"
description: "Programmatically verify a bank to initiate a bank transfer."
---

# Data Sources

Raw Data can be collected from Sources that have an open API. Data Sources can include: internet-connected devices, databases, online calendars, Facebook, etc. Each Source with an open API, however, returns the Data in some structure. Therefore, you have to configure each new Data Source you want to use.

### Configure a new Data Source
    
When creating a new Data Source for the HAT, you have to define the structure of the data that you will be using to format your input data. We work with a virtualized data structure, meaning that we can create any number of Tables, subTables and Fields within them that are necessary.
    
The basic rules are:
    
* if it is a simple value (a leaf of a JSON tree), it will be stored as a Field;
* if it is a more complex object (JSON object with child nodes), it will be stored as a Table;
* each Table (or subTable) can have 0 or more Fields;
* if an object is part of another object or is the root object (node) of the JSON tree, it will be stored as a Table/subTable. Any objects that are part of it will be stored as subTables;
* each Table and each Field has a name. The names are used when reconstructing stored data back into JSON as property names;
* each Field currently has a mandatory source name to avoid name clashes between unrelated data sources.

The source field will not be modifiable by the API caller from the next release of the HAT and it will be used to control who owns the specific tables (the same user who has created them) and hence who can write into them.

Make sure to save the structure for yourself for each user you are storing the data for as you will need field IDs to define which fields to write your data values into.


###Listing Available Sources
   
You might want to check what Sources have been already configured before configuring a new one. To list all available Sources, you should make a GET request to /data/sources endpoint. The response will contain a list of Sources, where each Source contains a list of Data Tables that are not part of another Table (i.e. they are not subTables). In addition to this, the response will show IDs of the Sources and times when they were created as well as updated.
