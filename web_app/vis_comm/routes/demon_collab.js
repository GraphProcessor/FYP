var express = require('express');
var router = express.Router();


// change `/cis_karate` into `/`, here root directory is `/cis_karate`
router.get('/', function (req, res, next) {
    res.render('demon_collab', {title: 'Express'});
});


// change `/comm_result/cis1` into `/comm_result` to make it more readable
router.get('/comm_result', function (req, res, next) {
    const exec = require('child_process').execSync;
    //exec('python ./routes/python_scripts/print_test.py >routes/python_scripts/test.txt', function (error, stdout, stderr) {
    exec('cd ../../community_detection_algos; python exec_docker.py demo_demon collaboration_edges_input.csv', function (error, stdout, stderr) {
        if (error) {
            console.error(error.toString());
            return;
        }
        console.log(stdout.toString());
        console.log(stderr.toString());

    });
    var fs = require('fs');
    //var toy_graph_json = JSON.parse(fs.readFileSync('./routes/python_scripts/toy_graph.json', 'utf8'));
    var toy_graph_json = JSON.parse(fs.readFileSync('../../community_detection_algos/json_files/collaboration_demon.json', 'utf8'));
    console.log(JSON.stringify(toy_graph_json));
    res.json(toy_graph_json);
});


module.exports = router;
