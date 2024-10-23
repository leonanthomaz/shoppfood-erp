// src/components/Footer/FooterStyles.ts
import styled from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: ${(props) => props.theme.colors.footerBackground};
  color: ${(props) => props.theme.colors.footerText};
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;

  a {
    color: ${(props) => props.theme.colors.footerText};
    text-decoration: none;
    font-size: 16px;
    transition: color 0.3s;

    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

export const FooterSocialIcons = styled.div`
  display: flex;
  gap: 15px;

  a {
    color: ${(props) => props.theme.colors.footerText};
    font-size: 24px;
    transition: color 0.3s;

    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

export const FooterCopyRight = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.footerText};
`;
