import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// https://www.npmjs.com/package/react-responsive-carousel
import '../assets/scss/vendors/_slider.scss';

interface Props {
  readonly totalItemNumber?: number;
  readonly children: React.ReactChild[];
}

export default function Slider({ totalItemNumber = 1, children }: Props) {
  const sliderOption = {
    showThumbs: false,
    showArrows: true,
    autoPlay: true,
  };

  return (
    <Carousel
      {...sliderOption}
      centerMode={totalItemNumber === 1 ? false : true}
      centerSlidePercentage={totalItemNumber && 100 / totalItemNumber}
    >
      {children}
    </Carousel>
  );
}
