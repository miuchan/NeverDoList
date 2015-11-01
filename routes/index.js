var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('todo', { title: '未完成', username:'雨宫美羽' });
});

router.get('/todo', function(req, res, next) {
  res.render('todo', { title: '未完成', username:'雨宫美羽' });
});

router.get('/stared', function(req, res, next) {
  res.render('stared', { title: '已加星标', username:'雨宫美羽' });
});

router.get('/done', function(req, res, next) {
  res.render('done', { title: '已完成', username:'雨宫美羽' });
});

router.get('/add', function(req, res, next) {
  res.render('add', { title: '添加任务', username:'雨宫美羽' });
});

module.exports = router;
