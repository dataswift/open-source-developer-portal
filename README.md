# About Dwolla

Dwolla is a software platform that makes it easy to move money between banks. When using Dwolla APIs your software platform can move money between any 2 bank accounts, or network members, with no transaction fees. 

Our software platform is compatible with all banks in the United States. The developer documents are designed to support our development partners who are building on top of Dwolla's branded platform (v1) or our white labeled infrastructure (v2).

The Dwolla API developer portal lives here: https://developers.dwolla.com

Our v1 API documentation is available here: https://docs.dwolla.com/
Our v2 API documentation is available here: https://docsv2.dwolla.com/

# About the Open Source Developer Portal

This developer portal was designed to provide a starting point for our developer community. Some of the useful feature of this developer portal are: 

### Beautiful (and intuitive) design

As seen here: https://developers.dwolla.com/

### A simple directory for adding integration guides

As seen here: https://developers.dwolla.com/guides/

### A resource portal

As seen here: https://developers.dwolla.com/resources/

### A framework for showing samples in multiple languages

As seen here: https://docsv2.dwolla.com/

### A SDK directory

As seen here: https://developers.dwolla.com/pages/sdks.html

### The ability to use multiple API versions

As seen here: https://docsv2.dwolla.com/

# dwolla-devportal

Dwolla's next-generation developer portal.  This is a jekyll-based site that compiles down to a set of static assets which live on GitHub Pages. Dwolla's developer portal can be seen here - https://developers.dwolla.com/

Skeleton generated using [generator-jekyllrb](https://github.com/robwierzbowski/generator-jekyllrb).

## Getting started

First things first.  This project requires Node.js >= 0.10, Ruby >= 1.9.  Make sure you have those installed.

Clone this repo.  Then, you'll want to install dependencies:

```
bundle install
npm install
```

To build and serve the site on localhost, do:

```
grunt serve
```

## Deploying

To deploy changes to the gh-pages branch, do:

```
grunt deploy
```

If you're trying to deploy changes to the actual Dwolla repo, you'll need to make sure you're allowed to.  Only Dwolla organization members can do this.

Otherwise, if you're deploying to your own repo, make sure you edit the `buildcontrol.dist.options.remote` to be the URL of your git repo.  You'll probably also want to edit `app/CNAME` to use your own CNAME.

## License

Copyright (c) 2016 Dwolla

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

## Contributing

Feel free to fork this repo and submit PRs for any corrections, new features, etc. you think we should include.
