import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Title, Form, Input, Button, SocialButton, ErrorMessage, LoginLink } from './LoginStyles';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      toast.success('Login bem-sucedido!');
      navigate('/');
    } catch (err) {
      setError('Erro ao tentar fazer login. Verifique suas credenciais.');
      toast.error('Erro ao tentar fazer login. Verifique suas credenciais.');
    }
  };

  const handleGoogleResponse = async (response: any) => {
    const token = response?.credential;
    if (token) {
      try {
        await loginWithGoogle(token);
        toast.success('Login com Google bem-sucedido!');
        navigate('/');
      } catch (error) {
        console.error('Erro ao autenticar com Google:', error);
        setError('Erro ao autenticar com Google.');
        toast.error('Erro ao autenticar com Google.');
      }      
    } else {
      setError('Erro ao autenticar com Google.');
      toast.error('Erro ao autenticar com Google.');
    }
  };
  

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="email"
          name="email"
          placeholder="Digite seu email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit">Entrar</Button>
        <SocialButton>
          <GoogleLogin
            onSuccess={handleGoogleResponse}
            onError={() => toast.error('Erro ao autenticar com Google.')}
          />
        </SocialButton>
        <LoginLink>
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </LoginLink>
        <LoginLink>
          Esqueceu sua senha? <Link to="/recover-password">Clique Aqui</Link>
        </LoginLink>
      </Form>
    </Container>
  );
};

export default Login;
