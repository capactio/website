# Common TypeInstances

This document lists all TypeInstances, which are commonly used across our examples. One of common use case is usage of cloud provider services. For example, to use managed database such as AWS RDS or Google Cloud SQL, you need to create TypeInstances which stores required credentials.

## Prerequisites
- [Capact CLI](../cli/getting-started.mdx) installed.
- Cluster with Capact installation. See the [installation tutorial](../installation/local.mdx). 
- [`jq`](https://stedolan.github.io/jq/download/) installed.

## AWS Credentials

1. Create a new User in [AWS dashboard](https://console.aws.amazon.com/iamv2/home?#/users):

   - Grant the proper permissions. You can use the predefined **AdministratorAccess** permission policy or use your own.
   - Note the access key and secret key.

1. Create a file with the AWS Credentials:

    ```bash
    AWS_ACCESS_KEY_ID="{AWS access key ID}"
    AWS_SECRET_ACCESS_KEY="{AWS secret access key}"
    cat > /tmp/aws-ti.yaml << ENDOFFILE
    typeInstances:
      - alias: aws-credentials
        attributes:
          - path: cap.attribute.cloud.provider.aws
            revision: 0.1.0
        typeRef:
          path: cap.type.aws.auth.credentials
          revision: 0.1.0
        value:
          accessKeyID: ${AWS_ACCESS_KEY_ID}
          secretAccessKey: ${AWS_SECRET_ACCESS_KEY}
    ENDOFFILE
    ```

1. Create AWS Credentials TypeInstance:

    ```bash
    capact typeinstance create -f /tmp/aws-ti.yaml -ojson
    ```

1. Note the ID.

### GCP Service Account

1. Create a GCP Service Account JSON access key:
   
   1. Open [GCP Console](https://console.cloud.google.com) and select your project.
   
   2. In the left pane, go to **IAM & Admin** and select **Service accounts**.
   
   3. Click **Create service account**, name your account, and click **Create**.
   
   4. Click **Create key** and choose `JSON` as the key type.
   
   5. Save the `JSON` file under the `/tmp/gcp-sa.json` path.
   
   6. Click **Done**.

1. Create a file with the GCP Credentials:

    ```bash
    export GCP_SA_VALUE=$(cat /tmp/gcp-sa.json | jq -c)
    cat > /tmp/gcp-sa-ti.yaml << ENDOFFILE
    typeInstances:
      - alias: gcp-sa
        typeRef:
          path: cap.type.gcp.auth.service-account
          revision: 0.1.0
        attributes:
          - path: cap.attribute.cloud.provider.gcp
            revision: 0.1.0
        value: ${GCP_SA_VALUE}
    ENDOFFILE
    ```

1. Create GCP Service Account TypeInstance:

    ```bash
    capact typeinstance create -f /tmp/gcp-sa-ti.yaml -ojson
    ```

1. Note the ID.

## Next steps

To see how to use created TypeInstances, check out our [Mattermost example](mattermost-installation.md).
