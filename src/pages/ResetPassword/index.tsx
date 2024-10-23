import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Typography, Container, Skeleton } from '@mui/material';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import { resetPassword } from '../../functions/User';
import MainLayout from '../../components/MainLayout';
import { MainContent } from '../../components/MainLayout/MainLayoutStyles';

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const { token: urlToken } = queryString.parse(location.search) as { token: string };
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Para controlar o estado de carregamento
  const navigate = useNavigate();

  const token = localStorage.getItem("APP_TOKEN") || urlToken; // Verifica o token no localStorage ou pela URL

  useEffect(() => {
    // Verifica se o token é válido (opcional)
    if (!token) {
      setError('Token inválido ou não encontrado.');
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    try {
      await resetPassword(token || '', password);
      toast.success('Senha redefinida com sucesso!');
      navigate('/login');
    } catch (err) {
      toast.error('Erro ao redefinir a senha.');
      setError('Erro ao redefinir a senha. Tente novamente.');
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Skeleton variant="text" width={210} height={60} />
        <Skeleton variant="rectangular" width="100%" height={56} />
        <Skeleton variant="rectangular" width="100%" height={56} style={{ marginTop: 16 }} />
        <Skeleton variant="rectangular" width="100%" height={56} style={{ marginTop: 32 }} />
      </Container>
    );
  }

  return (
    <MainLayout>
      <MainContent>
        <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
          <Typography variant="h4" gutterBottom>
            Redefinir Senha
          </Typography>
          {error && (
            <Typography color="error" variant="body1" gutterBottom>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Nova Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Confirmar Senha"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ marginTop: '1rem', backgroundColor: '#081da4' }}
            >
              Redefinir Senha
            </Button>
          </form>
        </Container>
      </MainContent>
    </MainLayout>
  );
};

export default ResetPassword;
