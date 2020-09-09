const express = require("express");
const LevelDB = require("../Util/levelDB");
const RoomDAO = require("../model/RoomDao");
const Room = require("../model/Room");

const router = express.Router();
const userDB = new LevelDB("user");
const roomDao = new RoomDAO();

// 날짜를 타임스탬프 값으로 변환
function dateStrToTimeStamp(strDate) {
  return Date.parse(strDate);
}

/* GET home page. */
router.get("/", (req, res, next) => {
  let { manager } = res.locals;

  let userid = res.locals.session;

  res.render("index", {
    title: userid ? `로그인ID : ${userid} 테스트 페이지` : `테스트 페이지`,
  });
});

// 로그인 요청 POST
router.post("/login", (req, res, next) => {
  let { id } = req.body;
  let { pw } = req.body;

  let loginprocess = async () => {
    let userPw = await userDB.get(id);
    return userPw;
  };

  let { manager } = res.locals;

  loginprocess()
    .then((userPw) => {
      if (userPw === pw) {
        let newSessionId = manager.setSession(id);
        if (!req.cookies.EXPRESS_SESSION) {
          // expires: new Date(Date.now() + 900000)
          // console.dir(manager.setSession(id), {depth:null});
          res.cookie("EXPRESS_SESSION", newSessionId, { httpOnly: true });
        } else {
          manager.removeSession(req.cookies.EXPRESS_SESSION);
          res.cookie("EXPRESS_SESSION", newSessionId, { httpOnly: true });
        }
        // res.send(`로그인 성공 ` + id);
        res.redirect("../");
        res.render("index", { title: `로그인ID : ${id} 테스트 페이지` });
      } else res.render("index", { msg: `아이디 또는 비밀번호가 틀림` });
    })
    .catch((err) => {
      res.render("index", { msg: `아이디 또는 비밀번호가 틀림` });
    });
});

// 로그아웃 요청 GET

router.get("/logout", (req, res, next) => {
  let { manager } = res.locals;
  let sessionId = req.cookies.EXPRESS_SESSION;
  if (sessionId) {
    manager.removeSession(sessionId);
    res.locals.session = null;
    res.clearCookie("EXPRESS_SESSION");
  }
  res.redirect("../");
  // res.render(  "index", { user:false,  test:'test',title: `테스트 페이지`});
});

// 회원가입 페이지 요청 GET
router.get("/signup", (req, res, next) => {
  res.render("signup", { title: "회원가입 페이지" });
});

// 회원가입 요청 POST
router.post("/signup", (req, res, next) => {
  let { id } = req.body;
  let { pw } = req.body;
  let signupprocess = async () => {
    await userDB
      .get(id)
      .then((val) => {
        res.render("index", { msg: `이미 등록된 이메일ID입니다` });
      })
      .catch((err) => {
        userDB.put(id, pw).then(res.render("index", { msg: `회원가입이 완료되었습니다.` }));
      });
  };
  signupprocess();
});

// 숙소정보 검색 요청 POST
router.post("/search", (req, res, next) => {
  // 날짜 범위로 검색 가능하게 예약 시작 , 끝날짜를 타임스탬프로 변경
  let startTime = dateStrToTimeStamp(req.body["trip-start"]);
  let endTime = dateStrToTimeStamp(req.body["trip-end"]);

  let targetPos = req.body.pos;
  let targetNum = parseInt(req.body.personNum, 10);

  if (!targetPos) targetPos = "";
  if (!targetNum) targetNum = 0;

  let hasSchedule = false;
  if (startTime && endTime) hasSchedule = true;

  let roomlist = roomDao.findRoomby((obj) => {
    let room = Object.assign(new Room(), obj);
    let canReserve = true;
    if (hasSchedule) canReserve = room.canReserveThisRoom(startTime, endTime);
    return canReserve && room.pos.search(targetPos) >= 0 && room.maxnum >= targetNum;
  });
  res.render("searchresult", { result: roomlist, start_time: startTime, end_time: endTime, target_pos: targetPos, target_num: targetNum });
});

module.exports = router;
