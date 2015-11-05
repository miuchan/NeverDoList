var express = require('express');
var Todo = require('../models/todo');
var router = express.Router();

router.get(['/', '/todo'], function(req, res, next) {
  Todo.get({deleted: false, done: false}, function (err, todoList) {
    res.render('todo', { title: '未完成', username: '雨宫美羽', todoList: todoList });
  });


});

router.get('/stared', function(req, res, next) {
  Todo.get({deleted: false, stared: true}, function (err, staredList) {
    res.render('stared', { title: '未完成', username: '雨宫美羽', staredList: staredList });
  });
});

router.post('/stared', function (req, res, next) {
  Todo.star(req.body.id, function(err) {
    if(err) {
      res.json({success:0});
    }
    res.json({success:1});
  });
});

router.get('/done', function(req, res, next) {
  Todo.get({done: true}, function (err, doneList) {
    res.render('done', { title: '未完成', username: '雨宫美羽', doneList: doneList });
  });
});

router.post('/done', function (req, res, next) {
  Todo.done(req.body.id, function(err) {
    if(err) {
      res.json({success:0});
    }
    res.json({success:1});
  });
});

router.get('/add', function(req, res, next) {
  res.render('add', { title: '添加任务', username:'雨宫美羽' });
});

router.post('/add', function (req, res, next) {
  var todo = {
    content: req.body.content,
    deadline: req.body.deadline
  }
  Todo.add(todo, function (err) {
    if(err) {
      return console.log(err);
    }
    res.redirect('/todo');
  });
});

router.post('/delete', function (req, res, next) {
  Todo.delete(req.body.id, function(err) {
    if(err) {
      res.json({success:0});
    }
    res.json({success:1});
  });
});
module.exports = router;
