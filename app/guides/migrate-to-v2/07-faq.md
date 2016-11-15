---
layout: twoColumn
section: guides
type: guide
guide: 
    name: migrate-to-v2
    step: '7'
title: Migrate to v2
description: Underlying principles of Dwolla's v2 API and guidance on upgrading your application from Dwolla's legacy v1 API.
---

# FAQ

1.  **Are OAuth user access tokens I used in v1 the same as the account access tokens needed for API v2?**
    - Yes! OAuth and access tokens are shared across both APIs therefore nothing will change with regards to any current user account tokens you may have stored. Make sure these access tokens contain the proper scopes to call v2 resources.
2.  **If I am currently storing a unique identifier (transaction id, funding source id, dwolla id) used in v1—can I retrieve an equivalent identifier that is used for v2?**
    - There is currently not a way to obtain unique identifiers used in v2 from ids you may have stored from API v1 (with the exception of [account id](https://docs.dwolla.com/#get-basic-account-info)). We are currently investigating a solution to return links to related resources in v2, and we’ll communicate this to the developer community if/when one is available.
3.  **How do I retrieve an 812-xxx-xxx number that is used to uniquely identify an account in v1?**
    - In v2, Dwolla Id’s are replaced with account ids that have the following format: ca32853c-48fa-40be-ae75-77b37504581b. A link to the account id will be returned if you call to retrieve [account](https://docs.dwolla.com/#get-full-account-info) details in API v1.
4.  **How can I differentiate a full Dwolla account from a Direct Dwolla account in v2?**
    - API v2 does not explicitly return the type of account when retrieving [account details](https://docsv2.dwolla.com/#retrieve-account-details). As a workaround, full Dwolla accounts will have a balance attached whereas Dwolla Direct accounts do not. You can retrieve the [list of funding sources](https://docsv2.dwolla.com/#list-funding-sources-for-an-account) for an Account to determine if a balance funding source is available for the user account.
5.  **Is a Dwolla PIN needed in order to transfer money in API v2?**
    - No—a Dwolla PIN is not required in v2 in order to send money. It’s important to keep in mind that every transaction within your application must be authorized and initiated by the user. 

<nav class="pager-nav">
    <a href="./06-other-notable-changes.html">Back: Other notable changes</a>
    <a href="" style="display:none;"></a>
</nav>
