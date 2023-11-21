import styled from 'styled-components';
import loadingImg from '../assets/img/loading-gif.gif';
export default function LoadingBox(){
  return (
    <Box>
      <img src={loadingImg} alt="LOADING" />
    </Box>
  )
}

const Box = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  width:100%;
  height: 31.25rem;
  img{ display:block; margin: auto; width:4rem; height:auto;}
`;
