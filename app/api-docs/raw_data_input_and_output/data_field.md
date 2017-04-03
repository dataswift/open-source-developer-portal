---
layout: twoColumn
section: raw_data_input_and_output
type: access-api-article
title:  "Funding source verification"
description: "Programmatically verify a bank to initiate a bank transfer."
---

# Data Field
As showed in the diagram in Raw Data Input and Output introduction above, Data Field is equivalent to Table column. Data Field belongs to a Table and corresponds to JSON Property which holds a Value.
  
### Field Structure
  
All Field API calls contain all the information defined in Field Structure. If you want to create a new Field, you have to include all the mandatory information in the API request. Field structure is explained in the table below.

| Parameter   | Description                               | Optional/Mandatory |
|-------------|-------------------------------------------|--------------------|
| id          | field ID in the system                    | optional           |
| dateCreated | date when the field was created           | optional           |
| lastUpdated | date when the field was updated           | optional           |
| tabeled     | ID of the table that the field belongs to | optional           |
| name        | name of the field                         | mandaotry          |
| values      | data values that the field contains       | optional           |

