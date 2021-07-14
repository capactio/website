---
sidebar_position: 1
---

# Local Installation

Use Capact CLI to create local Kubernetes cluster and install Capact on it.

## Prerequisites
- [Docker](https://www.docker.com/) installed
- [`kubectl`](https://kubernetes.io/docs/tasks/tools/) installed
- Capact CLI installed according to the [Getting Started](./../cli/getting-started.mdx#install) guide

## Create local Kubernetes cluster

To create local [kind](https://kind.sigs.k8s.io/) cluster, run the following command:

```bash
capact environment create kind
```

Verify that your local cluster is running by listing all Nodes:

```bash
kubectl get nodes
```

The output should be similar to:

```bash
NAME                            STATUS   ROLES    AGE    VERSION
kind-dev-capact-control-plane   Ready    master   3m5s   v1.19.1
```

## Install Capact

Once you have your local Kubernetes cluster set up, install Capact with the following command:

```bash
capact install
```

> **NOTE** You can customize the behavior with additional flags. See the all options in the [`capact install`](../cli/commands/capact_install.md) command documentation.

Wait for the command to finish.

## Next steps

Configure Capact CLI to connect to your fresh local Capact installation. Follow the steps in the [First use](../cli/getting-started#first-use) section of the CLI Getting started guide. Enjoy using Capact!