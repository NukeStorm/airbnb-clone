var level = require('level')


class LevelDB {
  constructor(dbname) {
    
    this.db = level('./'+dbname);
    console.log(`store ${dbname} connected`);
  }

  put(key, val) {
      console.log("put");
    return this.db.put(key, val);
      
  }

  get(key) {
    return this.db.get(key);
  }
}

module.exports = LevelDB;
