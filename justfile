# Run the podman container
@default:
  podman run \
    --name 13vaults \
    --rm \
    -p 6006:6006 \
    -p 3000:3000 \
    -v ./:/app \
    -v /app/node_modules \
    -v /app/.next \
    -v /app/.contentlayer \
    localhost/13vaults:latest

# Build the container for podman
@build:
  podman build . -t 13vaults
