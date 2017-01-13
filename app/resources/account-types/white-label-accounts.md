---
layout: twoColumn
section: Account types
type: article
title:  "White Label accounts"
weight: 1
description: "Getting started with Dwolla's bank transfer API."
---

# Account types

## White Label Customer accounts

A White Label Customer account is created programmatically by a Partner’s Traditional CIP Verified account via the endpoint “Create New Customer”. All required account information will be handled through the API and the White Label Customer will interact directly with the Traditional CIP Verified account to manage their account.

##### White Label Verified Customer

This third-party-created account requires the same user profile data as a Traditional CIP Verified account. A White Label Verified Customer account is required when the Partner’s end user needs to hold a Dwolla balance or transact with an unverified account type. Types of Verified Customers include: Personal or Business. 

##### White Label Unverified Customer

A White Label unverified Customer is a third-party-created account that requires a minimal amount of account data: first name, last name, email address, and IP address. **Note:** Unverified Customer accounts have a sending transaction limit of $5000 per week. A week is defined as Monday to Sunday.