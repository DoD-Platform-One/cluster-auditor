# Cluster Auditor

This project deploys components that can be used to track changes in a Kubernetes cluster.


## Installation

### Dependencies

This project expects [Istio](https://repo1.dsop.io/platform-one/apps/istio) and [ECK](https://repo1.dsop.io/platform-one/apps/eck) to be installed on the cluster.  Due to race conditions between creationg the CRDs in these applications and creating CRs, when installing on the cluster for the first time, multiple applies might be needed

```bash
kubectl apply -k install/istio
```

Wait for Istio to become healthy before installing ECK:

```bash
kubectl apply -k install/eck/internal
```

### Cluster Auditor Installation

If all dependencies are installed, or working within a bootstrap that has the components:

```bash
kubectl apply -k ./install
```


## Configuration

Once the applications are deployed, there should be three pods running in the `elastic` namespace:

```bash
$ kubectl get pods -n cluster-audit        
NAME                              READY   STATUS    RESTARTS   AGE
elasticsearch-es-default-0        2/2     Running   0          4h51m
kibana-kb-5b84ff555-tn72n         2/2     Running   0          4h52m
object-logging-68845648ff-mblhk   2/2     Running   0          154m
```

In a terminal, port-forward the Kibana service:

```bash
$ kubectl port-forward -n elastic svc/kibana-kb-http 8080:5601
Forwarding from 127.0.0.1:8080 -> 5601
Forwarding from [::1]:8080 -> 5601
...
```

and open up https://localhost:8080

log into Kibana with the username `elastic` and the password returned by:

```bash
kubectl get secrets -n elastic elasticsearch-es-elastic-user -o jsonpath="{ .data.elastic }" | base64 --decode
```


Create an Index Pattern on this page: https://localhost:8080/app/kibana#/management/kibana/index_patterns That has `pods-*` as the index pattern, and `@timestamp` as the times.

Now you can start to search for events in the Discovery page: https://localhost:8080/app/kibana#/discover



# Feedback


Dashboard - need a dashboard - migrate to Grafana
Look at signing images and see what's been approved from IronBank

https://dodcio.defense.gov/Portals/0/Documents/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20v1.0_Public%20Release.pdf?ver=2019-09-26-115824-583
* pick a subset of rules
* 

https://software.af.mil/dsop/documents/

* Look at Gatekeeper objects to  get logged as well.



## Gatekeeper policies


### Istio enabled

#### Label `istio-inject=enabled` on each namespace

[Here](install/gatekeeper/istio-labels)

#### No `sidecar.istio.io/inject=false` annotation

[Here]

### No Latest tags

### Resources defined for all pods/containers

### Readiness and liveness pods

### Repo1 is docker registry
