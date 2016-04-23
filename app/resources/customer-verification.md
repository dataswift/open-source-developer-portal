---
layout: twoColumn
section: resources
type: article
title:  "Customer verification"
description: "How to verify a customer before sending a bank transfer with Dwolla's ACH API."
---

# Customer verification

This article will walk through the customer verification workflow for white label integrations. For more information about Dwolla White Label, please [contact sales](https://www.dwolla.com/contact).

A “Customer” represents an individual or business that you intend to transact with. 
In any transfer, at least one party—either the sender or the recipient—must complete the identity verification process described below. In cases where a Customer is only sending funds to or receiving funds from your full Dwolla account, the Customer is not required to complete the process set out below because you have already completed it.

First, you should have [an active webhook subscription](/guides/webhooks/).  Information about a Customer’s progress in the verification process is sent asynchronously to your application.

## Quick overview

* [Personal verified Customer](/resources/customer-verification/personal-verified-customers.html)
  * Create a verified personal Customer
  * Check the status of a the personal Customer
* [Business verified Customer](/resources/customer-verification/business-verified-customers.html)
  * Create a verified personal Customer
  * Check the status of a the personal Customer
* [Handling verification statuses](/resources/customer-verification/handling-verification-statuses.html)
  * If necessary, `retry` verification
  * If necessary, upload a `document`
  * Status of `suspended`

* * *

#### View:

*   [Personal verified Customers](/resources/customer-verification/personal-verified-customers.html)
*   [Business verified Customers](/resources/customer-verification/business-verified-customers.html)
*   [Handling verification statuses](/resources/customer-verification/handling-verification-statuses.html)