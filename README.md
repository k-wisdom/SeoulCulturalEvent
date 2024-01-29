# 서울 문화행사 
 
안녕하세요.  
**프론트엔드** 개발자 김지혜의 개인 프로젝트입니다.

React.js + Typescript + SCSS로 제작한 웹사이트 입니다.

서울 열린데이터 광장의 공공데이터인 '서울시 문화행사 정보' API를 활용하여 제작했습니다.
<a href="https://data.seoul.go.kr/dataList/OA-15486/S/1/datasetView.do">오픈 API</a>
<br/><br/>
<a href="http://culturalevent.dothome.co.kr/">[웹 사이트 바로가기]</a>
<br/>
<hr/>  

### 페이지 구성

#### [홈]
- react-responsive-carousel 라이브러리를 사용하여 슬라이더 구현
- 재사용 가능한 버튼, 카드형태의 컴포넌트 제작
- styled-component 사용  
- API의 오늘 날짜를 검색하여 "Today Events" 섹션 구현
  
<br/><br/>
#### [진행 중, 예정된, 종료된 행사 페이지]
- customHook을 사용하여 자체 pagination 개발
- 카테고리, 검색어로 데이터 검색 가능한 검색 필드 구현
- useContext Hook 사용
 • 공공데이터 오픈 API는 통합된 데이터를 제공하기 때문에 기간 별로 데이터 가공 필요  
 • 초기 웹 사이트 진입 시 API 호출 후 얻은 데이터를 기간 별로 필터링해서 useContext에 저장함  
 • useContext로 저장된 데이터를 적절하게 사용하여 개별 페이지 구현  
- 상세 페이지에서 목록으로 이동 시, 스크롤 위치나 검색 상태가 유지되도록 처리  
 • react-router-dom 라이브러리의 useParams를 사용해서 스크롤 위치, 검색 상태 저장  

<br/><br/>
#### [문화 행사 검색 페이지]
- customHook을 사용하여 자체 pagination 개발  
- Axios 사용한 API 연동 
- 상세 페이지에서 목록으로 이동 시, 스크롤 위치나 검색 상태가 유지되도록 처리  

<br/><br/>
#### [문화 행사 상세 페이지]
- 공공 API에서 제공하는 데이터는 각각의 고유한 ID와 시퀀스가 제공되지않아서 상세페이지에서 API호출로 데이터를 불러오는 것이 불가능함
- 목록페이지에서 상세페이지로 이동할 때 Props를 전달하여 상세페이지에 표시
- Props의 값이 존재하지않는다면 목록페이지로 리다이렉트

<br/><br/>

<hr/>
 
 




### 프로젝트 실행
$npm run start
