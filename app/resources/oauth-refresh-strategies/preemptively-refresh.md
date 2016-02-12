---
layout: twoColumn
section: OAuth refresh strategies
type: article
title:  "Preemptively refresh authorization"
weight: 0
description: "Manage OAuth access tokens for Dwolla's bank transfer API."
---

# OAuth refresh strategies

## Preemptively refresh authorization

You set up a cron job that runs in the background every hour to refresh each user account’s OAuth access token. Refreshing authorization would happen behind the scenes as a backend process. You would first query your database for tokens that are about to expire, make a POST request to refresh authorization, and update your database to include the newly refreshed token pair. Note: Be prepared to handle errors gracefully while the cron job is running. 

#### Node.JS Example
```javascriptnoselect
var cron = require('cron');
var cronJob = cron.job("0 */55 * * * *", function() {
    User.find({
        where: {
            dwolla_id: '812-196-0757' //query user in database
        }
    }).then(function(user) {
        if (user) { //If user exists in database
            var refreshToken = user.dwolla_refresh; //grab the existing stored refresh token
            Dwolla.refreshAuth(refreshToken, function(error, auth) { //pass refresh token into refreshAuth request
                if (error) {
                    return console.log(error);
                }
                user.updateAttributes({
                    dwolla_refresh: auth.refresh_token //From response, set new refresh token in database
                }).success(function() {
                    console.log("updated");
                })
            });
        } else {
          console.log("user does not exist");
        }
    }).
    catch (function(err) {
        console.log(err);
    })
    console.info('cron job completed');
});
cronJob.start();
```