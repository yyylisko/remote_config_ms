#!/bin/sh
>&2 echo "Starting unit & e2e tests"
npm run migration:up:dev && npm run test && npm run test:e2e