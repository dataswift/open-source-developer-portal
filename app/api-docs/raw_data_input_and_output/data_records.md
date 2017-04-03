---
layout: twoColumn
section: Raw Data Input and Output
type: article
title:  "Data Records"
description: "Data Records"

# Data Records
  
Data Records define how sets of Data Values should be grouped together into the Data Table structures, i.e. each Record is equivalent of a Table row. For visual explanation of what Data Record is, see the diagram in Raw Data Input and Output introduction above.

### Record Structure 

All Record API calls contain all the information defined in Record Structure. If you want to create a new Record, you have to include all the mandatory information in the API request. Record structure is explained in the table below.

| Parameter   | Description                      | Optional/Mandatory |
|-------------|----------------------------------|--------------------|
| id          | table ID in the system           | optional           |
| dateCreated | date when the table was created  | optional           |
| lastUpdated | date when the record was updated | optional           |
| name        | name of the record               | mandatory          |

### Creating a new Record
You should create a new record for every set of Values you want to be treated as a single record. For example, each GPS reading with separate longitude and latitude Values can be put in a Record that contains both longitude and latitude, together with additional properties such as the timestamp of the Record. To create a new Record, the API request body should contain a new Record name and it should be posted to /data/record endpoint. The new Record ID and times when it was created as well as updated will be recorded automatically and included in the response.

### Filling Data Structures
Currently the easiest way of putting new data into the HAT is to POST it to the /record/RECORDID/values API endpoint, formatted as in the provided examples. RECORDID is extracted separately for each Record from the response of the API call to create a new Record. In this case you submit a list of values that each contain the value itself and the field it should be putin, together with its ID and name.

Because multiple Data Fields can have the same name but different IDs, ID is mandatory to disambiguate where exactly data should be inserted.

### Creating a New Record and Filling its Data Structures Together

If data structure Values are known before a new Record needs to be created, it tends to be useful to create a new Record and fill its data structures with Values in one go. To do this, the API request body should contain a new Record name and a list of values and it should be posted to /data/record/values endpoint. The new Record ID and times when it was created as well as updated will be recorded automatically and included in the response. Note that you can create a list of new Records by simply defining a list of them in the API request body.

 The API accepts a list of pairs of Records with values.
 
 Because multiple Data Fields can have the same name but different IDs, ID is mandatory to disambiguate where exactly data should be inserted.
