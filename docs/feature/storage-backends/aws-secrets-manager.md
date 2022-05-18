# AWS Secrets Manager

You can use [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/) service to store and manage your TypeInstance values externally. The functionality in a form of a dedicated storage backend is installed using Capact Action. This guide describes how to install and configure the AWS Secrets Manager storage backend for Capact Local Hub.

To learn more about Capact Local Hub storage backends, see the [Introduction](./introduction.md) document.

## Features

AWS Secrets Manager storage backend is feature-complete. It supports full lifecycle of TypeInstance:
- create (create first revision),
- get a given revision,
- update (create a new revision),
- delete a given revision,
- delete the whole object,
- lock the whole object,
- and unlock the whole object.

It can be used as a default storage for all TypeInstances.

## Prerequisites

* [Capact CLI](../../cli/getting-started.mdx) installed.
* Cluster with Capact installation. See the [installation tutorial](../../installation/local.mdx).
* Access to AWS

## Obtain AWS credentials

Create AWS security credentials with `SecretsManagerReadWrite` policy.

1. In AWS dashboard, navigate to IAM (access management).

1. In **Users** tab, add a new user.
1. Select **Access key** AWS credential type.
1. On **Set permissions** step, select **Attach existing policies directly***.
1. Find **SecretsManagerReadWrite** policy.
1. Go to the next step until you see the **Create user** step. Click on it.
1. Copy the credentials and follow the [Installation](#installation) guide.

## Installation

1. Export the environment variables:

   ```bash
   export AWS_ACCESS_KEY_ID="{AWS access key ID}"
   export AWS_SECRET_ACCESS_KEY="{AWS secret access key}"
   ```

1. Follow the [AWS Credentials TypeInstance creation](../../example/typeinstances.md#aws-credentials) guide to create and obtain ID of the newly created TypeInstance.

  Export it as `TI_ID` environment variable:

  ```bash
  export TI_ID="{id}"
  ```

1. Update the [Global policy](../policies/global-policy.md) to inject the AWS credentials for the storage backend installation:

   ```bash
   cat > /tmp/aws-storage-policy.yaml << ENDOFFILE
   interface:
     rules:
       - interface:
           path: cap.interface.aws.secrets-manager.storage.install
         oneOf:
          - implementationConstraints:
              attributes:
                - path: "cap.attribute.cloud.provider.aws"
            inject:
              requiredTypeInstances:
              - id: ${TI_ID}
                description: "AWS credentials"
       - interface:
           path: cap.*
         oneOf:
         - implementationConstraints:
             requires:
             - path: cap.core.type.platform.kubernetes
         - implementationConstraints: {}
   typeInstance:
     rules: []
   ENDOFFILE
   capact policy apply -f /tmp/aws-storage-policy.yaml
   ```

1. Create parameters:

   ```bash
   cat > /tmp/aws-storage-input-params.yaml << ENDOFFILE
   input-parameters:
    region: "eu-west-1" # AWS region, where the secrets are managed
   ENDOFFILE
   ```

1. Create Action:
   ```bash
   capact act create cap.interface.aws.secrets-manager.storage.install --name aws-storage -n capact-system --parameters-from-file /tmp/aws-storage-input-params.yaml
   ```

1. Wait for the Action to have the `READY_TO_RUN` status:

   ```bash
   capact act wait --for=phase=READY_TO_RUN aws-storage -n capact-system
   ```

1. Run Action:

   ```bash
   capact act run aws-storage -n capact-system
   ```

1. Watch the Action for completion:

    ```bash
    capact act watch aws-storage -n capact-system
    ```

1. Get output TypeInstances:

    ```bash
    capact act get aws-storage -n capact-system -ojsonpath -t '{.Actions[0].output.typeInstances}'
    ```

    Copy ID of the installed AWS storage backend:

    ```bash
    capact act get aws-storage -n capact-system -ojsonpath -t '{.Actions[0].output.typeInstances[?(@ typeRef.path == "cap.type.aws.secrets-manager.storage")].id}'
    ```

    See the details of the installed AWS storage backend:

     ```bash
     capact ti get {AWS storage backend ID} -oyaml
     ```

## Use the storage backend

Once the storage backend is installed, you can configure it for selected set of TypeInstances.

For example, you can configure it as a default backend for all TypeInstances with the following Global Policy:

```bash
cat > /tmp/aws-storage-policy.yaml << ENDOFFILE
interface:
  rules:
      - interface:
          path: cap.*
        oneOf:
        - implementationConstraints:
            requires:
            - path: cap.core.type.platform.kubernetes
        - implementationConstraints: {}
typeInstance:
   rules:
     - typeRef:
         path: "cap.*"
       backend:
         id: "${AWS_SM_STORAGE_ID}"
         description: "AWS Secrets Manager"
ENDOFFILE
capact policy apply -f /tmp/aws-storage-policy.yaml
```

To read more about TypeInstance backend configuration, see the [Definition of rules for TypeInstance](../policies/overview.md#definition-of-rules-for-typeinstance) section.

## Next steps

Now, you can run any Capact manifest and utilize the newly installed AWS Secrets Manager storage backend. For example, [install Mattermost](../../example/mattermost-installation.md). Once it is installed, verify the output TypeInstance values are created in AWS Secrets Manager. You can do it in the following ways:

  - verify the `backend.id` for output TypeInstances of a given Action:

      ```bash
      capact act get {action Name} -ojsonpath -t '{.Actions[0].output.typeInstances}'
      ```

  - see the AWS Secrets Manager UI to verify the TypeInstance value is stored externally.

To clean up the secrets stored externally, just delete a given TypeInstance.
