# javascript-w1-airbnb

스프린트 1주차 웹 프로젝트 - airbnb 클론

# dev -backend

# 요구사항

* 회원가입 페이지 및 회원가입 기능을 구현한다.
* **로그인 페이지 및 로그인 / 로그아웃** 기능을 구현한다.
* 로그인과 로그아웃을 구현하기 위해서 **쿠키와 세션**을 이용한다.
* passport나 express-session 등의 외부 모듈은 사용하지 않고, 직접 세션을 구현한다.
* session은 메모리에 저장한다. DB등의 별도 저장장치를 사용하지 않는다.
* Node.js와 Express를 사용한다.
* 회원가입 페이지와 로그인 페이지는 템플릿(pug) 을 사용한다.
* 별도 설치가 필요한 DBMS는 사용하지 않고 npm으로 설치 가능한 작은 Embedded DB 를 사용한다.
* 배포는 heroku 서비스를 이용한다.
* <선택> 안전한 패스워드 저장기법을 고민해 보고 구현한다.
* <선택> 간단한 파일 기반의 데이터베이스를 직접 구현한다.

# dev -FE 요구사항

* HTML는 용도에 맞는 tag를 사용한다.
* 모든 엘리먼트들은 가지런히 배치해야하고, 일정한 간격을 유지하도록 한다.
  * 배치를 할때 flex 속성을 사용한다.
* 기획 요구사항을 잘 지켜야 하나, UX를 향상 시킬 수 있는 방법이라면 변경도 상관 없다.
* DOM API를 다양하고 활용하고, innerHTML이나 adjacentHTML과 같은 문자열 방식으로 DOM을 조작하는 함수를 좀더 활용한다.
* event 객체와 addEventListener를 잘 이해하고 이를 활용한다.
* 객체나 클래스로 구조를 만들기보다는, 함수만으로 프로그래밍을 한다. (함수형프로그래밍을 요구하는 것은 아니다)
* 함수를 역할에 맞게 작게 나누려고 노력한다.
* 미션에서 어떠한 외부 라이브러리도 사용할 수 없다.

# 1주차 계획


| 월 | 화 | 수 | 목 | 금 |
| - | - | - | - | - |
| - express skeleton 코드 생성 | embedded DB 설치 | 세션 관리기능 구현 | 검색 기능 구현 | 프론트엔드 공부 |
| - Express, Pug, Session, Cookie 학습 | 로그인 / 로그아웃 구현 |   | Heroku에 배포 | 프론트엔드 디자인 |
|   | 회원가입 구현 |   |   |   |
|   |   |   |   |   |

# 2주차 계획


| 월 | 화 | 수 | 목 | 금 |
| - | - | - | - | - |
| 네비게이션바 구현 | 네비게이션바 최적화 | 코드 대규모 리팩토링 | 기타 빠진 부분 구현 | Heroku에 배포 |
|   | 로그인 &회원가입 모달 구현 | 검색결과페이지 레이아웃 개선 |   |   |
|   | 메인페이지 상세구현 |   |   |   |
|   |   |   |   |   |

## 현재 진척도

1. 로그인 구현
2. 로그아웃 구현
3. 로그인 세션 구현
4. 회원가입 구현
5. key-val  기반 embedeed DB levelDB 적용
6. 검색기능 구현
7. 안전한 로그인 위해 sha256 해싱하여 pw저장
8. 프론트엔드 메인페이지 어느정도 상세하게 구현
9. 로그인&회원가입 모달 ,드롭다운 메뉴 구현
10. 검색바 구현 및 dom 조작과 애니메이션으로 스크롤시 검색바가 바뀌는 것을 어느정도 구현

## 개선해야 할 점

1. 구조적 문제 : 컨트롤러 부분에 비지니스 로직이 결합되어 있음 => 간단한 프로젝트에 시간이 없어 그냥 두기로 함
2. 완벽하지 못한 세션 처리 => 해결
3. 코딩 컨벤션을 잘 지키지 못함 => 해결
4. pug파일에 javascript 코드 결합& js코드가 깨끗하지 못함 => 해결
5. 숙소 테이블 데이터에 예약가능날짜가 없어서 검색기능에서 날짜로 범위검색이 안됨

## 구현하기

- lucas의 요구사항 문서를 참고해서 구현한다.
- 요구사항에 대한 구현을 완료한 후 자신의 github 아이디에 해당하는 브랜치에 Pull Request(이하 PR)를 통해 코드 리뷰 요청을 한다.

## 배포 주소 

https://j101airbnb.herokuapp.com/

## 실제 구현 화면 

### 메인페이지 
![airbnb클론](https://user-images.githubusercontent.com/22471977/99906065-2baaa200-2d18-11eb-8c31-cf3c8b9b802c.gif)

## 검색결과 
![airbnb검색](https://user-images.githubusercontent.com/22471977/99906204-23069b80-2d19-11eb-8ec0-753075002375.gif)
