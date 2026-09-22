#!/bin/bash
set -e

REGISTRY="bogdandanielioan"
IMAGE="${REGISTRY}/sap-ui-table-browser"
PLATFORMS="linux/amd64,linux/arm64"
TAG="release-$(date +%Y%m%d-%H%M%S)"
BUILDER_NAME="multiarch"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

usage() {
  echo "Usage: $0 [OPTIONS]"
  echo ""
  echo "Build and push multi-arch Docker image for sap-ui-table-browser."
  echo ""
  echo "Options:"
  echo "  --tag TAG        Custom image tag (default: release-YYYYMMDD-HHMMSS)"
  echo "  --no-push        Build only, don't push to registry"
  echo "  --no-cache       Build without Docker cache"
  echo "  -h, --help       Show this help"
}

PUSH="--push"
NO_CACHE=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --tag) TAG="$2"; shift 2 ;;
    --no-push) PUSH="--load"; PLATFORMS="linux/$(uname -m | sed 's/x86_64/amd64/' | sed 's/aarch64/arm64/')"; shift ;;
    --no-cache) NO_CACHE="--no-cache"; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo -e "${RED}Unknown option: $1${NC}"; usage; exit 1 ;;
  esac
done

if ! docker info >/dev/null 2>&1; then
  echo -e "${RED}Docker nu rulează!${NC}"
  exit 1
fi

if ! docker buildx inspect "$BUILDER_NAME" >/dev/null 2>&1; then
  echo -e "${BLUE}Creez buildx builder '${BUILDER_NAME}'...${NC}"
  docker buildx create --name "$BUILDER_NAME" --driver docker-container --use
  docker buildx inspect "$BUILDER_NAME" --bootstrap
else
  docker buildx use "$BUILDER_NAME"
fi

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Image:       ${IMAGE}${NC}"
echo -e "${BLUE}Tag:         ${TAG}${NC}"
echo -e "${BLUE}Platforms:   ${PLATFORMS}${NC}"
echo -e "${BLUE}========================================${NC}"

docker buildx build \
  --platform "$PLATFORMS" \
  --tag "${IMAGE}:${TAG}" \
  --tag "${IMAGE}:latest" \
  ${NO_CACHE} \
  ${PUSH} \
  "$SCRIPT_DIR"

echo -e "${GREEN}✓ sap-ui-table-browser built: ${IMAGE}:${TAG}${NC}"
