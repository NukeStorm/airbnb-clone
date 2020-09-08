/* eslint-disable no-undef */
function showMenu() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// 모달 또는 드롭다운 메뉴 바깥영역을 클릭하면  닫아버린다
window.onclick = (event) => {
  let loginModal = document.getElementById("login_modal");
  let signupModal = document.getElementById("signup_modal");
  let { target } = event;

  if (target.matches("#login_modal") || target.matches("#signup_modal")) {
    target.style.display = "none";
  }

  if (!event.target.matches(".dropbtn")) {
    let dropDowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropDowns.length; i += 1) {
      let openDropdown = dropDowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// 로그인 버튼 클릭 트리거
let loginlink = document.getElementById("loginlink");
loginlink.onclick = () => {
  document.getElementById("loginbtn").click();
  document.getElementsByClassName("close")[1].click();
};
