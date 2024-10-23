import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing(3)};
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const Logo = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
  font-weight: bold;
`;

export const UserProfile = styled.div`
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 20px;
`;
