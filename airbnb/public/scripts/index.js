/* eslint-disable no-undef */

function setLoginEventHandlers() {
  let loginModal = document.getElementById("login_modal");
  let loginBtn = document.getElementById("loginbtn");
  let loginCloseBtn = document.getElementsByClassName("close")[0];
  loginBtn.onclick = () => {
    loginModal.style.display = "block";
  };
  loginCloseBtn.onclick = () => {
    loginModal.style.display = "none";
  };
}
function setSignUpEventHandlers() {
  let signupModal = document.getElementById("signup_modal");
  let signupBtn = document.getElementById("signupbtn");
  let signupCloseBtn = document.getElementsByClassName("close")[1];
  signupBtn.onclick = () => {
    signupModal.style.display = "block";
  };
  signupCloseBtn.onclick = () => {
    signupModal.style.display = "none";
  };
}

setLoginEventHandlers();
setSignUpEventHandlers();
