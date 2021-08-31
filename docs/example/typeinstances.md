# Setup Type Instances with credentials

To use cloud resources like AWS RDS or Google Cloud SQL you need to configure Type Instances which will hold required credentials.

### AWS

1. Create a new User in AWS dashboard [https://console.aws.amazon.com/iam/home?region=eu-west-1#/home](https://console.aws.amazon.com/iam/home?region=eu-west-1#/home)

   - Add the **AdministratorAccess** permissions.
   - Note the access key and secret key.

1. Create a file with the AWS Credentials:

    ```bash
    cat > /tmp/aws-ti.yaml << ENDOFFILE
    typeInstances:
      - alias: aws-sa
        attributes:
          - path: cap.attribute.cloud.provider.aws
            revision: 0.1.0
        typeRef:
          path: cap.type.aws.auth.credentials
          revision: 0.1.0
        value:
          accessKeyID: {ACCESS_KEY}
          secretAccessKey: {SECRET_KEY}
    ENDOFFILE
    ```

1. Create AWS Credentials TypeInstance:

    ```bash
    export TI_ID=$(capact typeinstance create -f /tmp/aws-ti.yaml -ojson | jq -r '.[].id')
    ```

### GCP

1. Create a GCP Service Account JSON access key:
   
   1. Open [https://console.cloud.google.com](https://console.cloud.google.com) and select your project.
   
   2. In the left pane, go to **IAM & Admin** and select **Service accounts**.
   
   3. Click **Create service account**, name your account, and click **Create**.
   
   4. Click **Create key** and choose `JSON` as the key type.
   
   5. Save the `JSON` file.
   
   6. Click **Done**.

1. Create a file with the GCP Credentials:

    ```yaml
    cat > /tmp/gcp-sa-ti.yaml << ENDOFFILE
    typeInstances:
      - alias: gcp-sa
        typeRef:
          path: cap.type.gcp.auth.service-account
          revision: 0.1.0
        attributes:
          - path: cap.attribute.cloud.provider.gcp
            revision: 0.1.0
        value: { # Put here your GCP Service Account JSON.
          "type": "service_account",
          [...]
        }
    ENDOFFILE
    ```

1. Create a GCP Credentials TypeInstance:
    ```bash
    export TI_ID=$(capact typeinstance create -f /tmp/gcp-sa-ti.yaml -ojson | jq -r '.[].id')
    ```


## Follow up

To see how to use created Type Instances check out our [Mattermost example](mattermost-installation.md).
