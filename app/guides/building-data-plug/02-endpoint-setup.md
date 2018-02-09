---
layout: twoColumn
section: guides
type: Building a Data Plug
guide:
    name: building-data-plug
    step: 02-endpoint-setup
title: Adding Endpoint Interfaces
description: Details how to correctly add a new endpoint interface that is used to pull the API data, configure pagination rules, and make sure rate limits are respected.
# Parameters used in code examples
hat: test.hubat.net

---

Core data plug implements general logic of fetching data from an API endpoint, posting it to the HAT,
tracking the status of the latest operation and setting up parameters for the next scheduled task. The synchronisation
is performed by polling the API at a configured time intervals on endpoint-by-endpoint basis. Each endpoint interface 
is represented by a class that extends the `DataPlugEndpointInterface` trait. 

For example, `FacebookFeedInterface` class:

```noselect
class FacebookFeedInterface @Inject() (
    val wsClient: WSClient,
    val userService: UserService,
    val authInfoRepository: AuthInfoRepository,
    val tokenHelper: OAuth2TokenHelper,
    val cacheApi: CacheApi,
    val mailer: Mailer,
    val scheduler: Scheduler,
    val provider: FacebookProvider) extends DataPlugEndpointInterface with RequestAuthenticatorOAuth2 {}
```

Note that the class also extends `RequestAuthenticatorOAuth2` trait which contains request authentication helper methods 
for OAuth2 standard.

`DataPlugEndpointInterface` trait mandates that certain configuration parameters and action methods are present in the class. 
Let's look at the configuration setup first.

```noselect
  val namespace: String = "facebook"
  val endpoint: String = "feed"
  val refreshInterval = 1.hour
  val defaultApiEndpoint = FacebookFeedInterface.defaultApiEndpoint
```

The `namespace` and `endpoint` parameters indicate where the information obtained from the API, should be stored
on the HAT. The data synced by the example setup above will be available at `/api/v2/data/facebook/feed` path on the owner's 
HAT. Note that, due to HAT's namespacing rules, the `namespace` parameter must MATCH data plug's registration name.

Refresh interval indicates how often API polling should be performed for that particular endpoint. Keep in mind, that if there
are two separate endpoints in the data plug, one polling every 60 minutes and the other polling every 30 minutes, the plug will
make 3 requests/hour in total. Keep that in mind, when configuring the service to respect the rate limits of the API.

Finally, the default API endpoint for fetching data needs to be provided - it is usually placed in the accompanying object and
contains all of the information needed for the initial API fetch.

```noselect
object FacebookFeedInterface {
  val defaultApiEndpoint = ApiEndpointCall(
    "https://graph.facebook.com/v2.10",
    "/me/feed",
    ApiEndpointMethod.Get("Get"),
    Map(),
    Map("limit" -> "500", "format" -> "json", "fields" -> ("id,admin_creator,application,call_to_action,caption,created_time,description," +
      "feed_targeting,from,icon,is_hidden,is_published,link,message,message_tags,name,object_id,picture,place," +
      "privacy,properties,shares,source,status_type,story,targeting,to,type,updated_time,with_tags,full_picture")),
    Map(),
    Some(Map()))
}
```

Default API endpoint is constructed as an instance of the `ApiEndpointCall` case class. In the example above,
the base url of the service, path to a particular endpoint, request method (`GET`), and a list of query parameters
are all specified in the the object. The supplied object is only used in the initial data fetch - every 
successful API call will create an updated version of the `ApiEndpointCall`, save it in the database and use it to infer 
the latest state of synchronisation. In the case of Facebook feed, `since` and `after` query parameters are added dynamically 
to control the time interval of posts requested in the subsequent synchronisation rounds.

In order to be able to correctly evolve the state of the next `ApiEndpointCall` object, each interface needs to
implement two custom methods: `buildContinuation` and `buildNextSync`. Both methods receive the response body 
content of the API call and an `ApiEndpointCall` object used to make that call. The `buildContinuation` method is
always called first. Within this method the plug author needs to evaluate the API response and determine whether
the synchronisation round can be finished or further requests are needed to paginate over more data. In the former case 
`None` object should be returned and in the latter case a `ApiEndpointCall` object modified in a way that takes into 
account pagination parameters. Pagination requests will loop until eventually `None` object is returned by the continuation 
method. Next, `buildNextSync` method will be invoked. Here, various call parameters can be cleaned up and adjusted for 
the next synchronisation cycle. The method must return a valid `ApiEndpointCall` object to persist in the database and 
once it's finished the round can considered as finished.

The implementation of these methods for `FacebookFeedInterface` looks like this:

```noselect
def buildContinuation(content: JsValue, params: ApiEndpointCall): Option[ApiEndpointCall] = {
    val maybeNextPage = (content \ "paging" \ "next").asOpt[String]
    val maybeSinceParam = params.pathParameters.get("since")

    maybeNextPage.map { nextPage =>
      val nextPageUri = Uri(nextPage)
      val updatedQueryParams = params.queryParameters ++ nextPageUri.query().toMap

      if (maybeSinceParam.isDefined) {
        params.copy(queryParameters = updatedQueryParams)
      }
      else {
        (content \ "paging" \ "previous").asOpt[String].flatMap { previousPage =>
          val previousPageUri = Uri(previousPage)
          previousPageUri.query().get("since").map { sinceParam =>
            val updatedPathParams = params.pathParameters + ("since" -> sinceParam)

            params.copy(pathParameters = updatedPathParams, queryParameters = updatedQueryParams)
          }
        }.getOrElse {
          params.copy(queryParameters = updatedQueryParams)
        }
      }
    }
  }

  def buildNextSync(content: JsValue, params: ApiEndpointCall): ApiEndpointCall = {
    val maybeSinceParam = params.pathParameters.get("since")
    val updatedQueryParams = params.queryParameters - "__paging_token" - "until" - "access_token"

    maybeSinceParam.map { sinceParam =>
      params.copy(pathParameters = params.pathParameters - "since", queryParameters = updatedQueryParams + ("since" -> sinceParam))
    }.getOrElse {
      val maybePreviousPage = (content \ "paging" \ "previous").asOpt[String]

      maybePreviousPage.flatMap { previousPage =>
        Uri(previousPage).query().get("since").map { newSinceParam =>
          params.copy(queryParameters = params.queryParameters + ("since" -> newSinceParam))
        }
      }.getOrElse {
        logger.warn("Could not extract previous page 'since' parameter so the new value is not set. Was the feed list empty?")
        params
      }
    }
  }
```

One common pattern emerges across multiple APIs where during the initial sync the plug needs to paginate over multiple
responses and then switch into a "regular" synchronisation mode afterwards. 

<nav class="pager-nav">
<a href="01-authentication.html">Previous Step: Authentication</a>
<a href="03-data-validation.html">Next Step: Data Validation</a>
</nav>
