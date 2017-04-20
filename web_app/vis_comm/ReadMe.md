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

## Pending Work

in [routes/index.js](routes/index.js),

see

```javascript
/* GET home page. */
router.get('/comm_result/cis', function (req, res, next) {
    var fs = require('fs');
    var toy_graph_json = JSON.parse(fs.readFileSync('./routes/python_scripts/toy_graph.json', 'utf8'));
    console.log(JSON.stringify(toy_graph_json));
    res.json(toy_graph_json);
});

```

change this function via invoke the python script in folder `./routes/python_scripts/`

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

### Express Related

content | detail
--- | ---
[bin](bin) | used in `npm start`
[app.js](app.js) | configure express views and routes
[routes](routes) | express router codes
[views](views) | jade templates and browser side scripts used by [generate_bundle_js.sh](generate_bundle_js.sh)
[public](public) | visible by browsers, mainly including [bundle.js](public/javascripts/bundle.js) and [some css](public/stylesheets)