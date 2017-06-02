---
layout: twoColumn
section: "Knowing the Ecosystem"
type: article
title: HATDeX
description: HATDeX
---

# HATDeX

HATDeX is the operational arm of the HAT Platform and the organisation behind the clearing and settlement of data transactions and exchanges between HATs, HAT Providers, and HAT Applications. It implements the HAT standard for the fair trade of data between individuals and organisations through the automated, real-time, and consent-based Data Debit mechanism. It logs all activities in the HAT ecosystem, responds to HAT requests to create Data Debits, installs Data Plugs, holds data transactions, verifies exchanges, and quickly, accurately and securely sends and receives data between parties. It reports ecosystem statistics as well as integrating datasets and dataKey services for third parties into the system. HATDeX operates 3 main technologies: HAT technology, DEX technology, and the Milliner service.

## About HATDeX

HATDeX is the operational arm of the HAT Foundation and the organisation behind the clearing and settlement of data transactions and exchanges between HATs, HAT Providers, and HAT Applications. It implements the HAT standard for the fair trade of data between individuals and organisations through the automated, real-time, on-demand and consent-based Data Debit mechanism. It logs all activities in the HAT ecosystem, responds to HAT requests to create Data Debits, installs Data Plugs, holds data transactions, verifies exchanges, and quickly, accurately and securely sends and receives data between parties. It reports ecosystem statistics as well as integrating datasets and dataKey services for third parties into the system. HATDeX operates 3 main technologies – HAT technology, DEX technology, and the Milliner service.

## DEX Technology

The DEX (data exchange) service of HATDeX consists of: 

* Financial clearance for entities within the ecosystem, including accounts, billing and payment UI. 
* Data Exchange processes and statistics, including HAT Access Control, Data Debit Control, Data Transaction Logging, and statistics across the ecosystem. Those processes log all activities in the HAT ecosystem, respond to HAT requests to create Data Debits, install Data Plugs, hold data transactions, verify exchanges and quickly, accurately and securely send and receive data between parties. It reports the ecosystem statistics as well as integrating datasets and data services for third parties into the system. 
* Trading Platform Service (details of which are in the Application's Trading Platform Capability section of this document).

## HAT's core technology

HAT's core technology includes a number of key functions enabling the collection and exchange of personal information, including: 

### Inbound APIs 
Inbound APIs for Data Plugs, allowing them to store data into a HAT PMDA. The inbound API further informs the HAT Contextual API, and then produces an availability of data for offers. If a user decides to expose the availability of data for offers, a matching service can be enabled to provide offers, which match to the exposed preferences. 

### Outbound APIs
Outbound APIs allow applications to send data out from a HAT PMDA. Outbound APIs lead to the 'Data Debit' management of a HAT. Data Debits are the name for the transaction that occurs as a result of the acceptance of a Data Offer by a user. 

### HAT2HAT Service
The direct exchange of data between two hats via an outbound API will form HAT2HAT services, for example, private HAT chat. 

### Push Notification
Outbound APIs will also enable push notifications for data exchange. 

### Logs
Access logging, allows for the tracking of accessibility to a HAT. 

### Contextual APIs. 
Instead of accessing raw data from a HAT, contextual APIs may offer higher level APIs which enable app developers to obtain direct intelligence from a user. For example, instead of exposing all calendar events for a given day, a contextual API could offer "free slots", or "level of busyness".

The above service is open sourced and HATDeX builds on baseline HAT technology for behalf of all HAT users.

## Milliner Service

The Milliner service gives onboarding capability to HSPs for HAT onboarding. It enables an application to provision HATs at a designated hosting infrastructure with a turnkey solution.

