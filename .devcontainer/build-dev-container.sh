#!/bin/bash
# Exit immediately if a command exits with a non-zero status
set -e

# Check if PAT and USERNAME are provided
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: $0 <PAT> <USERNAME>"
    exit 1
fi

# Assign variables from command-line arguments
PAT=$1
USERNAME=$2

# Setup Docker Buildx
docker buildx create --use

# Login to GitHub Packages
echo "Logging into GitHub Packages..."
echo $PAT | docker login ghcr.io -u $USERNAME --password-stdin

# Build and push Docker image
echo "Building and pushing Docker image..."
docker buildx build --file ./.devcontainer/Dockerfile --tag ghcr.io/connery-io/connery-platform/dev-container:latest --platform linux/amd64,linux/arm64 --push .

# Log out from GitHub Packages
docker logout ghcr.io

echo "Image build and push complete."
