---
layout: twoColumn
section: guides
type: Android Developer's Guide
guide:
    name: android-guide
    step: 01-03-user-verification
title: "- Step 3 - Verifying the login"
description: Step 3 to authenticating HAT applications on the Android platform
---
# Step 3 - Verifying the login

# Success callback

If the user logs in, they get redirected to the URL provided, with `token` query parameter appended and containing a `RS256-signed JWT` token, e.g.:

```shellnoselect
testapp://testapphost?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhcHBsaWNhdGlvblZlcnNpb24iOiIxLjIuNyIsInN1YiI6IjEtT0tRdm1TdGdCZ0lKdm9mNUN6NktsMnhaYjhXMUszQmZFR28xa2dZVERCQmdLeUR0ZDBqOXp6VWRaUmlRdFloaFY2VjQ5a1g1WUlmTzE0K3lEcm1GUlwvN1RkUW1iWXNMS3BDST0iLCJhcHBsaWNhdGlvbiI6ImhhdGFwcHN0YWdpbmciLCJpc3MiOiJ0ZXN0aW5nLmh1YmF0Lm5ldCIsImV4cCI6MTU0NDA4Nzc3MiwiaWF0IjoxNTQxNDk1NzcyLCJqdGkiOiI5ZjdlN2MyOTYwMjZkNmM4ODBmN2M2ZTk0MzIzOTQ3Yzg2YmI2OGEwZTIxN2YxZmZhYWE2ZTY3NGYwYWE1ODRmOWRiMzEwNDhiZmI1ZjI4N2Y5YzU4OGM4MGNmOTlmNzJjZTUyOTcxZjU3Y2NkNzVmODUzNTg3OTcwYWM5NWQzNDZhYWNmMzY5OWVkN2IyYmIyMDY5ZTJiMmM5YjE1OTg2Mjc5ZGNiYTNlMTMwYjRkMTdkNTI0ZTVkMmE5MTYyZTUzM2JjNWRlODJmNDBjNTg2ZDc2ODk2MTU0NDE3NzBkOGMwNDRlZjhhNjFlNWM3Y2JkZGQzOWFmYmQ1MDllMjU2In0.i4W_pbOVP9Qb-kkNaari-2U1eWfPSZ6QfYubb6r2SzN1VK0xRe_YT6Zm8gIuEoq8mf5p9wKPcsqzgJwLe27rGNTypCI9qZhVGqY0bNEC5GaXjH3YCXGI_hRKfHiqGbRD8XN1uhOlyWJg0pw_7DA4hdy1pGapw11Pu10y1-YMy6dlieAAU3ot87OGSr5bpXi3P3Wzgvv_QHRRn0ZVXHwp9p1UvG8LFkfzAg5lPqwQGZwMhqmp2NKSF_pStmzcKIsox_1ogrfam_3cm7p1iSRPMROYWxU9rwaOLQiXYXHuB1kO9Z62vxRJLySX_1PunWwXohbu4Rw7biBvpTdLI9D_DQ
```

The token will decode to something like this:

The Header:

```jsonnoselect
{
  "typ": "JWT",
  "alg": "RS256"
}
```

The Payload:

```jsonnoselect
{
  "applicationVersion": "1.2.7",
  "sub": "1-FgW7/lhAajlonnWAr7g3yB7eByYVkiV8O3UzsFPhEkoOYdr+bbeGeATwKyZUM6YenuUQb85G+PIijAxmP85GRnTIX6bdOdeJuuw=",
  "application": "hatappstaging",
  "iss": "testing.hubat.net",
  "exp": 1543692303,
  "iat": 1541100303,
  "jti": "1c73175cd84624efb3ead7ea21fb055ae6f95a519722d314927f251dd13d19aac438861c441ef255a33dae1e1762ee914070251998cbc723a1e2f03f47784470cf70bb6aa003e582e0226d5d8a116af362d9e522a9b29b8281ab2014cc3ae4808e55a6e4752634b3f5b4c4a37e105f57695c6def44e77a2db8e5c9f36a768749"
}
```

The key parts of the Payload are:

* The `applicationVersion`, the version of the app on HAT
* The `sub` (subject), the subject of the token
* The `application`, the application name that requested the token
* The `iss` (issuer), which is the address of the HAT that has created the token and that you should be logging in
* The `exp` (expiry) time of the token as a Unix timestamp, defining whether or not the token is still valid
* The `iat` (issued at time) time that the token has been created as a Unix timestamp, defining whether or not the token is still valid. Token is expiring after 30 days of the issued at date no matter if a refreshed token has been received from HAT
* The `jti` (JWT ID) the ID of the token

And the Signature, which is generated from the token and the private key of the HAT. The signature must be verified to verify that the token has not been tampered with. A HAT’s public key can be accessed at the `/publickey` endpoint of the HAT (e.g. `https://test.hubofallthings.net/publickey`). The precise handling of tokens with asymmetric keys will depend on your library, however you need to make sure that your library supports `RS256` keys.

[jwt.io](jwt.io) contains a very useful tool for token debugging while in development as well as listing all the major JWT libraries that you can use in your project.

When you have received a successful redirect from `HAT` you can check with `HAT API Android` and verity the user. To do so you simply have to call:

```javascriptnoselect
HATService().loginToHATAuthorization(
            applicationName: Auth.serviceName,
            url: url,
            success: success,
            failed: failed)
```

* `applicationName` is the name of the application that sent the user to log in
* `url` is the full url that returned from the `HAT`, like the example at the beginning of the step 3.
* `success` is a callback to execute when the library have successfully authorized user. You can use this callback to dismiss `WebView` activity, save the values needed and navigate to the next `Activity`
* `failed` is a callback to execute when the library couldn't authorize user. You can use this callback to dismiss `WebView` activity and show an error message to the user.

Having received the success callback you have to save the token, **ALWAYS** use `Encryption` to save the token. **DO NOT** save it in any non encrypted database. A good idea would be to also save the full `HAT Address` as well, as you are gonna need it many times in order to communicate with the HAT. You can store the values in SharedPreferences in Private mode.

As soon as you save the token you are free to navigate to your next `Activity`.

# Fail callback

In case the authentication failed, you will redirected to the fallback url. In that case you should dismiss `WebView` Activity and then update the UI or show an error message back to the user.

In order to dismiss the browser you do it from the viewController that presented originally the `Activity`, like this:

``` rawnoselect
finish()
```

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="02-00-writing-to-hat.html">Next Chapter: Writing to HAT</a>
</nav>
