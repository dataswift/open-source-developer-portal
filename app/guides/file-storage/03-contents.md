---
layout: twoColumn
section: guides
type: File Storage
guide: 
    name: file-storage
    step: 03-contents
title: Step 3 - Content Access
description: HAT File Content Listing
---

- `GET api/v2/files/file/:fileId` to list metadata of a file, including `contentUrl` pointing to a pre-signed temporary URL for file contents if the user is permitted file access
- `GET /api/v2/files/content/:fileId` to get contents of a file if file is marked publicly accessible or the client is permitted file content access. The endpoint redirects to the pre-signed temporary content URL or returns 404 error code (Not Found) if the file does not exist or is not accessible

<nav class="pager-nav">
<a href="02-access-management.html">Previous Step: Access Management</a>
<a href="04-search.html">Next step: Search</a>
</nav>