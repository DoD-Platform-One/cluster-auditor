ARG BASE_REGISTRY=registry1.dsop.io
ARG BASE_IMAGE=ironbank/opensource/fluentd/fluentd
ARG BASE_TAG=1.11.2

FROM ${BASE_REGISTRY}/${BASE_IMAGE}:${BASE_TAG}


ARG VERSION

LABEL name="Cluster Audit" \
      maintainer="DSOP Container Hardening Team" \
      vendor="Big Bang" \
      version=${VERSION} \
      release=${VERSION} \
      description="Cluster Auditor Image for Big Bang"

ENV FLUENT_USER fluent

USER 0

RUN yum install -y make gcc gcc-c++

# temp location for local testing
COPY downloads/*.gem /tmp/

# COPY *.gem /tmp/


COPY downloads/jq /usr/bin
# COPY jq /usr/bin


RUN chmod +x /usr/bin/jq

RUN gem install --force --local -N /tmp/ffi.gem
RUN gem install --force --local -N /tmp/*.gem

# RUN yum install nodejs

# RUN wget -O jq https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64 && \
#       chmod +x ./jq && \
#       cp jq /usr/bin

# COPY Gemfile* ./
# RUN gem install bundler \
#    && bundle install 

# RUN groupadd -r $FLUENT_USER && \
#   useradd -r -g $FLUENT_USER $FLUENT_USER && \
#   mkdir -p /fluentd/log fluentd/etc /fluentd/plugins &&\
#   chown -R $FLUENT_USER /fluentd && chgrp -R $FLUENT_USER /fluentd

# USER 1001
# CMD bundle exec fluentd -c /fluentd/etc/fluent.conf
