---
layout: twoColumn
section: Account types
type: article
title:  "Traditional accounts"
weight: 0
description: "Getting started with Dwolla's bank transfer API."
---

# Account types

## Traditional accounts

A Traditional account can be established prior to interacting with your application by signing up on dwolla.com, or can be created directly inline with the capture of the user's permission via Dwolla’s OAuth flow. In both of these cases, Dwolla facilitates the onboarding process and (if necessary) additional identity verification.

##### Traditional CIP Verified

A Traditional CIP Verified Dwolla account maintains full access to the Dwolla platform and is able to transact with any account type. Since this account type requires additional identity vetting by Dwolla, users need to provide standard Know Your Customer (KYC) information: name, date of birth, address, and last four digits of SSN. In addition to the above, a commercial account will need to provide business name, address, and EIN. For Access API integrations, the Partner will need a Traditional CIP Verified account in order to create Customers.

##### Dwolla Direct

A Direct account is a lightweight account that maintains partial platform capabilities. This type of account requires only a username and password with no added CIP verification steps. Since identity vetting is not required, a Direct account may only transact with a Traditional CIP Verified account. **Note:** Dwolla Direct accounts have a default sending transaction limit of $5000 per week. A week is defined as Monday to Sunday.