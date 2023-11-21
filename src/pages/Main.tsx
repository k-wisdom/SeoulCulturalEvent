import Slider from '../components/Slider';
import '../assets/scss/pages/_mainPage.scss'
import CircleBtn from '../components/buttons/CircleBtn';
import CardListItem from '../components/frames/CardListItem';
import API from '../utils/API';
import { useEffect, useState } from 'react';
import {getToday} from '../utils/Date';
import { useNavigate } from 'react-router';
import LoadingBox from '../components/LoadingBox';
import InfoTextBox from '../components/InfoTextBox';

export default function Main(){
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getEvent:any = async () => {
    const today = getToday();
    const {data} = await API.get(`/1/8/%20/%20/${today}`)
    JSON.stringify(data);

    //추후 데이터가 존재하지않을 때 처리 추가해야함
    let eventData = data.culturalEventInfo.row;
    setIsLoading(false)
    setData(eventData);
  }

  useEffect(() => {
    getEvent()
  },[])

  useEffect(() => {
    
    if(isLoading) return;
    const posY = parseInt(localStorage.getItem('scrollY')!);
    if(posY){
      window.scrollTo(0, posY);
    }

    //한번 실행 후 초기화
    localStorage.removeItem('scrollY');

  },[getEvent])

  const listClick = (data:any) => {
    const scrollY = window.scrollY;
    localStorage.setItem('scrollY', JSON.stringify(scrollY));
    navigate('/eventDetail', {state:{data}})
  }


  return(
      <>
      <section className ="section_slider">
        <p className="slide_fixed_text">서울시의 다양한 문화 행사에<br/> 참여해보세요!</p>
      <Slider>
        <div>
          <img src="/assets/img/img_banner3.jpeg" alt="불꽃놀이"/>
        </div>
        <div>
          <img src="/assets/img/img_banner1.png" alt="국악/판소리"/>
        </div>
        <div>
          <img src="/assets/img/img_banner2.png" alt="오케스트라"/>
        </div>
      </Slider>
      </section>
      <section className="section_current_events">
        <div className="bx_con_1200">
          <h2 className="title_h2">Today<br/> Events</h2>
          <CircleBtn name="VIEW MORE" width="80px" onClick={()=>{navigate('eventList/ongoing')}} cssname="btn_view_more"/>
          {isLoading ?
            <LoadingBox /> :
            <>
              <div className="event_list">
                { data.length > 0 && 
                  data.map((item:any, index:number) => {
                    return <CardListItem key={index} {...item} handleClick={() => listClick(item)}/>
                  }) 
                }
              </div>
              {data.length > 0 || <InfoTextBox text={"데이터가 존재하지 않습니다."}/>}
            </>
          }
        </div>
      </section>
      </>
  )
}