var express = require('express');
var Todo = require('../models/todo');
var User = require('../models/user');
var router = express.Router();

router.get(['/', '/todo'], function(req, res, next) {
  Todo.get({deleted: false, done: false}, function (err, todoList) {
    res.render('todo', { title: '未完成', username: '雨宫美羽', todoList: todoList });
  });
});

router.get('/reg', function(req, res, next) {
  res.render('reg', { title: '注册帐号', username: null });
});

router.post('/reg', function(req, res, next) {
  var user = {
    username: req.body.username,
    password: req.body.password
  }

  User.get({username: user.username}, function(err, user) {
    if(user) {
      res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8'});
      return res.end('用户名已存在！', 'utf8');
    }
    User.add(user, function(err) {
      if(err) {
        return console.log(err);
      }
      req.session.username = user.username;
      console.log(req.session)
    });
  });



});

router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录', username: null });
});

router.post('/login', function(req, res, next) {
  var username = req.body.username,
      password = req.body.password;
  User.get({username: username}, function(err, user) {
    if(err) {
      return console.log(err);
    }
    var user = user;
    console.log(user);
    if(username == user.username && password == user.password) {
      req.session.username = username;
      res.redirect('/todo');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8'});
      res.end('用户名或密码错误！');
    }
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
    user: req.session._id,
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
