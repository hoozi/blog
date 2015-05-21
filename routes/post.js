/**
 * @authors : hoozi
 * @webSite : https://github.com/hoozi 
 * @email   : 287036406@qq.com
 * @date    : 2015-05-20 16:25:39
 * @version : 0.0.1
 */
var router = require("express").Router();
var Post = require("../models").Post;
router.get(/(?:post(\w+))/, function(req, res) {
	var id = req.params[0];
	Post.findById(id, function(err, post){
		res.locals.post = post;
		res.render("view");
	})
})
.get("/delete/:id", function(req, res) {
	var id = req.params["id"]
	Post.findByIdAndRemove(id, function(err, post){
		res.redirect("/");
	})
})
.get("/edit/:id", function(req, res) {
	var id = req.params["id"];
	Post.findById(id, function(err, post){
		res.render("edit", {post:post})
	})
})
.get("/create", function(req, res) {
	res.render("createPost")
})
.post("/create", function(req, res){
	var title = req.body.title;
	var content = req.body.content;
	var img = req.files.img;
	var post = new Post({
		title: title || "",
		content: content || "",
		img: img && "/uploads/"+img.name
	});
	post.save(function(){
		res.redirect("/");
	});
})
.post("/edit/:id", function(req, res) {
	var id = req.params["id"];
	var title = req.body.title;
	var content = req.body.content;
	var img = req.files.img;
	Post.findByIdAndUpdate(id, {"title":title,"content":content,"img":img && "/uploads/"+img.name}, function(){
		res.redirect("/");
	})
})

module.exports = router