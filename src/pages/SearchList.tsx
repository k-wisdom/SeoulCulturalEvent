import InfoTextBox from '../components/InfoTextBox';
import '../assets/scss/components/_searchBox.scss';
import SearchBox from '../components/SearchBox';
import ArticleListItem from '../components/frames/ArticleListItem';
import { useEffect, useRef, useState } from 'react';
import { usePagination } from '../customHook/usePagination';
import API from '../utils/API';
import LoadingBox from '../components/LoadingBox';
import TabBtnBox from '../components/TabBtnBox';
import Datepicker from '../components/Datepicker';
import { dateFormat } from '../utils/Date';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CATEGORY = [
  '전체',
  '교육/체험',
  '전시/미술',
  '뮤지컬/오페라',
  '기타',
  '연극','무용',
  '영화','국악','콘서트','축제','클래식','독주/독창회'
]

const BLANK = encodeURIComponent(' ');
const LISTCOUNT = 10; // 페이지당 리스트 갯수

export default function SearchList(){
  const [searchParams, setSearchParams] = useSearchParams();
  const getDate = searchParams.get('date');
  const getCtg = searchParams.get('ctg') as string;
  const activeTabIndex = CATEGORY.indexOf(getCtg === BLANK ? '전체' : getCtg);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [dataCnt, setDataCnt] = useState(0)

  const [ctg, setCtg] = useState(getCtg || BLANK);
  const inputRef = useRef<HTMLInputElement>(null);

  const [showDatePicker, setShowDatePicker] = useState(getDate ? true : false);
  const [date, setDate] = useState(getDate ? new Date(getDate) : new Date());

  const startNum = parseInt(searchParams.get('page') as string) || 0;
  const [pageNum, PageInit, Pagination]:any = usePagination(dataCnt, LISTCOUNT, 10, startNum);

  //카테고리 버튼 클릭
  const ctgClickFn = (event: React.MouseEvent<HTMLButtonElement>) => {
    resetFn();

    const btn = event.target as HTMLElement;
    const btnText = btn.textContent as string;

    if(btnText !== '전체'){
      setCtg(btnText)
      setSearchParams( (params) => {
        params.set('ctg', btnText);
        return params;
      })
    }else{
      setCtg(BLANK);
      setSearchParams( (params) => {
        params.set('ctg', BLANK);
        return params;
      })
    }
  }

  const getData:any = async () => {
    setIsLoading(true);

    const selectDate = (showDatePicker) ? dateFormat(date) : '';
    const text = inputRef.current!.value !== '' ? inputRef.current!.value : BLANK;
    const startIndex = (pageNum * LISTCOUNT) + 1;
    const endIndex = (startIndex + LISTCOUNT) - 1; 

    const category = ctg.split('/')[0]; //category + date 검색시 API 검색오류로 인해서 적용
    const {data} = await API.get(`/${startIndex}/${endIndex}/${category}/${text}/${selectDate}`)
    JSON.stringify(data);

    const resultCode = data.RESULT?.CODE || data.culturalEventInfo?.RESULT.CODE;

    if(resultCode === 'INFO-000' || resultCode === 'INFO-200'){
      // 'INFO-200' => 해당데이터가 없을 때
      let eventData = data.culturalEventInfo?.row;
      let totalCount = data.culturalEventInfo?.list_total_count;

      setIsLoading(false);
      setData(eventData);
      setDataCnt(totalCount ? totalCount : 0);
    }else if(resultCode === 'ERROR-500'){
      alert('서버로부터 문제가 발생했습니다. 잠시후 다시 시도해주세요.');
      return;
    }
  }

  const resetFn  = () => {
    PageInit()
  }

  useEffect(() => {
      getData();
     //eslint-disable-next-line react-hooks/exhaustive-deps
  },[ctg,pageNum])

  useEffect(() => {
    setSearchParams( (params) => {
      params.set('page', pageNum);
      return params;
    })
  },[pageNum])

  const enterkeyFn = (e:KeyboardEvent) => {
    if(e.key === "Enter"){
      //중복 클릭 방지
      if(isLoading) return;

      if(pageNum !== 0){
        resetFn()
      }else{
        // getData()
        searchBtnClickFn()
      }
    }
  }

  const dateSelectFn = (event:any) => {
    const value = event.target.value;
    if(value === 'all'){
      setShowDatePicker(false)
    }else if(value === 'select'){
      setShowDatePicker(true)
    }
  }

  const listClick = (data:any) => {
    const scrollY = window.scrollY;
    localStorage.setItem('scrollY', JSON.stringify(scrollY));
    navigate("/eventDetail",{state:{data}});
  }

  useEffect(() => {
    
    if(isLoading) return;
    const posY = parseInt(localStorage.getItem('scrollY')!);
    if(posY){
      window.scrollTo(0, posY);
    }

    //한번 실행 후 초기화
    localStorage.removeItem('scrollY');

  },[getData])


  const searchBtnClickFn = () => {
    const selectDate = (showDatePicker) ? dateFormat(date) : '';
    setSearchParams( (params) => {
        params.set('text', inputRef.current!.value);
        params.set('date', selectDate);
      return params;
    })
    getData()
  }


  return(
    <main className="bx_main">
      <div className="bx_con_1200 search_title_wrap">
        <h2 className="title_h2">문화・행사 검색</h2>
      </div>
      <div className="bx_srch_result">
        <div className="bx_search_form">
          <span>
            <label className="text_label" htmlFor="dateSelect">날짜</label>
            <select onChange={dateSelectFn} id="dateSelect" defaultValue={getDate ? "select" : "all"}>
              <option value="all">전체</option>
              <option value="select">선택</option>
            </select>
            {showDatePicker && <Datepicker date={date} setDate={setDate}/>}
          </span>
          
          <SearchBox value={searchParams.get('text') || ''} ref={inputRef} onClick={searchBtnClickFn} onKeypress={enterkeyFn} placeholder={'공연/행사명을 입력해주세요.'} />
        </div>
        <TabBtnBox names={CATEGORY} handleClick={ctgClickFn} activeIndex={ activeTabIndex !== -1 ? activeTabIndex : 0} />
      </div> 
      <div className="bx_con_1200">
        <div className="srch_result_list_wrap">
          {isLoading ? 
            <LoadingBox /> 
            :  
            <>
            <b>(총 {dataCnt}건)</b>
            {data ? data.map((item:any, index:number) => {
                return <ArticleListItem key={index} {...item} handleClick={() => listClick(item)}/>
              }) : <InfoTextBox text={"데이터가 존재하지 않습니다."}/>}</>
          }
        </div>
        {isLoading || (data && Pagination)}
      </div>
    </main>
  )
}