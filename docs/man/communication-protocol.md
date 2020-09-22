---
layout: default
title: Coaty MQTT Communication Protocol
---

# Coaty MQTT Communication Protocol

> This specification conforms to Coaty MQTT Communication Protocol Version 3

## Version History

* **Version 3**: complies with Coaty 2, not backward compatible with v2
  * remove readable topic feature
  * change topic structure and topic filters
  * change topic and payload of Update event (removing partial updates)
  * redesign events related to IO routing
* **Version 2**: add Call-Return pattern; backward compatible with v1
* **Version 1**: initial specification

## Table of Contents

* [Introduction](#introduction)
* [Requirements](#requirements)
* [Topic Structure](#topic-structure)
* [Topic Filters](#topic-filters)
* [Message Payloads](#message-payloads)

## Introduction

This document specifies the common Coaty MQTT Communication Protocol that must
be implemented by all language-specific Coaty MQTT communication bindings to be
interoperable.

The *reference implementation* of this protocol can be found in the
[binding.mqtt.js](https://github.com/coatyio/binding.mqtt.js) repository on
GitHub.

With a Coaty MQTT binding, Coaty communication events are transmitted via the
MQTT publish-subscribe messaging protocol. The format of MQTT topic names and
payloads conforms to the [MQTT](https://mqtt.org/) Specification Version 3.1.1.

## Requirements

General requirements for MQTT bindings are as follows:

* The binding should be compatible with any MQTT broker that supports the MQTT
  v3.1.1 or v5.0 protocols. The binding itself should connect to a broker using
  the MQTT v3.1.1 protocol.
* Always use MQTT QoS level 0 for publications, subscriptions, and last will as
  delivery of Coaty communication events should not rely on a higher QoS level.
* Always connect to the MQTT message broker with a clean MQTT session to get a
  clean new broker session on each (re)-connection.
* Emit communication state `Online` on connection to the MQTT broker, and
  `Offline` on disconnection.
* If connection is broken, defer publications until next reconnection.
* If connection is broken, support automatic resubscription of all subscribed
  topics on every reconnection.
* On (re)connection, register a last will to be published for the unjoin event.
* On successful (re)connection, join events must be published first in the given
  order.

Note that MQTT allows applications to send MQTT Control Packets of size up to
256 MB. For Publish messages, this includes the message topic of size up to 64K,
the payload, as well as some bytes of header data.

> To debug MQTT messages published by a Coaty agent, you can use any MQTT client
> and subscribe to the `coaty/#` topic. We recommend [MQTT
> Explorer](https://mqtt-explorer.com/), a cross-platform client with a
> graphical user interface for structured topic inspection.

## Topic Structure

[Coaty communication event
patterns](https://coatyio.github.io/coaty-js/man/communication-events/) are
mapped onto MQTT publication and subscription messages. Coaty defines its own
topic structure that comprises the following MQTT topic levels:

* **ProtocolName** - the name of the protocol, i.e. `coaty`.
* **ProtocolVersion** - for versioning the communication protocol. The protocol
  version number conforming to this specification is shown at the top of this
  page.
* **Namespace** - namespace used to isolate different Coaty applications.
  Communication events are only routed between agents within a common namespace.
* **Event** - event type and filter of a [Coaty communication
  event](https://coatyio.github.io/coaty-js/man/communication-events/).
* **SourceObjectID** - globally unique ID (UUID) of the event source that is
  publishing a topic, either an agent's identity or that of the publishing IO
  source.
* **CorrelationID** - UUID that correlates a response message with its request
  message. This level is only present in two-way event patterns, i.e.
  Discover-Resolve, Query-Retrieve, Update-Complete, and Call-Return event
  patterns.

UUIDs (Universally Unique Identifiers) must conform to the UUID version 4 format
as specified in [RFC 4122](https://www.ietf.org/rfc/rfc4122.txt). In the string
representation of a UUID the hexadecimal values "a" through "f" are output as
lower case characters.

> **Note**: Raw events and external IoValue events do not conform to this topic
> structure. They are published and subscribed on an application-specific topic
> string, which can be any valid MQTT topic that must not start with
> `<ProtocolName>/`.

A topic name for publication is composed as follows:

```
// Publication of one-way event
<ProtocolName>/<ProtocolVersion>/<Namespace>/<Event>/<SourceObjectId>

// Publication of two-way event (both request and response)
<ProtocolName>/<ProtocolVersion>/<Namespace>/<Event>/<SourceObjectId>/<CorrelationId>
```

The ProtocolVersion topic level represents the communication protocol version of
the publishing party, as a positive integer.

The Namespace topic level **must** specify a non-empty string. It must not
contain the characters `NULL (U+0000)`, `# (U+0023)`, `+ (U+002B)`, and `/
(U+002F)`.

To denote event types in the Event topic level, 3-character shortcuts are used:

| Event Type            | Shortcut       |
|-------------------    |--------------- |
| Advertise             | ADV            |
| Deadvertise           | DAD            |
| Channel               | CHN            |
| Associate             | ASC            |
| IoValue               | IOV            |
| Discover              | DSC            |
| Resolve               | RSV            |
| Query                 | QRY            |
| Retrieve              | RTV            |
| Update                | UPD            |
| Complete              | CPL            |
| Call                  | CLL            |
| Return                | RTN            |

When publishing an Advertise event the Event topic level **must** include a
filter of the form: `ADV:<filter>`. The filter must not be empty. It must not
contain the characters `NULL (U+0000)`, `# (U+0023)`, `+ (U+002B)`, and `/
(U+002F)`. Framework implementations specify the core type (`ADV:<coreType>`) or
the object type (`ADV::<objectType>`) of the advertised object as filter in
order to allow subscribers to listen just to objects of a specific core or
object type.

When publishing an Update event the Event topic level **must** include a filter
of the form: `UPD:<filter>`. The filter must not be empty. It must not contain
the characters `NULL (U+0000)`, `# (U+0023)`, `+ (U+002B)`, and `/ (U+002F)`.
Framework implementations specify the core type (`UPD:<coreType>`) or the object
type (`UPD::<objectType>`) of the updated object as filter in order to allow
subscribers to listen just to objects of a specific core or object type.

When publishing a Channel event the Event topic level **must** include a channel
identifier of the form: `CHN:<channelId>`. The channel ID must not be empty. It
must not contain the characters `NULL (U+0000)`, `# (U+0023)`, `+ (U+002B)`, and
`/ (U+002F)`.

When publishing a Call event the Event topic level **must** include an operation
name of the form: `CLL:<operationname>`. The operation name must not be empty.
It must not contain the characters `NULL (U+0000)`, `# (U+0023)`, `+ (U+002B)`,
and `/ (U+002F)`.

When publishing an Associate event the Event topic level **must** include an IO
context name of the form: `ASC:<contextName>`. The context name must not be
empty. It must not contain the characters `NULL (U+0000)`, `# (U+0023)`, `+
(U+002B)`, and `/ (U+002F)`.

For any request-response event pattern the receiving party must respond with an
outbound message topic containing the original CorrelationID of the incoming
message topic. Note that the Event topic level of response events **must never**
include a filter field.

## Topic Filters

Each MQTT binding must subscribe to topics according to the defined topic
structure:

```
// Subscription for one-way events
<ProtocolName>/<ProtocolVersion>/<Namespace>/<Event>/+
<ProtocolName>/<ProtocolVersion>/+/<Event>/+

// Subscription for two-way request events
<ProtocolName>/<ProtocolVersion>/<Namespace>/<Event>/+/+
<ProtocolName>/<ProtocolVersion>/+/<Event>/+/+

// Subscription for two-way response events
<ProtocolName>/<ProtocolVersion>/<Namespace>/<Event>/+/<CorrelationID>
<ProtocolName>/<ProtocolVersion>/+/<Event>/+/<CorrelationID>
```

These subscriptions, especially response subscriptions, should be unsubscribed
as soon as they are no longer needed by the agent. Since Coaty uses Reactive
Programming `Observables` to observe communication events, MQTT subscription
topics should be unsubscribed whenever the corresponding observable is
unsubscribed by the application.

Note that the Namespace topic level **must** either specify a non-empty string
or a single-level wildcard (`+`), depending on whether the agent should restrict
communication to a given namespace or enable cross-namespacing communication.

When subscribing to a response event, the Event topic level **must not** include
an event filter.

When subscribing to an Advertise event, the Event topic level **must** include
the Advertise filter: `ADV:<filter>` or `ADV::<filter>`.

When subscribing to a Channel event, the Event topic level **must** include the
channel ID: `CHN:<channelId>`.

When subscribing to an Update event, the Event topic level **must** include
the Update filter: `UPD:<filter>` or `UPD::<filter>`.

When subscribing to a Call event, the Event topic level **must** include the
operation name: `CLL:<operationname>`.

When subscribing to an Associate event, the Event topic level **must** include
the IO context name: `ASC:<contextName>`.

When subscribing to a response event, the CorrelationID topic level **must**
include the CorrelationID of the correlated request.

## Message Payloads

Message payloads for the Coaty events described above consist of attribute-value
pairs in JavaScript Object Notation format ([JSON](http://www.json.org), see [RFC
4627](https://www.ietf.org/rfc/rfc4627.txt)).

Message payloads **must** be serialized with a JSON serializer that
encodes/decodes event data as a UTF-8 string.

> **Note**: Payloads of Raw events and IoValue events with raw data do not
> conform to this specification. They are published as byte arrays encoded in
> any application-specific format.

---
Copyright (c) 2020 Siemens AG. This work is licensed under a
[Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
