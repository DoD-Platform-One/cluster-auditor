
# Cluster Auditor

Cluster Auditor(CA) collects OPA objects in the cluster and sends them to [Elasticsearch](https://repo1.dso.mil/platform-one/big-bang/apps/core/elasticsearch-kibana).  The list of objects collected can be found in this [ConfigMap](../chart/templates/configMap.yaml).

This package requires both OPA Gatekeeper and Elasticsearch to be deployed to function.

For more information, refer to the [documentation](./docs).