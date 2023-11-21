import styled from 'styled-components'

interface Props {
  readonly cssname? : string,
  readonly name: string,
  readonly width? : string,
  readonly onClick? : () => void;
}

export default function CircleBtn({cssname, name, width = "200px", onClick}:Props){
  return(
    <CircleButton btnwidth={width} onClick={onClick} className = {cssname}>
      {name}
    </CircleButton>
  )
}

const CircleButton = styled.button<{btnwidth:string}>`
  border-radius:100%;
  padding:1rem;
  width : ${(props) => props.btnwidth};
  height : ${(props) => props.btnwidth};
  background-color:transparent;
  border:1px solid #000;
  word-break:keep-all;
  color:#000;
`
