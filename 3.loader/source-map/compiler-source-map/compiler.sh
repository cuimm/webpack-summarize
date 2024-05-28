#!/bin/bash

java -jar compiler.jar --js script.js --create_source_map ./script-min.js.map --source_map_format=V3 --js_output_file script-min.js

