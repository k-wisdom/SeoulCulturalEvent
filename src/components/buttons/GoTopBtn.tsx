import styled from 'styled-components';
import btnImg from '../../assets/img/up-arrow.png'

const TopBtn = styled.button`
  position: fixed;
  right : 5%;
  bottom: 5rem;
  width: 4rem;
  height: 4rem;
  background:url(${btnImg}) no-repeat center / 50% #fff;
  border:1px solid #000;
  border-radius : 100%;
  
  @media(max-width : 768px){
    bottom: 2rem;
    width : 3rem;
    height: 3rem;
    background-size:40%;
  }
`;

const handleClick = () => {
  window.scrollTo({
    top:0,
    behavior:'smooth'
  })
}

export const GoTopBtn = () => {
  return <TopBtn onClick={handleClick}><span className="hide">Move Top</span></TopBtn>
}

