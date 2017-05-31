---
layout: twoColumn
section: "HAT Service Provider (HSP)"
type: article
title:  "Security Requirement Best Practice"
description: "Security Requirement Best Practice"
---

# Security Requirement Best Practice
Here we provide a best practice from HATDeX (A HAT Service Provider), with details of how HATDeX provides its solution to meet minimum recommended best practice.

# HAT Provisioning Security Checklist 

## Encryption

### What encryption standards are used when storing data at rest

Data at rest is stored in two forms:

* Files are stored in AWS S3 Key-Value Store. 
* Data is stored in AWS Relational Data Store (RDS) Database Servers.

File storage is configured with server-side encryption using AES-256 encryption. Storage policy enforces any file uploaded into the storage to be encrypted.

Data in RDS Servers is stored in isolated databases for each user, encrypted at rest using AES-256. All logs, backups and snapshots for a Database Server are encrypted. Database Servers' stand-by replicas maintained for reliability are also encrypted.

### What encryption standards are used for data in transit

HAT infrastructure uses industry-standard tiered network setup, segregated into three areas:

- A public subnet reachable from the outside Internet. All communication is encrypted using SSL (HTTPS). Any unsecure connections are redirected to HTTPS endpoints. AWS Elastic Load Balancer (ELB) with application (HTTPS) level SSL is configured for load balancing and encrypted connection termination. 
- A private subnet where (HAT) Application Servers run, only reachable from inside the public subnet using a limited set of ports (all denied by default, selected ones open) - managed using a combination of explicit routing rules and firewall settings. Communication between the public subnet and the application servers is not encrypted, however it is isolated from the outside and only communication between the SSL-terminating Load Balancers and Application Servers is enabled.
- A database subnet where database servers are placed, only reachable from inside the private subnet using a limited set of ports. Communication between the Application Servers and the Database Servers happens on a private, isolated network.

### Is data ever stored in an unencrypted form

Data in-use is stored in a PostgreSQL database. Such data is not encrypted client-side and is stored in its original form. Data may be cached by a HAT Application Server or a cluster-internal cache server in-memory for a short amount of time to enhance performance.	

## Password Policy

### Define what password strength policy is

