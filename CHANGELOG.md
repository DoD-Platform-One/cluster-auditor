# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.2.0-bb.3]
### Added
- Added constraints: K8sImageDigests, K8sUniqueServiceSelector, K8sPSPAllowPrivilegeEscalationContainer, and K8sPSPPrvilegedContainer
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
