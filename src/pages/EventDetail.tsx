import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import '../assets/scss/pages/_eventDetail.scss';
import RoundedBtn from '../components/buttons/RoudedBtn';
import { EventDetailType } from '../types/types';

export default function EventDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<EventDetailType | null>(null);

  useEffect(() => {
    if (location.state === null) {
      navigate('/');
    } else {
      setData(location.state.data);
    }
  }, [location, navigate]);

  return (
    <main className="bx_main">
      <div className="bx_con_1200 event_detail_wrap">
        <div className="bx_event_top">
          <i>{data?.CODENAME}</i>
          <h2 className="title_h2">{data?.TITLE}</h2>
          <i className="top_info">
            {data?.DATE}&nbsp;|&nbsp; {data?.PLACE}
          </i>
        </div>
        <div className="bx_event_detail">
          <img src={data?.MAIN_IMG} alt={`${data?.TITLE}_이미지`} />
          <div>
            <ul>
              <li>
                <b>기간</b>
                {data?.DATE}
              </li>
              <li>
                <b>신청일</b>
                {data?.RGSTDATE}
              </li>
              <li>
                <b>장소</b>
                {data?.GUNAME}&nbsp;{data?.PLACE}
              </li>
              <li>
                <b>이용대상</b>
                {data?.USE_TRGT}
              </li>
              <li>
                <b>이용요금</b>
                {data?.USE_FEE || '무료'}
              </li>
              <li>
                <b>홈페이지</b>
                <a className="btn_square" href={data?.ORG_LINK} target="_blank" rel="noreferrer">
                  바로가기
                </a>
              </li>
              {/* <li><b>상세 정보 URL</b><a href={HMPG_ADDR} target="_blank" rel="noreferrer">{HMPG_ADDR}</a></li> */}
            </ul>
            <p className="event_desc">{data?.PROGRAM}</p>
            {data?.PLAYER && <div className="bx_etc_content">출연자 정보 : {data?.PLAYER}</div>}
          </div>
        </div>
        <RoundedBtn
          name="목록으로"
          height="50px"
          cssname="btn_go_list"
          onClick={() => navigate(-1)}
        />
      </div>
    </main>
  );
}
