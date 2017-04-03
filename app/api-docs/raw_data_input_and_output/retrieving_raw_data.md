---
layout: twoColumn
section: "Raw Data Input and Output"
type: article
title:  "Retrieving Raw Data"
description: "Retrieving Raw Data"
---

# Retrieving Raw Data
  Sometimes you might find it useful to extract Data Values. You can get all Data that has been stored in a specific Table (including its Fields and subTables), listed by associated Record ID (one Record per list item), and the full nested structure of Fields and subTables. Similarly, you can query the Data by Field (individual JSON Property) to get a list of all items that are stored in that Field. You can also get all values associated with a Record ID, in the form of the full, nested structure of Tables, subTables, Fields and Values. You can retrieve Data Values by specifying Table, Field or Record ID and making a GET request to /table/table_ID/values, /field/field_ID/values or /record/record_ID/values respectively.

Raw data retrieval is only available for the Owner user for the use by the personal HAT User Interface. It may, however, be useful in development to better understand how the HAT works as well as to help you structure your data.
