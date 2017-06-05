---
layout: twoColumn
section: guides
type: File Storage
guide: 
    name: file-storage
    step: overview
title:  HAT File Storage
description: HAT File Storage
---

# HAT File Storage

File storage is a rather different beast from structured (meta)data about your personal digital life:

- they are big to store
- sending them back and forth requires a lot of bandwidth
- databases very useful for storing structured data are not well-suited for storing files
- data in a file can not normally be sliced and diced as structured metadata could
- files would often be uploaded from a low-bandwidth (e.g. mobile) device that is likely to have intermittent connectivity

These considerations further play with the requirements for file storage to be reliable, secure and cost-efficient especially if we want to make HATs affordable. And we still want to be able to attach metadata to files, maintain fine-granularity access control.

APIs are also rather different from web pages in terms of how file uploads tend to be or can be handled. Not going into a lot of detail here there are plenty of reasons why [uploading using multipart forms mostly sucks](https://philsturgeon.uk/api/2016/01/04/http-rest-api-file-uploads/) as well as pretty good examples on how file uploads could be done, e.g. [YouTube Resumable Uploads](https://developers.google.com/youtube/v3/guides/using_resumable_upload_protocol). As a building block to satisfy all the requirements we picked AWS S3

This guide details how HAT handles file management in 4 key aspects:

1. File Upload
2. Access Management
3. Content access
4. File lookup/search

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="01-upload.html">Next Step: Upload</a>
</nav>

