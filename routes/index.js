var express = require('express');
var router = express.Router();
var ejs = require('ejs')

/* GET home page. */
router.get('/', function(req, res, next) {
  var title = "Pomodoro";
  var data = ['fiona','ruben', 'dominique'];
  var data2 = {
    soeur: 'fiona',
    maman: 'dominique'
  }
  res.render('index', { title : title, tab : data, tab2 : data2 });
});

module.exports = router;
