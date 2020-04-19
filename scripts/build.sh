#!/bin/sh

rm -rf dist
mkdir dist
npx babel src --out-dir dist --copy-files
