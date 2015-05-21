var express = require('express');
var router = express.Router();
var User = require('../models').User;
var validator = require("validator");
/* GET users listing. */

function validate(req, res, next) {
	var body = req.body;
	var error_msg = ""
	var validator_json = {
		username: {
			validator: validator.isLength(body.username,5,12),
			msg: "用户名长度必须是5-12位！"
		},
		password: {
			validator: (!validator.isNull(body.password) || !validator.isNull(body.password2)) && validator.equals(body.password,body.password2),
			msg: "两次密码不一致或者密码为空！"
		}
	}
	for(var k in validator_json) {
		if(!validator_json[k].validator) {
			error_msg+=validator_json[k].msg
		}
	}
	if(error_msg) {
		res.render("reg",{msg: error_msg});
		error_msg=""
	} else {
		var user = new User({userName:body.username,passWord:body.password});
		user.save();
		next();
	}
}
function login_validate(req, res, next) {
	var body = req.body;
	var username = body.username;
	var password = body.password;
	User.findOne({userName:username,passWord:password}, function(err, user) {
		if(err) throw err;
		if(user) {
			req.session.user = user;
			next();
		} else {
			res.render("login",{msg: "登录失败，请检查用户名或密码！"});
		}
	})
}

router.get('/', function(req, res) {
  res.send('');
})
.get('/reg', function(req, res) {
  	res.render("reg");
})
.get('/login', function(req, res) {
  	res.render("login");
})
.get('/manage', function(req, res) {
	if(req.session.user) {
		res.render("manage",{userName:req.session.user.userName});
	} else {
		res.render("login");
	} 	
})
.get('/list', function(req, res) {
	User.find({}, function(err, users) {
		res.render("userList",{users:users})
	})
})
.get('/logout', function(req, res) {
	req.session.destroy(function(err){
		res.redirect("../..")
	})
})
.post('/reg', validate, function(req, res) {
  	res.redirect("list");
})
.post('/login', login_validate, function(req, res) {
  	res.redirect("../");
})
.post("/password", function(req, res){
	var id = req.session.user._id;
	var oldPassword = req.body.oldPassword;
	var newPassword = req.body.newPassword;
	var newPassword2 = req.body.newPassword2;
	User.findById(id, 'passWord', function (err, doc) {
		if(oldPassword!==doc.passWord) {
			res.render("manage",{msg:"旧密码错误"});
		} else {
			if(newPassword!==newPassword2) {
				res.render("manage",{msg:"两次密码不一致"});
			} else {
				doc.passWord = newPassword;
				doc.save(function(err, rs){
					req.session.destroy(function(err){
						res.redirect("login");
					})
				});
			}
		}
	});
})

module.exports = router;
