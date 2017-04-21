var express = require('express');
var router = express.Router();

// change `/cis_karate` into `/`, here root directory is `/cis_karate`


router.get('/', function (req, res, next) {
    res.render('cis_karate', {title: 'Express'});
});

// change `/comm_result/cis1` into `/comm_result` to make it more readable

router.get('/comm_result', function (req, res, next) {

    const exec = require('child_process').execSync;

    exec('cd ../../community_detection_algos; python exec_docker.py demo_cis karate_edges_input.csv; echo done > done', function (error, stdout, stderr) {

        if (error) {
            console.error(error.toString());
            return;
        }
        console.log(stdout.toString());
        console.log(stderr.toString());
    });

    var fs = require('fs');

    var toy_graph_json = JSON.parse(fs.readFileSync('../../community_detection_algos/json_files/karate_cis.json', 'utf8'));
    console.log(JSON.stringify(toy_graph_json));
    res.json(toy_graph_json);

});


module.exports = router;
