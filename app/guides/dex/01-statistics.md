---
layout: twoColumn
section: guides
type: Data Exchange Services
guide: 
    name: dex
    step: 01-statistics
title: DEX Statistics
description: DEX Statistics
---

Current DEX statistics lookup for all available data points is a single API call:

```postman
	"request": {
		"url": "https://dex.hubofallthings.com/stats",
		"method": "GET",
		"header": [],
		"body": {},
		"description": "DEX Data Statistics Lookup"
	}
```

Which responds with aggregated statistics:

```postmanresponse
	"response": [
		{
			"name": "Statistics",
			"status": "OK",
			"code": 200,
			"header": [
				{
					"key": "Content-Type",
					"value": "application/json",
					"name": "Content-Type",
					"description": ""
				}
			],
			"body": "[{\"title\":\"Data Plugs\",\"value\":7,\"updated\":1496407712243},{\"title\":\"Total Offer Claims\",\"value\":70,\"updated\":1496407712248},{\"title\":\"Data Out\",\"value\":24317796,\"updated\":1496407712246},{\"title\":\"Data In\",\"value\":3118189,\"updated\":1496407712239},{\"title\":\"Top Datapoints\",\"value\":17476332,\"children\":{\"longitude in locationv1 of rumpel\":{\"title\":\"longitude in locationv1 of rumpel\",\"value\":607523,\"updated\":1496407713864},\"public_until in notablesv1 of rumpel\":{\"title\":\"public_until in notablesv1 of rumpel\",\"value\":1120036,\"updated\":1496407713864},\"shared_on in notablesv1 of rumpel\":{\"title\":\"shared_on in notablesv1 of rumpel\",\"value\":1120036,\"updated\":1496407713864},\"latitude in locations of iphone\":{\"title\":\"latitude in locations of iphone\",\"value\":890970,\"updated\":1496407713864},\"kind in notablesv1 of rumpel\":{\"title\":\"kind in notablesv1 of rumpel\",\"value\":1120036,\"updated\":1496407713864},\"heading in locationv1 of rumpel\":{\"title\":\"heading in locationv1 of rumpel\",\"value\":550182,\"updated\":1496407713864},\"updated_time in notablesv1 of rumpel\":{\"title\":\"updated_time in notablesv1 of rumpel\",\"value\":1120036,\"updated\":1496407713864},\"longitude in locations of iphone\":{\"title\":\"longitude in locations of iphone\",\"value\":890970,\"updated\":1496407713864},\"message in notablesv1 of rumpel\":{\"title\":\"message in notablesv1 of rumpel\",\"value\":1184169,\"updated\":1496407713864},\"created_time in notablesv1 of rumpel\":{\"title\":\"created_time in notablesv1 of rumpel\",\"value\":1120036,\"updated\":1496407713864},\"shared in photov1 of rumpel\":{\"title\":\"shared in photov1 of rumpel\",\"value\":550182,\"updated\":1496407713864},\"latitude in locationv1 of rumpel\":{\"title\":\"latitude in locationv1 of rumpel\",\"value\":607523,\"updated\":1496407713864},\"photo_url in authorv1 of rumpel\":{\"title\":\"photo_url in authorv1 of rumpel\",\"value\":864734,\"updated\":1496407713864},\"shared in locationv1 of rumpel\":{\"title\":\"shared in locationv1 of rumpel\",\"value\":550182,\"updated\":1496407713864},\"source in photov1 of rumpel\":{\"title\":\"source in photov1 of rumpel\",\"value\":550182,\"updated\":1496407713864},\"phata in authorv1 of rumpel\":{\"title\":\"phata in authorv1 of rumpel\",\"value\":1120036,\"updated\":1496407713864},\"timestamp in locations of iphone\":{\"title\":\"timestamp in locations of iphone\",\"value\":890970,\"updated\":1496407713864},\"accuracy in locations of iphone\":{\"title\":\"accuracy in locations of iphone\",\"value\":890970,\"updated\":1496407713864},\"accuracy in locationv1 of rumpel\":{\"title\":\"accuracy in locationv1 of rumpel\",\"value\":607523,\"updated\":1496407713864},\"shared in notablesv1 of rumpel\":{\"title\":\"shared in notablesv1 of rumpel\",\"value\":1120036,\"updated\":1496407713864}},\"updated\":1496407713864},{\"title\":\"HATs\",\"value\":387,\"updated\":1496407712236}]"
		}
	]
```

<nav class="pager-nav">
<a href="./">Previous step: Overview</a>
<a href="02-data-plug-management.html">Next step: Data Plug Management</a>
</nav>
