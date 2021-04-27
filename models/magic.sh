#!/bin/bash

npm i gltf-pipeline -g
mkdir -p out

for filename in $(ls *.glb)
do
    echo "Exporting $filename"
    gltf-pipeline -i $filename -t -o out/$filename
done
