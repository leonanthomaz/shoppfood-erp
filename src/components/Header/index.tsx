import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { HeaderContainer, Logo, UserProfile, ToggleButton } from './HeaderStyles';
import logo from '@/assets/imgs/logo1.png';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <HeaderContainer>
      <ToggleButton onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </ToggleButton>
      <Logo>MicroTech - ERP</Logo>
      <UserProfile>
        <FontAwesomeIcon icon={faUserCircle} size="2x" />
      </UserProfile>
    </HeaderContainer>
  );
};

export default Header;
