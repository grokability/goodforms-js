Bump versions using:

I'm not 100% sure we have to do this first? `git commit`, (the versioning process *also* makes a commit, why make two when you can make one?). But you have to do `--force` to do that together...Anyways,  then:

`npm version patch` (for x.y.Z, e.g. patch-level releases)
or
`npm version minor` (for x.Y.z, e.g. minor-level releases)
or
`npm version major` (for X.y.z, e.g. major-level releases)

The post-versioning script should build assets, but if it didn't, run `npm run production` to build them.

Commit, and then push and then npm login && publish