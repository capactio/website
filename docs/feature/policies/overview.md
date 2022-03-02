---
sidebar_position: 1
---

# Overview

## Introduction

The key Capact feature is dependencies interchangeability. Applications define theirs dependencies by using Interfaces. Policies can be used to control, which dependency Implementation is chosen for an Interface. They allow also to tweak the dependency, by providing additional, Implementation specific parameters.

There are three different policy types:
- [Global policy](./global-policy.md),
- [Action policy](./action-policy.md),
- [Workflow step policy](./workflow-step-policy.md).

The policies are merged and evaluated during Action rendering.

## Syntax

Policy is defined in a form of YAML. It contains three main features:
- selecting Implementations based on their constraints,
- injecting given TypeInstance or additional parameters for Implementation with a set of constraints,
- selecting TypeInstance backends storage: default backend storage for TypeInstances of a given Type, and backend TypeInstance injection.

### Definition of rules for TypeInstance

:::info
This cannot be specified for [Workflow step policy](./workflow-step-policy.md).
:::

This Policy configures a default backend for TypeInstances of a given Type. This configuration is ignored, when Implementation uses `requires` mechanism to inject a specific backend and uses it directly for uploaded TypeInstance via `capact-outputTypeInstance[].backend` property.

To specify default TypeInstance backend storage, use the `typeInstance` property. There are four different options:

- Default backend for all TypeInstances of a given Type in a specific revision:

    ```yaml
    interface:
      rules: [...] # rules for Interfaces

    typeInstance:
      rules:
        - typeRef:
            path: "cap.type.aws.auth.credentials"
            revision: "0.1.0"
          backend:
            id: "31bb8355-10d7-49ce-a739-4554d8a40b63"
            description: "AWS Secret Manager" # optional
    ```

- Default backend for all TypeInstances of a given Type in any revision.
  :::tip
  Such rule has a lower priority than the same entry for TypeRef but with `revision` field.
  :::

  ```yaml
  interface:
    rules: [...] # rules for Interfaces

  typeInstance:
    rules:
      - typeRef:
          path: "cap.type.aws.auth.credentials"
          # Property `revision` is not specified, so this rules applies to any revision.
        backend:
          id: "00fd161c-01bd-47a6-9872-47490e11f996"
          description: "Vault" # optional
  ```


- Default backend for all TypeInstances of a Type with a given path prefix and specific revision.

  ```yaml
  interface:
    rules: [...] # rules for Interfaces

  typeInstance:
    rules:
      - typeRef:
          path: "cap.type.aws.*" # For any Type reference starting with such prefix.
          revision: "0.1.0"
        backend:
          id: "31bb8355-10d7-49ce-a739-4554d8a40b63"
          description: "AWS Secret Manager" # optional

  ```

- Default backend for all TypeInstances of a Type with a given path prefix in any revision.
	:::tip
	Such rule has a lower priority than the same entry for TypeRef but with `revision` field.
	:::

  ```yaml
  interface:
    rules: [...] # rules for Interfaces

  typeInstance:
    rules:
      - typeRef:
          path: "cap.type.aws.*" # For any Type reference starting with such prefix.
          # Property `revision` is not specified, so this rules applies to any revision.
        backend:
          id: "31bb8355-10d7-49ce-a739-4554d8a40b63"
          description: "AWS Secret Manager" # optional

  ```

### Definition of rules for Interface

To specify the Interface, for which the rule is defined, use the `interface` property. There are three different Interface selectors:

- Interface with exact revision:

    ```yaml
    interface:
      rules:
      - interface:
          path: cap.interface.database.postgresql.install
          revision: 0.1.0 # exact revision
        oneOf:
          - implementationConstraints:
              # (...)
    ```

- Interface with any revision:

    ```yaml
    interface:
      rules:
      - interface:
          path: cap.interface.database.postgresql.install
          # any revision
        oneOf:
          - implementationConstraints:
              # (...)
    ```
- any Interface, using `cap.*` as an Interface path:

    ```yaml
    interface:
      rules:
      - interface:
          path: cap.* # any Interface
        oneOf:
          - implementationConstraints:
              # (...)
    ```

Engine will search for rules for a given Interface in the same order as specified in the list above. If an entry for a given Interface is found, then Engine uses it to fetch Implementations from Hub.

For every Interface, Cluster Admin can set the order of selected Implementations, based on theirs constraints. The order of the list is important, as it is taken into account by Engine during queries to Hub. Engine iterates over list of `oneOf` items until it finds at least one Implementation satisfying the Implementation constraints.

### Selecting Implementations

You can select Implementations based on the following Implementation constraints:

- `path`, which specifies the exact path for the Implementation. If the Implementation is found, then **any** revision of the Implementation is used.

    ```yaml
    - interface:
        path: cap.interface.database.postgresql.install
        revision: 0.1.0 # revision is optional, if not provided any Interface revision matches
      oneOf:
        - implementationConstraints:
            path: "cap.implementation.bitnami.postgresql.install" # any revision can be used
    ```

