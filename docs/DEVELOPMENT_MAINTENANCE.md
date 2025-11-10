# Code Changes for Updates

Cluster-auditor is a modified version of the upstream repo for [opa-scorecard](https://github.com/runyontr/opa-scorecard/tree/master/kube-prometheus-stack). You can use `kpt` to update automatically from the upstream. To do this:

1. Navigate to the opa-scorecard [upstream](https://github.com/runyontr/opa-scorecard/tree/master/kube-prometheus-stack) and find the latest version that works with the image update. 
  a. For example, if updating to 0.0.7, search through the version git tags in the upstream until you find the most recent one that matches 0.0.7. For this example that would be [`exporter-go/v0.0.7`](https://github.com/runyontr/opa-scorecard/tree/exporter-go/v0.0.7/kube-prometheus-stack).

2. From the top level of the repo run `kpt pkg update chart/dashboards/kube-prometheus-stack@{GIT TAG} --strategy alpha-git-patch` replacing `{GIT TAG}` with the tag you found in step one. You may run into some merge conflicts, resolve these in the way that makes the most sense. In general, if something is a Big Bang addition you will want to keep it, otherwise go with the upstream change.

3. Increment the `-bb.#` to the `version` in `chart/Chart.yaml`. The `-bb-.#` should be incremented for patch updates. Whenever a major or minor version of the upstream occurs, increase the version and reset to `-bb.0`

4. Update `CHANGELOG.md` adding an entry for the new version and noting all changes (at minimum should include `Updated cluster-auditor to x.x.x`).

5. Generate the `README.md` updates by following the [guide in gluon](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md).

6. Open an MR in "Draft" status ( or the Renovate created MR ) and validate that CI passes. This will perform a number of smoke tests against the package, but it is good to manually deploy to test some things that CI doesn't. Follow the steps below for manual testing. For automated CI testing follow the steps in [test-package-against-bb](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/docs/developer/test-package-against-bb.md?ref_type=heads) and modify test-values with the following settings:
  ```yaml
  clusterAuditor:
    enabled: true
    sourceType: "git"
    git:
      tag: null
      repo: "https://repo1.dso.mil/big-bang/product/packages/cluster-auditor.git"
      path: "./chart"
      branch: renovate/ironbank
  ```

7. Once all manual testing is complete take your MR out of "Draft" status and add the review label.

# Manual Testing for Updates

You can use this override yaml file to deploy cluster-auditor to your Big Bang cluster for testing:
Remember to change `branch:` to point to the branch you're testing
```
# Have to zero-out tag to deploy by branch here.
clusterAuditor:
  enabled: true
  git:
    tag: ""
    branch: "your-branch-goes-here"
# Cluster Auditor depends on opa-gatekeeper and monitoring
gatekeeper:
  enabled: true
monitoring:
  enabled: true
grafana:
  enabled: true
```

Testing Steps:
- Login to `grafana.dev.bigbang.mil`
- Choose `Dashboards` from the menu on the left side
- Search for the `OPA Violations` dashboard and select it. 
    - If there is no `OPA Violations` dashboard then Cluster-Auditor did not deploy correctly. 
- Once on the dashboard page, the drop-downs should be as follows:
    - `datasource` is set to `Prometheus`
    - `cluster` is set to `logging-loki`
    - `namespace` should be all the namespaces in your cluster that have active pods
- Click through several of the namespaces. You should see the values in the ```Total Violations by kind``` panel change. 

Note: The ```OPA Violations``` panel does not show all the data. To see specific data that should be represented here, go to Prometheus and execute a query for ```opa_scorecard_constraint_violations{}```. 

When in doubt with any testing or upgrade steps ask one of the [CODEOWNERS](https://repo1.dso.mil/big-bang/product/packages/cluster-auditor/-/blob/main/CODEOWNERS?ref_type=heads) for assistance.

# Modifications made to upstream chart

None. Cluster-auditor is a dashboard that is added to Grafana to track OPA violations. There is no need to make any changes to the upstream to use it in Big Bang. 