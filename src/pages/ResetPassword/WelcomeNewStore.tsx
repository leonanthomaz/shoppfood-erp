import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Typography, Container, Skeleton, Box } from '@mui/material';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import { resetPasswordNewStore } from '../../functions/User';
import MainLayout from '../../components/MainLayout';
import { MainContent } from '../../components/MainLayout/MainLayoutStyles';
import logo from '@/assets/imgs/logo1.png';

const WelcomeNewStore: React.FC = () => {
  const location = useLocation();
  const { token: urlToken } = queryString.parse(location.search) as { token: string };
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  const token = localStorage.getItem("APP_TOKEN") || urlToken;

  useEffect(() => {
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
      await resetPasswordNewStore(token || '', password);
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
        <Container maxWidth="sm" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Box mb={4}>
            <div>
              <img src={logo} alt="Logo" width={200} />
            </div>
            <Typography variant="h4" color="primary" gutterBottom>
              Seja Bem Vindo, empreendedor!
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Estamos felizes em tê-lo conosco!
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Por favor, defina sua nova senha para continuar.
            </Typography>
          </Box>

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
              variant="outlined"
              InputLabelProps={{ style: { color: '#666' } }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Confirmar Senha"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              variant="outlined"
              InputLabelProps={{ style: { color: '#666' } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ marginTop: '1.5rem', backgroundColor: '#289a2c', color: '#fff' }}
            >
              Redefinir Senha
            </Button>
          </form>
        </Container>
      </MainContent>
    </MainLayout>
  );
};

export default WelcomeNewStore;
