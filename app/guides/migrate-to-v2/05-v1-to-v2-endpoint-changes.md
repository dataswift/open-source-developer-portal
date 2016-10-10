---
layout: twoColumn
section: guides
type: guide
guide: 
    name: migrate-to-v2
    step: '5'
title: Migrate to v2
description: Underlying principles of Dwolla's v2 API and guidance on upgrading your application from Dwolla's legacy v1 API. 
---

# Migrate to v2

## v1 to v2 endpoint changes

The table below provides a mapping of endpoints in v1 to their equivalent in v2. Links to the v2 API reference docs are provided alongside each method. Not all v2 endpoints are listed, therefore you’ll want to reference the API docs for new functionality such as [Customers](https://docsv2.dwolla.com/#customers) and [Webhook-Subscriptions](https://docsv2.dwolla.com/#webhook-subscriptions).  

| v1 name/link | v1 Endpoint (https://www.dwolla.com/oauth/rest) | v2 name/link | v2 Endpoint (https://api.dwolla.com) | Description |
|-----------|----------|----------------|-------------|----------------------|
| [Catalog](https://docs.dwolla.com/#catalog) | /catalog | [Root](https://docsv2.dwolla.com/#root) | / | Fetch a list of resources available to the user account. Entry point to the API. |
| [Send Money](https://docs.dwolla.com/#send-money) | /transactions/send | [Transfers - Initiate a transfer](https://docsv2.dwolla.com/#initiate-a-transfer) | /transfers | Send money from the authorized user to an email address or another Dwolla account. **Not supported:** Notes cannot be attached to transactions. Phone is not a supported destination type. FiSync is not currently a supported processing type. **New:** A Dwolla PIN is no longer needed to send money. |
| [Checkouts - Create a Checkout](https://docs.dwolla.com/#create-a-checkout) | /offsitegateway/checkouts | N/A | N/A | Off-site gateway is not currently supported in API v2. Your application must continue to leverage v1 until further notice. |
| [Funding Sources - List Funding Sources](https://docs.dwolla.com/#list-funding-sources) | /fundingsources/ | [Accounts - List funding sources for an account](https://docsv2.dwolla.com/#list-funding-sources-for-an-account) | /accounts/{id}/funding-sources | List funding sources attached to a Dwolla account. |
| [Funding Sources - Get a Funding Source](https://docs.dwolla.com/#get-a-funding-source) | /fundingsources/{id} | [Funding sources - Retrieve a funding source](https://docsv2.dwolla.com/#retrieve-a-funding-source) | /funding-sources/{id} | Retrieve a funding source(either Bank Account or Dwolla balance) attached to a Dwolla account. |
| [Funding Sources - Withdraw to a funding source](https://docs.dwolla.com/#withdraw-to-a-funding-source) | /fundingsources/{id}/withdraw | [Transfers - Initiate a transfer](https://docsv2.dwolla.com/#initiate-a-transfer) | /transfers | Transfer money from a Dwolla balance to the bank of an authorized user. **New:** A Dwolla PIN is no longer needed to transfer funds. Webhooks are sent when moving money out of a balance. |
| [Funding Sources - Add money from a Funding Source](https://docs.dwolla.com/#add-money-from-a-funding-source) | /fundingsources/{id}/deposit | [Transfers - Initiate a transfer](https://docsv2.dwolla.com/#initiate-a-transfer) | /transfers | Transfer money from a bank to the Dwolla balance of an authorized user. **New:** A Dwolla PIN is no longer needed to transfer funds. Webhooks are sent when moving money into a balance. |
| [Funding Sources - Add new Funding Source](https://docs.dwolla.com/#add-new-funding-source) | /fundingsources/ | [Accounts - Create a funding source for an account](https://docsv2.dwolla.com/#create-a-funding-source-for-an-account) | /funding-sources | Attach a bank to a Dwolla account. The funding source will be added as unverified within Dwolla and will need to be verified before it’s eligible to send. **New:** A webhook is sent when a funding source is added. |
| [Funding Sources - Verify a Funding Sources](https://docs.dwolla.com/#verify-a-funding-source) | fundingsources/{id}/verify | Funding sources - [Initiate micro-deposits & Verify micro-deposits](https://docsv2.dwolla.com/#initiate-micro-deposits) | /funding-sources/{id}/micro-deposits | Verify micro-deposits initiated to a funding source belonging to an account. **New:** Webhooks are sent through the micro-deposit verification process. |
| [Transactions - List a user’s transactions](https://docs.dwolla.com/#list-a-user39s-transactions) | /transactions | [Accounts - List and search transfers for an account](https://docsv2.dwolla.com/#list-and-search-transfers-for-an-account) | /accounts/{id}/transfers | List all transactions for a Dwolla account. **Not supported:** Transaction types(money_sent, fee, withdraw, etc.) aren’t returned on transactions. |
| [Transactions - List an app’s transactions](https://docs.dwolla.com/#list-an-app39s-transactions) | /transactions | N/A | N/A | **Not supported:** V2 does not have a method that allows an application to view transactions facilitated by the app itself. |
| [Transactions - Get a specific transaction](https://docs.dwolla.com/#get-a-specific-transaction) | /transactions/{id} | [Transfers - Retrieve a transfer](https://docsv2.dwolla.com/#retrieve-a-transfer) | /transfers/{id} | Retrieve a transfer belonging to the authorized user. **Not supported:** Transaction type is not returned on the transfer. Expected clearing date is no longer returned for bank transfers. Source and destination names are no longer displayed on the transfer object. |
| [Transactions - Search transactions](https://docs.dwolla.com/#search-transactions) | /transactions/search | [Accounts - List and search transfers for an account](https://docsv2.dwolla.com/#list-and-search-transfers-for-an-account) | /accounts/{id}/transfers | Search transactions for the authorized user. **New:** Transaction search is included on the List Transfers for an Account endpoint. Same request params supported on v2 as v1. |


<nav class="pager-nav">
    <a href="04-sdk-support.html">Back: SDK support</a>
    <a href="06-faq.html">Next step: FAQ</a>
</nav>
