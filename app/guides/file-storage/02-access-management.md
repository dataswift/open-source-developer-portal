---
layout: twoColumn
section: guides
type: File Storage
guide: 
    name: file-storage
    step: 02-access-management
title:  Step 2 - Access Management
description: HAT File Permission Control
---

HAT owner can access all files, but otherwise there are three options for file access:

- another HAT user can be marked to have access to file's metadata
- another HAT user can be marked to have access to both file's metadata and contents
- a file can be marked to have its contents publicly accessible (e.g. publishing photos or your book!)

By default, the user who saved the file onto the HAT is allowed to see the file's metadata and contents, but only the `owner` can adjust file permissions by:

- calling `GET /api/v2/files/allowAccess/:fileId/:userId` to allow a specific user (`:userId`) to access a specific file (`:fileId`), optionally setting `content` query parameter to `true`/`false` to control content access (`false` by default). Conversely, calling `GET /api/v2/files/restrictAccess/:fileId/:userId` to restrict access.
- calling `POST /api/v2/files/allowAccess/:userId` sending file template to grant access to a set of files (same syntax as for file search!). Conversely, calling `POST /api/v2/files/restrictAccess/:userId` to restrict access.
- calling `GET /api/v2/files/allowAccessPublic/:fileId` and `GET /api/v2/files/restrictAccessPublic/:fileId` to control public file access

<nav class="pager-nav">
<a href="01-upload.html">Previous Step: Upload</a>
<a href="03-contents.html">Next Step: Content Access</a>
</nav>