# Web App

## Node Version

requires node version 0.12+,

```zsh
sudo npm install n -g
sudo n 0.12.2
```

## Build

```zsh
./add_node_modules.sh
./generate_bundle_js.sh
npm start
```

## Debug Info

json, see [cis comm result link](http://localhost:3000/cis_karate/comm_result)

website, see [index link](http://localhost:3000/)


## Dir Organization

### Util
- [add_node_modules.sh](add_node_modules.sh): for adding node modules according to [package.json](package.json)

```zsh
npm install
```

- [generate_bundle_js.sh](generate_bundle_js.sh): for generating bundle.js to be used in a browser

```zsh
browserify views/browser_side_scripts/index.js -o public/javascripts/bundle.js
```

- [build.sh](build.sh): for installing npm, running browserify and starting npm

```zsh
./add_node_modules.sh
./generate_bundle_js.sh
npm start
```

### Express Related

content | detail
--- | ---
[bin](bin) | used in `npm start`
[app.js](app.js) | configure express views and routes
[routes](routes) | express router codes
[views](views) | jade templates and browser side scripts used by [generate_bundle_js.sh](generate_bundle_js.sh)
[public](public) | visible by browsers, mainly including [bundle.js](public/javascripts/bundle.js) and [some css](public/stylesheets)

## Introduction

content | detail
--- | ---
[vis_comm](vis_comm) | express-based web server
[pure_front_end](pure_front_end) | pure front-end, open [index.html](pure_front_end/index.html) in your browser
[data_formats](data_formats) | some json specifications in this project
[other_exp_codes](other_exp_codes) | other experimental codes
