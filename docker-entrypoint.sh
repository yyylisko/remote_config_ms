#!/bin/sh
>&2 echo "Starting server..."
npm run migration:up && npm run start