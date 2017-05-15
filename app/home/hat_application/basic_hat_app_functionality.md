---
layout: twoColumn
section: "HAT Application"
type: article
title:  "Core HAT App Functionality"
description: "Core HAT App Functionality"
---


# Core HAT App Functionalities
All HAT applications could have up to 4 ‘core HAT functionalities:

### HAT Single Sign-on. 
Single-provision “login with the HAT” functionality that allows HAT users to shares certain data (e.g. name, email address) with the application. 

### HAT PMDA Provisioning.
Creation and deployment of a HAT PMDA for the user on the HAT application’s own infrastructure, to replace the normal user account of the application. This makes the HAT application a HAT Service Provider (HSP). As a HAT Service Provider, applications provision HATs to their customers under their own brand. Certified HAT Service Providers are allocated a volume of HAT addresses, all of which are certified to operate within the ecosystem, and fully interoperable with other HATs. HAT Service Providers are required to provide a dashboard service for their customers, or use the standard Rumpel dashboard. HATDeX’s “Milliner” cloud provisioning service is available upon request through a simple API request. 

### HAT Trading Platform Capability. 
The HATDeX Trading Platform Service offers opportunities for HAT Applications to create online marketplaces in which users’ data can be exchanged for personalised goods and services. By having a Trading Platform Capability, the application can build a two-sided market application: merchants may sign up as a vendor on the platform (merchant onboarding), and publish an exchange or ‘Data Offer’ which offers goods or services in exchange for users’ data within the Trading Platform. HAT users may sign on to the Trading Platform to browse and manage the offers included in the service. Agreed Data Offers establish a Data Debit between the vendor and the HAT user, specifying the parties involved, the purpose of the exchange, the length of the exchange contract, and the data required for the transaction. Such a capability can be used for health data matched with nutrition, location data matched with offers of coffee etc. all done in a privacy preserving way where HAT users may not even need to provide their identity information.

### Offer Matching. 
Prior to the data offer’s being made available to the user, an application with a Trading Platform capability can also provide offer matching/personalisation service, a service allowing offers to be more accurately defined to target user groups by matching Data Offers to a user’s voluntary profile. For example, a Trading Platform may allow offers to target users in a specific age range. In order to maximise the users’ control over their data exposure, and to avoid unnecessary mass computation of users’ profiles, matching control and offer display sits independently from the Trading Platform, operated by the HAT, privately for its users. Trading Platform applications therefore do not have access to the entire user group that contains a matching profile. Rather, they gain visibility only over those who have decided to accept the data offer, follows the principles of privacy-by-design.
