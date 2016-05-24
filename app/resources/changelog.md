---
layout: twoColumn
section: resources
type: tool
title:  Change log
description: "Keep track of changes to the Dwolla API and official SDKs."
---

<section class="change-log">
	<h1>Upcoming</h1>
	<h3>2016-06-01</h3>
	<h4><em>CHANGED/DEPRECATED</em></h4>
	<ul class="bullet">
	    <li>Change in functionality for removing a funding source in API v2. The method for <a href="https://docsv2.dwolla.com/#remove-a-funding-source">removing a funding source</a> 
	    changes from a <code>DELETE</code> to a <code>POST</code> with the need to supply <code>{ "removed": true }</code> in the body of the request.</li>
	    <li>A <code>removed</code> attribute is added to the <a href="https://docsv2.dwolla.com/#funding-source-resource">funding source object.</a></li>
	    <li>A <code>removed</code> querystring request parameter is supplied when listing an <a href="https://docsv2.dwolla.com/#list-an-account39s-funding-sources">Account</a> or <a href="https://docsv2.dwolla.com/#list-a-customer39s-funding-sources">Customer's</a> funding sources. By default, all funding sources are returned from the listing unless the <code>removed</code> request parameter 
	   	is set to <code>false</code>.
	</ul>
	<hr>
	<h1>Completed</h1>
	<h3>2016-02-29</h3>
	<h4><em>DEPRECATED</em></h4>
	<ul class="bullet">
	    <li>Removal of the <code>description</code> field in API v2 error
	    responses. Replacing description with the <code>message</code> field which is a
	    duplication of description.</li>
	    <li>Removing the <code>X-Request-Signature</code> header from
	    webhook requests. Replacing with a
	    <code>X-Request-Signature-Sha-256</code> header which is a SHA-256
	    HMAC hash of the request body with the key being your webhook
	    secret.</li>
	</ul>
	<h3>2015-11-25</h3>
	<h4><em>ADDED</em></h4>
	<ul class="bullet">
	    <li>Release endpoint in API v2: retrieve a list of business
	    classifications for a Customer. <code>POST /business-classifications</code></li>
	    <li>Release endpoint in API v2: retrieve a business classification
	    by it's id for a Customer. <code>POST /business-classifications/{id}</code></li>
	    <li>Release <code>business</code> verified Customer creation in API v2.</li>
	</ul>
	<h3>2015-11-19</h3>
	<h4><em>ADDED</em></h4>
	<ul class="bullet">
	    <li>Release endpoint in API v2: generate a funding sources token
	    for a Customer. <code>POST
	    /customers/{id}/funding-sources-token</code></li>
	    <li>Release endpoint in API v2: retrieve ACH transfer failure
	    reason. <code>GET /transfers/{id}failure</code></li>
	</ul>
	<h3>2015-11-13</h3>
	<h4><em>ADDED</em></h4>
	<ul class="bullet">
	    <li>Release endpoint in API v2: generate an IAV token for a
	    Customer. <code>POST /customers/{id}/iav-token</code></li>
	    <li>Release <code>dwolla.js</code> to the CDN.
	    <code>https://cdn.dwolla.com/1/dwolla.js</code></li>
	</ul>
	<h3>2015-11-12</h3>
	<h4><em>CHANGED</em></h4>
	<ul class="bullet">
	    <li>Error changes - Introduce new <code>message</code>field in
	    error response. Errors now include a profile link in the
	    Content-Type header. Error responses with the top-level error code
	    <code>ValidationError</code> will return an <code>_embedded</code>
	    object containing a list of <code>errors</code>.</li>
	</ul>
	<h3>2015-11-02</h3>
	<h4><em>CHANGED</em></h4>
	<ul class="bullet">
	    <li>OAuth <code>redirect_uri</code> must match the OAuth Redirect URL field set
	    in Dwolla application’s settings.</li>
	</ul>
	<h3>2015-10-30</h3>
	<h4><em>ADDED</em></h4>
	<ul class="bullet">
		<li>Release endpoint in API v2: initiate or verify micro-deposits
	    for bank verification. <code>POST
	    /funding-sources/{id}/micro-deposits</code></li>
	    <li>Launched the new developer portal!</li>
	</ul>
	<hr>
</section>

{% include reach-out.html %}