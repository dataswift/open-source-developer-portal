---
layout: twoColumn
section: Account types
type: article
title:  "Access API accounts"
weight: 1
description: "Getting started with Dwolla's bank transfer API."
---

# Account types

## Access API Customer accounts

An Access API Customer account is created programmatically by a Partner’s Traditional CIP Verified account via the endpoint “Create New Customer”. All required account information will be handled through the API and the Customer will interact directly with the Traditional CIP Verified account to manage their account.

##### Verified Customer

This third-party-created account requires the same user profile data as a Traditional CIP Verified account. A Verified Customer account is required when the Partner’s end user needs to hold a Dwolla balance or transact with an Unverified Customer account type. Types of Verified Customers include: Personal or Business. 

##### Unverified Customer

An Unverified Customer is a third-party-created account that requires a minimal amount of account data: first name, last name, email address, and IP address. **Note:** Unverified Customer accounts have a default sending transaction limit of $5000 per week. A week is defined as Monday to Sunday.