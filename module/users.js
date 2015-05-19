/**
 * @authors : hoozi
 * @webSite : https://github.com/hoozi 
 * @email   : 287036406@qq.com
 * @date    : 2015-05-19 15:00:39
 * @version : 0.0.1
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/data');
var users = new Schema({
	userName: String,
	passWord: String
});
var User = mongoose.model("user", users);
module.exports = {
	"save":function(data, fn) {
		var u = new User(data);
		u.save(fn);
	}
}