- `attributes`, which specifies the Attributes the selected Implementation must contain.

    ```yaml
    - interface:
        path: cap.interface.database.postgresql.install
      oneOf:
        - implementationConstraints:
            attributes:
              - path: "cap.attribute.cloud.provider.gcp"
                revision: "0.1.0"
              - path: "cap.attribute.workload.stateful"
                # any revision
    ```

- `requires`, which specifies the Type references, which should be included in the `spec.requires` field for an Implementation to be selected.

    ```yaml
    - interface:
        path: cap.interface.database.postgresql.install
      oneOf:
        - implementationConstraints:
            requires:
              - path: "cap.core.type.platform.kubernetes" # any revision
              - path: "cap.type.gcp.auth.service-account"
                revision: "0.1.0" # exact revision
              - path: "cap.type.helm.storage" # TypeInstance backend storage
                revision: "0.1.0" # exact revision
    ```

- Empty constraints, which means any Implementation for a given Interface.

    ```yaml
    - interface:
        path: cap.interface.database.postgresql.install
      oneOf:
        - implementationConstraints: {} # any Implementation that implements the Interface
    ```

You can also deny all Implementations for a given Interface with the following syntax:

```yaml
- interface:
    path: cap.interface.database.postgresql.install
  oneOf: [] # deny all Implementations for a given Interface
```

### Required TypeInstance injection

Along with Implementation constraints, Cluster Admin or System User may configure TypeInstances, which are downloaded and injected in the Implementation workflow. The prerequisite is that the Implementation must contain matching Type Reference in `spec.requires` property, along with defined `alias` for such requirement.

This can be helpful at least in two cases:
- You use Implementations, which are deploying infrastructure on a public cloud (like AWS or GCP) and you want to ensure that everything is deployed in the same account. For example:
  ```yaml
  interface:
    rules:
      - interface:
          path: cap.interface.database.postgresql.install
        oneOf:
          - implementationConstraints:
              requires:
               - path: "cap.type.gcp.auth.service-account"
            inject:
              requiredTypeInstances:
                - id: 9038dcdc-e959-41c4-a690-d8ebf929ac0c
                  description: "GCP Service Account" # optional
  ```

- You use Implementations, which requires storing data in a given storage backend. For example:
	```yaml
  interface:
    rules:
      - interface:
        path: cap.interface.database.postgresql.install
      oneOf:
        - implementationConstraints:
          requires:
            - path: "cap.type.helm.storage"
        inject:
          requiredTypeInstances:
            - id: "31bb8355-10d7-49ce-a739-4554d8a40b63"
            description: "Helm storage backend"
	```

The rule defines that Engine should select Implementation, which requires GCP Service Account TypeInstance. To inject the TypeInstance in a proper place, the Implementation must define `alias` for a given requirement:

```yaml
  requires:
    cap.type.gcp.auth:
      allOf:
        - name: service-account
          alias: gcp-sa # required for TypeInstance injection based on Policy
          revision: 0.1.0
    cap.core.type.hub.storage:
      allOf:
        - name: cap.type.helm.storage
          alias: helm-storage # required for TypeInstance injection based on Policy
          revision: 0.1.0
```

:::info
Instructions how to create a TypeInstance using the Capact CLI can be found [here](./../../cli/commands/capact_typeinstance_create.md).
:::

If the `alias` property is defined for an item from `requires` section, Engine injects a workflow step which downloads a given TypeInstance by ID and outputs it under the `alias`. For this example, in the Implementation workflow, the TypeInstance value is available under `{{workflow.outputs.artifacts.gcp-sa}}`. Injected storage TypeInstance is also available under `{{workflow.outputs.artifacts.helm-storage}}`, but for `capact-outputTypeInstances[].backend` you must use alias name, in this case `helm-storage`.

Even if the Implementation satisfies the constraints, and the `alias` is not defined or `inject.typeInstances[].typeRef`, the TypeInstance is not injected in workflow. In this case Engine doesn't return an error.

### Definition of defaults for Interface

Using the `default.inject.requiredTypeInstances`, you can configure common TypeInstances, which are injected in the Implementation workflow for all Interface rules. For example, to ensure that everything is deployed using the same backend, you can use: 
```yaml
  interface:
    rules: [...] # rules for Interfaces

    default: # properties applied to all rules above
      inject:
        requiredTypeInstances:
          - id: 9038dcdc-e959-41c4-a690-d8ebf929ac0c
            description: "Helm storage (cap.type.helm.storage:0.1.0)"
```

TypeInstances defined in the `interface.rules[].inject` are preferred than TypeInstance `defaults`. That means, that in case of TypeInstance for the same Type defined in the both places, Engine would inject TypeInstance from `interface.rules[].inject`.

