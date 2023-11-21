import { ReactNode, forwardRef } from 'react';
import styled from 'styled-components';


type Props = {
  children: ReactNode
}

function GrayFrame({children}:Props, ref:any){
  return(
    <Box className="gray_box" ref={ref}>
      {children}
    </Box>
  )
}

const Box = styled.div`
  padding:1rem 2.5rem;
  width:25rem;
  background:#f5f5f5;
  box-sizing:border-box;
  border:1px solid #000;
`

export default forwardRef(GrayFrame);