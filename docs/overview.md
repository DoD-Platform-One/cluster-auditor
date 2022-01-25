# Cluster Auditor

## Overview

Cluster Auditor (CA) monitors OPA objects in the cluster and exposes violations as metrics to [Prometheus/Grafana](https://repo1.dso.mil/platform-one/big-bang/apps/core/monitoring). Cluster auditor will "auto-detect" all OPA Gatekeeper `Constraint` resources.

## Dependencies

Cluster Auditor depends on the [opa-gatekeeper](https://repo1.dso.mil/platform-one/big-bang/apps/core/policy) and [monitoring](https://repo1.dso.mil/platform-one/big-bang/apps/core/monitoring) Big Bang packages.

## High Availability

Cluster Auditor is hard-coded to 1 replica in the [Deployment](../chart/templates/deployment.yaml#L9) as further testing needs to be done if CA can work with multiple replicas. You can still rely on native Kubernetes functionality to restart and/or redeploy the CA Pod if it enters a bad state.

```yaml
...
spec:
  strategy:
    type: RollingUpdate
  selector:
    matchLabels:
      app: opa-exporter
  replicas: 1
...
```

## Storage

Cluster Auditor has no storage requirements on its own. Storage requirements of Prometheus/Grafana should be considered.

## Licensing

CA is based off of the OPA Scorecard which used the [Apache License 2.0](https://github.com/mcelep/opa-scorecard/blob/master/LICENSE).
