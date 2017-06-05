---
layout: twoColumn
section: guides
type: File Storage
guide: 
    name: file-storage
    step: 01-upload
title:  Step 1 - File Upload
description: HAT File Storage
---

File upload happens in three steps:

1. Posting file metadata to the HAT and retrieving URL to send the file to directly
2. Directly uploading the file to the (securely signed) URL
3. Marking the file complete at the HAT

Uploading metadata is simple: call `POST /api/v2/files/upload` with the file details:

```shellnoselect
   curl -X POST -H "Accept: application/json" -H "X-Auth-Token: ${HAT_AUTH_TOKEN}" \
    	-H "Content-Type: application/json" \
    	-d '{
			"name": "testFile.png",
			"source": "test",
			"tags": ["tag1", "tag2"],
			"title": "test Title",
			"description": "a very interesting test file",
		}' \
		"https://${HAT_ADDRESS}/api/v2/files/upload"
```

Only `name` and `source` properties are mandatory - all others are optional. You can also attach `dateCreated` and `lastUpdated` fields with Unix timestamps to set them accordingly. If everything is successful, the HAT will respond with a copy of the metadata as well as additional information:

```jsonnoselect
{
  "fileId": "testtestfile-12.png",
  "name": "testFile.png",
  "source": "test",
  "tags": ["tag1", "tag2"],
  "title": "test Title",
  "description": "a very interesting test file",
  "dateCreated": 1487871142325,
  "lastUpdated": 1487871142329,
  "status": {
    "status": "New"
  },
  "contentUrl": "https://hat-storage-test.s3.amazonaws.com/HAT_ADDRESS/testtestfile-12.png?AWSAccessKeyId=AKIAJSOXH3FJPB43SWGQ&Expires=1487871442&Signature=CTRdDW8nKBqNcuwK0ssH77zjkec%3D",
  "contentPublic": false,
  "permissions": [
    {
      "userId": "694dd8ed-56ae-4910-abf1-6ec4887b4c42",
      "contentReadable": true
    }
  ]
}
```

Importantly, it includes the unique file identifier for the HAT `fileId` and `contentUrl` indicating where the file should be uploaded. The upload `contentUrl` is signed and has limited duration validity, most likely 5 minutes, after which it becomes invalid. Then uploading itself could be done as (*note:* `x-amz-server-side-encryption` header is mandatory):

```shellnoselect
curl -v -T ${LOCAL_FILE} \
  -H "x-amz-server-side-encryption: AES256"\
  "https://hat-storage-test.s3.amazonaws.com/HAT_ADDRESS/testtestfile-12.png?AWSAccessKeyId=AKIAJSOXH3FJPB43SWGQ&Expires=1487871442&Signature=CTRdDW8nKBqNcuwK0ssH77zjkec%3D"
```

Finally, to mark the file "Completed", call `PUT /api/v2/files/file/:fileId/complete`. It will again respond with file metadata:

```jsonnoselect
{
  "fileId": "postmantestfile-12.png",
  "name": "testFile.png",
  "source": "postman",
  "tags": ["tag1", "tag2"],
  "title": "test Title",
  "description": "a very interesting test file",
  "dateCreated": 1487871142325,
  "lastUpdated": 1487871142329,
  "status": {
    "size": 154639,
    "status": "Completed"
  },
  "contentPublic": false,
  "permissions": [
    {
      "userId": "694dd8ed-56ae-4910-abf1-6ec4887b4c42",
      "contentReadable": true
    }
  ]
}
```

File `status` has now been marked as `Completed` and also contains file size in bytes! The request will fail if the file doesn't exist, hasn't been fully uploaded or you do not have permissions to mark the file completed (you will if you started the upload in the first place).

Finally, files can be deleted (by *owner* only!) by calling `DELETE /api/v2/files/file/:fileId`

<nav class="pager-nav">
<a href="./">Overview</a>
<a href="02-access-management.html">Next Step: Access Management</a>
</nav>