#!/bin/sh
>&2 echo "Starting unit & e2e tests"
npm run migration:up && npm run test && npm run test:e2e