"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var level = require('level');

var LevelDB =
/*#__PURE__*/
function () {
  function LevelDB(dbname) {
    _classCallCheck(this, LevelDB);

    this.db = level('./' + dbname);
    console.log("store ".concat(dbname, " connected"));
  }

  _createClass(LevelDB, [{
    key: "put",
    value: function put(key, val) {
      console.log("put");
      return this.db.put(key, val);
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.db.get(key);
    }
  }]);

  return LevelDB;
}();

module.exports = LevelDB;