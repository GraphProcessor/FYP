var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/* GET home page. */
router.get('/comm_result/cis', function (req, res, next) {
    var fs = require('fs');
    var toy_graph_json = JSON.parse(fs.readFileSync('./routes/python_scripts/toy_graph.json', 'utf8'));
    console.log(JSON.stringify(toy_graph_json));
    res.json(toy_graph_json);
});


module.exports = router;
