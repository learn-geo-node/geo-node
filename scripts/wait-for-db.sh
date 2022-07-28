#!/usr/bin/env bash

set -e
set -u


database_ready() {
  nc -i 2 -z  "$POSTGRES_HOST" "$POSTGRES_PORT"
}


until database_ready; do
  echo "Database unavailable, waiting..."
done

echo "Database connection established, continuing..."

exec "$@"