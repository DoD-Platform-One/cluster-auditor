# Troubleshooting

Cluster Auditor consists of a single Pod, `opa-collector`, in the `logging` namespace. The first step to troubleshooting issues with Cluster Auditor would be to check the logs of that Pod with `kubectl logs -l engine=fluentd -n logging -c opa-collector` and go from there.
