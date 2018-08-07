---
layout: twoColumn
section: guides
type: File Storage
guide: 
    name: file-storage
    step: 04-search
title: Step 4 - File lookup/search
description: HAT File Lookup and Search
---

HAT files can be looked up by any part of metadata attached to them:

- `fileId` for an exact match, where one or no files are returned
- `name` for an exact match on the original name, but multiple files could potentially be returned. *Empty* string if you do not want to match against `name`
- `source` matching all files from a specific source such as `facebook`. *Empty* string if you do not want to match against `source`
- `tags` a set of all tags matching files need to have attached
- `title` and `description` for an approximate, text-based search matching the fields
- `status` to filter e.g. only files that are marked `Completed`

To search for files call `POST /api/v2.6/files/search` sending file template to match against. All calls must be authenticated with the user's token and only files the user is allowed to access are returned (all files for the HAT owner!):

```curlnoselect
    curl -X POST -H "Accept: application/json" -H "X-Auth-Token: ${HAT_AUTH_TOKEN}" \
    	-H "Content-Type: application/json" \
    	-d '{
			"name": "testFile.png",
			"source": "test",
			"tags": ["tag1", "tag2"],
			"title": "test Title",
			"description": "a very interesting test file",
			"status": { "status": "Completed", "size": 0}
		}' \
		"https://${HAT_ADDRESS}/api/v2.6/files/search"
```

<nav class="pager-nav">
<a href="03-contents.html">Previous Step: Content Access</a>
<a href="./">Next Step: Overview</a>
</nav>
