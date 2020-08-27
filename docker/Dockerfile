ARG BASE_REGISTRY=registry1.dsop.io
ARG BASE_IMAGE=ironbank/opensource/ruby/ruby26
ARG BASE_TAG=2.6.6

FROM ${BASE_REGISTRY}/${BASE_IMAGE}:${BASE_TAG}


ARG VERSION

LABEL name="Cluster Audit" \
      maintainer="DSOP Container Hardening Team" \
      vendor="Fluentd Organization <fluentd@googlegroups.com>" \
      version=${VERSION} \
      release=${VERSION} \
      summary="Splunk Connect for Kubernetes Objects container" \
      description="Splunk Connect for Kubernetes Objects container"

ENV VERSION=${VERSION}
ENV FLUENT_USER fluent

USER root


RUN yum install nodejs

RUN wget -O jq https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64 && \
      chmod +x ./jq && \
      cp jq /usr/bin

COPY Gemfile* ./
RUN gem install bundler \
   && bundle install 

RUN groupadd -r $FLUENT_USER && \
  useradd -r -g $FLUENT_USER $FLUENT_USER && \
  mkdir -p /fluentd/log fluentd/etc /fluentd/plugins &&\
  chown -R $FLUENT_USER /fluentd && chgrp -R $FLUENT_USER /fluentd

USER $FLUENT_USER
CMD bundle exec fluentd -c /fluentd/etc/fluent.conf
