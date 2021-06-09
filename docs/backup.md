Cluster Auditor ships all of its data to Elasticsearch, it does not store any data locally. There is a chance some data could be lost if the Pod dies before it can ship a round data to Elasticsearch but this data is not very time-critical so losing one set of it is not going to impact any auditing going forward. Since the data for this application as well as many others in the cluster is all going to Elasticsearch it is important to make sure you are backing up your data there, [see the docs in the elasticsearch-kibana package](https://repo1.dso.mil/platform-one/big-bang/apps/core/elasticsearch-kibana/-/blob/main/docs/backup.md) for more details on configuring backups for Elasticsearch.