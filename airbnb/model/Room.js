class Room {
  constructor(rid, pos, title, maxnum, description, price, image, reservelist) {
    this.rid = rid;
    this.pos = pos;
    this.title = title;
    this.maxnum = maxnum;
    this.description = description;
    this.pricelist = price;
    this.image = image;
    this.reservelist = reservelist;
    if (!this.reservelist) this.reservelist = [];
  }

  canReserveThisRoom(start, end) {
    const isLagerTimeval = (record) => {
      return record.time >= start;
    };

    const isSmallerTimeval = (record) => {
      return record.time > end;
    };
    // 시작시간보다 최초로 크거나 같은 시간대의 예약정보 인덱스를 반환
    let startpos = this.reservelist.findIndex(isLagerTimeval);
    // 끝시간보다 최초로 크거나 같은 시간대의 예약정보 인덱스를 반환
    let endpos = this.reservelist.findIndex(isSmallerTimeval);

    // startpos  endpos 범위를 벗어난경우
    if (startpos < 0) startpos = this.reservelist.length;
    if (endpos < 0) endpos = this.reservelist.length;
    console.log(startpos, endpos);

    let cnt = 0;
    // startpos endpos 범위의 예약시간들중 겹치는 시간대 있는지 확인
    for (let i = startpos; i < endpos; i += 1) {
      let { time } = this.reservelist[i];
      if (time >= start && time <= end) cnt += 1;
    }
    // 겹치는 시간대 있으면 예약 불가
    return !(cnt > 0);
  }

  // 이 숙소의 예약 리스트에 예약정보를 등록한다. 리스트는 시간순서를 유지한다
  addReservationRecord(time, id) {
    let reservation = { time, id };
    const isLagerTimeval = (record) => record.time >= time;
    let insertPos = this.reservelist.findIndex(isLagerTimeval);
    if (insertPos < 0) this.reservelist.push(reservation);
    else this.reservelist.splice(insertPos, 0, reservation);
  }

  static loadRoomArrfromJsonfile(jsonfile) {
    let json = require(jsonfile);
    let roomlist = json.map((j) => Object.assign(new Room(), j));
    return roomlist;
  }
}

module.exports = Room;
