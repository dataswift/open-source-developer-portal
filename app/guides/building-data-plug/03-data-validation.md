---
layout: twoColumn
section: guides
type: Building a Data Plug
guide:
    name: building-data-plug
    step: 03-data-validation
title: Validating data
description: Add data validation to ensure guaranteed minimal structure of each added record.
# Parameters used in code examples
hat: test.hubat.net

---

Validating data structures coming through the plug is completely optional because HAT API will accept any data that can 
be presented as a valid JSON object. However, having certain guarantees about the data can be very valuable
when developing apps that use it and thus can increase the reach and impact of the plug. We strongly encourage the use of
the validation process, especially, because it is very straightforward to implement.

We'll use `FacebookFeedInterface` example here. Any data coming through the interface is checked to meet the minimum 
structure requirements. It works by describing the expected data fields and their types as a `FacebookPost` case class 
and attempting to cast a given JSON object into it.

```noselect
  case class FacebookPost(
    id: String,
    caption: Option[String],
    created_time: String,
    description: Option[String],
    link: Option[String],
    message: Option[String],
    name: Option[String],
    object_id: Option[String],
    place: Option[FacebookPlace],
    picture: Option[String],
    full_picture: Option[String],
    status_type: Option[String],
    story: Option[String],
    `type`: String,
    updated_time: String,
    from: FacebookFrom,
    privacy: FacebookPrivacy,
    application: Option[FacebookApplication])
```

The interface contains the `validateMinDataStructure` method that implements the validation procedure:

```noselect
  def validateMinDataStructure(rawData: JsValue): Try[JsArray] = {
    (rawData \ "data").toOption.map {
      case data: JsArray if data.validate[List[FacebookPost]].isSuccess =>
        logger.info(s"Validated JSON array of ${data.value.length} items.")
        Success(data)
      case data: JsArray =>
        logger.warn(s"Could not validate full item list. Parsing ${data.value.length} data items one by one.")
        Success(JsArray(data.value.filter(_.validate[FacebookPost].isSuccess)))
      case data: JsObject =>
        logger.error(s"Error validating data, some of the required fields missing:\n${data.toString}")
        Failure(SourceDataProcessingException(s"Error validating data, some of the required fields missing."))
      case data =>
        logger.error(s"Error parsing JSON object: ${data.validate[List[FacebookPost]]}")
        Failure(SourceDataProcessingException(s"Error parsing JSON object."))
    }.getOrElse {
      logger.error(s"Error parsing JSON object, necessary property not found: ${rawData.toString}")
      Failure(SourceDataProcessingException(s"Error parsing JSON object, necessary property not found."))
    }
  }
```

Within the method, it is first checked if key "data" exists. In the affirmative case, it proceeds to validate the structure
as one of the possible options. The strongest validation case simply tries to cast data as a `List` of `FacebookPost`s. 
If that fails, it tries to cast to generic list and filter out objects that do not conform to the the `FacebookPost` data
structure. If filtering fails too, the validation method returns `Failure` object which in turn prevents the data from being
posted to the HAT. The logic can be seen in the overridden `processResults` method.

```noselect
  override protected def processResults(
    content: JsValue,
    hatAddress: String,
    hatClientActor: ActorRef,
    fetchParameters: ApiEndpointCall)(implicit ec: ExecutionContext, timeout: Timeout): Future[Unit] = {

    for {
      validatedData <- FutureTransformations.transform(validateMinDataStructure(content))
      _ <- uploadHatData(namespace, endpoint, validatedData, hatAddress, hatClientActor)
    } yield {
      logger.debug(s"Successfully synced new records for HAT $hatAddress")
    }
  }
```

Essentially, the `processResults` method is only a wrapper for a "for" comprehension that executes a list of asynchronous 
methods. It can be modified to remove the validation step altogether or to include arbitrary number of additional operations
as required. Examples on how dates are being reformatted and/or inserted into data sets can be found in 
`FitbitProfileInterface` and `TwitterTweetsInterface` interfaces.

<nav class="pager-nav">
<a href="02-endpoint-setup.html">Previous Step: Adding Endpoint Interfaces</a>
<a href="04-collecting-endpoint-variants.html">Next Step: Collecting Endpoint Variants</a>
</nav>
