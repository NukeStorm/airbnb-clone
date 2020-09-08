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
const smallerSearchBar = htmlStrToDomElement("<div>dom node 교체</div>");
const defaltSearchBar = document.getElementById("search_bar").childNodes[0].cloneNode(true);

function changeToDefaultNavBar(navbar, logo) {
  navbar.style.padding = "60px 10px";
  logo.style.fontSize = "35px";
}
function changeToSmallerNavBar(navbar, logo) {
  navbar.style.padding = "30px 10px";
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
