# Troubleshooting

Cluster Auditor consists of a single Pod, `opa-collector`, in the `cluster-auditor` namespace. The first step to troubleshooting issues with Cluster Auditor would be to check the logs of that pod with `kubectl logs -l app=opa-exporter -n cluster-auditor -c opa-exporter` and go from there.

You can also validate that all metrics are properly showing in Prometheus, see the [monitoring document](./monitoring.md) for more details on what to expect.
