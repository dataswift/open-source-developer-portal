---
layout: twoColumn
section: guides
type: Provisioning
guide: 
    name: provisioning
    step: 04-out-of-the-box
title: HATs out of the box
description: HAT provisioning out of the box with Milliner
---

The guide illustrated the ease of provisioning HATs in a secure environment and with individual databases for each user. In particular, HATs for testing purposes can be created as required using the customisable [Milliner frontend](https://hubat.net) interface in addition to the commercially available ones via [HATTERS](https://hatters.hubofallthings.com):

[https://hubat.net](https://hubat.net)

You just need to use `HUBAT` as your invitation code!

## Milliner Architecture

Milliner provisions HAT infrastructure based on industry's best practices. Currently its tooling is focused on the Amazon AWS capabilities as the most advanced ones in the industry, however it could be adapted to different cloud providers with necessary features.

![infrastructure-overview](https://raw.githubusercontent.com/Hub-of-all-Things/open-source-developer-portal/master/app/images/milliner-architecture.png)

The solution consists of a set of nested templates that deploy the following:

 - A tiered VPC with public, private and database subnets, spanning an AWS region and two availability zones.
 - Security groups controlling what services can be reached and from where
 - A highly available ECS cluster deployed across two Availability Zones in an [Auto Scaling](https://aws.amazon.com/autoscaling/) group.
 - A pair of [NAT gateways](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/vpc-nat-gateway.html) (one in each zone) to handle outbound traffic.
 - Two interconnecting microservices deployed as [ECS services](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html) (HAT and Milliner).
 - A set of RDS-based databases backing the microservices 
 - An [Application Load Balancer (ALB)](https://aws.amazon.com/elasticloadbalancing/applicationloadbalancer/) to the public subnets to handle inbound traffic.
 - ALB host-based routes for each ECS service to route the inbound traffic to the correct service.
 - DNS routes set in Route53 pointing public domain names to the microservices
 - Centralized container logging with [Amazon CloudWatch Logs](http://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html).
 - CloudTrail based logging for security-related events such as role and security group changes, root account activity, as well as changes to CloudTrail settings

<nav class="pager-nav">
<a href="03-register-hat.html">Previous Step: Register HAT with DEX</a>
<a href="./">Next Step: Overview</a>
</nav>
