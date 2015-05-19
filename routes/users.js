var express = require('express');
var router = express.Router();
var userDB = require('../module/users.js')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//注册
router.get('/reg', function(req, res, next) {
  	res.render("reg",{msg:""});
});
function validate(req, res, next) {
	var body = req.body;
	if(body.password!==body.password2) {
		res.render("reg",{msg:"两次密码不一致！"});
  	} else {
  		userDB.save({userName:body.username,passWord:body.password},function(){
  			next();
  		})
  	}
}
router.post('/reg', validate, function(req, res, next) {
  	res.redirect("http://localhost:3000/")
});
module.exports = router;
