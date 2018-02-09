---
layout: twoColumn
section: guides
type: Building a Data Plug
guide:
    name: building-data-plug
    step: 01-authentication
title: Authenticating User
description: How to authenticate user with the HAT and with 3rd party data providers
# Parameters used in code examples
hat: test.hubat.net

---

Data Plug can function correctly only if it's been authorised to access both the 3<sup>rd</sup> party and individual's HAT APIs.
Furthermore, the service has to maintain valid authentication tokens for both APIs to remain in the "connected" state. 
As soon as access is lost to either API "disconnected" status should be reported.

### Authenticating with HAT

Core plug implementation provides both an interface for user authentication and background services for authentication and
authorisation. Plug author can easily customise UI texts, titles, and messaging by modifying `conf/messages.en` file in 
their particular plug project. For example, [messages.en file for Facebook plug](https://github.com/Hub-of-all-Things/DataPlugs/blob/master/dataplug-facebook-v2/conf/messages.en). 
Alternatively, a completely custom user interface can be set up by implementing your own `DataPlugViewSet` controller and 
[binding it in the project module](https://github.com/Hub-of-all-Things/DataPlugs/blob/master/dataplug-facebook-v2/app/org/hatdex/dataplugFacebook/Module.scala#L47).

A more streamlined user authentication experience is also supported. User interface can be skipped altogether if redirecting
application adds `token=${APP_TOKEN}` and `redirect=${REDIRECT_URL}` query parameters. Here, `APP_TOKEN`
refers to a JWT app token signed by the owner's HAT for that particular plug and `REDIRECT_URL` specifies the callback URL
to go to after successful setup.

Core plug's background services also fully automate the caching and refreshing of HAT access tokens to always maintain 
authenticated state.

### Authenticating with 3rd party APIs

Authentication with most of the popular APIs work *via* OAuth standard. The project uses [Silhouette](https://www.silhouette.rocks), 
an authentication library for the Play Framework, simplify the login setup process as much as possible. The library comes 
with a few default integrations (Facebook, Instagram, etc.), but will require the plug author to implement custom authentication
 provider for the less popular services. If that's the case, it will be necessary to create a tweaked `authProvider`
  version and supply it to Silhouette instead. The specifics around the required changes will highly depend on the API 
  and cannot be covered in general. We would advise to read the [Silhouette documentation](https://www.silhouette.rocks/docs), 
  particularly about [authentication providers](https://www.silhouette.rocks/v5.0/docs/providers). Also there some examples
  in the current project repository that can be used for inspiration: 

- Fitbit Provider - [GitHub link](https://github.com/Hub-of-all-Things/DataPlugs/blob/master/dataplug-fitbit/app/org/hatdex/dataplugFitbit/apiInterfaces/authProviders/FitbitProvider.scala)
- Monzo Provider - [GitHub link](https://github.com/Hub-of-all-Things/DataPlugs/blob/master/dataplug-monzo/app/org/hatdex/dataplugMonzo/apiInterfaces/authProviders/MonzoProvider.scala)
- Spotify Provider - [GitHub link](https://github.com/Hub-of-all-Things/DataPlugs/blob/master/dataplug-spotify/app/org/hatdex/dataplugSpotify/apiInterfaces/authProviders/SpotifyProvider.scala)

Also, Silhouette-specific configuration parameters have to be included with the project. These can be found in the 
`conf/silhouette.conf` file and a particular list of parameters will depend on (1) authentication framework used 
(examples [here](https://www.silhouette.rocks/v5.0/docs/config-introduction)), and (2) any custom behaviours added to 
the default authentication provider. For example, in the Fitbit plug we've added `authorizationParams`, `refreshHeaders` 
and `customProperties` parameters to ensure correct functioning of the auth provider.

```noselect
fitbit {
   authorizationURL = "https://www.fitbit.com/oauth2/authorize"
   accessTokenURL = "https://api.fitbit.com/oauth2/token"
   redirectURL = "http://dataplug.hat.org:9000/authenticate/fitbit"
   redirectURL = ${?FITBIT_CALLBACK_URL}
   refreshURL = "https://api.fitbit.com/oauth2/token"
   clientID = ""
   clientID = ${?FITBIT_CLIENT_ID}
   clientSecret = ""
   clientSecret = ${?FITBIT_CLIENT_SECRET}
   scope = "activity heartrate location profile sleep weight"
   authorizationParams {
     response_type = "code"
   }
   refreshHeaders {
     Content-Type = "application/x-www-form-urlencoded"
   }
   customProperties {
     authorization_header_prefix = "Basic"
     parameters_location = "query"
   }
 }
```

<nav class="pager-nav">
<a href="./">Previous Step: Overview</a>
<a href="02-endpoint-setup.html">Next Step: Adding Endpoint Interfaces</a>
</nav>
