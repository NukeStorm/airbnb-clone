class Room {
  constructor(pos, title, maxnum, description, price, image) {
    this.pos = pos;
    this.title = title;
    this.maxnum = maxnum;
    this.description = description;
    this.pricelist = price;
    this.image = image;
  }

  static loadRoomArrfromJsonfile(jsonfile){
    let json = require(jsonfile);
    let roomlist = json.map(j=>
      Object.assign(new Room(),j)
    )
   return roomlist;
  }

}

module.exports = Room;

/*
var json = require('./rooms.json');


let roomarr= [];

for(i in json){
  let obj = json[i];

  let pos = obj['place'];
  let title = obj['title'];
  let desc1_arr= obj['description1'].split('·');
  let desc2_arr= obj['description1'].split('·');

  let maxnum = desc1_arr[0].replace('최대 인원 ','').replace('명','').trim();
  let description_arr = []

  for(let i=1; i<desc1_arr.length; i++){
    desc1_arr[i]=desc1_arr[i].trim();
    description_arr.push(  desc1_arr[i]);
  }
  for(let i=0; i<desc2_arr.length; i++){
    desc2_arr[i]=  desc2_arr[i].trim();
    description_arr.push(  desc2_arr[i]);
  }
  let description = description_arr.join(', ');
  let pricearr =  obj['price'].replace(/[^0-9₩]/g,"").trim().replace(/₩/gi,' ').trim().split(' ');
  pricearr=pricearr.map(x=>+x);
  let imgpath =obj['image'];

  let room = new Room(pos,title,maxnum,description,pricearr,imgpath);
  
  roomarr.push(room);

}

console.log( JSON.stringify(roomarr)  );
*/
