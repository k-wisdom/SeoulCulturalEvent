import React from 'react';

type Props = {
  data: DataType;
};

interface DataType {
  codename: string;
  title: string;
  main_img: string;
  date: string;
}

export default function SliderItem({ data }: Props) {
  const { codename, title, main_img, date } = data;
  return (
    <div>
      <img src={main_img} alt={`${title}_이미지`} />
      <div className="slider_content">
        <span>{codename}</span>
        <b className="title">{title}</b>
        <i>{date}</i>
      </div>
    </div>
  );
}
