# Creating Terraform manifests

This document describes how to prepare content which uses Terraform Runner.

## Prerequisites

- [MinIO client](https://min.io/download)
- [Capact local cluster](../installation/local.md)
    
    > **NOTE:** Use `--capact-overrides=hub-public.populator.enabled=false` flag, as you will manually upload your OCF manifests into Hub.

## MinIO access configuration

One of Capact components is [Minio](https://min.io), which is an object store. It can be used for storing modules.
Terraform Runner internally uses [go-getter](https://github.com/hashicorp/go-getter) so different sources are supported.

To use Minio to upload modules, enable port forward:

```shell
kubectl -n capact-system port-forward svc/argo-minio --address 0.0.0.0 9000:9000
```

Get the credentials:

```bash
MINIO_ACCESSKEY=$(kubectl  -n capact-system get secret argo-minio -o jsonpath='{.data.access-key}' | base64 --decode)
MINIO_SECRETKEY=$(kubectl  -n capact-system get secret argo-minio -o jsonpath='{.data.secret-key}' | base64 --decode)
```

Using MinIO client, configure the access:

```shell
mc alias set minio http://localhost:9000 ${MINIO_ACCESSKEY} ${MINIO_SECRETKEY}
```

Alternatively, use the Minio UI accessible under [http://localhost:9000](http://localhost:9000). Print the credentials to copy and paste them to log in form:

```bash
printf "Access key: ${MINIO_ACCESSKEY} \nSecret key: ${MINIO_SECRETKEY}\n"
```

Verify that you can access MinIO:

```shell
mc ls minio
```

On the list, you should see the `terraform` bucket, which is created by default.

## Uploading Terraform modules

> **NOTE:** Manifests are stored in the [capactio/hub-manifests](https://github.com/capactio/hub-manifests) git repository.

In the [`manifests/implementation/gcp/cloudsql/postgresql/install-0.2.0-module`](https://github.com/capactio/hub-manifests/tree/main/manifests/implementation/gcp/cloudsql/postgresql/install-0.2.0-module) directory there is a Terraform module to configure CloudSQL Postgresql instance.

1. Create tar directory first:

    ```shell
    cd manifests/implementation/gcp/cloudsql/postgresql/install-0.2.0-module && tar -zcvf /tmp/cloudsql.tgz . && cd -
    ```

1. Upload it to MinIO:

    ```shell
    mc cp /tmp/cloudsql.tgz minio/terraform/cloudsql/cloudsql.tgz
    ```

1. As the `terraform` bucket has `download` policy set by default, you can access all files with unauthenticated HTTP calls.
As you port-forwarded in-cluster MinIO installation, you can check that by using `wget`. Run:

    ```shell
    wget http://localhost:9000/terraform/cloudsql/cloudsql.tgz
    ````

## Preparing Capact manifests

To use the module, you need to prepare Capact manifests - InterfaceGroup, Interface, Implementation and Types.

In this example, we have them all already defined for PostgreSQL installation. To create your own manifests, you can base on them:
- [InterfaceGroup](https://github.com/capactio/hub-manifests/tree/main/manifests/interface/database/postgresql.yaml)
- [Interface](https://github.com/capactio/hub-manifests/tree/main/manifests/interface/database/postgresql/install.yaml)
- [Implementation](https://github.com/capactio/hub-manifests/tree/main/manifests/implementation/terraform/gcp/cloudsql/postgresql/install.yaml). The manifest uses Terraform Runner.
  
  Instead of using GCS as module source, you can use internal MinIO URL, such as `http://argo-minio.argo:9000/terraform/cloudsql/cloudsql.tgz`.

- [Input Type](https://github.com/capactio/hub-manifests/tree/main/manifests/type/database/postgresql/install-input.yaml)
- [Output Type](https://github.com/capactio/hub-manifests/tree/main/manifests/type/database/postgresql/config.yaml)

## Populating content

To read more how to populate content, see the [Populate the manifests into Hub](./guide.md#populate-the-manifests-into-hub) section in the "Content Development Guide" document.

## Running Action

If the MinIO is populated with Terraform content and all manifests are ready, trigger the Mattermost installation, which will use CloudSQL provisioned with Terraform Runner.

To read how to do it, see the [Install Mattermost with an external CloudSQL database](../example/mattermost-installation.md#install-mattermost-with-an-external-cloudsql-database) section in Mattermost installation tutorial.
To make sure the Terraform-based Implementation is selected, you may use additional, Attribute-based `implementationConstraint` in Cluster Policy:

```yaml
   # (...)
   rules:
     cap.interface.database.postgresql.install:
       oneOf:
         - implementationConstraints:
             attributes:
               - path: "cap.attribute.cloud.provider.gcp"
               - path: "cap.attribute.infra.iac.terraform" # Add this line
             requires:
               - path: "cap.type.gcp.auth.service-account"
           inject:
            requiredTypeInstances:
             # (...)
```
