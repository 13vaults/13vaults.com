# 13Vaults

[![Production Build Status](https://img.shields.io/github/deployments/13vaults/13vaults.com/production?label=Production%20Build)](https://github.com/13vaults/13vaults.com/deployments/activity_log?environment=Production)

An unofficial, community-driven resource for the 13th Age RPG.

<picture>
  <source height="64px" media="(prefers-color-scheme: dark)" srcset="readme-assets/agplv3-white.svg">
  <source height="64px" media="(prefers-color-scheme: light)" srcset="readme-assets/agplv3-black.svg">
  <img height="64px" alt="AGPL logo" src="readme-assets/agplv3-black.svg">
</picture>

## Development

### Tools required

- [just](https://github.com/casey/just)
- [Podman](https://podman.io/)

### Dev Getting Started

1. Run `just build` to build the docker image
1. Run `just` to run the docker image in a new container
1. Visit http://localhost:3000 in your browser

## License Information

For things related to the works that I've used and referenced in this software, look at [LICENSES].

For things related to the work that I have done, it's AGPLv3. You can view the license in the [LICENSE] file.

[LICENSES]: /LICENSES
[LICENSE]: /LICENSE