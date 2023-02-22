# How to use this directory (as a developer on the project)

`nvm use` to install the recommended version of Node for this project.

`npm install` to install the required packages.

The various versions of the snippet are built in the `dist/` subdirectory

- `npm run watch` will dynamically rebuild the dev version of the JS.
- `npm run compress` will compress it - usually just to compare sizes.
- `npm run production` will build and compress the production version of the JS.
- `npm run publish` will publish the JS (*AND* the map file) to the production S3 bucket.
- `npm run purge` will invalidate the Cloudfront content, forcing it to be re-requested from the origin bucket

The production javascript is available at:

- https://cdn.goodforms.com/verify.js (requesting HTTP redirects to HTTPS)
- https://s3-us-west-2.amazonaws.com/cdn.goodverification.com/verify.js <- TLS, no CDN delay(!) (note: old name. It's ok.)
