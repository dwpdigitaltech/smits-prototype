var express = require('express')
var path    = require('path')
var router  = express.Router()

// Route index page
router.get('/', function (req, res) {
  // res.render('index')
  res.redirect('/smits/')
})

/*
  Pass 'path' info into all templates.
*/
router.get('*', function (req, res, next) {
  req.data = req.data || { };
  req.data.path = path.dirname(req.params[0]).substr(1);
  next();
})

router.get('/smits/v*/dosearch/',function(req,res,next)
{
  var v = req.params[0];

  if (req.query.nino == 'GB654321C') res.redirect('/smits/v'+v+"/person-2?nino=GB654321C")
  else if (req.query.nino == 'ZZ918273C') res.redirect('/smits/v'+v+"/person-3?nino=ZZ918273C")
  else res.redirect('/smits/v'+v+"/person-1?nino=QQ123456C")

});

router.get('/smits/v*/person*', function (req, res, next) {
  req.data = req.data || { };
  req.data.nino = req.query.nino;
  next();
})

/*
  Redirect all posts to gets.
*/
router.post(/^\/([^.]+)$/, function (req, res) {
  var path = (req.params[0]);
  res.redirect('/'+path);
});
// add your routes here

module.exports = router
