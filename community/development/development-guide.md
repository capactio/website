# Development Guide

Read this document to learn how to develop the project. Please also follow guidelines defined in [this](development-guidelines.md) document.

## Prerequisites

* Make
* [Go](https://golang.org/dl/) at least 1.16
* [Docker](https://www.docker.com/)
* [GoReleaser](https://goreleaser.com/install/) at least 1.1.0

Helper scripts may introduce additional dependencies. However, all helper scripts support the `SKIP_DEPS_INSTALLATION` environment variable flag.
**By default, flag is set to `true`**, so all scripts try to use tools installed on your local machine as this speed up the process.
If you do not want to install any additional tools, or you want to ensure reproducible scripts
results export `SKIP_DEPS_INSTALLATION=false`, so the proper tool version will be automatically installed and used.

## Dependency management

This project uses `go modules` as a dependency manager. To install all required dependencies, use the following command:

```bash
go mod download
```

## Makefile

This project make to run most common tasks. In order to get help, run the following command:

```bash
make help
```

## Testing

### Unit tests

To run all unit tests, execute:

```bash
make test-unit
```

To generate the unit test coverage HTML report, execute:

```bash
make test-cover-html
```

> **NOTE:** The default browser with the generated report opens automatically.

### Lint tests

To run lint tests, execute:

```bash
make test-lint
```

To automatically fix lint issues, execute:

```bash
make fix-lint-issues
```

### Integration tests

We support the cross-functional integration tests that are defined in [test](https://github.com/capactio/capact/tree/main/test) package and
Kubernetes controller integration tests which are using fake K8s API Server and `etcd`.

#### Cross-functional

The cross-functional tests are executed on [`kind`](https://sigs.k8s.io//kind) where all Capact components are pre-installed.

```bash
make test-integration
```

### K8s controller

The Kubernetes controller tests are executed on your local machine by starting a local control plane - `etcd` and `kube-apiserver`.
For that purpose we use the [envtest](https://sigs.k8s.io/controller-runtime/pkg/envtest) library.

```bash
make test-k8s-controller
```

### Docker Image Security Scan

To build images and execute a Snyk vulnerability scan on the containers, execute:

```bash
make image-security-scan
```

> **NOTE:** It is required to accept Snyk's TOC in order for this to work. It is recommended to create a free Snyk account.

## Development cluster

To run development cluster, we use [`kind`](https://sigs.k8s.io//kind).

### Create a cluster and install components

To create the development cluster and install all components, execute:

```bash
make dev-cluster
```

You can export the following environment variables to configure the script:
- To disable monitoring stack installation, use `DISABLE_MONITORING_INSTALLATION=true`.
- To disable kubed installation, use `DISABLE_KUBED_INSTALLATION=true`.
- To disable `/etc/hosts` update with all Capact subdomain, use `DISABLE_HOSTS_UPDATE=true`.
- To disable setting self-signed TLS certificate for `*.capact.local` as trusted, use `DISABLE_ADDING_TRUSTED_CERT=true`.
- To disable Database Populator, use `ENABLE_POPULATOR=false`
- To enable test setup, use `USE_TEST_SETUP=true`.
- To disable higher resource requests and limits for components, use `INCREASE_RESOURCE_LIMITS=false`.
- To override Capact Helm chart values, use `CUSTOM_CAPACT_SET_FLAGS` e.g. `CUSTOM_CAPACT_SET_FLAGS="--set gateway.auth.password=myPass"`.
- To override Ingress NGINX Helm chart values, use `CUSTOM_NGINX_SET_FLAGS`.
- To override the Git branch from which the source manifests should be populated, use `HUB_MANIFESTS_SOURCE_REPO_REF`, e.g. `HUB_MANIFESTS_SOURCE_REPO_REF="my-fancy-branch"`
- To override the Git URL from which the source manifests should be populated, use `HUB_MANIFESTS_SOURCE_REPO_URL`, e.g. `HUB_MANIFESTS_SOURCE_REPO_URL="github.com/capactio/hub-manifests"`. For more information about syntax check the [`go-getter`](https://github.com/hashicorp/go-getter#url-format) project README.
- To override Cert Manager Helm chart values, use `CUSTOM_CERT_MANAGER_SET_FLAGS`.

### Access Gateway GraphQL Playground

Capact Gateway aggregates all GraphQL APIs from multiple components (Local Hub, Public Hub, Engine) into a single endpoint.

To see the Gateway URL and authentication details, use the following command:

```bash
helm get notes -n capact-system capact
```

### Rebuild Docker images and update cluster

To rebuild all Docker images and upgrade the Helm charts on development cluster with new images, execute:

```bash
make dev-cluster-update
```

### Swap a cluster deployment with your local process

To make it easier to develop services running on Kubernetes, you can use [Telepresence](https://www.telepresence.io/). Instead of rebuilding a component image and deploying it on Kubernetes, you can setup a Telepresence session and run the local process in your cluster.

To use Telepresence to swap a cluster deployment, execute the following command:
```bash
telepresence --namespace {namespace} --swap-deployment {deployment-name}
```

Now you can run your process in your Telepresence shell. The shell inherits all the environment variables from the replaced Pod. Refer to the Usage instructions for a particular component in a corresponding README file.

### Delete cluster

To delete the development cluster, execute:

```bash
make dev-cluster-delete
```

## Build and push Docker images

There are a Make targets dedicated to build and push Capact Docker images.

We have images for:
- application defined under [cmd](https://github.com/capactio/capact/tree/main/cmd) directory
- tests defined under [test](https://github.com/capactio/capact/tree/main/test) directory
- infra tools defined under [/hack/images](https://github.com/capactio/capact/tree/main/hack/images) directory

The default build and push configuration can be change via environment variables. For example:

```bash
export DOCKER_REPOSITORY=ghcr.io/capactio/
export DOCKER_TAG=latest
```

### All components

To build all Docker images with your changes and push them to a registry, follow these steps.

1. Build all Docker images:

    ```bash
    make build-all-images
    ```

2. Push the Docker images to registry:

    ```bash
    make push-all-images
    ```

### Single component

If you want to build and push Docker image for a single component, follow these steps:

1. Build a specific Docker image:

    For application defined under [cmd](https://github.com/capactio/capact/tree/main/cmd) package use it names, e.g. for `hub`:
    ```bash
    make build-app-image-hub
    ```

    For tests defined under [test](https://github.com/capactio/capact/tree/main/test) package use it names, e.g. for `e2e`:
    ```bash
    make build-test-image-e2e
    ```

2. Push the built Docker image to a registry:

    For application defined under [cmd](https://github.com/capactio/capact/tree/main/cmd) package use it names, e.g. for `hub`:
    ```bash
    make push-app-image-hub
    ```

    For tests defined under [test](https://github.com/capactio/capact/tree/main/test) package use it names, e.g. for `e2e`:
    ```bash
    make push-test-image-e2e
    ```

### Releasing Helm Charts

In order to push the latest Help charts to the configured GCS bucket, execute the following:

```bash
make release-charts
```

## Build Binaries

To build all the CLI tools binaries (Capact CLI and Populator), execute the following:

```bash
make build-all-tools
```

The binaries will be placed under the `bin/` subdirectory in the root of the source tree.

## Generators

To execute all generators, execute:

```bash
make generate
```

Read below sections to execute only a specific generator.

### Generate Go code from the OCF JSON Schemas

This project uses the [quicktype](https://github.com/quicktype/quicktype) library, which improves development by
generating Go code from the [JSON Schemas](https://github.com/capactio/capact/tree/main/ocf-spec/0.0.1/schema).

Each time the specification is changed you can regenerate the Go struct. To do this, execute:
```bash
make gen-go-api-from-ocf-spec
```

To generate the Go structs for a specific OCF version, execute:

```bash
OCF_VERSION={VERSION} make gen-go-api-from-ocf-spec
```

> **NOTE:** Go structs are generated in [`pkg/sdk/apis`](https://github.com/capactio/capact/tree/main/pkg/sdk/apis) package.

### Generate K8s resources

This project uses [controller-gen](https://sigs.k8s.io/controller-tools/cmd/controller-gen) for generating utility code and Kubernetes YAML.
Code and manifests generation is controlled by the presence of special ["marker comments"](https://sigs.k8s.io/kubebuilder/docs/book/src/reference/markers.md) in Go code.

Each time the Go code related to K8s controller is change, you need to update generated resources. To do this, execute:

```bash
make gen-k8s-resources
```

### Generate code from GraphQL schema

This project uses the [GQLGen](https://github.com/99designs/gqlgen) library, which generates the Go struct and server from GraphQL schema definition.

In Capact project we have three GraphQL schemas, from which the Go code is generated:
- [Engine](https://github.com/capactio/capact/tree/main/pkg/engine/api/graphql/schema.graphql)
- [Local Hub](https://github.com/capactio/capact/tree/main/hub-js/graphql/local/schema.graphql)
- [Public Hub](https://github.com/capactio/capact/tree/main/hub-js/graphql/public/schema.graphql)

Each time the GraphQL schema changes, you need to update generated resources. To do this, execute:

```bash
make gen-graphql-resources
```

### Generate code from Protocol Buffers schema

This project uses the [`protoc`](https://github.com/protocolbuffers/protobuf) compiler, which generates Go code both for gRPC server and client, based on Protocol Buffers schema.

The `protoc` compiler uses the following plugins:
- [`protoc-gen-go`](https://pkg.go.dev/google.golang.org/protobuf/cmd/protoc-gen-go)
- [`protoc-gen-go-grpc`](https://pkg.go.dev/google.golang.org/grpc/cmd/protoc-gen-go-grpc)

In Capact project we have one Protocol Buffers schema for [Storage Backend](https://github.com/capactio/capact/blob/main/hub-js/proto/storage_backend.proto) Hub extension.

Each time the Protocol Buffers schema changes, you need to regenerate Go code. To do this, execute:

```bash
make gen-grpc-resources
```

### Generate documentation

For the Capact CLI development we use [Cobra](https://github.com/spf13/cobra) library. The documentation for the CLI is generated automatically based on CLI commands code.

To regenerate the documentation for CLI, execute:
```bash
make gen-docs
```

## Instrumentation

This section describes the approach for Capact components instrumentation.

### Enable metrics scrape

We use Prometheus Operator for monitoring. To enable metrics scraping, you need to create a ServiceMonitor with `capact.io/scrape-metrics: "true"` label. ServiceMonitor can be created in any Namespace.
Check [Engine metrics.yaml](https://github.com/capactio/capact/tree/main/deploy/kubernetes/charts/capact/charts/engine/templates/metrics.yaml) file for a reference on how to create a proper Service and ServiceMonitor.

### Add Grafana Dashboard

To make the Grafana dashboard management easier, we use Grafana Dashboard sidecar. It watches all ConfigMaps in the cluster with a label `grafana_dashboard: "1"`. Changes to the ConfigMaps are monitored and the imported dashboards are updated or deleted accordingly.

A recommendation is to use one ConfigMap per dashboard as Grafana doesn't handle multiple dashboards properly. Additionally, we keep dashboards as JSON files in a separate folder and load them into ConfigMap using `Files.Get` Helm command. As a result:

* Dashboard is more readable.
* No escaping is needed for double curly brackets.
* IDE can still support JSON formatting/validation.

Check the [Engine Helm chart](https://github.com/capactio/capact/tree/main/deploy/kubernetes/charts/capact/charts/engine) for a reference on how to store and load the dashboards from JSON to ConfigMap.

> **CAUTION:** The size of a ConfigMap is limited to 1 MB.

Useful materials when creating Grafana dashboards:
- [List of Prometheus query functions with description](https://prometheus.io/docs/prometheus/latest/querying/functions/#functions)
- [Histogram queries how-to](https://prometheus.io/docs/practices/histograms/)

### Access Prometheus and Grafana

If you installed Capact with monitoring enabled, the Prometheus and Grafana are not exposed using Ingress. You can access them by forwarding Service ports to your localhost.

#### Prometheus

Forward the Prometheus server to your localhost:

```bash
kubectl port-forward svc/monitoring-kube-prometheus-prometheus -n capact-system 9090
```

Now can open your browser at http://localhost:9090. In the Prometheus dashboard, you can query on the metrics, see all the predefined alerts and Prometheus targets.

#### Grafana

Forward the Grafana server to your localhost:

```bash
kubectl port-forward svc/monitoring-grafana -n capact-system 3000:80
```


Now you can open your browser at http://localhost:3000 to access the Grafana instance. To log in, use:

```
username: admin
password: okon
```
