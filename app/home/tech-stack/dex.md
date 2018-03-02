---
layout: twoColumn
section: home
type: "Technology Stack"
title: DEX - the Exchange
description: "DEX"
weight: 6
---

# DEX

- Enables the sharing of data points between HATs and organisations with/without PII (Personal Identity Identifiers) as API, individually or in bundles
- Data Transaction Logging
- Reports statistics across the ecosystem
- HAT Access brokering for applications and developers
- (Equivalent to swift in banking)

The DEX (Data Exchange) service of HATDeX logs all activities in the HAT ecosystem, responds to HAT requests to create Data Debits, installs Data Plugs, holds data transactions, verifies exchanges and quickly, accurately and securely sends and receives data between parties.

DEX is the trust anchor in the ecosystem, providing authoritative information about approved applications and their data access rules, ranging from DataPlugs for data acquisition to tools improving value of personal data (e.g. note taking and sharing on social media), to complete custom personal data container management.

DEX provides APIs for HATs to call on for verifying trustworthiness of entities interacting in the distributed network as well as for trusted parties to orchestrate their interactions with HATs, such as Data Offer requests and unified data acquisition tooling.

As part of DEX service, HATDeX provides API wrapper libraries (https://github.com/Hub-of-all-Things/dex-client-scala-play) and standalone microservices (https://github.com/Hub-of-all-Things/DEXter) for scalable data acquisition across the distributed ecosystem.

For Data Acquirers, the DEX reports the ecosystem statistics as well as integrating datasets and data services for third parties into the system. It provides high-level, aggregated information about all available data, which can be used independently or is integrated within DataBuyer Offer Management interface. 

The core aspects are statistics logging and reporting, data plug management, Data Offer brokering and setup, and new HAT onboarding.

