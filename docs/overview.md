# Cluster Auditor

## Overview

Cluster Auditor(CA) collects OPA objects in the cluster and sends them to [Elasticsearch](https://repo1.dso.mil/platform-one/big-bang/apps/core/elasticsearch-kibana).  The list of objects collected can be found in this [ConfigMap](../chart/templates/configMap.yaml).

## Dependencies

Cluster Auditor depends on the [opa-gatekeeper](https://repo1.dso.mil/platform-one/big-bang/apps/core/policy) and [elasticsearch-kibana](https://repo1.dso.mil/platform-one/big-bang/apps/core/elasticsearch-kibana/-/tree/main) Big Bang packages.

## High Availability

Cluster Auditor is hard-coded to 1 replica in the [Deployment](../chart/templates/deployment.yaml#L13) as further testing needs to be done if CA can work with multiple replicas. You can still rely on native Kubernetes functionality to restart and/or redeploy the CA Pod if it enters a bad state.

```yaml
...
spec:
  strategy:
    type: RollingUpdate
  selector:
    matchLabels:
      engine: fluentd
  replicas: 1
...
```

## Storage

Cluster Auditor has no storage requirements.

## Licensing

CA parent image is `fluentd` which has  [Apache License 2.0](https://github.com/fluent/fluentd/blob/master/LICENSE)

