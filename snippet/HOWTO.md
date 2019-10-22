# How to use this directory (as a developer on the project)

`nvm use` to install the recommended version of Node for this project.

`npm install` to install the required packages.

- `npm run watch` will dynamically rebuild the dev version of the JS.
- `npm run compress` will compress it - usually just to compare sizes.
- `npm run production` will build and compress the production version of the JS.
- `npm run publish` will publish the JS (*AND* the map file) to the production S3 bucket.

The production javascript is available at:

- https://s3-us-west-2.amazonaws.com/cdn.goodverification.com/verify.js <- TLS, no CDN delay(!)
- http://cdn.goodverification.com/verify.js <- Plain HTTP, but custom domain, no CDN delay
- NOT YET AVAILABLE AT: https://cdn.goodverification.com (but it will be, when I add CloudFront)
