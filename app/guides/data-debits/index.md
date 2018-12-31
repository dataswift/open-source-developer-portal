---
layout: twoColumn
section: guides
type: Data Debits for data sharing permissions
guide: 
    name: data-debits
    step: overview
title: Overview
description: Data Debits for data sharing permissions
product: hat
weight: 4
---

HAT Data Debits are the cornerstone of the permission-based data exchange platform. Since, the rights to the HAT database are fully owned by the HAT owner, any data acquisition from the database would require permission. This is not the same as consent. The HAT Data Debit process flow enforces a strictly-defined format defining the specific data requested for the user to review and approve. Once the data-sharing permissions are given, the Data Debits becomes the _only_ way data can be retrieved from the HAT by anyone other than the owner.

The general process of retrieving data using a Data Debit is:

1. Propose a Data Debit including the Data Bundle specification to a HAT
2. The HAT user sees the Data Debit as an unapproved request, reviews it and approves it. Data Debit becomes `enabled`
3. Request Data Debit values from the HAT
4. Optional: If any changes are required to the Data Debit request, submit a request to update it, go back to step 2

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="01-data-debit-proposal.html">Next Step: Data Debit Request</a>
</nav>
