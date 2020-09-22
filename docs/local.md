# Local Development

This assumes understanding of [OPA Gatekeeper](https://github.com/open-policy-agent/gatekeeper) and the basic architecture of the [Cluster Auditor](architecture.md)

## Deploy locally

### Environment

To develop locally, a Kubernetes cluster is required.  For this we use [Kind](https://kubernetes.io/docs/setup/learning-environment/kind/) or [K3d](https://github.com/rancher/k3d).

```bash
kind create cluster
```

The local docker environment should have at least 6CPU and 10 GB Ram to function effectively

### Application and Dependencies

From the top level of the repo, install the local development environment via

```bash
kubectl apply -k ./manifests/local
```

This may need to be run a few times to ensure the CRs for each CRD are created successfully. There will always be the error:

```
error: unable to recognize "./manifests/local": no matches for kind "DestinationRule" in version "networking.istio.io/v1alpha3"
```

Since Istio isn't installed as part of the local development stack.


## Add Constraints

Local development will be used for a couple of enhancments.  The first is to add new `Constraints` that further track compliance with the Kubernetes STIG.   If using an existing ConstraintTemplate, simply adding the `Constraint` to the `./manifests/base/constraints/` folder, and modifying the `./manifests/base/constraints/kustomization.yaml` file to reference the new constraint will allow reapplying the install to pick up the new/modified `Constraint`:

```base
kubectl apply -k ./install/local
```

## Add ConstraintTemplate

Some new compliance checks will require the creation of a new `ConstraintTemplate`.  In order to have the Cluster Auditor track new `Constraints` of the created type, the [Fluentd configmap](../manifests/base/app/configMap.yaml) needs to be update to let Fluentd know the new resource type to watch.

### Update Configmap

Inside the `opa.conf` portion of the `ConfigMap`, there exists a source type that watches resources inside the `constraints.gatekeeper.sh/v1alpha` API Group:

```
    <source>
      @type kubernetes_objects
      tag kube.objects.*
      api_version "constraints.gatekeeper.sh/v1alpha1"
      insecure_ssl false
      <watch>
        resource_name k8s_required_labels
      </watch>
      ...   
    </source>
```

Upon creating a new `ConstraintTemplate` that creates a CRD of type `K8sFooBarConstraint`, a new `watch` section needs to be added to the `source` shown above.  All capital letters in the CRD need to be converted to lower case and there needs to be an `_` before upper case letters inside the name:

`K8sFooBarConstraint` -> `k8s_foo_bar_constraint`

which would yeild a new section:

```
    <source>
      @type kubernetes_objects
      tag kube.objects.*
      api_version "constraints.gatekeeper.sh/v1alpha1"
      insecure_ssl false
      <watch>
        resource_name k8s_required_labels
      </watch>
      <watch>
        resource_name k8s_foo_bar_constraint
      </watch>
      ...   
    </source>

```

In order to roll out this change, we first need to apply the configmap, and then restart the pod:

```bash
kubectl apply -k ./manifests/local
kubectl delete pods -n elastic -l app.kubernetes.io/component=fluentd
```


## Logging into Kibana

In a terminal, execute 

```bash
kubectl port-forward -n elastic svc/kibana-kb-http 8080:5601
```

and ontain the password for the `elastic` user via

```bash
$ kubectl get secrets -n elastic elasticsearch-es-elastic-user -o jsonpath="{ .data.elastic }" | base64 --decode
7934UY5IBHRu312Z23UGWjHr
```

Now open [Kibana](https://localhost:8080) in the browser and log in using the credentials.  Proceed to [Setting up Kibana](./kibana.md) for
setting up Kibana.