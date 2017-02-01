---
layout: twoColumn
section: guides
type: guide
guide: 
    name: transfer-money-between-users
    step: overview
title:  Transfer money between Customers in your application
description: Send money online between customers by utilizing our open bank transfer API.
---

# Overview: Transfer money between your users

The most common scenario for this guide is to facilitate marketplace or peer-to-peer transfers between your customers. This guide only outlines the steps involved using Dwolla's white label solution.

In this guide, we’ll cover the key points of transferring money:

 - Create a `Verified Customer` who will receive the transfer
 - Create an `Unverified Customer` who will send the transfer
 - Associate a verified funding source (bank or credit union account) with the  sender
 - Associate an unverified funding source (bank or credit union account) with  recipient
 - Transfer funds from the sender’s funding source to the recipient’s funding  source


### Get set up with Sandbox accounts

Before you begin, be sure your [Sandbox accounts](/guides/sandbox-setup) are already set up. 

### Verified and unverified Customers
Here are some rules to keep in mind:

1. With a transfer of money, at least one party must complete the [identity verification process](/resources/customer-verification.html), either the sender or the receiver. It’s your decision about which party completes this process, based on your business model, and you may want to have both parties complete the identity verification process.
2. The sender must have a verified funding source. Unverified funding sources can only receive money, not send.

In this guide, we’ll create two Customers: one to represent a seller and one to represent a buyer. In this scenario, the seller, Jane Merchant, is a `Verified Customer` with an unverified funding source. The buyer, Joe Buyer, is an `Unverified Customer` with a verified funding source.

Please note: This is a suggested approach and there are other ways you can implement your marketplace transfers. For instance, both the sender and the receiver (or buyer and seller) could be `Verified Customers`, and both could have verified funding sources. Or, you could have the sender undergo identity verification but not the recipient.  

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="01-access-token.html">Next step: Generate an access token</a>
</nav>
