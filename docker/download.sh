#!/bin/bash

set -e

# Parse yaml as json
function yaml2json()
{
    ruby -ryaml -rjson -e \
         'puts JSON.pretty_generate(YAML.load(ARGF))' $*
}


downloads=`cat downloads.yaml | yaml2json | jq -r '.resources[] | @base64 '`

output_dir=downloads
mkdir -p ${output_dir}

for row in $downloads; do
    echo "$row"
    _jq() {
        echo ${row} | base64 --decode | jq -r ${1}
    }
    url=`_jq '.url'`
    filename=`_jq '.filename'`
    sha=`_jq '.validation.value'`
    wget -O ${output_dir}/$filename $url
done

