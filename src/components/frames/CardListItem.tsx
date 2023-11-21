import '../../assets/scss/layout/_list.scss'

interface Props{
  readonly CODENAME : string,
  readonly TITLE : string,
  readonly DATE : string,
  readonly MAIN_IMG : string,
  handleClick? : () => void
}

export default function CardListItem({CODENAME, TITLE, MAIN_IMG, DATE, handleClick}:Props){
  return(
    <figure className="card_item" onClick={handleClick}>
      <img src={MAIN_IMG} alt={`${TITLE}_대표이미지`} />
      <figcaption>
        <i>{CODENAME}</i>
        <b>{TITLE}</b>
        <span>{DATE}</span>
      </figcaption>
    </figure>
  )
}
