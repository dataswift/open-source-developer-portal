---
layout: twoColumn
section: Combinators
type: article
title:  "Propose Data Bundles"
description: "Propose Data Bundles"
---

## POST -  Propose data bundles
   
`https://testing.hubat.net/api/v2.6/combinator/android/locations?take=5`

Data for registered endpoints can be collected like with the plain data routes, but prefixing the path with endpoint/ instead of `data/, however using same filters such as the one for limiting the number of results returned


### Headers

#### X-Auth-Token
{{accessToken}}


```postman

"request": {
						"url": "https://{{hat}}/api/v2.6/combinator/android/locations?take=5",
						"method": "GET",
						"header": [
							{
								"key": "X-Auth-Token",
								"value": "{{accessToken}}",
								"description": ""
							}
						],
						"body": {
							"mode": "raw",
							"raw": ""
						},
						"description": "Data for registered endpoints can be collected like with the plain data routes, but prefixing the path with `endpoint/` instead of `data/, however using same filters such as the one for limiting the number of results returned"
					}

```

# Example - Get data for the morning commute 

`https://testing.hubat.net/api/v2.6/combinator/locations/morningcommute`

### Headers

#### X-Auth-Token
{{accessToken}}

```postman

"request": {
						"url": "https://{{hat}}/api/v2.6/combinator/locations/morningcommute",
						"method": "GET",
						"header": [
							{
								"key": "X-Auth-Token",
								"value": "{{accessToken}}",
								"description": ""
							}
						],
						"body": {
							"mode": "raw",
							"raw": ""
						},
						"description": "Data for registered endpoints can be collected like with the plain data routes, but prefixing the path with `endpoint/` instead of `data/, however using same filters such as the one for limiting the number of results returned"
					}

```
