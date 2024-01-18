import React from 'react';
import img_404 from '../assets/img/error-404.png';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  height: calc(100vh - 4.0625rem);
`;

const Text = styled.b`
  text-align: center;
  font-size: 2rem;
`;

export default function NotFound() {
  const imgStyle = {
    display: 'block',
    width: '8rem',
    height: 'auto',
    opacity: 0.4,
  };
  return (
    <Box>
      <img src={img_404} style={imgStyle} alt="404" />
      <Text>NOT FOUND</Text>
    </Box>
  );
}
