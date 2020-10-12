# Cluster Auditor

This project deploys components that can be used to track changes in a Kubernetes cluster.


## Installation

### Dependencies

This project expects [Istio](https://repo1.dsop.io/platform-one/apps/istio) and [ECK](https://repo1.dsop.io/platform-one/apps/eck) to be installed on the cluster.  Due to race conditions between creationg the CRDs in these applications and creating CRs, when installing on the cluster for the first time, multiple applies might be needed


### Cluster Auditor Installation

If all dependencies are installed, or working within a bootstrap that has the components:

```bash
kubectl apply -k ./manifests
```


## Configuration

Once the applications are deployed, there should be three pods running in the `cluster-audit   ` namespace:

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
kubectl get secrets -n cluster-audit elasticsearch-es-elastic-user -o jsonpath="{ .data.elastic }" | base64 --decode
```


Create an Index Pattern on this page: https://localhost:8080/app/kibana#/management/kibana/index_patterns That has `violations-*` as the index pattern, and `@timestamp` as the times.

Now you can start to search for events in the Discovery page: https://localhost:8080/app/kibana#/discover



## Outstand Issues

### Signed Images

The Cluster Auditor looks for images coming from registry1, but does not validate they are "IronBank" images.  Need to work with Anchore API to get approvals, and look at Docker API for understanding whether they're signed or not.

### Mapping to Security Control

Each violation can be tracked back to a security control that has been approved by a government official/docment.  Each violation schema needs to be mapped to a control and have the value injected into the violiations object in elastic

