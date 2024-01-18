import axios from 'axios';

//공공 데이터
const url = 'http://openapi.seoul.go.kr:8088';
const key = '7668465046626e6d363254416f4a62';

const API = axios.create({
  baseURL: `${url}/${key}/json/culturalEventInfo`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;

//http://openapi.seoul.go.kr:8088/4461716973626e6d373341704f5861/json/culturalEventInfo/1/5
