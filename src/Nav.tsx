import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
};

type NavProps = {
  show: boolean;
}

export const Nav = (props: Props) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleShow = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleShow);
    return () => {
      window.removeEventListener("scroll", handleShow);
    };
  }, []);
  return (
    <NavAreaWithStyled show={ show }>
      <NavLogoWithStyled
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      <NavAvaterWithStyled
        src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
        alt="Avatar"
      />
    </NavAreaWithStyled>
  );
};

const NavAreaWithStyled = styled.div<NavProps>`
  position: fixed;
  top: 0;
  width: 100%;
  height: 30px;
  padding: 20px;
  z-index: 1;
  display: flex;
  justify-content: space-between;

  /* Animations */
  transition-timing-function: ease-in;
  transition: all 0.5s;

  ${ props => props.show && 'background-color: #111' };
`;

const NavLogoWithStyled = styled.img`
  position: fixed;
  left: 20px;
  width: 80px;
  object-fit: contain;
`;

const NavAvaterWithStyled = styled.img`
  position: fixed;
  right: 20px;
  width: 30px;
  object-fit: contain;
`;