/**
 * SessionManager : 세션관리하는 in-memory 기반 세션 저장소
 *  서버 재실행시 유지하던 세션이 날아감
 */
const crypto = require("crypto");
class SessionManager {
  constructor() {
    this.store = new Map();
  }

  static generateSessionKey(userid) {
    let sessionid = null;
    let buf = crypto.randomBytes(32).toString("base64");
    sessionid = crypto
      .pbkdf2Sync(userid, buf, 100000, 32, "sha256")
      .toString("base64");
    return sessionid;
  }
  getSessionInfo(sessionId) {
    return this.store.get(sessionId);
  }
  setSession(userid) {
    let sessoinId = SessionManager.generateSessionKey(userid);
    console.log(sessoinId);
    this.store.set(sessoinId, { id: userid, date: new Date() });
    return sessoinId;
  }
  removeSession(sessionid) {
    return this.store.delete(sessionid);
  }
}

module.exports = SessionManager;
