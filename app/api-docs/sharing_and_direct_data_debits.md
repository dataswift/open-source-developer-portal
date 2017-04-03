---
layout: twoColumn
section: api-docs
type: api-docs-endpoint
title:  "Sharing and Direct Data Debits"
description: "Sharing and Direct Data Debits"
---

# Sharing and Direct Data Debits

The virtualised database (or “Raw Data”) allows users to export the Data, where (potentially) separate Tables are created to match the expected Data format that an API consuming service expects. For example, if a user has cross-referenced the films they have “Liked” on Facebook to their viewing history on Netflix, then a service which wants to consume this data may expect a Table containing films that the user has Liked with a total number of times they have watched the film. To simplify this for the first phase, it is assumed that a service consuming the PDS API will be able to read the data held within the contextualised tables, and format the data appropriately within the virtualised database.

The HAT’s Direct Data Debit (D3) System work like a direct debit in a bank: we can decide exactly what Data to share, for how long, to whom such data may be exchanged, and what return may be offered in the exchange. In this way, other individuals and applications can exchange their Data/Services with us, but only if we have agreed to do so, i.e. if we enabled their Accounts. For more details about enabling/disabling Data Debit Accounts, see section “User Management” at the beginning for this document. Any Data that belongs to the User can be bundled and shared from any Collection or directly from Source Data (e.g. Facebook), either at the level of individual Properties or entire Collections of Data.


### Direct Debit Structure

All Direct Debit API calls contain all the information defined in Direct Debit Structure. If you want to propose a new Direct Debit, you have to include the mandatory information in the API request. Direct Debit structure is explained in the table below.

INSERT TABLE HERE

###Proposing Direct Data Debit
   
For a Direct Data Debit to be created, it first needs to be proposed to the user, who can then choose whether or not they would like to enable it.
   
To propose a new Direct Debit, the API request body should contain all the mandatory information explained in the table above. The API request should then be posted to /dataDebit/propose endpoint.

### Enabling/Disabling Direct Debit Requests
    
Consider a situation where you, owner of the HAT, receive a request from Direct Debit to read some of your Data. You can either enable or disable that request. To do this, you should make an API request using PUT to /directDebit/UUID/enable or /directDebit/UUID/disable endpoint to enable or disable the request respectively. Note that the API request body should be left empty and that UUID is a Direct Debit key (see Direct Debit Structure table above).

### Retrieving Data Debit Values

If a User enables a Data Debit (see “Enabling/Disabling Direct Debit Requests” above), then individuals or applications that proposed that Data Debit to you gain access to get your Data. Alternatively, if you proposed a Direct Debit and an individual enabled it, you can retrieve the Data yourself. To do this, you need to make a GET request to /dataDebit/UUID/values endpoint.
