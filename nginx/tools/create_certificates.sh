#!/bin/bash

echo "creating new self-signed certificate todo.app"

mkdir -p ssl
openssl req \
	-x509 -nodes \
	-out \
	./ssl/inception.crt -keyout ./ssl/inception.key \
	-subj "/C=FR/ST=IDF/L=Paris/O=42/OU=42/CN=todo.app/UID=todo"
chmod -R 600 ./ssl