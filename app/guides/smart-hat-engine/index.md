---
layout: twoColumn
section: guides
type: Smart HAT Engine
guide: 
    name: she
    step: overview
title: What is the Smart HAT Engine (SHE)
description: What SHE is for and how it can be used
product: she
weight: 1
---

Smart HAT engine is the HATs capability to run any algorithms on data within the HAT without leaking it anywhere else. It extends the core HAT functionality to include algorithms ranging from simple summary of your data to personal AI.

Key goals for SHE are:

- Supporting algorithms written in a wide range of languages, providing flexibility in choosing the best tool for the job and limiting the need to reimplement any existing algorithms.
- Not forcing open-sourcing of the algorithms. As many organisations consider their algorithms to be the "secret sauce", they should be able to maintain their secrecy when operating within the HAT ecosystem.
- Generating more data for the person - while an organisation owns their algorithm, the person still owns all of their data.
- Providing a trusted environment that is sufficiently isolated from the core HAT to eliminate the risks of unauthorised data access.
- Preventing any personal data leakage while running potentially untrusted, closed-source algorithms.
- Elasticity in scaling - supporting large numbers of users as well as minimising resource cost when inactive, without burdening the algorithm developer.

Containerised applications appears to be the obvious choice do to the possibility of writing them in any language and having isolation guarantees. The rest can be controlled through a well defined interface between the HAT itself and the Smart HAT Engine. In SHE algorithms run in such isolated environment with no ability to communicate with the outside world, enforced through firewalls and security policies. An algorithm only runs reactively in response to a request from a HAT, processes the received data and returns results in a response. The downside of the approach is that it does not allow for accumulating data over longer periods of time (the HAT does it itself), it does not allow for aggregation of data across multiple users, and the algorithms that can be executed are limited to ones that are fixed ahead of deployment, whether traditional code or pre-trained Machine Learning models. Serverless environments (such as AWS Lambda) allow for the remaining goals of elasticity, on-demand use and ease of deployment.

Current limitation in the AWS Lambda environment is that it provides little detail and no guarantees on how a specific container instance gets reused, there are possibilities for timing-related attacks. Specifically, a common optimisation is to have some state retained in a given container (more in the sense of caching than storage as there are no guaranteed that the same container will get used), however that state can also contain data previously received from a HAT. And although interactions with a given function are driven by HATs and not functions themselves, and functions are unable to communicate with the outside world, they could respond with custom responses to a specific HAT controlled by the perpetrator. This, too, is mitigated through metadata logging, but additional controls around function scheduling and execution could eliminate the risk.

## What does it take to build a SHE algorithm

SHE functions are currently standard [AWS Lambda](https://aws.amazon.com/lambda/) functions and benefit from a wealth of information on how to build such functions.

While an over-simplification, it is not inaccurate to say that you can just drop in an algorithm you have already written or write one in any major language and framework:

- Node.js
- Java (Java 8 and other languages that are supported by the runtime - we love Scala!)
- Python
- .NET Core
- Go

Furthermore, HAT uses the industry-standard JSON protocol for handling data, therefore what your algorithm receives is simply a bundle of JSON records (sometimes called _documents_) matching your specific Data Bundle query (check the [guide on Data Bundles](/guides/building-data-plug/) for more details).

Your function needs to do 3 things:

1. Publish its [configuration](01-function-information-format) to simplify editing the details.
2. Return [Data Bundle](/guides/data-bundling) specifying what data it wants to receive, parametrised by the date range (`fromDate` and `untilDate` query parameters in ISO8601 format).
3. Accept data processing request which includes the current known configuration from the HAT and the bundle of data itself generating using the bundle received from (2)

A common recommendation is to split your algorithm details from the Lambda function handling details - it makes testing and debugging a lot simpler. You should try and develop your entire algorithm outside the HAT (the [serverless framework](https://serverless.com) includes a helpful set of tools for that), exposing the three steps above as separate API Gateway endpoints. You should be able to feed the generated Data Bundle definition into the HAT you use for development, as well as the data extracted from the HAT using the bundle into your algorithm for processing.

Everything else is the details of your own implementation!

## Limitations

AWS Lambda functions and by extension - SHE functions also have some limitations worth noting:

- You can allocate between 128MB and 3008MB of memory to the function
- It has 512MB of "emphemeral" disk storage - some for storing temporary files, but do not rely on it staying there from one invocation to the next.
- Running time is limited to 5 minutes max - you will need to manage efficiency and amount of data processed in a run.
- Maximum request size is 6MB. You will not be able to process a huge amount of an individual HAT's data in one go, but 6MB can fit a lot of JSON.
- Deployment package is no bigger than 250MB (though you can load e.g. your models externally, taking care to make sure the algorithm execution does not time out when including loading of the model)
- HAT-specific: you can not communicate with any remote networked resources, even if you have a great usecase, to limit possibilities of leaking user's data
- HAT-specific: function execution is driven by the HAT itself, you can not subscribe to other sources of Lambda events


## When SHE functions are executed

Each SHE function available in a particular HAT cluster is registered in the HAT's static configuration, which provides the ID of the function along with the version to be used, `namespace` and `endpoint` the function is allowed to publish data to and the details necessary for the HAT to know how to invoke it.

HAT internally tracks data "events" and with incoming data events it determines what functions may need to be invoked on the data. The current approach is rather straightforward: the HAT accumulates a bunch of events and checks what endpoints they were for. It then compares the set of endpoints against the functions enabled for the HAT and if there is an overlap - checks trigger details for the function. A new function execution with all data since the last execution matching the bundle is started when the trigger is either `individual` (should be run for every individual data record) or `period` and at least the specified period of time has passed since last invocation.

It is important to note that unless triggered manually via an API endpoint, functions for a HAT will not run if there is no new data coming in, generating data events which in turn trigger functions. In a completely inactive HAT, such functions would never be executed.

## How SHE functions are executed

Every time the HAT decides it needs to execute a SHE function, it performs three steps:

1. asks the function to provide it with a Data Bundle definition for the timeframe between most recent execution and _now_
2. sends the current known function configuration (including last execution time) together with the data retrieved for the bundle configuration to the function
3. saves the returned data and the time of execution

This results in the generated data becoming available for the HAT owner and other applications the same way as any other data, with no need to deal with the complexities of running algorithms, managing dependencies between components or running dedicated infrastructure.


<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="01-function-information-format.html">Function information reference</a>
</nav>
