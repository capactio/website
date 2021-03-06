---
sidebar_position: 1
---

# Introduction

By default, Capact stores the state in a form of TypeInstances, that contain static data. The data is stored unencrypted in the same Capact Local Hub database.

However, there are many cases, where static, unencrypted data is not enough. For example, some sensitive data should be stored in a secure way. Or, Helm chart details may quickly become outdated in case of any external change (e.g. upgrade with `helm` CLI).

That's why Capact introduced storage backends functionality. Storage backend is a service which manages external TypeInstance's `value` for every resource version, as well as the `lockedBy` piece of information.

It supports full TypeInstance lifecycle, that is:
- create (create first revision),
- get a given revision,
- update (create a new revision),
- delete a given revision,
- delete the whole object,
- lock the whole object,
- and unlock the whole object.

## Available storage backends

Currently, we have the following storage backends available:

- [AWS Secrets Manager](./aws-secrets-manager.md)
- [Helm](./helm.mdx)

Each storage backend is installed separately using Capact Actions. See corresponding documents for each storage to learn how to install and configure them.

## Development

To develop your own storage backend, create a gRPC service which implements the [storage backend Protocol Buffers schema](https://github.com/capactio/capact/blob/main/hub-js/proto/storage_backend.proto). Depending on the use case, choose one of the following service interfaces to implement your storage backend:
- `ValueAndContextStorageBackend`: handles the full lifecycle of the TypeInstance. TypeInstance value is always provided as a part of request. Context may be provided but it is not required.
- `ContextStorageBackend`: it handles TypeInstance lifecycle based on the context, which is required. TypeInstance value is never passed in input arguments.

You can use the generated server code for the following languages:
- [Go](https://github.com/capactio/capact/tree/main/pkg/hub/api/grpc/storage_backend),
- [TypeScript (Node.js)](https://github.com/capactio/capact/tree/main/hub-js/src/generated/grpc),
- or generate your own based on the Protocol Buffers schema.
