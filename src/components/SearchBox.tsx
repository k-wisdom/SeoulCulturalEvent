import { forwardRef } from 'react';
import styled from 'styled-components';

interface Props{
  onClick : () => void,
  onKeypress? : (e:any) => void,
  onChange? : (e:any) => void,
  placeholder? : string,
  value? : string
}

function SearchBox({onClick, onKeypress, onChange, placeholder = '검색어를 입력해주세요.', value}:Props, ref:any){

  return(
    <Box className="search_box">
      <input placeholder={placeholder} ref={ref} onKeyPress={onKeypress} onChange={onChange} defaultValue={value}/>
      <button onClick={onClick}>검색</button>
    </Box>
  )
}

const Box = styled.div`
  display:flex;
  align-items:center;
  column-gap:0.3rem;
  max-width: 21.25rem;
  
  input{
    padding:0 1rem;
    width:calc(100% - 3rem - 0.3rem);
    height:2.225rem;
    border-radius:0;
    box-sizing:border-box;
  }
  button{
    width:3rem;
    height:2.225rem;
    font-size:0.7rem;
    border:1px solid #000;
    color:#000;
  }
  
  @media (max-width : 768px){
    input{
      padding: 0 0.8rem;
      height:2rem;
      font-size: 0.8rem;
    }
    button{
      height:2rem;
    }
  }

`;

export default forwardRef(SearchBox);