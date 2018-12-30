#!/bin/bash
./node_modules/.bin/webpack --config="./webpack.config.js" \
&& echo "/*! core-stack | MIT (c) 2016 Nicolas Tallefourtane - nicolab.net */ $(cat ./dist/index.js)" \
> ./dist/index.js
