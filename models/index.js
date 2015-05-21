/**
 * @authors : hoozi
 * @webSite : https://github.com/hoozi 
 * @email   : 287036406@qq.com
 * @date    : 2015-05-21 08:40:11
 * @version : 0.0.1
 */
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/data");

require("./post");
require("./user");

exports.User = mongoose.model("user");
exports.Post = mongoose.model("post");