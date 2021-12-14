{{/*
Common labels for all objects
*/}}
{{- define "clusterauditor.labels" -}}
app.kubernetes.io/name: {{ include "clusterauditor.name" . }}
app.kubernetes.io/instance: "{{ .Release.Name }}"
app.kubernetes.io/version: "{{ .Chart.Version }}"
helm.sh/chart: {{ include "clusterauditor.chart" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/part-of: cluster-auditor
app.kubernetes.io/component: opa-exporter
app.kubernetes.io/version: {{   .Values.image.tag| quote }}
{{- end -}}

{{/*
Expand the name of the chart.
*/}}
{{- define "clusterauditor.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "clusterauditor.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}