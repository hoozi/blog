var express = require('express');
var router = express.Router();
var Post = require("../models").Post;
/* GET home page. */
router.get('/', function(req, res, next) {
  Post.find({}, "title content",{"sort":"-createTime"}, function(err, posts){
  	res.render('index', {user:req.session.user,posts:posts});
  })
});
module.exports = router;
