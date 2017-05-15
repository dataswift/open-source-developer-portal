---
layout: twoColumn
section: home
type: home-tools
title:  "HAT Core"
description: "HAT Core"
---

# HAT Core
The most up to date stable version of HAT core is [HAT 2.0](https://github.com/Hub-of-all-Things/HAT2.0)

In the current architecture, [cloudformation](https://aws.amazon.com/cloudformation/) is used to manage all HATs and their databases running as separate, isolated [Docker](https://docker.com) containers across a number of Elastic Compute Cloud [EC2](https://aws.amazon.com/ec2) instances. Each HAT communicates with the outside world via [APIs](https://en.wikipedia.org/wiki/Application_programming_interface) and can be accessed by the owner and authorized applications from the outside world, including Rumpel interface. HAT data is persisted in encrypted Elastic Block Store [EBS](https://aws.amazon.com/ebs) units and backed up using EBS Snapshots, to make sure individuals' data is not lost even in the case of outages.

Currently available Data Plugs are run using a separate set of cloud resources, managed by [http://hubofallthings.com](http://hubofallthings.com) using the same orchestration tools and similar infrastructure. Further Data Plugs, developed by third-parties can be hosted separately and talk to individual HATs via the provided APIs.

Each database contains a data [schema](https://github.com/Hub-of-all-Things/hat-database-schema), allowing for storing any individual's data from any source without loosing the structure specific to the source, at the same time allowing the individual to relate their data to the context of their personal life and provide a common semantic structure for third parties to use such data.
