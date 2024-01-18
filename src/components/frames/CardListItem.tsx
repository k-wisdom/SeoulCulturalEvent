import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../../assets/scss/layout/_list.scss';

interface Props {
  readonly CODENAME: string;
  readonly TITLE: string;
  readonly DATE: string;
  readonly MAIN_IMG: string;
  handleClick?: () => void;
}

export default function CardListItem({ CODENAME, TITLE, MAIN_IMG, DATE, handleClick }: Props) {
  return (
    <figure className="card_item" onClick={handleClick}>
      {/* <img src={MAIN_IMG} alt={`${TITLE}_대표이미지`} key={MAIN_IMG}/> */}
      <LazyLoadImage alt={`${TITLE}_대표이미지`} src={MAIN_IMG} effect="blur" key={MAIN_IMG} />
      <figcaption>
        <i>{CODENAME}</i>
        <b>{TITLE}</b>
        <span>{DATE}</span>
      </figcaption>
    </figure>
  );
}
