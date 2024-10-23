import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing(2)};
  box-sizing: border-box;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSize.xLarge};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  text-align: center;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  background-color: ${(props) => props.theme.colors.white};
  padding: ${(props) => props.theme.spacing(3)};
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  width: calc(100% - ${(props) => props.theme.spacing(2)});
  padding: ${(props) => props.theme.spacing(1)};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.lightGray};
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSize.medium};

  ::placeholder {
    color: ${(props) => props.theme.colors.placeholder};
  }
`;

export const Button = styled.button`
  width: 95%;
  padding: ${(props) => props.theme.spacing(2)};
  background-color: ${(props) => props.theme.colors.buttonBackground};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius};
  color: ${(props) => props.theme.colors.buttonText};
  font-size: ${(props) => props.theme.fontSize.medium};
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: ${(props) => props.theme.spacing(2)};

  &:hover {
    background-color: ${(props) => props.theme.colors.buttonBackgroundHover};
  }
`;

export const SocialButton = styled.button`
  width: 95%;
  padding: ${(props) => props.theme.spacing(2)};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius};
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSize.medium};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }

  svg {
    width: 20px;
    margin-right: ${(props) => props.theme.spacing(1)};
  }
`;

export const ErrorMessage = styled.p`
  color: ${(props) => props.theme.colors.danger};
  margin-bottom: ${(props) => props.theme.spacing(2)};
  font-size: ${(props) => props.theme.fontSize.small};
  text-align: center;
`;

export const LoginLink = styled.div`
  margin-top: ${(props) => props.theme.spacing(2)};
  color: ${(props) => props.theme.colors.text};
  text-align: center;

  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;
