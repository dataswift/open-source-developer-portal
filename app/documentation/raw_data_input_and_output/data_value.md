---
layout: twoColumn
section: "Raw Data Input and Output"
type: article
title:  "Data Value"
description: "Data Value"
---

# Data Value
  JSON Values, that are simple string values, are stored in Fields. See the diagram in Raw Data Input and Output introduction above for visual explanation where a Value sits within Field, Record and Table structure.
  
### Value Structure
  
  All Value API calls contain all the information defined in Value Structure. If you want to create a new Value, you have to include all the mandatory information in the API request. Value structure is explained in the table below.

| Parameter   | Description                      | Optional/Mandatory |
|-------------|----------------------------------|--------------------|
| id          | value ID in the system           | optional           |
| dateCreated | date when the value was created  | optional           |
| lastUpdated | date when the value was updated  | optional           |
| value       | some string                      | mandatory          |
| field       | field that the value belongs to  | optional           |
| record      | record that the value belongs to | optional           |



###Creating a Value within Field and Record
   
   To create a new Value, the API request body should contain a new Value value in a form of string and it should be posted to /value endpoint. Note that values should be related to particular Fields and Records, therefore you should include Field and Record names and IDs that you want to store the new Value. Note that you can create a list of new Values by simply defining a list of them in the API request body.
