var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '테스트 페이지' });
});


//로그인 요청 POST
router.post('/login', function(req, res, next) {
  console.log(req.body);
  res.send(req.body);
});


//회원가입 페이지 요청 GET
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: '회원가입 페이지' });
});

//회원가입 요청 POST
router.post('/signup', function(req, res, next) {
  console.log(req.body);
  res.send(req.body);
});
module.exports = router;
