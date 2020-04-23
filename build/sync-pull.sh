#!/usr/bin/env bash

set -e

rm -rf dist
git clone https://github.com/faizahmedfarooqui/ycombinator-react.git dist -b assets
rm -rf dist/.git
