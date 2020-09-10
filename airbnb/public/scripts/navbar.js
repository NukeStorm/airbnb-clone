/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-var */
const navbar = document.getElementById("navbar");
const logo = document.getElementById("logo");
// 페이지가 초기화될때 검색바를 감싸고 있는 부모 div element
const searchbarPos = document.getElementById("search_bar");

// html 문자열을 dom element로 변환
function htmlStrToDomElement(html) {
  var template = document.createElement("template");
  let htmlTrimed = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = htmlTrimed;
  return template.content.firstChild;
}
// 작은 검색바와 기본 검색바 element를 저장

const smallerSearchBar = htmlStrToDomElement(
  '<div id="small_search_bar" style=" display:flex ;width:200px; justify-content:space-evenly;"  > <span style=" margin-top:25px; font-size:15px; "> 검색 시작하기 </span> <button type="submit"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"><g fill="none"></g></path></svg>  </div></button>'
);

const defaltSearchBar = document.getElementById("search_bar").childNodes[0];

function changeToDefaultNavBar(navbar, logo) {
  navbar.style.padding = "35px 10px";
  logo.style.fontSize = "35px";
}
function changeToSmallerNavBar(navbar, logo) {
  navbar.style.padding = "10px 10px";
  logo.style.fontSize = "25px";
}

function setSearchBarAnimation(searchbar) {
  searchbar.animate({ opacity: ["0", "1"] }, { easing: "ease-out", duration: 250, delay: 0, fill: "backwards" });
}

// 검색 바를 바꿔치기한다
function setSearchBar(searchbarPos, searchbar) {
  searchbarPos.replaceChild(searchbar, searchbarPos.childNodes[0]);
}

function scrollerHandler() {
  // 아래로 스크롤해서 80이상의 위치일경우 작은 navbar로 전환
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    changeToSmallerNavBar(navbar, logo);

    // 한번만 실행되도록
    if (searchbarPos.childNodes[0] !== smallerSearchBar) {
      setSearchBar(searchbarPos, smallerSearchBar);
      setSearchBarAnimation(smallerSearchBar);
    }
  } else {
    // 맨 위로 올라갔을 경우 다시 기본 검색바
    changeToDefaultNavBar(navbar, logo);
    setSearchBar(searchbarPos, defaltSearchBar);
    setSearchBarAnimation(defaltSearchBar);
  }
}

window.onscroll = () => {
  scrollerHandler();
};
smallerSearchBar.onclick = () => {
  changeToDefaultNavBar(navbar, logo);
  setSearchBar(searchbarPos, defaltSearchBar);
  setSearchBarAnimation(defaltSearchBar);
};
