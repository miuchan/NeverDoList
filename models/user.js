var db = require('./db');
var mongoose = db.mongoose;
var userSchema = mongoose.Schema({
  username: String,
  password: String
});

var userModel = mongoose.model('user', userSchema);

var User = function user() {

};

User.prototype.add = function (obj, callback) {
  var auser = new userModel(obj);
  auser.save(function (err) {
    if(err) {
      callback(err);
    }
    callback(null);
  });
};

User.prototype.get = function(username, callback) {
  userModel.findOne({ username: username }, callback);
}
