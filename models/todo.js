var db = require('db');
var mongoose = db.mongoose;
var todoSchema = mongoose.Schema({
  content:String,
  deadline:String,
  stared:Boolean,
  deleted:Boolean,
  createAt:Date
});

var todoModel = mongoose.model('todo', todoSchema);

var Todo = function Todo(obj) {
  this.content = obj.content;
  this.deadline = obj.deadline;
  this.stared = false;
  this.deleted = false;
}

Todo.prototype.add = function (obj) {
  var todo = {
    content: obj.content,
    deadline: obj.deadline
    createAt:
  }
};

Todo.prototype.delete = function() {
  // body...
}

Todo.prototype.star = function() {
  // body...
}
