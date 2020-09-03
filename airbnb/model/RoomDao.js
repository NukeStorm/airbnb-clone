const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const Room = require("./Room");
const tablename = "room";

class RoomDao {
  constructor() {
    this.adapter = new FileSync("db.json");
    this.db = low(adapter);
    this.db.defaults({ room: [] }).write();
  }
  //Create Room and insert to db
  insertRoom(roominfo) {
    return this.db.get(tablename).push(roominfo).write();
  }

  //Read all Room info from db
  selectAllRooms() {
    return this.db.get(tablename).value();
  }

  //find rooms by query - lodash filter
  findRoomby(query) {
    let res = this.db.get(tablename).filter(query).value();
    return res;
  }
}
module.exports = RoomDao;
/*
//let roomlist = Room.loadRoomArrfromJsonfile('./room2.json');
console.log(findRoomby( function(room){
    return room.pricelist[0]<90000;
}));

*/
//insertRoom(roomlist[0]);
