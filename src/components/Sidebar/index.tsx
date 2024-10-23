import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faList, faUser, faPlus, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SidebarContainer, SidebarLink, ToggleButton, SidebarTitle } from './SidebarStyles';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <SidebarContainer isOpen={isOpen}>
      {isOpen && <SidebarTitle>Menu</SidebarTitle>} 

      <SidebarLink to="/">
        <FontAwesomeIcon icon={faList} style={{ marginRight: '10px' }} />
        {isOpen && 'Início'}
      </SidebarLink>

      <SidebarLink to="/products">
        <FontAwesomeIcon icon={faBox} style={{ marginRight: '10px' }} />
        {isOpen && 'Produtos'}
      </SidebarLink>

      <SidebarLink to="/users">
        <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
        {isOpen && 'Usuários'}
      </SidebarLink>

      <SidebarLink to="/product-manager">
        <FontAwesomeIcon icon={faPlus} style={{ marginRight: '10px' }} />
        {isOpen && 'Produto'}
      </SidebarLink>

      <ToggleButton onClick={toggleSidebar}>
        {isOpen ? <FontAwesomeIcon icon={faArrowLeft} /> : <FontAwesomeIcon icon={faArrowRight} />}
      </ToggleButton>
    </SidebarContainer>
  );
};

export default Sidebar;
