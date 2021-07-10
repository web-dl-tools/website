# Web DL Website
![Web DL website overview page](.github/assets/overview-framed.png)

![lint workflow](https://github.com/web-dl-tools/website/actions/workflows/lint.yml/badge.svg)
![test workflow](https://github.com/web-dl-tools/website/actions/workflows/test.yml/badge.svg)
![build workflow](https://github.com/web-dl-tools/website/actions/workflows/build.yml/badge.svg)

**Web DL website** is a Vue.js SPA Website built to fully integrate the Web DL API and all of its features. 
It's the official browser client for the Web DL tools stack.

### Some features
* Responsive for all screen sizes, from mobile to ultra-wide.
* Compiled for all modern web browsers.
* 100% integrated with Web DL API.
* Authenticated user access to resources and files.
* Websocket live connection for automatic status and progress updates.
* Charts for data storage insights.
* Much more features...

## Installation
The Wel DL Website requires the following software and OS to be installed:

- Apple macOS Yosemite 10.10.3+ or Microsoft Windows 10 Professional/Enterprise 64-bit
- [Docker Desktop](https://www.docker.com/products/docker-desktop) 

On lower versions of macOS, Windows, or on Linux, the 
[Docker Engine](https://hub.docker.com/search?offering=community&operating_system=linux&q=&type=edition)
can also be installed, although the Web DL Website was not originally developed using this tools.

### Runtime environment
- Docker 18.09.2+
- Docker Compose 1.23.2+

### Startup guide
Prepare and start the required containers.
``` bash
$ make build && make start
```

### Update guide
Shutdown, update and restart the containers.
``` bash
$ make update && make start
```

### Shutdown and cleaning up guide
Stop, shutdown and remove the running containers and all images.
``` bash
$ make stop && make clean
```

## Development
For development the Web DL Website requires the following software to be installed:
- [Node.js](https://nodejs.org/en)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

In additional several packages will be installed via Yarn.

### Runtime environment
- Node.js 15.5.1+
- yarn 1.22.5+

### Project setup
Install all required dependencies in order to run and develop the application.
``` bash
$ yarn install
```

### Live serving
Compiles and hot-reloads the application for development.
``` bash
$ yarn serve
```

### Lint
Lints and fixes files.
``` bash
$ yarn lint
```

### Build
Compiles and minifies the application for production.
``` bash
$ yarn build
```

### Dockerize
Build production container(s) for testing purposes.
``` bash
$ make build && make start_debug
```
