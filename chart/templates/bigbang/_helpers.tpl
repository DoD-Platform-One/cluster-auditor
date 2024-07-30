{{/*
Bigbang labels
Normally this would include an `app` label, but such a label was already hard-
coded in the deployment manifest.
*/}}
{{- define "bigbang.labels" -}}
{{- if .Chart.AppVersion }}
version: {{ .Chart.AppVersion | quote }}
{{- end }}
{{- end }}