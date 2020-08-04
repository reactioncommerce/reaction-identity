# v3.2.0

This release of `reaction-identity` is designed to work with v3.x of the Reaction API.

### Fixes

- fix: Include X-Forwarded-Proto header on Hydra GET requests ([#35](http://github.com/reactioncommerce/reaction-identity/pull/35))

### Chores

- chore(deps): Bump lodash from 4.17.15 to 4.17.19 ([#34](http://github.com/reactioncommerce/reaction-identity/pull/34))

# v3.1.0

This release of `reaction-identity` is designed to work with v3.x of the Reaction API.

### Features

- feat: update to Meteor 1.10.2 ([#31](http://github.com/reactioncommerce/reaction-identity/pull/31))

### Chores

- chore(deps): Bump acorn from 7.1.0 to 7.1.1 ([#30](http://github.com/reactioncommerce/reaction-identity/pull/30))

# v3.0.0

This is the v3.0.0 release of `reaction-identity`, designed to work with v3.0.0 of the Reaction API.

## Features

- feat: add non-English translations [#13](https://github.com/reactioncommerce/reaction-identity/pull/13)
- feat: add remaining identity provider flows [#12](https://github.com/reactioncommerce/reaction-identity/pull/12)
- feat: update to Meteor 1.9 [21](https://github.com/reactioncommerce/reaction-identity/pull/21)

## Fixes

- fix: add missing onCreateUser [#9](https://github.com/reactioncommerce/reaction-identity/pull/14)

## Refactors

- refactor: remove hook which makes initial user "owner" [22](https://github.com/reactioncommerce/reaction-identity/pull/22)

## Chores

- chore: fixed links, text, and commands in readme [#9](https://github.com/reactioncommerce/reaction-identity/pull/9)
- chore: add DCO and contributing info to readme [#7](https://github.com/reactioncommerce/reaction-identity/pull/7)
- chore: Use published image for docker-compose [#4](https://github.com/reactioncommerce/reaction-identity/pull/4)
- chore: reconfigure docker-compose networks [23](https://github.com/reactioncommerce/reaction-identity/pull/23)

## Docs

- docs: update links to use trunk branch of docs [19](https://github.com/reactioncommerce/reaction-identity/pull/19)

## Notes

*These changes were originally tested and released in our alpha and beta releases*

- [v3.0.0-beta.2](https://github.com/reactioncommerce/reaction-identity/releases/tag/v3.0.0-beta.2)
- [v3.0.0-beta](https://github.com/reactioncommerce/reaction-identity/releases/tag/v3.0.0-beta)
- [v3.0.0-alpha.2](https://github.com/reactioncommerce/reaction-identity/releases/tag/v3.0.0-alpha.2)
- [v3.0.0-alpha](https://github.com/reactioncommerce/reaction-identity/releases/tag/v3.0.0-alpha)

*The following Reaction projects are being released one time in coordination as v3.0.0*

- [Reaction API](https://github.com/reactioncommerce/reaction)
- [Reaction Hydra](https://github.com/reactioncommerce/reaction-hydra)
- [Reaction Identity](https://github.com/reactioncommerce/reaction-identity)
- [Reaction Admin (beta)](https://github.com/reactioncommerce/reaction-admin)
- [Example Storefront](https://github.com/reactioncommerce/example-storefront)
- [Reaction Development Platform](https://github.com/reactioncommerce/reaction-development-platform)

*After this release, Reaction releases will no longer be coordinated across all projects - we'll release each project independently, as needed. This means version numbers will no longer be in sync. The newest versions of each project will work together.*
