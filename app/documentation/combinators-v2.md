---
layout: twoColumn
section: documentation
type: documentation-api2
title:  "Combinators"
description: "Combinators"
---

# Combinators

The API supports a notion of custom data "combinators", with the key feature being data transformation.

It allows for:
   * combining data from multiple feeds into a single response stream
   * remapping data JSON from such different streams into structures chosen by the developer to facilitate consistent structures across unrelated sources
   * ordering of data according to underlying JSON structure fields
   * filtering of data according to underlying JSON values (including text-based search)

Currently it is achieved by dynamically registering a datapoint with a data mapping specification and GETing data from the registered endpoint
