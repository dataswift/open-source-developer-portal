---
layout: twoColumn
section: home
type: Tools
title: HAT
description: HAT Core and APIs
weight: 1
---

# HAT Core

The most up to date stable version of HAT core is [HAT 2.0](https://github.com/Hub-of-all-Things/HAT2.0)

In the current architecture, [cloudformation](https://aws.amazon.com/cloudformation/) is used to manage all HATs and their databases running as separate, isolated [Docker](https://docker.com) containers across a number of Elastic Compute Cloud [EC2](https://aws.amazon.com/ec2) instances. Each HAT communicates with the outside world via [APIs](https://en.wikipedia.org/wiki/Application_programming_interface) and can be accessed by the owner and authorized applications from the outside world, including the Rumpel interface. HAT data is persisted in encrypted Elastic Block Store [EBS](https://aws.amazon.com/ebs) units and backed up using EBS Snapshots, to make sure individuals' data is not lost even in the case of outages.

Currently available Data Plugs are run using a separate set of cloud resources, managed by [http://hubofallthings.com](http://hubofallthings.com) using the same orchestration tools and similar infrastructure. Further Data Plugs, developed by third-parties can be hosted separately and talk to individual HATs via the provided APIs.

Each database contains a data [schema](https://github.com/Hub-of-all-Things/hat-database-schema), which allows the storage of any individual's data from any source without loosing the structure specific to the source, at the same time allowing the individual to relate their data to the context of their personal life and provide a common semantic structure for third parties to use such data.

# HAT APIs

HAT APIs were developed to exercise user managed control of your personal data. REST APIs for the HAT schema can be used by web, mobile and other clients to interact with the HAT, allowing the user to control their data and applications benefit from it. API documentation can be found at [the documentation section](/documentation). 

We also provide convenience wrappers [Hat Client Scala Play](https://github.com/Hub-of-all-Things/hat-client-scala-play) around HAT HTTP APIs and contains the most up-to-date set of typesafe HAT Data Models and Play-JSON based serializers and deserializers for them.

For those who would like to build an app to interact with HATs’ personal data, it is a matter of calling HAT APIs for data I/O. A [Developers' Portal](http://developers.hubofallthings.com/) is available for tools, [documentations](http://developers.hubofallthings.com/documentation/), zero-touch onboarding HATs, Apps, and other services in a sandbox environment. 

The access to data in any HAT is via Data Offers. Once a Data Offer is agreed, specified data points from a HAT will be prepared for the Data Buyer as Data Debit (all data is within one bundle of a Data Debit), and retrievable through an API endpoint on that HAT that has accepted the offer.

A development free option for organisations who don’t want to commit to any development but still want to interact with customers via HATs is available. Organisations can become a Data Buyer to shop personal data, in a similar way one would shop at Amazon.
