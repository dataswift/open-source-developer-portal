---
layout: twoColumn
section: guides
type: Building a Data Plug
guide:
    name: building-data-plug
    step: 05-putting-it-together
title: Putting It Together
description: Add data validation to ensure guaranteed minimal structure of each added record.
# Parameters used in code examples
hat: test.hubat.net

---

Once the authentication provider, endpoint interfaces and option collectors are ready, there's only few steps left
to get to a working plug service:

1. Configure the Play module
2. Update database evolutions
3. Update project's `Build` file configuration


### Configuring Play Module

Within the Module file the plug author can update bindings for the default core services and views. Usually, it should 
only be necessary when deeper customisation of a particular plug is desired.

It is also the place to configure providers for the newly created endpoint interfaces and option collectors. There is four
providers that need to be set up:

1 - Endpoint interfaces should be provided as a sequence wrapped in a `DataPlugRegistry` object

```noselect
@Provides
def provideDataPlugCollection(
  facebookProfileInterface: FacebookProfileInterface,
  facebookProfilePictureInterface: FacebookProfilePictureInterface,
  facebookEventInterface: FacebookEventInterface,
  facebookFeedInterface: FacebookFeedInterface): DataPlugRegistry = {

  DataPlugRegistry(Seq(
    facebookProfileInterface,
    facebookProfilePictureInterface,
    facebookEventInterface,
    facebookFeedInterface))
}
```

2 - `DataPlugOptionsCollectorRegistry` should provide the option collectors coupled with an auth provider

```noselect
@Provides
def provideDataPlugEndpointChoiceCollection(
  facebookProvider: FacebookProvider,
  facebookProfileCheck: FacebookProfileCheck): DataPlugOptionsCollectorRegistry = {

  val variants: Seq[(Provider, DataPlugOptionsCollector)] = Seq((facebookProvider, facebookProfileCheck))
  DataPlugOptionsCollectorRegistry(variants)
}
```

3 - `SocialProviderRegistry` should provide the authentication provider (default or custom built)

```noselect
@Provides
def provideSocialProviderRegistry(
  facebookProvider: FacebookProvider): SocialProviderRegistry = {

  SocialProviderRegistry(Seq(
    facebookProvider))
}
```

4 - And, finally, we need construct and provide the auth provider

```noselect
@Provides
def provideFacebookProvider(
  httpLayer: HTTPLayer,
  stateProvider: OAuth2StateProvider,
  configuration: Configuration): FacebookProvider = {
  new FacebookProvider(httpLayer, stateProvider, configuration.underlying.as[OAuth2Settings]("silhouette.facebook"))
}
```

### Updating Database Evolutions

Plug-specific database evolutions can be found in `conf/evolutions/dataplug.sql` file. Here, we simply need to insert a 
record for each endpoint that should be available for synchronisation. The record should include the name, description, 
and any text-based additional details about the endpoint. Facebook example would include:

```noselect
INSERT INTO dataplug_endpoint (name, description, details)
VALUES
  ('feed', 'User feed''s posts', 'sequence'),
  ('events', 'User''s events list', 'sequence'),
  ('profile', 'User''s Facebook profile information', 'snapshots'),
  ('profile/picture', 'User''s Facebook profile picture information', 'snapshots')
  ON CONFLICT (name) DO NOTHING;
```

### Updating Build File

As the final step, the plug module should be added to the project list in the `project/Build` file. And that should be 
that, the plug is ready! Try running it with the `sbt "project {project-name}" "run -Dconfig.resource=application.dev.conf"`
command.

<nav class="pager-nav">
<a href="04-collecting-endpoint-variants.html">Previous Step: Collecting Endpoint Variants</a>
<a href="" style="display:none;"></a>
</nav>
