#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Run migrations
python manage.py makemigrations --noinput
python manage.py migrate --noinput
