var express = require('express');
var router = express.Router();
var session = require('express-session');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',function(req,res){
	var sess;
	sess = req.session;
});

router.post('/submit', function(req,res,next){
	// check validity
}); 

module.exports = router;
