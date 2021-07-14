---
sidebar_position: 3
---
# Action policy

The Action policy, is an optional policy, which can be provided to a single Action in Capact. This policy can be used:
- in case the User wants to enforce a specific Implementation for an Interface,
- when the User wants to provide additional parameters to an Implementation.

## Example

The following YAML snippet presents an Action policy example with additional comments:

```yaml
rules: # Configures the following behavior for Engine during rendering Action
  - interface: # Rules for Interface with exact path
      path: cap.interface.productivity.rocketchat.install
    oneOf:
      - implementationConstraints: # Enforces the Helm RocketChat Implementation
          path: "cap.implementation.rocketchat.helm.install"
        inject:
          additionalInput: # Injects additional parameters for the Implementation
            additional-parameters:
              replicaCount: 3
  - interface: # Configures a second rule in the Action policy
      path: cap.interface.database.mongodb.install
    oneOf:
      - implementationConstraints:
          path: "cap.implementation.bitnami.mongodb.install"
        inject:
          additionalInput:
            additional-parameters:
              image:
                registry: docker.io
                pullPolicy: Always
```

## Provide Action policy, when creating Action using Capact CLI

To provide the Action policy, when creating an Action you can use the `--action-policy-from-file` flag to the Capact CLI. First, create a YAML file with the desired Action policy, for example:

```yaml
rules:
  - interface:
      path: cap.interface.productivity.rocketchat.install
    oneOf:
      - implementationConstraints:
          path: "cap.implementation.rocketchat.install"
        inject:
          additionalInput:
            additional-parameters:
              replicaCount: 3
```
To know how to define the policy rules, see the [Policy syntax](./overview.md#syntax) section.
Then, provide the path to the created policy YAML file using the `--action-policy-from-file` flag, when creating the Action:

```bash
capact action create \
  cap.interface.productivity.rocketchat.install \
  --action-policy-from-file {path-to-policy-file}
```
