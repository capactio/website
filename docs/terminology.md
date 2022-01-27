---
sidebar_position: 3
---
# Terminology

This document lists and explains all terms used through the Capact documentation.

> There are only two hard things in Computer Science: cache invalidation and naming things.
>
> -- Phil Karlton

## Common terms

### Capability

Characteristic of an application, described with an Interface or Implementation. A capability may be a prerequisite (dependency) for other Implementations.

### Action

Task that the Engine schedules, and the Runner executes. Action is usually in a form of an arbitrary workflow.

### Runner

Action, which handles execution of other Action. Runner is usually defined in form of Interface and Implementation.

There is also a built-in Runner, which is built-in into platform-specific Engine implementation. It is defined with only abstract Interface and doesn't have Implementation manifest.

To learn more about runners, see the dedicated [`runner.md`](./architecture/runner.md) document.

## Components

There are the following components in the system:

- [OCF](./architecture/e2e-architecture.md#ocf)
- [CLI](./architecture/e2e-architecture.md#cli)
- [Gateway](./architecture/e2e-architecture.md#gateway)
- [Engine](./architecture/e2e-architecture.md#engine)
- [Hub](./architecture/e2e-architecture.md#hub)
- [SDK](./architecture/e2e-architecture.md#sdk)

## Entities

There are the following entities in the system:

- [Attribute](#attribute)
- [Implementation](#implementation)
- [Interface](#interface)
- [RepoMetadata](#repometadata)
- [Type](#type)
- [TypeInstance](#typeinstance)
- [Vendor](#vendor)

### RepoMetadata

RepoMetadata stores read-only information about the [Hub](/docs/architecture/e2e-architecture#hub), such as Hub version, supported OCF specification version, etc. This entity should be placed in the `core` directory in your Hub content. In the future, it will be embedded into the Hub server.

The RepoMetadata format is defined in [repo-metadata.json](https://github.com/capactio/capact/tree/main/ocf-spec/0.0.1/schema/repo-metadata.json).

:::note
Currently, the **spec.implementation** and **spec.ocfVersion.supported** properties are not supported by the Hub server.
:::

### Attribute

Attribute provides an option to categorize [Implementations](#implementation), [Types](#type) and [TypeInstances](#typeinstance). For example, you can use **cap.core.attribute.workload.stateful** Attribute to find and filter Stateful Implementations.

The Attribute specification is defined in [attribute.json](https://github.com/capactio/capact/tree/main/ocf-spec/0.0.1/schema/attribute.json).

### Type

Type represents an object, such as database, application, but also a simple primitive data, like an IP address. The Type needs to be described using JSON Schema specification.

Type is used in [Interface](#interface) and [Implementation](#implementation) as a description and validation of possible input and output parameters. The object, which stores a JSON value matching JSON schema from Type, is called [TypeInstance](#typeinstance).

The core Types are placed in the `core` directory. In the future, core Types will be embedded into the Hub server.

To learn more, see the [Type features](/docs/feature/type-features) document.

The Type specification is defined in [type.json](https://github.com/capactio/capact/tree/main/ocf-spec/0.0.1/schema/type.json).

:::note
Currently, Type validation based on JSON Schema is not supported.
:::

### TypeInstance

Capact is strongly typed, and all objects must be described with JSON Schema. An actual object of a Type is called a TypeInstance. Data stored in an object MUST be valid against JSON Schema from referenced Type.

:::note
In the future, details about health and metrics of a given TypeInstance will be attached to it. Currently, this functionality is not implemented. To learn more, see the ["Extend TypeInstance with instrumentation and metrics"](https://github.com/capactio/capact/issues/513) issue.
:::

### Interface

Interface defines an action signature. It describes the action name, input, and output parameters. It is a similar concept that the one used in programming languages.

The Interface specification is defined in [interface.json](https://github.com/capactio/capact/tree/main/ocf-spec/0.0.1/schema/interface.json).

### InterfaceGroup

InterfaceGroup logically groups various Interfaces. This allows end-users to find all Interfaces, which for example operate on PostgreSQL instances. InterfaceGroup is required even if you have only one Interface.

The InterfaceGroup specification is defined in [interface-group.json](https://github.com/capactio/capact/tree/main/ocf-spec/0.0.1/schema/interface-group.json).

### Implementation

Implementation holds the definition of an [Action](#action) and its prerequisites (dependencies). It allows you to define different ways on how a given action should be executed. For example, for **postgres.install** Interface, have **aws.postgresql.install** and **gcp.postgresql.install** Implementations. Implementation must implement at least one Interface.

The Implementation specification is defined in [implementation.json](https://github.com/capactio/capact/tree/main/ocf-spec/0.0.1/schema/implementation.json).

### Vendor

Vendor defines details of an external Hub server. This will be part of the Hub federation feature.

The Vendor specification is defined in [vendor.json](https://github.com/capactio/capact/tree/main/ocf-spec/0.0.1/schema/vendor.json).

:::note
Currently, it is not supported by the Hub server.
:::
