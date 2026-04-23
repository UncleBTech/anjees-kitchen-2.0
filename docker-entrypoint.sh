#!/bin/sh
set -e

# Start nginx in background
nginx &
NGINX_PID=$!

# Start Node API server
node /app/server/index.js &
NODE_PID=$!

# Exit if either process dies
wait -n $NGINX_PID $NODE_PID
exit $?
