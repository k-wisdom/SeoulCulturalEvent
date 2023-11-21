import { useState } from 'react';
import RoundedBtn from './buttons/RoudedBtn';

interface Props{
  readonly names : string[],
  handleClick : (e:any) => void,
  activeIndex? : number
}

export default function TabBtnBox({names, handleClick, activeIndex = 0}:Props){

  const [activeIdx, setActiveIdx] = useState(activeIndex);

  const btnClickFn = (e:any, index:number) => {

    //전체 버튼 'active' 제거
    const tabList = document.querySelector('.tab_btn_list') as HTMLElement;
    const btns = tabList.querySelectorAll('button');
    btns.forEach((btn, idx) => {
      btn.classList.remove('active');
      if(idx === activeIdx){
        btn.classList.add('active')
      }
    })

    setActiveIdx(index);
    handleClick(e);
  }

  return (
    <div className="tab_btn_list">
      {names.map((item, index) => {
        return <RoundedBtn cssname={(index === activeIdx) ? 'active' : ''} key={index} name={item} onClick={(e:any) => btnClickFn(e,index)}/>})}
    </div>
  )
}