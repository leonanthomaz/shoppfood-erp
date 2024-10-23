import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SidebarContainer = styled.nav<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (isOpen ? '200px' : '60px')};
  background-color: ${({ theme }) => theme.colors.secondary};
  height: 100vh;
  padding-top: 60px; /* Ajuste para alinhar com o Header */
  position: fixed;
  top: 0;
  left: 0;
  transition: width 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  z-index: 999;
`;

export const SidebarLink = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  padding: 10px 20px;
  font-size: 1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SidebarTitle = styled.h2`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.white};
  margin-left: 20px;
  display: block; /* Ou use uma condição no componente Sidebar */
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  margin-top: auto;
  margin-left: auto;
  padding: 10px;
  cursor: pointer;
`;