The HAT uses a *zxcvbn*-based password strength policy (published in USENIX Security'16 - https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/wheeler). *zxcvbn* is a password strength estimator inspired by password crackers. Through pattern matching and conservative estimation, it recognises and weighs 30,000 common passwords, common names and surnames according to US census data, popular English words from Wikipedia and US television and movies, and other common patterns such as dates, repeats (aaa), sequences (abcd), keyboard patterns (qwertyuiop), and l33t speak.

The policy builds on a computational password complexity score instead of rules like "passwords must contain three of {lower, upper, numbers, symbols}" for a more secure alternative. It allows many password styles to flourish so long as it detects sufficient complexity – passphrases are rated highly given enough uncommon words, keyboard patterns are ranked based on length and number of turns, and capitalisation adds more complexity when it's unpredictable.

Specifically, the HAT is configured to require the estimated number of guesses to find the password to be at least 10^10.

### What encryption is used to secure username / password login

Passwords are only stored in their Bcrypt-hashed form. HTTPS is enforced for all operations including password-based login. Users are strongly advised not to enter their password anywhere but their personal HAT page with a valid SSL certificate. Passwords are required to be transmitted in request body or headers to avoid unintended capture in request logs.

A user password or its hash is never shared with other entities; other entities such as platform providers (for limited management operations) and data clients (for data requests) use separate credentials, configured at the time of provisioning a HAT (in the former case) or provisioned by the platform provider and with limited rights at a later stage.

## Server and Network Management

### How often are servers penetration tested

Third-party penetration testing is currently estimated to start in 3rd quarter of 2017 and to take place half-yearly or after significant changes to the infrastructure as deemed necessary.

Automated vulnerability testing is scheduled monthly on an exact replica of the deployed cluster. In AWS-based deployments, Amazon Inspector is employed for regular testing. This automatically assesses applications for vulnerabilities or deviations from best practices. Amazon Inspector includes a knowledge base of hundreds of rules mapped to common security best practices and vulnerability definitions. Examples of built-in rules include checking for remote root login being enabled, or vulnerable software versions installed. These rules are regularly updated by AWS security researchers.

The setup uses a set of third-party defined Rules Packages:

- Common Vulnerabilities and Exposures: the rules in this package help verify whether the EC2 instances in your assessment targets are exposed to common vulnerabilities and exposures (CVEs). Attacks can exploit unpatched vulnerabilities to compromise the confidentiality, integrity, or availability of your service or data. The CVE system provides a reference method for publicly known information security vulnerabilities and exposures. For more information, go to https://cve.mitre.org/.
- Centre for Internet Security (CIS) Benchmarks: the CIS Security Benchmarks program provides well-defined, un-biased and consensus-based industry best practices. Specifically, package Amazon Linux 2015.03 (CIS Benchmark for Amazon Linux 2014.09-2015.03, v1.1.0, Level 1 Profile) is used.

### How often are the servers patched

Servers are automatically patched nightly. To avoid disrupting system under load, the method for patching benefits from its automatic scaling setup:

- Every 12 hours the size of the VM cluster serving the system is increased by 50%
- Cluster monitoring tools detect when the cluster is overly provisioned (e.g. based on CPU load) and spins down a portion of the instances
- Automatic scaling is set up to spin down the oldest VM instances in the cluster
- Every new VM instance sets up full updates automatically on first launch

Recycling servers in this manner keeps all servers patched on a daily basis.

### What is the firewall policy (specify all open ports)

All virtual machines run inside a VPC (Virtual Private Cloud). No HAT API endpoints are exposed directly to the outside, but only to the load balancer. ELB runs under a separate Security Group with ports 80 and 443 (HTTP and HTTPS respectively) exposed publicly. Database server ports are standard PostgreSQL database ports (5432), however they are not exposed publicly - only to management software inside a separate security group and running inside the private tier of the network.

Port scanning is a violation of AWS TOS without explicit prior approval and is automatically detected, stopped and blocked.

DDoS attack risk is mitigated through the default defence mechanisms. AWS Shield Standard is enabled by default and provides always-on network flow monitoring which inspects incoming traffic to AWS and uses a combination of traffic signatures, anomaly algorithms and other analysis techniques to detect malicious traffic in real-time. If and when the risk of DDoS attacks increases, an advanced defence mechanism is ready to be integrated. 

### What Intrusion Detection devices are in use

Production deployments use an open sourced Host-Based Intrusion Detection System (HIDS) OSSEC: http://ossec.github.io. HIDS is integrated with automated alerting and logging to notify administrators of security events. OSSEC actively monitors all aspects of Unix system activity with file integrity monitoring, log monitoring, root check, and process monitoring.

### How are network and virtual machines segregated

Building on top of AWS Xen hypervisor based virtualisation solutions and the Virtual Private Cloud network virtualisation environment, all application servers run inside separate Docker containers, isolating them from each other. Multiple Docker containers may be scheduled to run on a single Virtual Machine (VM), however VMs isolate all resources used by the application server from other cloud tenants. VMs have no control over which containers they host and containers can be moved from one VM to another in response to changes in load and resource availability.

VMs are never accessed by administrative staff directly (SSH login is disabled) and are instead orchestrated through daemon applications installed to the VMs at launch:

- Application Software container orchestration tools (AWS ECS) - all interactions are recorded in centralised system logs
- Systems Manager if any remote shell command execution is required - disabled by default; if enabled, all interactions are recorded and alerts generated

Database Servers (PostgreSQL) run separately, with one Database Server per VM instance and multiple databases running on the same Database Server. Each HAT maintains their data in a separate, isolated database instance with no data shared across multiple databases directly.

## Antivirus

### What Antivirus solution is in place

All Application Software runs in isolated Docker containers; it executes no user-submitted data, and does not process any of the files handled by the file storage functions. Instead, any files are stored in AWS S3 acting as a "dumb" filestore, isolated from the Application Software and never executing the file contents. Therefore, a separate Antivirus solution is not deemed necessary.

### How often are the antivirus signatures updated

Antivirus solution is not employed as no user content is executed or executable.

# Data Protection/Information Security

## Data Protection Act 

### Please confirm that your organisation has Data Protection Registration to cover the purposes of analysis and for the classes of data requested

The HAT infrastructure does not grant any accessibility to the data stored in the HAT to the provisioning service provider, in this case – HATDeX. HATDeX is registered with the ICO with the purpose of provisioning and hosting HAT only.

Accessibility to the HAT data for this research project is only applicable to the research team at Warwick University.

### Please describe the content of any Data Protection training provided to your staff; how regularly it is provided and updated, and to whom it is provided

Staff do not have access to personal data hosted within the platform.

### Who is the Data Protection Officer or Caldicott Guardian (if NHS)

FirstName Lastname (replace by the actual CIO name) is the Data Protection Officer.

## Data Audit and Access Control

### What audit logs for access and deletion of data are available

Audit logs are grouped into four categories: 

- AWS operation Audit Trail:
- Access logs against AWS S3 buckets for platform file operations:
- System-level logs against VMs running Application Servers:
- Application logs (only tracking the fact of an operation, not the contents of requests, e.g. data or passwords):
	

### How long are audit logs kept for

Audit log retention is configurable on a per-cluster basis. The default duration is 1 year, however log retention could be prolonged to 2 years, 5 years or indefinitely.

### What data erasure /data retention policies and procedures are in place

Customers can choose to delete data they have uploaded at any point by choosing to delete their account. The account deletion operation deletes the corresponding user's database with all data that has been uploaded. The data is only retained in encrypted backups for a reasonable amount of time to allow for recovery in case of unintentional data erasure or system failure.


### What information security and audit measures have been implemented to secure access to, and limit use of information within your organisation

By default, the organisation does not have access to user data and the audit logs defined above to ensure that any intended or unintended access for both privileged and unprivileged users is logged and reported. The system contains implementation of automated rule checking for audit logs being enabled, disabled SSH access to production systems and minimum scope access for required users. Deployment procedures are periodically reviewed and validated by an independent party (HAT Community Foundation).

## Data Security

### What physical security arrangements are in place where this data is to be processed and stored

The provided system is based on a cloud hosting solution. As such, we do not have access to, or control over physical security arrangements. Nevertheless, security arrangements implemented by the hosting provider include:

Physical security controls include but are not limited to perimeter controls such as fencing, walls, security staff, video surveillance, intrusion detection systems and other electronic means. The AWS SOC reports provides additional details on the specific control activities executed by AWS. Refer to ISO 27001 standards; Annex A, domain 11 for further information. AWS has been validated and certified by an independent auditor to confirm alignment with ISO 27001 certification standard.

### What user privilege control is in place

Controls in place limit access to systems and data and provide that access to systems or data is restricted and monitored. In addition, customer data is and server instances are logically isolated from other customers by default. Privileged user access control is reviewed by an independent auditor (HAT Community Foundation).

### What information is shared regarding data breaches and near misses

Any potential data breach in the proposed architecture amounts to a security breach - no personal data is accessible by organisational staff without breaching system security.

### What procedures are in place for investigating security breaches

Security breaches are expected to be detected through a combination of the different logs collected. Alarms generated on any potential breaches are sent to multiple independent administrative accounts using different communication channels for investigation. In case a breach is detected after an investigation, the individuals potentially affected, as well as the overseeing independent organisation, are notified.

# Business Continuity

## What continuity plans are in place to cover loss of staff resource and expertise

The organisational structure provides a framework for planning, executing and controlling business operations. The organisational structure assigns roles and responsibilities to provide for adequate staffing, efficiency of operations, and the segregation of duties. Management has also established authority and appropriate lines of reporting for key personnel. Included as part of the company’s hiring verification processes are education, previous employment, and, in some cases, background checks as permitted by law and regulation for employees commensurate with the employee’s position and level of access to the infrastructure. The Company follows a structured on-boarding process to familiarise new employees with relevant tools, processes, systems, policies and procedures.

## What continuity plans are in place in the event of loss of, or severe disruption to/loss of premises

The HAT technology solution in this case is designed to be fully hosted at AWS infrastructure. Hence the AWS continuity plan is inherited.

AWS Business Continuity Policies and Plans have been developed and tested in alignment with ISO 27001 standards. Refer to ISO 27001 standard, annex A domain 17 for further details on AWS and business continuity. Data centres are built in clusters in various global regions. AWS provides customers the flexibility to place instances and store data within multiple geographic regions as well as across multiple Availability Zones within each region. Customers should architect their AWS usage to take advantage of multiple regions and Availability Zones.

## When was the business continuity/disaster recovery plan last tested

The HAT technology solution in this case is designed to be fully hosted at AWS infrastructure. Hence the AWS continuity plan is inherited.

AWS backup and redundancy mechanisms have been developed and tested in alignment with ISO 27001 standards. Refer to ISO 27001 standard, annex A domain 12 and the AWS SOC 2 report for additional information on AWS backup and redundancy mechanisms.

## What data back-up procedure is in place and encryption

All compute, storage and database resources are located within a single configured geographic region and distributed across multiple "Availability Zones" (independent failure zones) for resilience. Partial outages on the part of the cloud provider are handled automatically and transparently through a combination of load-balancers, automatic scaling and "hot standby" resources. In case of a failure, automated processes move data and traffic away from the affected area. Infrastructure blueprints for major outage recovery are managed via a version-control system and all data is backed up in resilient storage, with backups kept for 7 days. All data at rest as well as backups are kept in the same geographic region and encrypted. All current deployments are located within the EU.

## What are the recovery timescales

Recovery and scaling is virtually instantaneous in case of partial underlying infrastructure failures, transparent to the users and done without technical staff involvement. Using infrastructure blueprints major outages can be recovered from within hours of the underlying infrastructure becoming available.

# Additional Data Protection Terms

## If you are being asked to respond to deliver or potentially deliver a hosted service, please state whether this is physical or Cloud provision?

Cloud

## Physically, where is the data kept. Is it ever located outside of the UK / EU?  - INFORMATION ONLY

Data held within the infrastructure is never transferred outside the designated region - currently EU only, as detailed above. Further guarantees are dependent on the underlying infrastructure provider's compliance with the agreement of not moving data outside the designated region:

AWS customers designate in which physical region their data and their servers will be located. AWS will not move customers' content from the selected Regions without notifying the customer, unless required to comply with the law or requests of governmental entities.
