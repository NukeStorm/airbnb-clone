"use strict";

var express = require("express");

var router = express.Router();

var LevelDB = require("../Util/levelDB");

var userDB = new LevelDB("user");
/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("index", {
    title: "테스트 페이지"
  });
}); //로그인 요청 POST

router.post("/login", function (req, res, next) {
  var id = req.body["id"];
  var pw = req.body["pw"];

  var loginprocess = function loginprocess() {
    var user_pw;
    return regeneratorRuntime.async(function loginprocess$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(userDB.get(id));

          case 2:
            user_pw = _context.sent;
            return _context.abrupt("return", user_pw);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  loginprocess().then(function (user_pw) {
    console.log('pw:', user_pw);

    if (user_pw === pw) {
      res.send("\uB85C\uADF8\uC778 \uC131\uACF5 " + id);
    } else res.send("\uC544\uC774\uB514 \uB610\uB294 \uBE44\uBC00\uBC88\uD638\uAC00 \uD2C0\uB9BC");
  })["catch"](function (err) {
    res.send("\uC544\uC774\uB514 \uB610\uB294 \uBE44\uBC00\uBC88\uD638\uAC00 \uD2C0\uB9BC");
    console.log(err);
  });
}); //회원가입 페이지 요청 GET

router.get("/signup", function (req, res, next) {
  res.render("signup", {
    title: "회원가입 페이지"
  });
}); //회원가입 요청 POST

router.post("/signup", function (req, res, next) {
  console.log(req.body);
  var id = req.body["id"];
  var pw = req.body["pw"];

  var signupprocess = function signupprocess() {
    return regeneratorRuntime.async(function signupprocess$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(id);
            _context2.next = 3;
            return regeneratorRuntime.awrap(userDB.get(id).then(function (val) {
              res.send("이미 등록된 회원" + val);
            })["catch"](function (err) {
              userDB.put(id, pw).then(res.send("\uD68C\uC6D0\uAC00\uC785 \uC644\uB8CC: ".concat(id)));
              console.log(err);
            }));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  };

  signupprocess();
});
module.exports = router;