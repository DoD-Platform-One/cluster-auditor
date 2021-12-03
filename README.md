# cluster-auditor

![Version: 1.0.0-bb.0](https://img.shields.io/badge/Version-1.0.0--bb.0-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 0.0.3](https://img.shields.io/badge/AppVersion-0.0.3-informational?style=flat-square)

A Helm chart for Kubernetes

## Learn More
* [Application Overview](docs/overview.md)
* [Other Documentation](docs/)

## Pre-Requisites

* Kubernetes Cluster deployed
* Kubernetes config installed in `~/.kube/config`
* Helm installed

Install Helm

https://helm.sh/docs/intro/install/

## Deployment

* Clone down the repository
* cd into directory
```bash
helm install cluster-auditor chart/
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| istio.enabled | bool | `false` |  |
| monitoring.enabled | bool | `false` |  |
| image.repo | string | `"registry1.dso.mil/ironbank/bigbang/cluster-auditor/opa-exporter"` |  |
| image.tag | string | `"v0.0.3"` |  |
| image.imagePullPolicy | string | `"Always"` |  |
| imagePullSecrets[0].name | string | `"private-registry"` |  |
| tolerations | list | `[]` |  |
| resources.requests.cpu | string | `"300m"` |  |
| resources.requests.memory | string | `"300Mi"` |  |
| resources.limits.cpu | string | `"300m"` |  |
| resources.limits.memory | string | `"300Mi"` |  |
| loglevel | string | `"debug"` |  |
| affinity | object | `{}` |  |
| nodeSelector | object | `{}` |  |
| networkPolicies.enabled | bool | `false` |  |
| networkPolicies.controlPlaneCidr | string | `"0.0.0.0/0"` |  |
| openshift | bool | `false` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.
