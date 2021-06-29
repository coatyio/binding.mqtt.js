# Changelog

<a name="2.0.3"></a>
## [2.0.3](https://github.com/coatyio/binding.mqtt.js/compare/v2.0.2...v2.0.3) (2021-06-29)

This patch release optimizes keep-alive behavior of the MQTT binding to detect broken connections more quickly.

<a name="2.0.2"></a>
## [2.0.2](https://github.com/coatyio/binding.mqtt.js/compare/v2.0.1...v2.0.2) (2020-09-25)

This patch release ensures that broker URLs with protocol `mqtt` or `mqtts` can be properly resolved in browsers.

### Bug Fixes

* ensure broker URL with protocol `mqtt` or `mqtts` is converted to `ws` or `wss` when running in browser ([37cf183](https://github.com/coatyio/binding.mqtt.js/commit/37cf183970ed10f4211ad18f3b2b23a0b1a6d667))

<a name="2.0.1"></a>
## [2.0.1](https://github.com/coatyio/binding.mqtt.js/compare/v2.0.0...v2.0.1) (2020-06-17)

### Bug Fixes

* correct UTF8 byte count calculation of high surrogate pairs ([e9d1a84](https://github.com/coatyio/binding.mqtt.js/commit/e9d1a84c917ee44ba998dc383b540398eb5d2e6c))
* **dependency:** upgrade `@coaty/core` dependency version to fix binding-related issues ([7da0315](https://github.com/coatyio/binding.mqtt.js/commit/7da0315b8ecfed39c053fb30b9ae80d1e88b956f))

<a name="2.0.0"></a>
# 2.0.0 (2020-06-04)

Initial release of Coaty JS MQTT binding.

