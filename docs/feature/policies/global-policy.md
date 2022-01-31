---
sidebar_position: 2
---
# Global policy

The Global policy, is a policy used for every Action in Capact. This policy is configured by the Capact Admin and can be used to:

- set recommended configuration values for Implementations (e.g. always use AWS RDS in Multi-AZ for PostgreSQL databases)
- provide credentials for external services (e.g. inject a GCP Service Account TypeInstance for Google Cloud Platform Implementations)

## Example

The following YAML snippet presents a full Global policy example with additional comments:

```yaml
interface: # Defines Policy for Interface rendering
  rules:
    - interface: # Rules for Interface with exact path in exact revision
        path: "cap.interface.database.postgresql.install"
        revision: "0.1.0"
      oneOf: # Engine follows the order of the Implementation selection,
             # finishing when at least one matching Implementation is found
        - implementationConstraints: # In first place, find and use an Implementation which:
            attributes: # contains the following Attributes:
              - path: "cap.attribute.cloud.provider.gcp"
                revision: "0.1.0" # in exact revision
            requires: # AND has the following Type references defined in the `spec.requires` property:
              - path: "cap.type.gcp.auth.service-account"
                # in any revision
          inject:
            requiredTypeInstances: # For such Implementation, inject the following TypeInstances if matching Type Reference is used in `Implementation.spec.requires` property along with `alias`:

              # Find Type Reference for the given TypeInstance ID. Then, find the alias of the Type reference in `spec.requires` property.
              # If it is defined, inject the TypeInstance with ID `9038dcdc-e959-41c4-a690-d8ebf929ac0c` under this alias.
              - id: 9038dcdc-e959-41c4-a690-d8ebf929ac0c
                description: "GCP Service Account" # optional
            additionalParameters: # Injects additional parameters for the Implementation
              - name: additional-parameters # Name must match one of the parameter defined under `additionalInput.parameters` in the Implementation
                value:
                  replicaCount: 3
            additionalTypeInstances: # Injects additional TypeInstances for the Implementation
              - name: sample # Name must match one of the parameter defined under `additionalInput.typeInstances` in the Implementation
                id: 0b6dba9a-d111-419d-b236-357cf0e8603a

        - implementationConstraints: # In second place find and select Implementation which:
            attributes: # contains the following attributes
             - path: cap.attribute.cloud.provider.aws
               # in any revision

        - implementationConstraints: # In third place, find and select Implementation which:
            path: "cap.implementation.bitnami.postgresql.install" # has exact path

         # If not found any of such Implementations defined in `oneOf`, return error.

    - interface:
        path: "cap.*" # For any other Interface
        # (looked up in third place, if there is no entry under `rules` for a given Interface `path:revision` or `path`)
      oneOf: # Engine follows the order of the Implementation selection,
             # finishing when at least one matching Implementation is found
        - implementationConstraints: # In first place, select Implementation which:
            requires: # has the following Type references defined in the `spec.requires` property:
              - path: "cap.core.type.platform.kubernetes"
                # in any revision

        - implementationConstraints: {} # If not found, fallback to any Implementation which has requirements that current system satisfies.

        # If not found any of such Implementations defined in `oneOf`, return error.
```

## Configuration

You can view and update the Global policy using dedicated commands in Capact CLI. You can also modify policy during Capact installation or upgrade. This section describes all policy configuration options.

### View current Global policy

To view current Global policy, use the following command:

```bash
capact policy get
```

You can use additional flags to configure the command behavior, such as output format. Run `capact policy get -h` to see all available flags.

### Modify Global policy using CLI

> **NOTE:** If you update Policy using CLI, Policy will be restored to default every time you upgrade Capact installation. To avoid such scenario, update the Policy during Capact installation or upgrade. To learn how to do it, read the section [Modify Policy with Capact installation/upgrade overrides](#modify-global-policy-with-capact-installationupgrade-overrides).

To update the policy interactively using CLI, run:

```yaml
capact policy edit
```

You can also update the policy from YAML file, using command:

```yaml
capact policy apply -f {path}
```

To get familiar with an example content of the file, see the [Example](#example) section.

### Modify Global policy with Capact installation/upgrade overrides

1. Prepare a `cluster-policy.overrides.yaml` file with the following content:

    ```yaml
    engine:
        clusterPolicy:
          interface:
   					rules:
              - interface:
                  path: "cap.*"
                oneOf:
                  - implementationConstraints: # Prefer Implementations which require Kubernetes TypeInstance
                      requires:
                          - path: "cap.core.type.platform.kubernetes"
                  - implementationConstraints: { } # If there are no such Kubernetes Implementations, take anything
    ```

    To know how to define the Interface rules, see the [Policy syntax](./overview.md#syntax) section.

2. Pass the `cluster-policy.overrides.yaml` as Helm chart values override with the `-f /path/to/cluster-policy.overrides.yaml` parameter.

   1. During Capact installation:

   Follow the [Kubernetes installation guide](https://github.com/capactio/capact/tree/main/deploy/kubernetes/README.md). While installing Capact Helm chart, provide additional overrides:

   ```bash
   helm install capact ./charts/capact -n capact-system -f /path/to/cluster-policy.overrides.yaml
   ```

   1. During Capact chart upgrade:

   ```bash
   helm upgrade capact ./charts/capact -n capact-system --reuse-values -f /path/to/cluster-policy.overrides.yaml
   ```

To read more about Capact installation and upgrade, see the [`README.md`](https://github.com/capactio/capact/blob/main/deploy/kubernetes/README.md) document of the Capact deployment.

### Reloading policy by Engine

Once you update the ConfigMap with Global policy, the Engine will reload it instantly, even for Action which are being rendered. In some cases, it may cause rendering error for a given Action. Even though the Engine will retry rendering until it reaches a configured limit of retries, it is recommended to not update the Global policy while some Actions are rendering.
