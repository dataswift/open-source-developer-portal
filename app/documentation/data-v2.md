---
layout: twoColumn
section: documentation
type: API v2
title:  "Data"
description: "Data v2"
---

# Data

Plain Data APIs consume any JSON:

   * records posted as an array get saved into separate records
   * individual values are saved as-is
   * "endpoint" for the data is softly-defined, with the developer choosing a path within the namespace they are authorized to use
   * data can be retrieved using permitted credentials for the individual endpoints
   * deleting of data records is supported by accepting a list of previously saved record IDs

