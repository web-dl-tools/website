# Web DL Website
![Web DL website overview page](.github/assets/overview.png)

![lint workflow](https://github.com/web-dl-tools/website/actions/workflows/lint.yml/badge.svg)
![test workflow](https://github.com/web-dl-tools/website/actions/workflows/test.yml/badge.svg)
![build workflow](https://github.com/web-dl-tools/website/actions/workflows/build.yml/badge.svg)

**Web DL website** is a Vue.js SPA Website build to fully integrate the Web DL API and all of its features. 
It's the official browser client for the Web DL stack.

### Some features
* Responsive for all screen sizes, from mobile to ultra-wide.
* Compiled for all modern web browsers.
* 100% integrated with Web DL API.
* Authenticated user access to resources and files.
* Websocket live connection for automatic status and progress updates.
* Charts for data storage insights.
* Even more...

## Quick start

```bash
$ git clone git@github.com:web-dl-tools/website.git
$ cd ./website
// Fill in .env file
$ make start
```

Please review the [requirements](https://web-dl-tools.github.io/docs/#/requirements), [installation](https://web-dl-tools.github.io/docs/#/installation) and [configuration](https://web-dl-tools.github.io/docs/#/configuration) steps in [the documentation](https://web-dl-tools.github.io/docs/) for for additional information and troubleshooting.
