/**
 * @authors : hoozi
 * @webSite : https://github.com/hoozi 
 * @email   : 287036406@qq.com
 * @date    : 2015-05-19 15:00:39
 * @version : 0.0.1
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var users = new Schema({
	userName: String,
	passWord: String
});
mongoose.model("user", users);