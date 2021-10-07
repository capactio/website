# Generating manifests

This document describes how to generate Manifests from existing Helm Charts and Terraform Modules. In this tutorial you will see how to generate an [Interface](https://github.com/capactio/capact/blob/main/ocf-spec/0.0.1/README.md#interface) for the [Redis](https://redis.io) database. You will generate [Implementations](https://github.com/capactio/capact/blob/main/ocf-spec/0.0.1/README.md#implementation) for the Bitnami [Helm Chart](https://github.com/bitnami/charts/tree/master/bitnami/redis) and AWS [Terraform module](https://github.com/umotif-public/terraform-aws-elasticache-redis).

## Prerequisites

- Read [Content development guide](./guide.md) before
- [git](https://git-scm.com/)
- [helm](https://helm.sh/)
- Capact cluster, for example run [locally](../installation/local.md)
    
    > **NOTE:** Use `--capact-overrides=hub-public.populator.enabled=false` flag, as you will manually upload your OCF manifests into Hub.

## Generating Interface

To create an Interface for the Redis database, first you need to choose a path for it. We already have a path `cap.interface.database` with PostgreSQL and MongoDB there, so let's use `cap.interface.database.redis.install`:

```bash
capact alpha manifest-gen interface cap.interface.database.redis.install
```

It generates four files:

* `generated/interface/database/redis.yaml` with an [InterfaceGroup](https://github.com/capactio/capact/blob/main/ocf-spec/0.0.1/README.md#interfacegroup) definition. As the name suggests, it's grouping interfaces for Redis domain. For example, `install`, `update` etc.
* `generated/interface/database/redis/install.yaml` with an Interface definition. It defines the Interface signature.
* `generated/type/database/redis/install-input.yaml` with an input [Type]() definition.
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

Now your Helm manifests are ready to use! See how can you [test it](#testing-manifests)

## Generating Terraform Implementation

Next step is to generate Implementation for a Terraform module. First step is to clone git repository with the module:

```bash
git clone --depth 1 https://github.com/umotif-public/terraform-aws-elasticache-redis.git
```

Now you can generate a new Implementation manifest. You need to set a path to the module and set which Interface is implemented:

```bash
capact alpha manifest-gen implementation terraform cap.implementation.aws.redis.install terraform-aws-elasticache-redis -i cap.interface.database.redis.install -s git::https://github.com/umotif-public/terraform-aws-elasticache-redis
```

It will generate two new files:

* `generated/type/aws/redis/install-input.yaml` with the Type for Implementation-specific additional input.
* `generated/implementation/aws/redis/install.yaml` with the Implementation definition for AWS ElastiCache Terraform module.

Similarly to the Interface, you can update **metadata** in both files.

Now you need to adjust manifests to use input values from the Interface. Modify files according to the following diffs:

```diff
--- a/generated/type/aws/redis/install-input.yaml
+++ b/generated/type/aws/redis/install-input.yaml
@@ -29,11 +28,6 @@ spec:
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
@@ -103,11 +97,6 @@ spec:
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
                               goTemplate:
                                 elasticache_auth_token: "{{ .elasticache_auth_token }}"
@@ -129,9 +130,6 @@ spec:
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
+                            password: "{{ .elasticache_auth_token }}"
+                            port: "{{ .elasticache_port }}"
+                            host: "{{ .elasticache_replication_group_arn }}"

           - name: prepare-parameters
             inputs:
```

Now your Terraform manifests are ready to use!

## Testing manifests

To test generated manifests you need to:

1. Clone repository with our [Hub Manifests](https://github.com/capactio/hub-manifests).
1. Copy content of the `generated` directory into `manifests` directory.
1. [Populate data](./guide.md#populate-the-manifests-into-hub)
1. (For AWS only) Create a [Type Instance](../example/typeinstances.md#aws-credentials) with credentials.
1. Prepare input file `input.yaml`

   ```yaml
   input-parameters:
     name: redis-test
   ```

1. Create an action

   * For Helm Implementation

     ```bash
     capact act create cap.interface.database.redis.install --name redis --parameters-from-file input.yaml
     ```

   * To choose Terraform implementation create a policy file `policy.yaml`

     ```yaml
     rules:
       - interface:
	   path: cap.interface.database.redis.install
	 oneOf:
	 - implementationConstraints:
	     path: "cap.implementation.aws.redis.install"
	   inject:
	     requiredTypeInstances:
	       - id: <AWS Type Instance ID>
		 description: "AWS credentials"
	     additionalParameters:
	       - name: additional-parameters
		 value:
		   vpc_id: <Your VPC ID>
		   subnet_ids:
		     - <Your VPC subnet id>
		   number_cache_clusters: 1
		   node_type: cache.t3.small
     ```

     Create an action

     ```bash
     capact act create cap.interface.database.redis.install --name redis --parameters-from-file input.yaml --action-policy-from-file policy.yaml
     ```

## Summary

That's all. Now you can share you generated manifests.
Create a pull request in our [Hub Manifests](https://github.com/capactio/hub-manifests) repository. We are happy to review it :)
