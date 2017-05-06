# Vis Comm Design
## Node Version

requires node version 0.12+,


## Build

```zsh
./add_node_modules.sh
./generate_bundle_js.sh
npm start
```

## Debug Info

json, see [cis comm result link](http://localhost:3000/comm_result/cis)

website, see [index link](http://localhost:3000/)


## Dir Organization
### Util
- [add_node_modules.sh](add_node_modules.sh), for adding node modules according to [package.json](package.json)

```zsh
npm install
```

- [generate_bundle_js.sh](generate_bundle_js.sh), for generating bundle.js to be used in a browser

```zsh
browserify views/browser_side_scripts/index.js -o public/javascripts/bundle.js
```

- [build.sh](build.sh), for installing npm, running browserify and starting npm

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

## Git Usage 

### Basic Commands
Check git status
```zsh
git status
gst
```
Add files to current directory
```zsh
git add .
```
Pull changes before pushing
```zsh
git pull origin branch-name
git add dir_path
git commit -m "xxx"
git push origin branch-name
```
Stash changes before pulling
```zsh
git stash 
git pull origin master 
git stash apply
```

