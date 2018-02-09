---
layout: twoColumn
section: guides
type: Building a Data Plug
guide:
    name: building-data-plug
    step: 04-collecting-endpoint-variants
title: Collecting Endpoint Variants
description: Learn how to customise the process of collecting endpoint interfaces
# Parameters used in code examples
hat: test.hubat.net

---

Endpoint Options Collectors are used by the core plug for two purposes: (1) to check if the API resource
is accessible at any given point in time and (2) to set up a group of API endpoint interfaces for synchronisation. 
In this section, we'll see how [FacebookProfileCheck](http://github.com) option collector is put together. 

Option Collector class should extend the `DataPlugOptionsCollector` trait and implement it's abstract methods. 
As with API endpoint interfaces, `namespace`, `endpoint` and `defaultApiEndpoint` parameters need to
be supplied as well. The main purpose of  the `get` method is to construct a sequence of `ApiEndpointVariantChoice`s 
which can then be used by the core plug to run synchronisations. A very simple 
implementation would check if selected endpoint is reachable and, if true, return a static list of
API endpoint interfaces wrapped in a `ApiEndpointVariantChoice` object.

```noselect
  def get(fetchParams: ApiEndpointCall, hatAddress: String, hatClientActor: ActorRef)(implicit ec: ExecutionContext): Future[Seq[ApiEndpointVariantChoice]] = {
    authenticateRequest(fetchParams, hatAddress, refreshToken = false).flatMap { requestParams =>
      logger.info("Facebook profile check authenticated")
      buildRequest(requestParams).flatMap { response =>
        response.status match {
          case OK =>
            logger.info(s"API endpoint FacebookProfile validated for $hatAddress")
            Future.successful(staticEndpointChoices)

          case _ =>
            logger.warn(s"Could not validate FacebookProfile API endpoint $fetchParams - ${response.status}: ${response.body}")
            Future.failed(SourceDataProcessingException("Could not validate FacebookProfile API endpoint"))
        }
      }
    }.recover {
      case e =>
        logger.error(s"Failed to validate FacebookProfile API endpoint. Reason: ${e.getMessage}", e)
        throw e
    }
  }
```

Of course, this method can be customised to dynamically retrieve and configure a list of API endpoints. One example of 
such advanced use case can be found in the [Google Calendar plug](https://github.com/Hub-of-all-Things/DataPlugs/blob/master/dataplug-google-calendar/app/org/hatdex/dataplugCalendar/apiInterfaces/GoogleCalendarList.scala).

<nav class="pager-nav">
<a href="03-data-validation.html">Previous Step: Data Validation</a>
<a href="05-putting-it-together.html">Next Step: Putting It All Together</a>
</nav>
