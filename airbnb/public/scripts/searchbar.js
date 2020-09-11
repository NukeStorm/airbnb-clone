/* eslint-disable no-undef */
function initCalander() {
  let today = new Date();
  let todayStr = today.toISOString().split("T")[0];

  today.setDate(today.getDate() + 1);

  let tommorrowSTr = today.toISOString().split("T")[0];

  let startCalnder = document.querySelector("#start");
  let endCalnder = document.querySelector("#end");

  startCalnder.setAttribute("value", todayStr);
  startCalnder.setAttribute("min", todayStr);

  endCalnder.setAttribute("value", tommorrowSTr);
  endCalnder.setAttribute("min", tommorrowSTr);

  startCalnder.addEventListener("change", (e) => {
    let dateval = startCalnder.value;

    startCalnder.setAttribute("value", dateval);
    let date = new Date(startCalnder.valueAsNumber);
    date.setDate(date.getDate() + 1);
    let dayStr = date.toISOString().split("T")[0];
    endCalnder.setAttribute("min", dayStr);
  });

  endCalnder.addEventListener("change", (e) => {
    let dateval = endCalnder.value;
    endCalnder.setAttribute("value", dateval);
  });
}

initCalander();
