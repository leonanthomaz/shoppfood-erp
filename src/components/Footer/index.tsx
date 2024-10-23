import React from 'react';
import { FooterContainer, FooterContent, FooterLinks, FooterCopyRight } from './FooterStyles';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <a href="/">HOME</a>
          <a href="/services">SERVIÇOS</a>
          <a href="/about">SOBRE</a>
          <a href="/contact">CONTATO</a>
        </FooterLinks>
        
      </FooterContent>
      <FooterCopyRight>
        &copy; {new Date().getFullYear()} FabrikaTech. Todos os direitos reservados.
      </FooterCopyRight>
    </FooterContainer>
  );
};

export default Footer;
