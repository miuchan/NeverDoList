var db = require('./db');
var mongoose = db.mongoose;
var todoSchema = mongoose.Schema({
  content: String,
  deadline: String,
  done: { type: Boolean, default: false },
  stared: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  createAt: { type: Date, default: Date.now }
});

var todoModel = mongoose.model('todo', todoSchema);


var Todo = function Todo() {
}

Todo.prototype.add = function (obj, callback) {
  var todo = {
    content: obj.content,
    deadline: obj.deadline
  };
  var atodo = new todoModel(todo);
  atodo.save(function (err) {
    if(err) {
      callback(err);
    }
    callback(null);
  });
};

Todo.prototype.get = function (condition, callback) {
  todoModel.find(condition).sort({createAt:-1}).exec(callback);
};
Todo.prototype.delete = function() {
  // body...
}

Todo.prototype.star = function() {
  // body...
}

module.exports = new Todo();
