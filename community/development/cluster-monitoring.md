# Monitoring of long-running GCP cluster

## Prerequisites

You need to have the following tools installed on your operating system:

- [`gcloud`](https://cloud.google.com/sdk/docs/install)
- [`yq` 4](https://mikefarah.gitbook.io/yq/#install)
- [`kubectl`](https://kubernetes.io/docs/tasks/tools/)

You need to configure the `gcloud` CLI, so it's able to access `capact` project on GCP. You can follow [this](https://cloud.google.com/sdk/docs/authorizing) guide to configure it.

## Setup access to GKE cluster

Set the following environment variables in your shell:
```bash
export REGION=europe-west1
export CLUSTER_NAME=capact-stage
```

Get the kubeconfig for the long-running Capact GKE cluster:
```
gcloud container clusters get-credentials ${CLUSTER_NAME} --region ${REGION}
```

This command adds a new context to your local kubeconfig file. The name of the context will be in the format `gke_<project_name>_<region>_<cluster_name>`. Switch to the long-running Capact cluster context:
```bash
kubectl config get-contexts
```
```bash
CURRENT   NAME                                         CLUSTER                                      AUTHINFO                                     NAMESPACE
*         gke_capact_europe-west1_capact-stage         gke_capact_europe-west1_capact-stage         gke_capact_europe-west1_capact-stage         capact-system
          kind-kind-dev-capact                         kind-kind-dev-capact                         kind-kind-dev-capact                         local-scenario
```
```bash
kubectl config use-context gke_capact_europe-west1_capact-stage
```

Now run the script to add your public IP address to the authorized control plane networks, so you will be able to make queries to the GKE API server:
```bash
./hack/monitoring/manage-ip.sh add
```

## Check the cluster metrics

Follow [this guide](/docs/operation/metrics) to connect to Grafana and check the cluster metrics.

## Remove your IP from the authorized list

Once you are done, run the following script to remove your IP from the authorized GKE control plane networks:
```bash
./hack/monitoring/manage-ip.sh remove
```
