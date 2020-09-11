/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
// 검색결과 숙소정보를 모두 담고있는 map 이미 초기화 된 상태

// html 문자열을 dom element로 변환

function loadRoomInfo(rid) {
  let room = map[rid];
  let personNum = document.querySelector("input[name=person-num]");
  let ridInput = document.querySelector("#rid");
  ridInput.value = rid;
  let feePerDay = document.querySelector("#fee_per_day");
  feePerDay.innerHTML = `<h2 style="display: inline-block;">₩${room.pricelist[0]}</h2>/박`;
  personNum.setAttribute("min", 1);
  personNum.setAttribute("max", room.maxnum);
}

function loadReservationRecordList(rid) {
  let room = map[rid];
  let records = room.reservelist;
  let outerDivClassName = "record-area";
  let innerDivClassName = "record-row";

  let htmlstr = "";

  records.forEach((record) => {
    let date = new Date(record.time);
    let dayStr = date.toISOString().split("T")[0];
    let divStr = `<div class="${innerDivClassName}">${dayStr}</div>`;
    htmlstr += divStr;
  });
  htmlstr = `<div class="${outerDivClassName}"> ${htmlstr} </div>`;
  resultArea = document.querySelector("#result_area");
  resultArea.innerHTML = htmlstr;
}

function setReservationInfoEventHandlers() {
  let reservationInfoModal = document.querySelector("#reservation_record_modal");
  let reservationInfoModalBtnList = document.querySelectorAll(".reserve_info_btn");
  let reservationCloseBtn = reservationInfoModal.getElementsByClassName("close")[0];

  reservationInfoModalBtnList.forEach((element) => {
    element.addEventListener("click", (e) => {
      let button = e.target;
      let rid = button.getAttribute("value");
      loadReservationRecordList(rid);
      reservationInfoModal.style.display = "block";
    });
  });

  reservationCloseBtn.onclick = () => {
    reservationInfoModal.style.display = "none";
  };
}

function getTotalFee(feePerDay, personNum, startCal, endCal) {
  let totalDay = (endCal.valueAsNumber - startCal.valueAsNumber) / 86400000;
  console.log(totalDay);
  totalFee = totalDay * personNum * feePerDay;
  return isNaN(totalFee) ? 0 : totalFee;
}

function setResrvationEventHandlers() {
  let reservationModal = document.querySelector("#reservation_modal");
  let reservationBtnList = document.querySelectorAll(".reserve_btn");
  let reservationCloseBtn = reservationModal.getElementsByClassName("close")[0];

  let startCalnder = document.querySelector("#reservation_start");
  let endCalnder = document.querySelector("#reservation_end");

  let personNumInput = document.querySelector("input[name=person-num]");
  let totalFeeArea = document.querySelector(".total-fee");

  personNumInput.addEventListener("input", (e) => {
    let feePerDay = parseInt(document.querySelector("#fee_per_day h2").innerText.replace("₩", ""), 10);
    let personNum = personNumInput.value;
    let totalFee = getTotalFee(feePerDay, personNum, startCalnder, endCalnder);
    totalFeeArea.innerText = totalFee;
  });

  startCalnder.addEventListener("change", (e) => {
    let dateval = startCalnder.value;

    startCalnder.setAttribute("value", dateval);
    let date = new Date(startCalnder.valueAsNumber);
    date.setDate(date.getDate() + 1);
    let dayStr = date.toISOString().split("T")[0];
    endCalnder.setAttribute("min", dayStr);

    let personNum = personNumInput.value;
    let feePerDay = parseInt(document.querySelector("#fee_per_day h2").innerText.replace("₩", ""), 10);
    console.log(feePerDay);
    let totalFee = getTotalFee(feePerDay, personNum, startCalnder, endCalnder);
    totalFeeArea.innerText = totalFee;
  });

  endCalnder.addEventListener("change", (e) => {
    let dateval = endCalnder.value;
    endCalnder.setAttribute("value", dateval);

    let personNum = personNumInput.value;
    let feePerDay = parseInt(document.querySelector("#fee_per_day h2").innerText.replace("₩", ""), 10);
    let totalFee = getTotalFee(feePerDay, personNum, startCalnder, endCalnder);
    totalFeeArea.innerText = totalFee;
  });

  reservationBtnList.forEach((element) => {
    element.addEventListener("click", (e) => {
      let button = e.target;
      let rid = button.getAttribute("value");
      initCalander();
      loadRoomInfo(rid);
      reservationModal.style.display = "block";
    });
  });

  reservationCloseBtn.onclick = () => {
    reservationModal.style.display = "none";
  };
}
setResrvationEventHandlers();
setReservationInfoEventHandlers();
