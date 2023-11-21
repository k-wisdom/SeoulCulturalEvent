import styled from 'styled-components'

interface Props{
  text : string;
}

export default function InfoTextBox({text}:Props){
  return(
    <Box>
      <p>{text}</p>
    </Box>
  )
}

const Box = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  height: 31.25rem;
  font-size:1.2rem;
`;