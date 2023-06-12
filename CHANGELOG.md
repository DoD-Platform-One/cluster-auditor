# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
## [1.5.0-bb.4] - 2023-05-26
### Added
- Added OpenShift support

## [1.5.0-bb.3] - 2023-05-19
### Changed
- Update cypress tests for compatibility with latest monitoring version (45.27.2)

## [1.5.0-bb.2] - 2023-01-17
### Changed
- Update gluon to new registry1 location + latest version (0.3.2)

## [1.5.0-bb.1] - 2022-10-26
### Added
- Added contributing doc

## [1.5.0-bb.0] - 2022-09-16
### Changed
- ironbank/bigbang/cluster-auditor/opa-exporter updated from 0.0.4 to 0.0.7

## [1.4.0-bb.10]
### Fixed
- Resolved issues with cypress tests

## [1.4.0-bb.9]
### Changed
- Removed mTLS exception

## [1.4.0-bb.8]
### Updated
- Fixed dashboard check in cypress test

## [1.4.0-bb.7]
### Updated
- PrometheusRule resource for OPA constraint alerts

## [1.4.0-bb.6]
### Updated
- Cypress test now checks the table with the list of violations and the "violations by kind" bar chart for a "no data" message.

## [1.4.0-bb.5]
### Added
- added securityContext: capabilities: drop: ALL
- Updated gluon to 0.2.10

## [1.4.0-bb.4]
### Changed
- Updated securityContext user and group  to nonroot

## [1.4.0-bb.3]
### Changed
- Fixed typo in OSCAL document

## [1.4.0-bb.2]
### Added
- CI tests to verify violations index

## [1.4.0-bb.1]
### Added
- Added Tempo Zipkin Egress Policy

## [1.4.0-bb.0]
### Added
- New Kptfile to follow other package version of kpt
### Changed
- Image version to v0.0.4
- App version to 0.0.4

## [1.3.0-bb.1]

### Added

- Added peerauthentication/mtls support with istio

## [1.3.0-bb.0]

### Added

- Added OSCAL component for Cluster Auditor

## [1.2.0-bb.1]

### Changed

- Update Chart.yaml to follow new standardization for release automation
- Added renovate check to update new standardization


## [1.2.0-bb.0]

### Changed

- Updated docs to reflect new cluster auditor architecture

## [1.1.1-bb.0]

### Changed

- Fixed template error for Istio annotation in BigBang

## [1.1.0-bb.0]

### Changed

- Add Istio annotation

## [1.0.3-bb.0]

### Changed

- Moved bbtest values from test-values.yaml into values.yaml to allow for overrides

## [1.0.2-bb.0]

### Changed

- Added networkpolicies to support istio sidecars
- Updated ports/servicemonitor to support scraping metrics properly

## [1.0.1-bb.0]

### Changed

- fixed duplicate app.kubernetes/version

## [1.0.0-bb.0]

### Added

- Created a new namespace cluster auditor.
- Added opa exporter.
- Added grafana dashboard.
- Removed the old cluster auditor.

## [0.3.0-bb.7]

### Changed

- fixed duplicate nodeselector in deployment template.

## [0.3.0-bb.6]

### Changed

- Updated config to align watched resources with latest OPA Gatekeeper names
- Turned off apparmor violation in defaults
- Removed unique service selector in defaults

## [0.3.0-bb.5]

### Changed

- Switched away from the (unmaintained and oddly behaving) jq fluentd filter.
- Now using the exec_filter to execute jq directly.
- Added in an additional filter to avoid getting duplicates stored to elastic--elasticsearch_genid

## [0.3.0-bb.4]

### Added

- Updated Network Policy to allow Openshift DNS Egress

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
