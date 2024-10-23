// src/components/Navbar/NavbarStyles.ts
import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  width: 100%;
  height: 5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  justify-content: space-between;
  position: fixed;  /* Torna a navbar fixa */
  top: 0;           /* Alinha a navbar ao topo da página */
  left: 0;          /* Alinha a navbar ao lado esquerdo da página */
  z-index: 1000;    /* Garante que a navbar esteja acima de outros elementos */
`;


export const Logo = styled.div`
  color: ${(props) => props.theme.colors.navbarText};
  font-size: 24px;
  font-weight: bold;
  margin-right: 20px;
  width: 100px;
  height: 100px;

  img {
    height: 100%;
    width: auto;
  }
`;

export const NavLinks = styled.div<{ open: boolean }>`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: start;
  position: relative;
  font-family: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};
  margin-left: 10px;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh);
    background-color: ${(props) => props.theme.colors.navbar};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease-in-out;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
    z-index: 999;
    display: flex;
    margin-left: 0px;

  }

  a, button {
    margin: 10px;
    color: ${(props) => props.theme.colors.navbarText};
    font-size: 16px;
    font-weight: bold;
    transition: color 0.3s;
    background: transparent;
    border: none;
    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme.colors.hover};
    }
  }
`;

export const Hamburger = styled.div`
  display: none;
  color: ${(props) => props.theme.colors.navbarText};
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const CloseIconWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.navbarText};
  font-size: 30px;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const CartIconWrapper = styled.div`
  position: relative;

  a {
    color: ${(props) => props.theme.colors.text};
    display: flex;
    align-items: center;
    background: transparent;
    border: none;
    cursor: pointer;

    span {
      position: absolute;
      top: -5px;
      right: -5px;
      background-color: black;
      color: #fff;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;

  @media (max-width: 380px) {
    font-size: 15px;
  }
`;

export const IconWrapper = styled.div`
  margin-right: 15px;

  a {
    color: ${(props) => props.theme.colors.text};
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

export const IconLabel = styled.span`
  font-size: 14px;
  margin-top: 4px;
  color: ${(props) => props.theme.colors.navbarText};

  @media (max-width: 380px) {
    font-size: 10px;
  }
`;
