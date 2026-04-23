#!/bin/sh
set -e

# Start the Node SES backend in the background
cd /srv
PORT=8080 node index.js &
NODE_PID=$!

# Forward signals to both processes
term() {
  echo "Shutting down..."
  kill -TERM "$NODE_PID" 2>/dev/null || true
  nginx -s quit 2>/dev/null || true
  wait "$NODE_PID" 2>/dev/null || true
  exit 0
}
trap term TERM INT

# Run nginx in the foreground (PID 1 replacement via exec would skip trap; keep as child)
nginx -g 'daemon off;' &
NGINX_PID=$!

# If either process exits, exit the container
wait -n "$NODE_PID" "$NGINX_PID"
EXIT_CODE=$?
echo "A process exited with code $EXIT_CODE — stopping container."
kill -TERM "$NODE_PID" "$NGINX_PID" 2>/dev/null || true
exit $EXIT_CODE
