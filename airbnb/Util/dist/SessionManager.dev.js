"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * SessionManager : 세션관리하는 in-memory 기반 세션 저장소
 *  서버 재실행시 유지하던 세션이 날아감
 */
var crypto = require("crypto");

var SessionManager =
/*#__PURE__*/
function () {
  function SessionManager() {
    _classCallCheck(this, SessionManager);

    this.store = new Map();
  }

  _createClass(SessionManager, [{
    key: "getSessionInfo",
    value: function getSessionInfo(sessionId) {
      return this.store.get(sessionId);
    }
  }, {
    key: "setSession",
    value: function setSession(userid) {
      var sessoinId = SessionManager.generateSessionKey(userid);
      console.log(sessoinId);
      this.store.set(sessoinId, {
        id: userid,
        date: new Date()
      });
      return sessoinId;
    }
  }, {
    key: "removeSession",
    value: function removeSession(sessionid) {
      return this.store["delete"](sessionid);
    }
  }], [{
    key: "generateSessionKey",
    value: function generateSessionKey(userid) {
      var sessionid = null;
      var buf = crypto.randomBytes(32).toString("base64");
      sessionid = crypto.pbkdf2Sync(userid, buf, 100000, 32, "sha256").toString("base64");
      return sessionid;
    }
  }]);

  return SessionManager;
}();

module.exports = SessionManager;