---
layout: twoColumn
section: user_management
type: 
title:  "Funding source verification"
description: "Programmatically verify a bank to initiate a bank transfer."
---

# Direct Data Credit and Debit Accounts

Data Credit Account can create/record Raw Data, whilst Data Debit Account can read the Data that Owner decided to share and exchange. For more detailed information about how the Direct Data Debit (D3) System works, see section “Sharing and Direct Data Debits” at the end of this document.

### Creating Accounts
    
To create a new User, the API request body should contain a new User ID, email, pass (password, which is bcrypt-hashed as application developers would request the paltform provider to create an account on their behalf) name and role. Role can be defined as dataDebit or dataCredit. The special owner and platform accounts can only be created at the time of creating a HAT and can not be added/replaced/disabled later. The API request should then be posted to /users/user endpoint.

### Enabling/Disabling Accounts
    
The owner enable or disable any Direct Debit Account. To do this, they should make an API request using PUT to /users/user/UUID/enable or /users/user/UUID/disable endpoint to enable or disable the account respectively. Note that the API request body should be left empty and that UUID is a Universally Unique Identifier used for userId.
