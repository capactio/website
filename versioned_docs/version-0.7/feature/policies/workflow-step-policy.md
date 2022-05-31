---
sidebar_position: 4
---
# Workflow step policy

The Workflow step policy, is an optional policy, which can be provided in the Implementation manifest in an Action step. This policy can be used when:
- an Implementation depends on another Implementation and an Interface cannot be used,
- the Content Creator wants to prefer some Implementation in the Action steps.

This policy can be only provided by the Content Creator and cannot be changed without uploading a new Implementation manifest. Other policies can overwrite it, when a different policy has a higher priority. To check the default policy priority order see [this section](./overview.md#merging-of-different-policies).

## Example

The following YAML snippet presents an Action step in the Implementation with a Workflow step policy:

```yaml
- - capact-action: postgresql.install
    name: install-db
    capact-when: postgresql == nil
    capact-policy:
      interface:
        rules: # Configures the following behavior for Engine during rendering Action for this step
          - interface: # Rules for Interface with exact path
              path: cap.interface.database.postgresql.install
            oneOf:
              - implementationConstraints: # Enforces that the cap.implementation.bitnami.postgresql.install is selected
                  path: "cap.implementation.bitnami.postgresql.install"
```

> **NOTE:** Instead of providing the full Interface path you can use the alias from the Interfaces imported in the Implementation:
> ```yaml
> spec:
>   imports:
>     - interfaceGroupPath: cap.interface.database.postgresql.install
>       alias: postgresql
>       methods:
>         - name: install
>           revision: 0.1.0
> ```
> ```yaml
> - - capact-action: postgresql.install
>     capact-policy:
>       interface:
>         rules:
>           - interface: postgresql.install
> ```

> **NOTE:** You cannot inject TypeInstances in the Workflow step policy. Manifests can be used by any Capact installation, and it is not possible to predict the ID a TypeInstance will have in a given Capact environment.

In this case the policy will enforce that the `cap.implementation.bitnami.postgresql.install` Implementation will be selected, if no other policy is overriding this setting.
