import { useState, useRef } from 'react';

//LIMIT : 노출되는 페이징 버튼의 최대 갯수

export function usePagination(dataCnt:number, LISTCOUNT:number = 10, LIMIT=10, startNum:number = 0){
  const [pageNum, setPageNum] = useState(startNum);
  const pageStart = Math.ceil((startNum + 1) / LIMIT);
  const pageRef = useRef(pageStart);

  type arrowBtn = "prev" | "next";
  const pageArrowClickFn = (btnName:arrowBtn) => {
    if(btnName === "prev"){
      pageRef.current = pageRef.current - 1
    }
    if(btnName === "next"){
      pageRef.current = pageRef.current + 1
    }
    setPageNum(((pageRef.current - 1) * LIMIT))

    //페이지 상단 이동
    window.scrollTo(0,0);
  }

  const PageBtnClickFn = (event:any) => {
    const btn = event.target as HTMLElement; 
    const number = btn.textContent ? parseInt(btn.textContent) - 1 : 0;
    setPageNum(number);

    //페이지 상단 이동
    window.scrollTo(0,0);
  }

  const paging = () => {
    const totalNumCount = Math.ceil(dataCnt / LISTCOUNT); //페이징 숫자 버튼의 총 갯수
    const pageNumCount = Math.ceil(totalNumCount / LIMIT); //생성되는 페이징 묶음의 갯수
    
    const btnArr = [];
    const page = pageRef.current;

    btnArr.push(<button key={'prev'} className="btn_prev" disabled={pageRef.current === 1 && true} onClick={() => pageArrowClickFn('prev')}><span className="hide">prev</span></button>)

    for(let i = (page - 1) * LIMIT; i < (LIMIT * page) && i < totalNumCount; i++){
      const key = Date.now()+'_'+i;
      if(i === pageNum){
        //해당 페이지에 active
        btnArr.push(<button key={key} className="active" onClick={PageBtnClickFn}>{i+1}</button>)
      }else{
        btnArr.push(<button key={key} onClick={PageBtnClickFn}>{i+1}</button>)
      }
    }

    btnArr.push(<button key={"next"} className="btn_next" disabled={(pageRef.current === pageNumCount) && true} onClick={() => pageArrowClickFn('next')}><span className="hide">next</span></button>)
    
    return btnArr;
  }

  const PageInit = () => {
    pageRef.current = 1;
    setPageNum(0);
  }

  const Pagination = 
    <div className="paging_wrap">
      <div className="number_wrap">
        {paging()}
      </div>
    </div>

  return [pageNum, PageInit, Pagination]
}