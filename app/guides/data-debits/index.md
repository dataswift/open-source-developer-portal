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

HAT Data Debits are the cornerstone of permission-based data exchange. As all rights of the data in the HAT database belong to the HAT owner, data can only leave when the acquirer has permission to acquire it (which is why this is not the same as consent) . Data Debits are _the only_ way data can be retrieved from the HAT by anyone else than the owner and enforces a strictly-defined format defining the specific data requested for the user to review and approve.

The general process of retrieving data using a Data Debit is:

1. Propose a Data Debit including the Data Bundle specification to a HAT
2. The HAT owner sees the Data Debit as an unapproved request, reviews it and approves it. Data Debit becomes `enabled`
3. Request Data Debit values from the HAT
4. Optional: If any changes are required to the Data Debit request, submit a request to update it, go back to step 2

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="01-data-debit-proposal.html">Next Step: Data Debit Request</a>
</nav>
