/**
 * @authors : hoozi
 * @webSite : https://github.com/hoozi 
 * @email   : 287036406@qq.com
 * @date    : 2015-05-20 16:27:38
 * @version : 0.0.1
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var moment = require("moment");
var post = new Schema({
	title: String,
	content: String,
	img: Buffer,
	createTime: {type: Date, default: Date.now }
});
post.path('createTime').get(function(){
	return moment().format("YYYY-MM-DD")
});
post.set('toObject', { getters: true });
mongoose.model("post", post);