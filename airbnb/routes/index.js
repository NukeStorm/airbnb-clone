var express = require("express");
var router = express.Router();
const LevelDB = require("../Util/levelDB");
const SessionManager = require("../Util/SessionManager");
const userDB = new LevelDB("user");
const manager = new SessionManager();

/* GET home page. */
router.get("/", function (req, res, next) {

  console.dir(manager, {depth:null});
  let userid =null;

    if (req.cookies["EXPRESS_SESSION"]) {
      console.log("index page cookie :"+req.cookies["EXPRESS_SESSION"]);
      try{
       userid = manager.getSessionInfo(req.cookies["EXPRESS_SESSION"])['id'] ;
       }
       catch{
         ;
       }
    }

    userid?  res.render("index", { test:'test', title: `로그인ID : ${userid} 테스트 페이지` , user :true }) :  res.render(  "index", { user:false,  test:'test',title: `테스트 페이지`});
});

//로그인 요청 POST
router.post("/login", function (req, res, next) {
  let id = req.body["id"];
  let pw = req.body["pw"];

  let loginprocess = async () => {
    let user_pw = await userDB.get(id);
    return user_pw;
  };

  loginprocess()
    .then((user_pw) => {
      console.log("pw:", user_pw);
      if (user_pw === pw) {
        let newSessionId = manager.setSession(id);
        if (!req.cookies["EXPRESS_SESSION"]) {
          //expires: new Date(Date.now() + 900000)
          //console.dir(manager.setSession(id), {depth:null});
          res.cookie("EXPRESS_SESSION", newSessionId, { httpOnly: true });
        } else {
          manager.removeSession(req.cookies["EXPRESS_SESSION"]);
          res.cookie("EXPRESS_SESSION", newSessionId, { httpOnly: true });
        }
       // res.send(`로그인 성공 ` + id);
        res.render("index", { title: `로그인ID : ${id} 테스트 페이지` });
      } else res.send(`아이디 또는 비밀번호가 틀림`);
    })
    .catch((err) => {
      res.send(`아이디 또는 비밀번호가 틀림`);
      console.log(err);
    });
});

//로그아웃 요청 GET

router.get("/logout", function (req, res, next) {

  let sessionId = req.cookies['EXPRESS_SESSION'];
  if(sessionId){

    manager.removeSession(sessionId);
    res.clearCookie('EXPRESS_SESSION');

  }
  res.render(  "index", { user:false,  test:'test',title: `테스트 페이지`});
 
});

//회원가입 페이지 요청 GET
router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "회원가입 페이지" });
});

//회원가입 요청 POST
router.post("/signup", function (req, res, next) {
  console.log(req.body);
  let id = req.body["id"];
  let pw = req.body["pw"];
  let signupprocess = async () => {
    console.log(id);
    await userDB
      .get(id)
      .then((val) => {
        res.send("이미 등록된 회원" + val);
      })
      .catch((err) => {
        userDB.put(id, pw).then(res.send(`회원가입 완료: ${id}`));
        console.log(err);
      });
  };
  signupprocess();
});

module.exports = router;
