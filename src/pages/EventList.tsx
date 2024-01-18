import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import '../assets/scss/pages/_eventList.scss';
import CardListItem from '../components/frames/CardListItem';
import InfoTextBox from '../components/InfoTextBox';
import LoadingBox from '../components/LoadingBox';
import SearchBox from '../components/SearchBox';
import TabBtnBox from '../components/TabBtnBox';
import { dataContext } from '../context/dataContext';
import { usePagination } from '../customHook/usePagination';

const CATEGORY = [
  '전체',
  '교육/체험',
  '전시/미술',
  '뮤지컬/오페라',
  '기타',
  '연극',
  '무용',
  '영화',
  '국악',
  '콘서트',
  '축제',
  '클래식',
  '독주/독창회',
];

const PAGENAME: ObjType = {
  ongoing: '진행중인 행사',
  upcomming: '예정된 행사',
  end: '종료된 행사',
};

type ObjType = {
  [index: string]: string;
};

const LISTCOUNT = 10; // 페이지당 리스트 갯수

export default function CurrentEventList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const getCtg = searchParams.get('ctg') as string;
  const activeTabIndex = CATEGORY.indexOf(getCtg === null ? '전체' : getCtg);

  const navigate = useNavigate();

  const { pageId } = useParams();
  const pageName: string = PAGENAME[pageId as string];
  const contextData: any = useContext(dataContext);
  const datas = contextData.eventList[pageId as string];
  const dataState = contextData.state;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<object[]>([]);
  const [dataCnt, setDataCnt] = useState(0);
  const [ctg, setCtg] = useState(getCtg || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const startNum = parseInt(searchParams.get('page') as string) || 0;
  const [pageNum, PageInit, Pagination]: any = usePagination(dataCnt, LISTCOUNT, 10, startNum);

  const ctgClickFn = (event: React.MouseEvent) => {
    resetFn();
    const btn = event.target as HTMLElement;
    const btnText = btn.textContent as string;

    if (btnText !== '전체') {
      setCtg(btnText);
      setSearchParams((params) => {
        params.set('ctg', btnText);
        return params;
      });
    } else {
      setCtg(null);
      setSearchParams((params) => {
        params.set('ctg', '');
        return params;
      });
    }
  };

  //띄어쓰기 제거
  const removeSpace = (str: string): string => {
    return str.split(' ').join('');
  };

  const getData = async () => {
    if (datas == null) return;

    setIsLoading(true);
    const searchText = inputRef.current ? removeSpace(inputRef.current.value) : null;
    const startIndex = pageNum * LISTCOUNT;
    const endIndex = startIndex + LISTCOUNT;

    const result = datas?.filter(({ TITLE, CODENAME }: { TITLE: string; CODENAME: string }) => {
      if (ctg || searchText) {
        if (searchText === '' && ctg !== null) {
          //검색어가 없고, 카테고리가 전체가 아닐 때
          return CODENAME.includes(ctg);
        } else if (searchText !== '' && ctg === null) {
          //검색어가 있고, 카테고리가 전체일 때
          return removeSpace(TITLE).includes(searchText as string);
        } else if (searchText !== '' && ctg !== null) {
          //검색어가 있고, 카테고리가 전체가 아닐 때
          return removeSpace(TITLE).includes(searchText as string) && CODENAME.includes(ctg);
        }
      }
      return datas;
    });

    // setTimeout(() => {
    setIsLoading(false);
    // }, 300);
    setData(result.slice(startIndex, endIndex));
    setDataCnt(result.length);
  };

  const resetFn = () => {
    PageInit();
  };

  useEffect(() => {
    if (dataState === 'ERROR-500') {
      alert('서버로부터 문제가 발생했습니다. 잠시후 다시 시도해주세요.');
      return;
    }

    //pageId 변경시 검색조건 reset
    if (searchParams.get('page') === null) {
      setCtg(null);
      resetFn();
    }

    getData();
  }, [pageId, ctg, pageNum, datas]);

  const enterkeyFn = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      //중복 클릭 방지
      if (isLoading) return;

      if (pageNum !== 0) {
        resetFn();
      } else {
        // getData()
        searchBtnClickFn();
      }
    }
  };

  const listClick = (data: object) => {
    const scrollY = window.scrollY;
    localStorage.setItem('scrollY', JSON.stringify(scrollY));
    navigate('/eventDetail', { state: { data } });
  };

  useEffect(() => {
    if (isLoading) return;
    const scrY = localStorage.getItem('scrollY');
    const posY = scrY && parseInt(scrY);
    if (posY) {
      window.scrollTo(0, posY);
    }

    //한번 실행 후 초기화
    localStorage.removeItem('scrollY');
  }, [isLoading]);

  useEffect(() => {
    setSearchParams((params) => {
      params.set('page', pageNum);
      return params;
    });
  }, [pageNum, setSearchParams]);

  const searchBtnClickFn = () => {
    setSearchParams((params) => {
      inputRef.current && params.set('text', inputRef.current.value);
      return params;
    });
    getData();
  };

  return (
    <main className="bx_main">
      <div className="bx_con_1200">
        <div className="event_list_top">
          <h2 className="title_h2">{pageName}</h2>
          <div className="bx_search_form">
            <SearchBox
              value={searchParams.get('text') || ''}
              key={pageId}
              ref={inputRef}
              onClick={searchBtnClickFn}
              onKeypress={enterkeyFn}
              placeholder={'공연/행사명을 입력해주세요.'}
            />
          </div>
          <TabBtnBox
            key={pageId}
            names={CATEGORY}
            handleClick={ctgClickFn}
            activeIndex={activeTabIndex !== -1 ? activeTabIndex : 0}
          />
        </div>
        <div className="event_list_wrap" key={ctg}>
          {isLoading ? (
            <LoadingBox />
          ) : (
            <>
              <div className="event_list">
                {data.length > 0 &&
                  data.map((item: any, index: number) => {
                    return (
                      <CardListItem
                        key={item.DATE + '_' + index}
                        {...item}
                        handleClick={() => listClick(item)}
                      />
                    );
                  })}
              </div>
              {data.length > 0 || <InfoTextBox text={'데이터가 존재하지 않습니다.'} />}
            </>
          )}
        </div>
        {isLoading || (data.length > 0 && Pagination)}
      </div>
    </main>
  );
}
