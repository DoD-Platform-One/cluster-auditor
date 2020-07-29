# Cluster Auditor

This project deploys components that can be used to track changes in a Kubernetes cluster.


## Installation

### Dependencies

This project expects [ECK](https://repo1.dsop.io/platform-one/apps/eck) to be installed on the cluster

### Installation

To install, execute:

```bash
kubectl apply -k ./install
```


## Configuration

Once the applications are deployed, there should be three pods running in the `cluster-auditor` namespace:

```bash
$ kubectl get pods -n cluster-audit        
NAME                              READY   STATUS    RESTARTS   AGE
elasticsearch-es-default-0        2/2     Running   0          4h51m
kibana-kb-5b84ff555-tn72n         2/2     Running   0          4h52m
object-logging-68845648ff-mblhk   2/2     Running   0          154m
```

In a terminal, port-forward the Kibana service:

```bash
$ kubectl port-forward -n cluster-audit svc/kibana-kb-http 8080:5601
Forwarding from 127.0.0.1:8080 -> 5601
Forwarding from [::1]:8080 -> 5601
...
```

and open up https://localhost:8080

log into Kibana with the username `elastic` and the password returned by:

```bash
kubectl get secrets -n cluster-audit elasticsearch-es-elastic-user -o jsonpath="{ .data.elastic }" | base64 --decode
```


Create an Index Pattern on this page: https://localhost:8080/app/kibana#/management/kibana/index_patterns That has `pods-*` as the index pattern, and `@timestamp` as the times.

Now you can start to search for events in the Discovery page: https://localhost:8080/app/kibana#/discover

