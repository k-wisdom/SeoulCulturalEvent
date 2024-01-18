import React from 'react';
import logo from '../assets/img/logo.png';
import styled from 'styled-components';

export default function Footer() {
  return (
    <BoxFooter>
      <div className="bx_con_1400">
        <img src={logo} alt="logo" />
        <p>&copy;2023.KIM JI HYE. Personal Portfolio.</p>
      </div>
    </BoxFooter>
  );
}

const BoxFooter = styled.footer`
  padding: 0.5rem;
  border-top: 1px solid #000;
  background-color: #f5f5f5;
  text-align: center;

  img {
    width: 3rem;
    height: auto;
  }

  p {
    display: inline-block;
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    img {
      margin-right: 0.5rem;
      width: 2rem;
    }
  }
`;
