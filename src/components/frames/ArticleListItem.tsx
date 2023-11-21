import '../../assets/scss/layout/_list.scss'

interface Props{
  readonly CODENAME : string,
  readonly TITLE : string,
  readonly DATE : string,
  readonly MAIN_IMG : string,
  readonly PROGRAM : string,
  handleClick? : () => void
}
export default function ArticleListItem({CODENAME, TITLE, MAIN_IMG, DATE, PROGRAM, handleClick}:Props){
  return(
    <figure className="article_item" onClick={handleClick}>
      <span className="img_wrap"><img src={MAIN_IMG} alt={`${TITLE}_대표이미지`} /></span>
      <figcaption>
        <i>{CODENAME}</i>
        <h3>{TITLE}</h3>
        <p>{PROGRAM}</p>
        <span>{DATE}</span>
      </figcaption>
    </figure>
  )
}