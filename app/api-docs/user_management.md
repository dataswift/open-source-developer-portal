---
layout: twoColumn
section: api-docs
type: api-docs-endpoints
title:  "Funding source verification"
description: "Programmatically verify a bank to initiate a bank transfer."
---

# User Managment

The HAT and its personal data ecosystem are designed to allow individual HAT Users to collect, contextualise and exchange our personal Data. The enabling technology for the HAT sits within the HAT Personal Data Platform (HATPDP, mostly referred to as “HAT”). With their Data, individuals can buy apps to analyse, view, create scenarios, trade or make important decisions based on our own Data for a smarter and more effective life. HAT is therefore a fully scalable platform that allows firms to offer individuals services for our personal data, and yet enables us as individuals to personalise that data to our own needs. Therefore, there are 4 Account roles defined within the HAT:

* Owner - a User who has access to everything within the HAT and who owns it
* Direct Data Credit (dataCredit) can create/record data, but cannot read it Raw Data, unless accessit it via a user-approved Direct Debit
* Direct Data Debit (dataDebit) can read the Data that Owner enabled for sharing and exchange through Direct Data Debits
* Platform (platform), that manages Data Credit and Debit accounts, e.g. creates then when an application developer wants an account on a user’s HAT

A HAT can be described as being analogous to an email account. As an individual HAT User, we can choose our HAT provider (also known as HPP in the HAT ecosystem) just like we choose our email account provider, and we can switch HPPs as there may be many such providers. Or, if you want to host your own HAT, your Personal HAT can be configured to sit on your private server. By signing up for a HAT with a HPP, you become Owner of your HAT and you are provided with a Universally Unique Identifier (UUID) to serve as the identification for your HAT. UUID, an identifier standard used in software construction, is simply a 128-bit value, where the meaning of each bit is defined by any of several variants. A UUID in a HAT may take a DNS (domain name service) type approach; for example, Alice’s HAT may be certified as alice.user.hubofallthings.com.

