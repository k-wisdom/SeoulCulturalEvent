import styled from 'styled-components'

interface Props {
  readonly cssname? : string,
  readonly name: string,
  readonly height? : string,
  readonly onClick? : (e:any) => void;
}

export default function RoundedBtn({cssname, name, height = "40px", onClick}:Props){
  return(
    <RoundedButton btnheight={height} onClick={onClick} className = {cssname}>
      {name}
    </RoundedButton>
  )
}

const RoundedButton = styled.button<{btnheight:string}>`
  padding:0 2rem;
  width : auto;
  height : ${(props) => props.btnheight};
  border-radius : ${(props) => props.btnheight};
  background-color:transparent;
  border:1px solid #000;
  word-break:keep-all;
  transition:all .3s;
  color:#000;

  &.active, &:hover{
    background-color:#000;
    color:#fff;
  }

  @media (max-width : 768px){
    padding: 0 0.8rem;
    height: calc(${(props) => (props.btnheight)} * 0.7);
    font-size: 0.8rem
  }
`
