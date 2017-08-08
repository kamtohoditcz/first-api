var trash = require('./trash');

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  var q = req.query.q;
  trash.listAll(q).then(function (odpadky) {
    res.json(odpadky);
  });
});

module.exports = router;
