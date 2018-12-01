---
layout: twoColumn
section: guides
type: iOS Developer's Guide
guide: 
    name: ios-guide
    step: 02-02-file-upload
title: "- Uploading Files to HAT"
description: Guide to uploading files to the HAT on the iOS platform
---

# Upload Files

`Hat for iOS` allows you to also upload files in your HAT. You can read more about `HAT File Storage` [here](https://developers.hubofallthings.com/guides/file-storage/).

The uploading of a file is a multi step process:
* Request from `HAT` a temporary `URL` to upload the file
* Upload the file to the `URL`
* Mark the file as complete

# Step 1

To start a file upload you have to call the function below:

```javascriptnoselect
HATFileService.uploadFileToHAT(
           fileName: name,
           token: token,
           userDomain: userDomain,
           tags: tags,
           completion: completionCallback,
           errorCallback: failCallback
       )
```

* `fileName` is the desired name of the file. You can either randomize it or provide meaningful names, it's up to you
* `token` is the user's token. This is needed to authenticate user with the `HAT`
* `userDomain` is the user's `HAT Address`. This is need in order to form the `URL` to upload the file
* `tags` is an array of `String` with useful tags to make searching for that file easier.
* `completion` is an optional callback function of type ``((FileUploadObject, String?) -> Void)?``, `FileUploadObject` is a custom object of `Hat for iOS` describing the file upload object. The Optional `String` is the refreshed token returned from the `HAT`. This is executed on success and it includes the `URL` that you have to upload your file.
* `errorCallback` is an optional callback that is executed when the request has failed. The type of the callback function is ``((HATTableError) -> Void)?``. `HATTableError` is custom object describing the errors that have occurred during the querying of the tables in the database.

So for the purpose of this example let's say that `fileName` is `testfile`, `tags` is just `test-tag`, `userDomain` is `test.hubofallthings.net` and `token` is token. That will translate to the request below:

```javascriptnoselect
HATFileService.uploadFileToHAT(
           fileName: "testfile",
           token: "token",
           userDomain: "test.hubofallthings.net",
           tags: ["test-tag"],
           completion: completionCallback,
           errorCallback: failCallback
       )
```

A successful request will result in a `status code` 200 and the response will look like the one below:


```jsonnoselect
{
    "fileId": "testapptestfile",
    "name": "testfile",
    "source": "testApp",
    "dateCreated": "2018-11-08T16:08:38.679Z",
    "lastUpdated": "2018-11-08T16:08:38.679Z",
    "tags": [
        "test-tag"
    ],
    "status": {
        "status": "New"
    },
    "contentUrl": "https://hubat-net-hatservice-v3ztbxc9civz-storages3bucket-m0gs7co0oyi2.s3.eu-west-1.amazonaws.com/testing.hubat.net/testapptestfile?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20181108T160838Z&X-Amz-SignedHeaders=host%3Bx-amz-server-side-encryption&X-Amz-Expires=300&X-Amz-Credential=AKIAICFRCZUZIP4PQ64A%2F20181108%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=f868940fad6ad21085c19b62d4b940127808858e64e57dd44b4de452178e107d",
    "contentPublic": false,
    "permissions": [
        {
            "userId": "de35e18d-14wf-4664-8de7-409abf881754",
            "contentReadable": true
        }
    ]
}
```

The above response is described by `FileUploadObject`. The values are explained below:

* `fileId` is the ID of the file on the `HAT`, it's formed by combining the `source` and `name` of the file.
* `name` is the name of the file that we assigned. In case of a duplicate `fileId`, `HAT` will append an incremented number at the end
* `source` is the source that requested to upload this file. It's good to have your app name as the `source`
* `dateCreated` is the date that the file was created in `ISO` format. ***optional***
* `lastUpdated` is the date that the file was last modified. You can change the `name`, `status` and also make the file private or not. ***Optional***
* `tags` is an array of `String` that allow for easier search of the file in the future. You can add multiple tags.
* `status` is a `[String: String]` Key-Value pair and it can be `New`, when you just requested the file upload, or `Completed` after the uploading has finished and you marked the file as `Completed`
* `contentUrl` is the `URL` you will use to upload the file. This `URL` is short lived and its use is just to provide a `URL` for your app that you can upload the file.
* `contentPublic` is the flag that indicates if the file is `private` or `public`. You can mark a file as `private` or `public` after the file has been uploaded
* `permissions` is an array of Key-Value pairs of type `[String: Any]`. In the above example the permissions provide the user with that `userId` the ability to have access to the file even if the file is marked as `private`

A request that has failed will look like this:

```jsonnoselect
{
  "error": "Not Authenticated",
  "message": "Not Authenticated"
}
```

* `error` is the error that has occurred.
* `message` a more descriptive message about the `error` that has occurred

# Step 2

The second step is to upload the actual file. There is no limitation on what type of file you can upload. You can upload images, videos, documents etc. It's up to the application to ensure that the file is uploaded correctly and that it can then download the file and read it without problems

In order to upload a file you can use the function below included in `Hat for iOS`:

```javascriptnoselect
HATNetworkHelper.uploadFile(
                    image: data,
                    url: contentURL,
                    progressUpdateHandler: progressUpdater,
                    completion: completionCallback
                )
```

* `image` is type of `Data`. This function requires to convert your file into `Data` type first. You can convert a `JPEG` image to `Data` with `image.jpegData(compressionQuality: 1.0)`
* `url` us the `URL` to upload the file. As we said earlier this `URL` is the `contentUrl` provided by the `HAT` in the first step
* `progressUpdateHandler` is an optional function callback of type `((Double) -> Void)?`. It continuously reports the status of the upload from 0 to 1. for example 0.10 is 10%
* `completion` is a callback function of type `@escaping (_ r: HATNetworkHelper.ResultType) -> Void)`. It can be either `isSuccess(isSuccess: Bool, statusCode: Int?, result: JSON, token: String?)` when the request was successful or `error(error: Error, statusCode: Int?, result: JSON?)` when the request failed for some reason. You can read more about it [here](Write Data.md)

A successful request will look like almost exactly the same as the original one:

```jsonnoselect
{
    "fileId": "testapptestfile",
    "name": "testfile",
    "source": "testApp",
    "dateCreated": "2018-11-08T16:08:38.679Z",
    "lastUpdated": "2018-11-08T16:08:40.235Z",
    "tags": [
        "test-tag"
    ],
    "status": {
        "status": "New"
    },
    "contentUrl": "https://hubat-net-hatservice-v3ztbxc9civz-storages3bucket-m0gs7co0oyi2.s3.eu-west-1.amazonaws.com/testing.hubat.net/testapptestfile?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20181108T160838Z&X-Amz-SignedHeaders=host%3Bx-amz-server-side-encryption&X-Amz-Expires=300&X-Amz-Credential=AKIAICFRCZUZIP4PQ64A%2F20181108%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=f868940fad6ad21085c19b62d4b940127808858e64e57dd44b4de452178e107d",
    "contentPublic": false,
    "permissions": [
        {
            "userId": "de35e18d-14wf-4664-8de7-409abf881754",
            "contentReadable": true
        }
    ]
}
```

The only thing that has now changed is the `lastUpdated` field.

A request that has failed will look like this:

```jsonnoselect
{
  "error": "Not Authenticated",
  "message": "Not Authenticated"
}
```

# Step 3

When the file has finished uploading it's required to mark the file as `completed`, else the file will be deleted. To do so you have to make another request. To achieve that you have to call the next function:

```javascriptnoselect
HATFileService.completeUploadFileToHAT(
                            fileID: fileObject.fileID,
                            token: token,
                            tags: tags,
                            userDomain: userDomain,
                            completion: completionCallback,
                            errorCallback: failCallback
                        )
```

* `fileID` is the file id that is to be marked as `completed`
* `token` is the user's token. This is needed to authenticate user with the `HAT`
* `tags` is an array of `String` with useful tags to make searching for that file easier. This is added before `Hat for iOS` returns you the full file. This is to cover a bug.
* `userDomain` is the user's `HAT Address`. This is need in order to form the `URL` to mark the file as `completed`
* `completion` is an optional callback function of type ``((FileUploadObject, String?) -> Void)?``, `FileUploadObject` is a custom object of `Hat for iOS` describing the file upload object. The Optional `String` is the refreshed token returned from the `HAT`.
* `errorCallback` is an optional callback that is executed when the request has failed. The type of the callback function is ``((HATTableError) -> Void)?``. `HATTableError` is custom object describing the errors that have occurred during the querying of the tables in the database.

A successful request will look like almost exactly the same as the original one:

```jsonnoselect
{
    "fileId": "testapptestfile",
    "name": "testfile",
    "source": "testApp",
    "dateCreated": "2018-11-08T16:08:38.679Z",
    "lastUpdated": "2018-11-08T16:08:43.157Z",
    "tags": [
        "test-tag"
    ],
    "status": {
        "size": 123,
        "status": "Completed"
    },
    "contentUrl": "https://hubat-net-hatservice-v3ztbxc9civz-storages3bucket-m0gs7co0oyi2.s3.eu-west-1.amazonaws.com/testing.hubat.net/testapptestfile?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20181108T160838Z&X-Amz-SignedHeaders=host%3Bx-amz-server-side-encryption&X-Amz-Expires=300&X-Amz-Credential=AKIAICFRCZUZIP4PQ64A%2F20181108%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=f868940fad6ad21085c19b62d4b940127808858e64e57dd44b4de452178e107d",
    "contentPublic": false,
    "permissions": [
        {
            "userId": "de35e18d-14wf-4664-8de7-409abf881754",
            "contentReadable": true
        }
    ]
}
```

The only thing that has now changed is the `lastUpdated` field and the `status` field. The `status` is marked as `Completed` and includes the file `size` in bytes.

A request that has failed will look like this:

```jsonnoselect
{
  "error": "Not Authenticated",
  "message": "Not Authenticated"
}
```

* `error` is the error that has occurred.
* `message` a more descriptive message about the `error` that has occurred

# Mark file as public

Be default the uploaded files are marked as `private`. You can change that by calling this function:

```javascriptnoselect
HATFileService.makeFilePublic(
              fileID: file.fileID,
              token: userToken,
              userDomain: userDomain,
              successCallback: completionCallback,
            errorCallBack: errorCallBack)
```

* `fileID` is the file id that is to be marked as `public`
* `token` is the user's token. This is needed to authenticate user with the `HAT`
* `userDomain` is the user's `HAT Address`. This is need in order to form the `URL` to mark the file as `public`
* `completion` is an optional callback function of type `(Bool -> Void)` returns `true`
* `errorCallback` is an optional callback that is executed when the request has failed. The type of the callback function is ``((HATError) -> Void)?``. `HATError` is custom object describing the general error that occurred on `HAT`

A successful request will have a `statusCode` of 200 and look like almost exactly the same as the original one:

```jsonnoselect
{
    "fileId": "testapptestfile",
    "name": "testfile",
    "source": "testApp",
    "dateCreated": "2018-11-08T16:08:38.679Z",
    "lastUpdated": "2018-11-08T16:04:45.689Z",
    "tags": [
        "test-tag"
    ],
    "status": {
        "size": 123,
        "status": "Completed"
    },
    "contentUrl": "https://hubat-net-hatservice-v3ztbxc9civz-storages3bucket-m0gs7co0oyi2.s3.eu-west-1.amazonaws.com/testing.hubat.net/testapptestfile?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20181108T160838Z&X-Amz-SignedHeaders=host%3Bx-amz-server-side-encryption&X-Amz-Expires=300&X-Amz-Credential=AKIAICFRCZUZIP4PQ64A%2F20181108%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=f868940fad6ad21085c19b62d4b940127808858e64e57dd44b4de452178e107d",
    "contentPublic": true,
    "permissions": [
        {
            "userId": "de35e18d-14wf-4664-8de7-409abf881754",
            "contentReadable": true
        }
    ]
}
```

The only thing that has now changed is the `lastUpdated` field and the `contentPublic` field.

A request that has failed will look like this:

```jsonnoselect
{
  "error": "Not Authenticated",
  "message": "Not Authenticated"
}
```

* `error` is the error that has occurred.
* `message` a more descriptive message about the `error` that has occurred

# Mark file as Private

Be default the uploaded files are marked as `private`. You can change that by calling this function:

```javascriptnoselect
HATFileService.makeFilePrivate(
              fileID: file.fileID,
              token: userToken,
              userDomain: userDomain,
              successCallback: completionCallback,
            errorCallBack: errorCallBack)
```

* `fileID` is the file id that is to be marked as `private`
* `token` is the user's token. This is needed to authenticate user with the `HAT`
* `userDomain` is the user's `HAT Address`. This is need in order to form the `URL` to mark the file as `private`
* `completion` is an optional callback function of type `(Bool -> Void)` returns `true`
* `errorCallback` is an optional callback that is executed when the request has failed. The type of the callback function is ``((HATError) -> Void)?``. `HATError` is custom object describing the general error that occurred on `HAT`

A successful request will have a `statusCode` of 200 and look like almost exactly the same as the original one:

```jsonnoselect
{
    "fileId": "testapptestfile",
    "name": "testfile",
    "source": "testApp",
    "dateCreated": "2018-11-08T16:08:38.679Z",
    "lastUpdated": "2018-11-08T16:09:44.247Z",
    "tags": [
        "test-tag"
    ],
    "status": {
        "size": 123,
        "status": "Completed"
    },
    "contentUrl": "https://hubat-net-hatservice-v3ztbxc9civz-storages3bucket-m0gs7co0oyi2.s3.eu-west-1.amazonaws.com/testing.hubat.net/testapptestfile?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20181108T160838Z&X-Amz-SignedHeaders=host%3Bx-amz-server-side-encryption&X-Amz-Expires=300&X-Amz-Credential=AKIAICFRCZUZIP4PQ64A%2F20181108%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=f868940fad6ad21085c19b62d4b940127808858e64e57dd44b4de452178e107d",
    "contentPublic": false,
    "permissions": [
        {
            "userId": "de35e18d-14wf-4664-8de7-409abf881754",
            "contentReadable": true
        }
    ]
}
```

The only thing that has now changed is the `lastUpdated` field and the `contentPublic` field.

A request that has failed will look like this:

```jsonnoselect
{
  "error": "Not Authenticated",
  "message": "Not Authenticated"
}
```

* `error` is the error that has occurred.
* `message` a more descriptive message about the `error` that has occurred

# Search files

You can also search for files with `Hat for iOS`. To do so you can use the next function:

```javascriptnoselect
HATFileService.searchFiles(
            userDomain: userDomain,
            token: userToken,
            status: "Completed",
            name: "",
            tags: tags,
            successCallback: receivedImages,
            errorCallBack: receivedErrorGettingImages)
```

* `userDomain` is the user's `HAT Address`. This is need in order to form the `URL` to fetch the files
* `token` is the user's token. This is needed to authenticate user with the `HAT`
* `status` is the status of the file. You can search for `Completed` files only or for `New` files.
* `name` is the name of the file. You can search for specific file or leave this as an empty `String` in case you want to fetch all the files that match the `status` and `tags`
* `tags` is an array of `String` with useful tags to make searching for that file easier. You can search file with specific tags
* `completion` is a callback function of type ` @escaping ([FileUploadObject], String?) -> Void`. The first parameter is an array of `FileUploadObject`, it contains all the files that the `HAT` found during the search. The second parameter is an optional `String`, it is a refreshed token returned from the `HAT`. It can be `nil`.
* `errorCallback` is an optional callback that is executed when the request has failed. The type of the callback function is ``((HATError) -> Void)?``. `HATError` is custom object describing the general error that occurred on `HAT`

A successful request will have a `statusCode` of 200 and look like this:

```jsonnoselect
[
    {
        "fileId": "rumpel1532526508004.jpg",
        "name": "1532526508004.jpg",
        "source": "rumpel",
        "dateCreated": "2018-07-25T13:48:24.976Z",
        "lastUpdated": "2018-07-25T13:48:24.976Z",
        "tags": [
            "android",
            "image/jpeg"
        ],
        "status": {
            "size": 144332,
            "status": "Completed"
        },
        "contentUrl": "https://hubat-net-hatservice-v3zbxc9civz-storages3bucket-m0gs7co0oyi2.s3.eu-west-1.amazonaws.com/testing.hubat.net/rumpel1532526508004.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20181109T184507Z&X-Amz-SignedHeaders=host&X-Amz-Expires=299&X-Amz-Credential=AKIAICFRCZUZIP4PQ64A%2F20181109%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=3492955b3870ab6bd321f43ba18cb62cd538547b7e523a57c87e0355c29eb3c3",
        "contentPublic": true,
        "permissions": [
            {
                "userId": "de35e1ed-147f-4664-8de7-409abf881754",
                "contentReadable": true
            }
        ]
    },
    {
        "fileId": "rumpelrumpelphoto-49",
        "name": "rumpelPhoto",
        "source": "rumpel",
        "dateCreated": "2018-06-18T08:31:10.420Z",
        "lastUpdated": "2018-06-18T08:31:10.420Z",
        "tags": [
            "iphone",
            "notes",
            "photo"
        ],
        "status": {
            "size": 2066062,
            "status": "Completed"
        },
        "contentUrl": "https://hubat-net-hatservice-v3ztbxc9ciz-storages3bucket-m0gs7co0oyi2.s3.eu-west-1.amazonaws.com/testing.hubat.net/rumpelrumpelphoto-49?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20181109T184507Z&X-Amz-SignedHeaders=host&X-Amz-Expires=299&X-Amz-Credential=AKIAICFRCZUZIP4PQ64A%2F20181109%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=2cd122df4cdf15be3e66889d5cc2e525880eb4f2c82012b6dcf00c601ad390da",
        "contentPublic": true,
        "permissions": [
            {
                "userId": "de35e1ed-147f-4664-8de7-409abf881754",
                "contentReadable": true
            }
        ]
    }
  ]
```

A request that has failed will look like this:

```jsonnoselect
{
  "error": "Not Authenticated",
  "message": "Not Authenticated"
}
```

* `error` is the error that has occurred.
* `message` a more descriptive message about the `error` that has occurred

# Delete files

You can also delete files from the `HAT` using the next function:

```javascriptnoselect
HATFileService.deleteFile(
            fileID: fileID,
            token: userToken,
            userDomain: userDomain,
            successCallback: fileDeleted,
          errorCallBack: fileFailedToDelete)
```

* `fileID` is the file id on the `HAT`
* `token` is the user's token. This is needed to authenticate user with the `HAT`
* `userDomain` is the user's `HAT Address`. This is need in order to form the `URL` to delete the file
* `completion` is a callback function of type ` @escaping (Bool, String?) -> Void`. The first parameter is true. The second parameter is an optional `String`, it is a refreshed token returned from the `HAT`. It can be `nil`.
* `errorCallback` is an optional callback that is executed when the request has failed. The type of the callback function is ``((HATError) -> Void)?``. `HATError` is custom object describing the general error that occurred on `HAT`

A successful request will have a `statusCode` of 200 and look like almost exactly the same as the original one:

```jsonnoselect
{
    "fileId": "testapptestfile",
    "name": "testfile",
    "source": "testApp",
    "dateCreated": "2018-11-08T16:08:38.679Z",
    "lastUpdated": "2018-11-08T16:09:44.247Z",
    "tags": [
        "test-tag"
    ],
    "status": {
        "status": "Deleted"
    },
    "contentUrl": "https://hubat-net-hatservice-v3ztbxc9civz-storages3bucket-m0gs7co0oyi2.s3.eu-west-1.amazonaws.com/testing.hubat.net/testapptestfile?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20181108T160838Z&X-Amz-SignedHeaders=host%3Bx-amz-server-side-encryption&X-Amz-Expires=300&X-Amz-Credential=AKIAICFRCZUZIP4PQ64A%2F20181108%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=f868940fad6ad21085c19b62d4b940127808858e64e57dd44b4de452178e107d",
    "contentPublic": false,
    "permissions": [
        {
            "userId": "de35e18d-14wf-4664-8de7-409abf881754",
            "contentReadable": true
        }
    ]
}
```

The only thing that has now changed is the `status` to `Deleted`

A request that has failed will look like this:

```jsonnoselect
{
  "error": "Not Authenticated",
  "message": "Not Authenticated"
}
```

* `error` is the error that has occurred.
* `message` a more descriptive message about the `error` that has occurred

<nav class="pager-nav">
<a href="" style="display:none;"></a>
<a href="03-00-data-debits.html">Next Chapter: Data Debits</a>
</nav>