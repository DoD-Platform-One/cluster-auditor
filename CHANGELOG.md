# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
---
## [0.3.0-bb.3]
### Added
- Added Network Policy for Istio Sidecar metrics.

## [0.3.0-bb.2]
### Added
- Condititional statement to chart/templates/bigbang/network-policies/kube-system-allow-egress.yaml based on if networkPolicies is enabled.

## [0.3.0-bb.1]
### Changed
- Updated configmap to collect `noDefaultServiceAccount` violations.

## [0.3.0-bb.0]
### Removed
- Moved all constraints out of cluster-auditor and into OPA gatekeeper package.
- Moved all constraint tests out of cluster-auditor and into OPA gatekeeper package.

## [0.2.0-bb.6]
### Added
- Helm function in API Egress Network Policy Template to avoid crashes when non 0.0.0.0/0 CIDR is specified

## [0.2.0-bb.5]
### Added
- networkPolicies.enabled toggle to chart values.
- network policy resource templates to cover the following:
  - allow in namespace ingress/egress (with release.name appended, otherwise will overlap with existing NP in logging Release namespace)
  - allow egress to kube-api and kube-dns ports 443 and 53 respectively.
  - allow ingress from opa-collector pod to elasticsearch labeled pods

## [0.2.0-bb.4]
### Added
- Added CI test for constraints
- Added Bad k8s objects for testing
- Added Good k8s objects for testing
- Updated helper scripts

## [0.2.0-bb.3]
### Added
- Added constraints: K8sImageDigests, K8sUniqueServiceSelector, K8sPSPAllowPrivilegeEscalationContainer, K8sPSPPrvilegedContainer, K8sPSPHostNetworkingPorts, K8sPSPSeccomp, K8sPSPReadOnlyRootFilesystem, K8sPSPSELinuxV2, and K8sContainerRatios.
- Common labels added to all resources
- Metadata for constraints added as annotations to all constrains
### Changed
- Standardized all constraints for `match` and `parameters` values
### Fixed
- Fixed minor bugs in OPA Gatekeeper configuration to watch PSPAllowPrivilegeEscalationContainer, PSPFlexVolumes, and ContainerLimits

## [0.2.0-bb.2]
### Added
- added configmap for new constraint

## [0.2.0-bb.1]
### Added
- Added more constraints

## [0.2.0-bb.0]
### Added
- Added more constraints, and modified values file.

## [0.1.8-bb.2]
### Added
- Affinity and node selector values passthroughs added, documented
