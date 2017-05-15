---
layout: twoColumn
section: home
type: home-tools
title:  "Data Plugs"
description: "Data Plugs"
---

# Data Plugs 

Data Plugs are bits of software allowing to retrieve individual's data (well basically our personal data) from data sources on internet (e.g. Facebook) into the HAT. HAT Data Plugs available are written in Scala/Play.

DataPlugs in the HAT ecosystem are self-contained services that act between a service providing data and a HAT. This project provides reusable libraries and structures for building such DataPlugs as well as examples of already built ones.

### How to build a new DataPlug (twitter data plug)

[https://github.com/Hub-of-all-Things/DataPlugs/blob/master/README.md](https://github.com/Hub-of-all-Things/DataPlugs/blob/master/README.md)

Taking Twitter as an example, this plug implemented a data plug built on the Scala/Play framework 

- `commonPlay` as a set of various reusable blocks of code and libraries
- `dataplug` the core components of any DataPlug

using convenience API wrappers served as HAT Library Artifacts:

- `hat-client-scala-play` as a Scala wrapper around the HAT HTTP API
- `marketsquare-client-scala-play` as a Scala wrapper around the HATDeX MarketSquare HTTP API

### Facebook Data Plug

[https://github.com/Hub-of-all-Things/DataPlugFacebook](https://github.com/Hub-of-all-Things/DataPlugFacebook)

Facebook Data Plug uses the Graph API to get data out of Facebook’s platform to the individual’s HAT. The Graph API is a “social graph”, which represents all data on Facebook as:
- nodes, which are Things like, for example, a user or a page;
- fields, which contain info about the Things like, for example, user’s name or birthday;
- edges, which connect the Things like, for example, comments on user’s photos

Currently supported nodes within the HAT are: Facebook user’s profile (such as name, age, etc), posts and events. Future development will feature more updates from a user's such as likes, check-ins, travels and other connect services like Spotify. More information about Facebook Graph API can be found [here](https://developers.facebook.com/docs/graph-api/reference).

### Dropbox Photo Data Plug

[https://github.com/Hub-of-all-Things/DataPlugDropbox](https://github.com/Hub-of-all-Things/DataPlugDropbox)

Dropbox Data Plug currently uses Dropbox API to create metalinks to individual’s photos on Dropbox. This allows user to view his/her photos directly from the HAT, while the photos themselves are kept in the Dropbox storage. More information about the Dropbox API can be found [here](https://www.dropbox.com/developers/documentation/http/documentation).

### iCal Calendar Data Plug

[https://github.com/Hub-of-all-Things/DataPlugCalendar](https://github.com/Hub-of-all-Things/DataPlugCalendar)

Calendar Data Plug employs iCalendar file format allowing individuals to collect their calendar information back into their hats. iCalendar Data synchronisation within the HAT is initialised by entering user’s ics calendar url into the form and submitting it. It depends on your calendar provider how you can obtain the URL. For example, for Google calendar visit [this](https://support.google.com/calendar/answer/37648?hl=en). Currently iCal Celendar Data Plug extracts a simple set of individual’s calendar event information, using ical.js (https://github.com/mozilla-comm/ical.js) library: event name, event start and end dates, “last updated” timestamp, event location, attendees, summary, description and organiser. For more information about iCalendar, please visit [this](https://en.wikipedia.org/wiki/ICalendar).
