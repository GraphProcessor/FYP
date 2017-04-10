# Vis Comm Design
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