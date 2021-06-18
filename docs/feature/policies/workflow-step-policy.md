---
sidebar_position: 4
---
# Workflow step policy

The Workflow step policy, is an optional policy, which can be provided in the Implementation manifest in an Action step. This policy can be used when:
- an Implementation depends on another Implementation and an Interface cannot be used,
- the Content Creator wants to prefer some Implementation in the Action steps.

## Example

The following YAML snippet presents an Action step in the Implementation with a Workflow step policy:

```yaml
- - capact-action: postgresql.install
    name: install-db
    capact-when: postgresql == nil
    capact-policy:
      rules: # Configures the following behavior for Engine during rendering Action for this step
        - interface: # Rules for Interface with exact path
            path: cap.interface.database.postgresql.install
          oneOf:
            - implementationConstraints: # Enforces that the cap.implementation.bitnami.postgresql.install is selected
                path: "cap.implementation.bitnami.postgresql.install"
```
