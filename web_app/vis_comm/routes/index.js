var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/* GET home page. */
router.get('/comm_result/cis', function (req, res, next) {
    const exec = require('child_process').exec;
    exec('python ./routes/python_scripts/print_test.py >routes/python_scripts/test.txt', function (error, stdout, stderr) {
        if (error) {
            console.error(error.toString());
            return;
        }
        console.log(stdout.toString());
        console.log(stderr.toString());
    });

    var fs = require('fs');
    var toy_graph_json = JSON.parse(fs.readFileSync('./routes/python_scripts/toy_graph.json', 'utf8'));
    console.log(JSON.stringify(toy_graph_json));
    res.json(toy_graph_json);
});


module.exports = router;
