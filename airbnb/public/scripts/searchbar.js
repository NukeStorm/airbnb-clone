/* eslint-disable no-undef */
function initCalander() {
  let todayStr = new Date().toISOString().split("T")[0];
  document.getElementsByName("trip-start")[0].setAttribute("value", null);
  document.getElementsByName("trip-start")[0].setAttribute("min", todayStr);
  document.getElementsByName("trip-end")[0].setAttribute("value", null);
  document.getElementsByName("trip-end")[0].setAttribute("min", todayStr);
}
initCalander();
