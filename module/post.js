/**
 * @authors : hoozi
 * @webSite : https://github.com/hoozi 
 * @email   : 287036406@qq.com
 * @date    : 2015-05-20 16:27:38
 * @version : 0.0.1
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/data');
var posts = new Schema({
	title: String,
	content: String,
	img: Buffer,
	createTime: {type: Date, default: Date.now }
});

module.exports = mongoose.model("post",posts);