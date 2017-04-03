---
layout: twoColumn
section: "Raw Data Input and Output"
type: article
title:  "Data Tables"
description: "Data Tables"
---

# Data Tables
  Data Tables are used for raw (incoming) Data. Data Tables define how sets of Data Fields and subTables should be grouped together into the Data Table structures. For example, a Data Table can contain Fields and subTables as showed in the diagram in Raw Data Input and Output introduction above.
  
### Data Table Structure
  
  All Table API calls contain all the information defined in Table Structure. If you want to create a new Table, you have to include all the mandatory information in the API request. Table structure is explained in the table below.

| Parameter   | Description                       | Optional/Mandatory |
|-------------|-----------------------------------|--------------------|
| id          | table ID in the system            | optional           |
| dateCreated | date when the table was created   | optional           |
| name        | name of the table                 | mandatory          |
| source      | source of the table               | mandatory          |
| fields      | fields that the table contains    | optional           |
| subtables   | subtables that the table contains | optional           |


### Creating a new Data Table

You should create a new table for every set of Values you want to be added to a particular table. For example, if a user is importing their Facebook data, they may wish to create a separate Table for the schools they have attended, and a separate Table for the Facebook Pages that they “Like”. To create a new Table, the API request body should contain a new Table name and source and it should be posted to /data/table endpoint. The new Table ID and times when it was created as well as updated will be recorded automatically and included in the response.


#### Filtering Tables

You might need to extract some information about a particular Table, e.g. a list of subTables it contains. You can retrieve information about that Table using a GET request and specifying ID of that Table. For example, to find the Table with ID = 13, include its ID in the URL, i.e. post it to /data/table/13 endpoint.

