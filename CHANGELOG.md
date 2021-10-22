# Changelog

<a name="2.0.5"></a>
## [2.0.5](https://github.com/coatyio/binding.mqtt.js/compare/v2.0.4...v2.0.5) (2021-10-22)

This patch release fixes an issue where a stopped Coaty agent keeps the Node.js process from terminating.

### Bug Fixes

* **mqtt-binding:** on unjoining only deregister client event handlers that have been registered previously to prevent dangling asynchronous I/O operations which keep Node.js event loop from exiting ([b76c22c](https://github.com/coatyio/binding.mqtt.js/commit/b76c22cc5ad188e55cefc7eeedf8b02815ee7ed8))

<a name="2.0.4"></a>
## [2.0.4](https://github.com/coatyio/binding.mqtt.js/compare/v2.0.3...v2.0.4) (2021-07-01)

This patch release fixes an issue that causes publications to be blocked after connection downtime in some rare situations.

### Bug Fixes

* **mqtt-binding:** prevent publications from being not submitted after reconnection in some rare situations ([c2dc11f](https://github.com/coatyio/binding.mqtt.js/commit/c2dc11fd7754855a7213d6061134e14c3dde1bec))

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

