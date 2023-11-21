import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/img/logo.png'
import '../assets/scss/layout/_header.scss'
import { Link, useNavigate } from 'react-router-dom';
import GrayFrame from './frames/GrayFrame'
import { NavMenu } from './NavMenu';

function Header() {
  // 웹사이트 명 추후 변경
  // logo 추후 변경

  const [menuActive, setMenuActive] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    //영역 외 클릭 시 팝업 닫기
    const handleClick = (e:any) => {

      if(menuRef.current === null ){
        return;
      }
      
      const btnMenu = document.querySelector('.btn_menu')
      if(e.target === btnMenu || btnMenu?.contains(e.target)){
        return;
      }

      if(menuRef.current){
        if(!menuRef.current.contains(e.target as Node)){
          setMenuActive(false)
        }
        if(e.target.nodeName === 'A'){
          setMenuActive(false)
        }
      }

    }

    document.addEventListener('click', e => handleClick(e))

    return document.removeEventListener('click', e => handleClick(e))
    
  },[menuRef])

  useEffect(() => {
    const headerColorChange = () => {
      const scY = window.scrollY;
      if(scY > 10){
        headerRef.current!.style.backgroundColor = '#fff'
      }else{
        headerRef.current!.style.backgroundColor = 'transparent'
      }
    }
  
    const timer = setInterval(() => {
      window.addEventListener('scroll', headerColorChange);
    },1000)
    
    return () => {
      clearInterval(timer)
      window.removeEventListener('scroll', headerColorChange);
    }
  },[])

  return(
    <header ref={headerRef}>
      <div className="bx_con_1600">
        <Link to="/"><h1 className="header_logo"><img src={logo} alt="서울 문화 행사" /><span>서울 문화행사</span></h1></Link>
        <div>
          <button className={`btn_search`} onClick={()=>{navigate('/search')}}><span className="hide">검색하기</span></button>
          <div className="nav_wrap">
            <button className={`btn_menu ${menuActive && 'active'}`} onClick={() => {setMenuActive(!menuActive);}}><span className="hide">메뉴</span><i></i><i></i><i></i></button>
            {menuActive &&
              <GrayFrame ref={menuRef}>
                <NavMenu />
              </GrayFrame>
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;