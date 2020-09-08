/* eslint-disable no-undef */
const setCookie = (name, value, day) => {
  let date = new Date();
  date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

const getCookie = (name) => {
  let value = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return value ? value[2] : null;
};

const deleteCookie = (name) => {
  setCookie(name, "", -1);
};
