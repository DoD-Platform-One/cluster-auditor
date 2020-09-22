all: download build push deploy

download:
	./download.sh

build:
	docker build -t runyonsolutions/cluster-auditor:0.3 .

push:
	docker push runyonsolutions/cluster-auditor:0.3

deploy:
	kubectl delete pods -n elastic -l app.kubernetes.io/instance=cluster-audit