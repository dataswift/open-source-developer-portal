# Hub of All Things Developer Portal

Hub of All Things' developer portal. This developer portal is based on the Dwolla developer portal. Dwolla's developer portal can be seen here - https://developers.dwolla.com/

This is a jekyll-based site that compiles down to a set of static assets which live on GitHub Pages.

Skeleton generated using [generator-jekyllrb](https://github.com/robwierzbowski/generator-jekyllrb).

## Getting started

First things first. This project requires Node.js >= 0.10, Ruby >= 1.9. Make sure you have those installed.

Clone this repo. Then, you'll want to install dependencies:

```
bundle install
npm install
```

To build and serve the site on localhost, do:

```
grunt serve
```

## Troubleshooting

If you encounter the following error
```
Conversion error: Jekyll::Converters::Markdown encountered an error while converting 'guides/data-bundling/01-data-combinators.md':
                    No such file or directory - httpsnippet
```
this means you do not have `httpsnippet` installed or in your path.

Rectify with
```
npm install -global httpsnippet
```
You may also need to install `mkdirp`
```
npm install -global mkdirp
```

## Deploying

To deploy changes to the gh-pages branch, do:

```
grunt deploy
```

If you're trying to deploy changes to the actual Hub of All Things repo, you'll need to make sure you're allowed to. Only Hub of All Things organization members can do this.

Otherwise, if you're deploying to your own repo, make sure you edit the `buildcontrol.dist.options.remote` to be the URL of your git repo. You'll probably also want to edit `app/CNAME` to use your own CNAME.

## Automagic Deployment (to gh-pages with Travis CI on push to master)

1. Enable Travis CI on this repository
2. Run `ssh-keygen -t rsa -b 4096 -C "YOUR@EMAIL.COM"` to generate a new RSA key (don't use an existing one)
3. Copy id_rsa.pub to the repository deployment keys page
4. Copy id_rsa to the repository root
5. Navigate to the repository root and run `travis login --org` to login to Travis CLI and `travis encrypt-file id_rsa` to encrypt your new private key
6. Copy the openssl line from the command output to .travis.yml and change the output file to deploy_key
7. Delete id_rsa (leave id_rsa.enc)
8. Commit, push and watch the magic!

## License

The MIT License (MIT)

Copyright (c) 2017 Hub of All Things
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
