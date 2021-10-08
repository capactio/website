---
sidebar_position: 1
---

# Local Installation

Use Capact CLI to create local Kubernetes cluster and install Capact on it.

## Prerequisites
- [Docker](https://www.docker.com/) installed
- Capact CLI installed according to the [Getting Started](./../cli/getting-started.mdx#install) guide

## Create local Kubernetes cluster

To create local [kind](https://kind.sigs.k8s.io/) cluster, run the following command:

```bash
capact environment create kind --wait 5m
```

> **NOTE** You can customize the behavior with additional flags. See the all options in the [`capact environment create kind`](../cli/commands/capact_environment_create_kind.md) command documentation.

## Install Capact

Once you have your local Kubernetes cluster set up, install Capact with the following command:

```bash
capact install
```

> **NOTE** You can customize the behavior with additional flags. See the all options in the [`capact install`](../cli/commands/capact_install.md) command documentation.

Wait for the command to finish.

## Next steps

Configure Capact CLI to connect to your fresh local Capact installation. Follow the steps in the [First use](../cli/getting-started.mdx#first-use) section of the CLI Getting started guide. Enjoy using Capact!

## Cleanup

To remove your local Kubernetes cluster created in the [Create local Kubernetes cluster](#create-local-kubernetes-cluster) section, run the following command:

```bash
capact environment delete kind
```

> **NOTE:** This command deletes the local cluster with all data, including history of executed Actions and created TypeInstances. Make sure you cleaned up all external resources (e.g. managed PostgreSQL databases) based on the TypeInstance data.
