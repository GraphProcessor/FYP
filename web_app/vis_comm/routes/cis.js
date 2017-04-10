var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/comm_result', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
