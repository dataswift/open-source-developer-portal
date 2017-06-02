---
layout: twoColumn
section: "Knowing the Ecosystem"
type: article
title: HAT Applications
description: "HAT Applications"
---

# Hat Application

HAT Applications provide web applications and services directly to users, functioning like ‘normal’ applications except that the user account for a HAT Application is a HAT PMDA ([Private 'Microserver' Data Account](https://www.hatdex.org/digital-dependency/)). Within the HAT Ecosystem, a HAT user owns their HAT and is the sole party with login permission to their PMDA. Only they can view and interact with the data stored there, only they can manage their incoming data (through Data Plugs) or create new data (through the use of HAT Applications), and only they can control their PMDA’s data exchanges. HAT Applications often provide applications with their own brand and use cases with which the user can interface with the HAT and conduct all of these activities.

## About HAT Apps

HAT Applications provide web applications and services directly to users, functioning like ‘normal’ applications except that the user account for a HAT Application is a HAT PMDA (Private ‘Microserver’ Data Account). Within the HAT Ecosystem, a HAT user owns their HAT and is the sole party with login permission to their PMDA. Only they can view and interact with the data stored there, only they can manage their incoming data (through Data Plugs) or create new data (through the use of HAT Applications), and only they can control their PMDA’s data exchanges. HAT Applications often provide branded applications with which the user can interface with the HAT and conduct all of these activities.


## Core HAT App Functionalities
All HAT Applications could have up to 4 ‘core' HAT functionalities:

### HAT Single Sign-on. 
Single-provision “login with the HAT” functionality that that allows HAT users to share certain data (e.g. name, email address) with the application. 

### HAT PMDA Provisioning.
Creation and deployment of a HAT PMDA for the user on the HAT application’s own infrastructure, to replace the normal user account of the application. This makes the HAT Application a HAT Service Provider (HSP). As a HAT Service Provider, applications provision HATs to their customers under their own brand. Certified HAT Service Providers are allocated a volume of HAT addresses, all of which are certified to operate within the ecosystem, and fully interoperable with other HATs. HAT Service Providers are required to provide a dashboard service for their customers, or use the standard Rumpel dashboard. HATDeX’s “Milliner” cloud provisioning service is available upon request through a simple API request. 

### HAT Trading Platform Capability. 
The HATDeX Trading Platform Service offers opportunities for HAT Applications to create online marketplaces in which users’ data can be exchanged for personalised goods and services. By having a Trading Platform Capability, the application can build a two-sided market application: merchants may sign up as a vendor on the platform (merchant onboarding), and publish an exchange or ‘Data Offer’ which offers goods or services in exchange for users’ data within the Trading Platform. HAT users may sign on to the Trading Platform to browse and manage the offers included in the service. Agreed Data Offers establish a Data Debit between the vendor and the HAT user, specifying the parties involved, the purpose of the exchange, the length of the exchange contract, and the data required for the transaction. Such a capability can be used for health data matched with nutrition, location data matched with offers of coffee etc. all done in a privacy preserving way where HAT users may not even need to provide their identity information.

### Personalised Services. 
Prior to the data offer’s being made available to the user, an application with a Trading Platform capability can also provide offer matching/personalisation service, a service allowing offers to be more accurately defined to target user groups by matching Data Offers to a user’s voluntary profile. For example, a Trading Platform may allow offers to target users in a specific age range. In order to maximise the users’ control over their data exposure, and to avoid unnecessary mass computation of users’ profiles, matching control and offer display sits independently from the Trading Platform, operated by the HAT, privately for its users. Trading Platform applications therefore do not have access to the entire user group that contains a matching profile. Rather, they gain visibility only over those who have decided to accept the data offer, follows the principles of privacy-by-design.

## HAT Service Provisioning

The HAT Application providers may offer HATs for HAT users directly from their apps. HAT Application providers can choose to provision HATs from their own preferred infrastructure (and become a HAT Service Provider), or buy HATs on demand from existing HAT Service Providers.

## DEX Services for Trading Platforms

DEX Services are offered by HATDeX and enable applications to become multi-sided markets to trade data between their users and other organisations. These services therefore give HAT applications a trading platform capability.

### Offer registration
HATDeX can register offers from a Trading Platform application and make registered offers available elsewhere in the ecosystem. 

### Offer status tracking 
HATDeX can report the status of Data Offers made by Trading Platform applications, including which offer has been claimed or rejected by HAT Users.

### Billing rules 
HATDeX can facilitate cross-platform billing, such as for offers onboarded from Application A, but claimed via Application B.

### Data Debit requirement registration
HATDeX can take agreed Data Offers from Data Trading Platforms, configure Data Debit on HATs, and enable the full data exchange at the HAT level.

### Data transaction stats 
HATDeX can track the meta data of a data transaction to update the status of active offers, and it can provide other statistics to trading platforms, including the tracking of offer acceptance, and data yield quantifications.

### HAT/Data Offer matching control 
HATDeX can maintain a buffer layer to support the offer matching designed by a Trading Platform Application. This control layer carries targeted user data from an offer down to a HAT, and compares the user’s profile against the availability of the HAT data for the data offer. If a match exists, the control layer can display the data offer to the HAT User.


