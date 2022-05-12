# Generating manifests

This document describes how to generate Manifests from existing Helm Charts and Terraform Modules. In this tutorial you will see how to generate an [Interface](https://github.com/capactio/capact/blob/main/ocf-spec/0.0.1/README.md#interface) for the [Redis](https://redis.io) database. You will generate [Implementations](https://github.com/capactio/capact/blob/main/ocf-spec/0.0.1/README.md#implementation) for the Bitnami [Helm Chart](https://github.com/bitnami/charts/tree/master/bitnami/redis) and AWS [Terraform module](https://github.com/umotif-public/terraform-aws-elasticache-redis).

## Prerequisites

- Read [Content development guide](./guide.md) before.
- [git](https://git-scm.com/) installed.
- [Helm v3](https://helm.sh/docs/intro/install/) installed.
- [Capact CLI](../cli/getting-started.mdx#install) at least v0.5.0 installed.
    > **NOTE:** Install the latest Capact CLI version from the `main` branch.
- Capact cluster. For example, [local instance](../installation/local.mdx).

    > **NOTE:** Use `--capact-overrides=hub-public.populator.enabled=false` flag, as you will manually upload your OCF manifests into Hub.

## Generating Interface

To create an Interface for the Redis database, first you need to choose a path for it. We already have a path `cap.interface.database` with PostgreSQL and MongoDB there, so let's use `cap.interface.database.redis.install`:

```bash
capact alpha manifest-gen interface cap.interface.database.redis.install
```

It generates four files:

* `generated/interface/database/redis.yaml` with an [InterfaceGroup](https://github.com/capactio/capact/blob/main/ocf-spec/0.0.1/README.md#interfacegroup) definition. As the name suggests, it's grouping interfaces for Redis domain. For example, `install`, `update` etc.
* `generated/interface/database/redis/install.yaml` with an Interface definition. It defines the Interface signature.
* `generated/type/database/redis/install-input.yaml` with an input [Type](https://github.com/capactio/capact/blob/main/ocf-spec/0.0.1/README.md#type) definition.
* `generated/type/database/redis/config.yaml` with an output Type definition.

All the files have a **metadata** property defined with fields like description, maintainer, name, e-mail and so on. Feel free to update them now. For example, metadata in `redis.yaml` file can look like this:

```yaml
metadata:
  prefix: "cap.interface.database.redis"
  name: "install"
  displayName: "Install Redis"
  description: "Install action for the Redis database"
  documentationURL: https://redis.io/documentation
  supportURL: https://redis.io/support
  iconURL: https://redis.io/images/redis-white.png
  maintainers:
    - email: team-dev@capact.io
      name: Capact Dev Team
      url: https://capact.io
```

### Adjusting schema

By default, Type `install-input` is empty. To be able to pass an input, you need to adjust schema to accept a cluster name.
Edit file `generated/type/database/redis/install-input.yaml` and replace empty schema with:

```yaml
    value: |-
      {
        "$schema": "http://json-schema.org/draft-07/schema",
        "type": "object",
        "title": "The schema for Redis installation input",
        "examples": [
          {
            "name": "Cluster name",
            "password": "foo"
          }
        ],
        "required": [
           "name"
        ],
        "properties": {
          "name": {
            "$id": "#/properties/name",
            "type": "string",
            "title": "Defines a cluster name for the Redis"
          },
          "password": {
            "$id": "#/properties/password",
            "type": "string",
            "title": "Defines a password"
          }
        },
        "additionalProperties": false
      }
```

Edit file `generated/type/database/redis/config.yaml` and replace empty schema with:

```yaml
    value: |-
      {
        "$schema": "http://json-schema.org/draft-07/schema",
        "type": "object",
        "title": "The schema for Redis configuration",
        "examples": [
          {
            "password": "pass"
          }
        ],
        "required": [
          "host",
          "port",
          "password"
        ],
        "definitions": {
          "hostname": {
            "type": "string",
            "format": "hostname",
            "title": "Hostname"
          },
          "port": {
            "type": "integer",
            "title": "Port",
            "minimum": 0,
            "maximum": 65535
          }
        },
        "properties": {
          "password": {
            "$id": "#/properties/rootPassword",
            "type": "string",
            "title": "Defines a database password"
          },
          "host": {
            "$ref": "#/definitions/hostname"
          },
          "port": {
            "$ref": "#/definitions/port"
          }
        },
        "additionalProperties": false
      }
```

## Generating Helm Implementation

Next step is to generate Implementation for a Helm Chart. First step is to clone git repository with Bitnami Charts:

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm pull bitnami/redis --untar --untardir charts/bitnami
```

Now you can generate a new Implementation manifest. Set a path to the downloaded chart and specify which Interface is implemented:

```bash
capact alpha manifest-gen implementation helm cap.implementation.bitnami.redis.install charts/bitnami/redis --repo "https://charts.bitnami.com/bitnami" -i cap.interface.database.redis.install
```

It generates two files:

* `generated/type/bitnami/redis/install-input.yaml` with the Type for Implementation specific additional input.
* `generated/implementation/bitnami/redis/install.yaml` with the Implementation definition for the Redis chart.

Similarly to the Interface, you can update **metadata** in both files. Now you need to adjust manifests to use input values from the Interface.
Modify files according to the following diffs:

```diff
--- a/generated/implementation/bitnami/redis/install.yaml
+++ b/generated/implementation/bitnami/redis/install.yaml
@@ -104,7 +104,7 @@ spec:
                                 enabled: <@ additionalinput.auth.enabled | default(true) | tojson @>
                                 existingSecret: <@ additionalinput.auth.existingSecret | default("") | tojson @>
                                 existingSecretPasswordKey: <@ additionalinput.auth.existingSecretPasswordKey | default("") | tojson @>
-                                password: <@ additionalinput.auth.password | default("") | tojson @>
+                                password: <@ input.password | default(random_word(length=16)) @>
                                 sentinel: <@ additionalinput.auth.sentinel | default(true) | tojson @>
                                 usePasswordFiles: <@ additionalinput.auth.usePasswordFiles | default(false) | tojson @>
                               clusterDomain: <@ additionalinput.clusterDomain | default("cluster.local") @>
@@ -121,7 +121,7 @@ spec:
                                 enabled: <@ additionalinput.diagnosticMode.enabled | default(false) | tojson @>
                               existingConfigmap: <@ additionalinput.existingConfigmap | default("") | tojson @>
                               extraDeploy: <@ additionalinput.extraDeploy | default(None) | tojson @>
-                              fullnameOverride: <@ additionalinput.fullnameOverride | default("") | tojson @>
+                              fullnameOverride: <@ input.name @>
                               global:
                                 imagePullSecrets: <@ additionalinput.global.imagePullSecrets | default(None) | tojson @>
                                 imageRegistry: <@ additionalinput.global.imageRegistry | default("") | tojson @>
@@ -467,7 +467,9 @@ spec:

                             output:
                               goTemplate: |
-                                # TODO(ContentDeveloper): Add output template in YAML
+                                host: '{{ template "common.names.fullname" . }}.{{ .Release.Namespace }}'
+                                port: '{{ .Values.master.service.port }}'
+                                password: '{{ .Values.auth.password }}'

               - - name: helm-install
                   capact-action: helm.install

```

```diff
--- a/generated/type/bitnami/redis/install-input.yaml
+++ b/generated/type/bitnami/redis/install-input.yaml
@@ -36,16 +36,6 @@ spec:
                 "type": "boolean",
                 "form": true,
                 "title": "Use password authentication"
-              },
-              "password": {
-                "type": "string",
-                "title": "Redis password",
-                "form": true,
-                "description": "Defaults to a random 10-character alphanumeric string if not set",
-                "hidden": {
-                  "value": false,
-                  "path": "auth/enabled"
-                }
               }
             }
           },
```

Now your Helm manifests are ready to use! See how can you [test it](#testing-manifests).

## Generating Terraform Implementation

Next step is to generate Implementation for a Terraform module. First, clone git repository with the module:

```bash
git clone --depth 1 https://github.com/umotif-public/terraform-aws-elasticache-redis.git
```

Now you can generate a new Implementation manifest. You need to set a path to the module and set which Interface is implemented:

```bash
capact alpha manifest-gen implementation terraform cap.implementation.aws.redis.install terraform-aws-elasticache-redis -i cap.interface.database.redis.install -s git::https://github.com/umotif-public/terraform-aws-elasticache-redis -p aws
```

It generates two new files:

* `generated/type/aws/redis/install-input.yaml` with the Type for Implementation-specific additional input.
* `generated/implementation/aws/redis/install.yaml` with the Implementation definition for AWS ElastiCache Terraform module.

Similarly to the Interface, you can update **metadata** in both files.

Now you need to adjust manifests to use input values from the Interface. Modify files according to the following diffs:

```diff
--- a/generated/type/aws/redis/install-input.yaml
+++ b/generated/type/aws/redis/install-input.yaml
@@ -14,10 +14,13 @@ metadata:
       url: https://example.com
 spec:
   jsonSchema:
-    # TODO(ContentDeveloper): Adjust the JSON schema if needed.
     value: |-
       {
         "properties": {
+          "region": {
+            "type": "string",
+            "title": "AWS region"
+          },
           "apply_immediately": {
             "type": "boolean",
             "title": "apply_immediately",
@@ -28,11 +31,6 @@ spec:
             "title": "at_rest_encryption_enabled",
             "description": "Whether to enable encryption at rest."
           },
-          "auth_token": {
-            "type": "string",
-            "title": "auth_token",
-            "description": "The password used to access a password protected server. Can be specified only if `transit_encryption_enabled = true`."
-          },
           "auto_minor_version_upgrade": {
             "type": "string",
             "title": "auto_minor_version_upgrade"
@@ -102,11 +100,6 @@ spec:
             "title": "multi_az_enabled",
             "description": "Specifies whether to enable Multi-AZ Support for the replication group. If true, `automatic_failover_enabled` must also be enabled. Defaults to false."
           },
-          "name_prefix": {
-            "type": "string",
-            "title": "name_prefix",
-            "description": "The replication group identifier. This parameter is stored as a lowercase string."
-          },
           "node_type": {
             "type": "string",
             "title": "node_type",
```

```diff
--- a/generated/implementation/aws/redis/install.yaml
+++ b/generated/implementation/aws/redis/install.yaml
@@ -16,7 +16,7 @@ metadata:
     name: "Apache 2.0"

 spec:
-  appVersion: "1.0.x" # TODO(ContentDeveloper): Set the supported application version here
+  appVersion: "6.2.x"
   additionalInput:
     parameters:
       additional-parameters:
@@ -104,6 +104,7 @@ spec:
                             env:
                               - AWS_ACCESS_KEY_ID=<@ providercredentials.accessKeyID @>
                               - AWS_SECRET_ACCESS_KEY=<@ providercredentials.secretAccessKey @>
+                              - AWS_DEFAULT_REGION=<@ additionalinput.region | default('eu-west-1') @>
                             output:
                               goTemplate: |
                                 elasticache_auth_token: "{{ .elasticache_auth_token }}"
@@ -123,15 +124,15 @@ spec:
                                 security_group_owner_id: "{{ .security_group_owner_id }}"
                                 security_group_vpc_id: "{{ .security_group_vpc_id }}"
                             variables: |+
+                              name_prefix = <@ input.name | tojson @>
+                              auth_token = <@ input.password | default(random_word(length=16)) | tojson @>
+
                               <%- if additionalinput.apply_immediately %>
                               apply_immediately = <@ additionalinput.apply_immediately | tojson @>
                               <%- endif %>
                               <%- if additionalinput.at_rest_encryption_enabled %>
                               at_rest_encryption_enabled = <@ additionalinput.at_rest_encryption_enabled | tojson @>
                               <%- endif %>
-                              <%- if additionalinput.auth_token %>
-                              auth_token = <@ additionalinput.auth_token | tojson @>
-                              <%- endif %>
                               <%- if additionalinput.auto_minor_version_upgrade %>
                               auto_minor_version_upgrade = <@ additionalinput.auto_minor_version_upgrade | tojson @>
                               <%- endif %>
@@ -174,9 +172,6 @@ spec:
                               <%- if additionalinput.multi_az_enabled %>
                               multi_az_enabled = <@ additionalinput.multi_az_enabled | tojson @>
                               <%- endif %>
-                              <%- if additionalinput.name_prefix %>
-                              name_prefix = <@ additionalinput.name_prefix | tojson @>
-                              <%- endif %>
                               <%- if additionalinput.node_type %>
                               node_type = <@ additionalinput.node_type | tojson @>
                               <%- endif %>
@@ -246,9 +241,10 @@ spec:
                           data: ""
                       - name: template
                         raw:
-                          # TODO(ContentDeveloper): Fill the properties of the output TypeInstance here
                           data: |
-                            property: value
+                            password: "<@ elasticache_auth_token @>"
+                            port: "<@ elasticache_port @>"
+                            host: "<@ elasticache_replication_group_primary_endpoint_address @>"

           - name: prepare-parameters
             inputs:
```

Now your Terraform manifests are ready to use! See how can you [test it](#testing-manifests).

## Testing manifests

To test generated manifests you need to:

1. Clone repository with [Hub Manifests](https://github.com/capactio/hub-manifests).
1. Copy content of the `generated` directory into `manifests` directory.
1. [Populate the manifests to Public Hub](../example/public-hub-content.mdx#populate-the-manifests-into-hub).
1. (For AWS only) Create a [Type Instance](../example/typeinstances.md#aws-credentials) with credentials.
1. Prepare input file `input.yaml`

   ```yaml
    cat > /tmp/install-input.yaml << ENDOFFILE
    input-parameters:
      name: redis-test

    ENDOFFILE
   ```

1. Create an action

   * For Helm Implementation

     ```bash
     capact act create cap.interface.database.redis.install --name redis --parameters-from-file /tmp/install-input.yaml
     ```

   * To choose Terraform implementation create a policy file `policy.yaml`

     ```yaml
     AWS_TI_ID="{AWS Type Instance ID}"
     AWS_VPC_ID="{Your VPC ID}"
     AWS_SUBNET_ID="{Your VPC subnet id}"
     cat > /tmp/aws-policy.yaml << ENDOFFILE
     interface:
       rules:
         - interface:
             path: cap.interface.database.redis.install
           oneOf:
           - implementationConstraints:
               path: "cap.implementation.aws.redis.install"
             inject:
               requiredTypeInstances:
                 - id: "${AWS_TI_ID}"
                   description: "AWS credentials"
               additionalParameters:
                 - name: additional-parameters
                   value:
                     vpc_id: "${AWS_VPC_ID}"
                     subnet_ids:
                       - "${AWS_SUBNET_ID}"
                     number_cache_clusters: 1
                     node_type: cache.t3.small
     ENDOFFILE
     ```

     Create an action

     ```bash
     capact act create cap.interface.database.redis.install --name redis --parameters-from-file /tmp/install-input.yaml --action-policy-from-file /tmp/aws-policy.yaml
     ```

1. Get the status of the Action from the previous step:

  ```bash
  capact act get redis
  ```

  In the STATUS column you can see the current status of the Action. When the Action workflow is being rendered by the Engine, you will see the BEING_RENDERED status. After the Action finished rendering and the status is `READY_TO_RUN`, you can go to the next step.

1. Run the rendered Action

   After the Action is in `READY_TO_RUN` status, you can run it. To do this, execute the following command:

  ```bash
  capact act run redis
  ```

1. Check the Action execution and wait till it is finished:

   ```bash
   capact action watch redis
   ```

1. Get the ID of the `cap.type.database.redis.config` TypeInstance:

   ```bash
   capact action get redis -ojson | jq -r '.Actions[].output.typeInstances | map(select(.typeRef.path == "cap.type.database.redis.config"))'
   ```

1. Get the TypeInstance value:

   Use the ID from the previous step and fetch the TypeInstance value:

   ```bash
   capact typeinstance get {type-instance-id} -ojson | jq -r '.[0].latestResourceVersion.spec.value'
   ```

1. Use the information from the TypeInstance to connect to the Redis.

## Summary

That's all. Now you can share you generated manifests.
Create a pull request in our [Hub Manifests](https://github.com/capactio/hub-manifests) repository. We are happy to review it :)