### Additional parameter injection

You can also provide additional parameters to tweak the Implementation. The Implementation parameters Type is specified in the Implementation manifest in `.spec.additionalInput.parameters`. For example, for AWS RDS for PostgreSQL Implementation you can provide `additional-parameters` of Type `cap.type.aws.rds.postgresql.install-input`:

```yaml
metadata:
  prefix: cap.implementation.aws.rds.postgresql
  name: install
spec:
  additionalInput:
    parameters:
      additional-parameters:
        typeRef:
          path: cap.type.aws.rds.postgresql.install-input
          revision: 0.1.0
```

For example, to change the AWS region to `us-east-1` for the AWS RDS for PostgreSQL Implementation, you can provide the following policy:

```yaml
interface:
  rules:
    - interface:
        path: cap.interface.database.postgresql.install
      oneOf:
        - implementationConstraints:
            path: "cap.implementation.aws.rds.postgresql.install"
          inject:
            additionalParameters: # Injects additional parameters for the Implementation
              - name: additional-parameters # Name must match one of the parameter defined under `additionalInput.parameters` in the Implementation
                value:
                  region: us-east-1
```

### Additional TypeInstance injection

Apart from additional parameters, you can also inject additional TypeInstance to change Implementation behavior. The supported additional TypeInstances by Implementation are specified in the Implementation manifest under the `.spec.additionalInput.typeInstances` property:

```yaml
metadata:
  prefix: cap.implementation.mattermost.mattermost-team-edition
  name: install
spec:
  additionalInput:
    typeInstances:
      postgresql:
        typeRef:
          path: cap.type.database.postgresql.config
          revision: 0.1.0
        verbs: ["get"]
```

For example, for Mattermost installation, you can provide existing PostgreSQL database using this feature:

```yaml
interface:
  rules:
    - interface:
        path: cap.interface.productivity.mattermost.install
      oneOf:
        - implementationConstraints:
            path: "cap.implementation.mattermost.mattermost-team-edition.install"
          inject:
            additionalTypeInstances: # Injects additional parameters for the Implementation
              - name: postgresql # Name must match one of the parameter defined under `additionalInput.parameters` in the Implementation
                id: 5077d0e2-95d3-495f-b7b3-f59c99a547fa
```

## Modifying policies

There are different ways to set policy, depending on its type.

- To view and modify Global policy, read the [Configuration](./global-policy.md#configuration) section.
- To set Action policy, read the [Provide Action policy, when creating Action using Capact CLI](./action-policy.md#provide-action-policy-when-creating-action-using-capact-cli) paragraph.
- To learn how to define Workflow step policy in the Implementation manifest, see the [Workflow step policy](./workflow-step-policy.md) document.

## Merging of different policies

There are three different policies, which are merged together, when rendering the Action: Global, Action and Workflow step policies. Merging is necessary to calculate the final policy, which is used to select an Implementation and inject TypeInstances and parameters. The priority order of the policies is configurable by the Capact Admin. The default order is (highest to lowest):
1. Action policy
2. Global policy
3. Workflow step policy

The following rules apply, when the Engine merges the policy rules:
1. Two policy rules are merged, when they have the same `interface` field. Merging is done by joining the `oneOf` lists, based on the priority order.
2. If in the merged policy rules, there are two elements in `oneOf`, with the same `implementationConstraints`, then we merge them into a single element:
   - `additionalInput` of the elements are deep merged based on the priority order
   - for both `requiredTypeInstances` and `additionalTypeInstances`, the elements are joined together. If there are two TypeInstances with the same Type Reference, then the one from the higher priority order policy is chosen.

## TypeInstance storage backend priority order

Engine selects TypeInstance backend in a given order:

1. If backend is enforced by Implementation via `spec.requires` section:
    1. Uses backend specified under `inject.requiredTypeInstances` for a given Interface rule. _If not found:_
    2. Uses default specified under `default.inject.requiredTypeInstances` for all Interface Policy. _If not found:_
    3. Such Implementation is ignored by Engine as its requirements are not satisfied.
2. If not, checks default storage backend for TypeInstance of a given Type specified under `typeInstance` property. Engine tries to find:
    1. Exact match based on Type path and revision. _If not found:_
    2. Exact match based only on Type path. _If not found:_
    3. Pattern match based on Type path and revision. _If not found:_
    4. Pattern match based only on Type path. _If not found:_
    5. Such TypeInstances is created without explicit storage backend **ID**. As a result, it is stored in built-in Local Hub storage.

## Change priority order of the policies

You can change the policy priority order, by using the following command:
```bash
helm -n capact-system upgrade capact capactio/capact \
  --devel \
  --reuse-values \
  --set 'engine.policyOrder=WORKFLOW\,ACTION\,GLOBAL'
```

The command above would change the policy order to (highest to lowest):
1. Workflow step policy
2. Action policy
3. Global policy
