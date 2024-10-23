import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, CircularProgress, Box, Divider } from '@mui/material';
import MainLayout from '../../components/MainLayout';
import { User as UserType } from '../../types/User';
import { MainContent } from '../../components/MainLayout/MainLayoutStyles';

const User: React.FC = () => {
  const { state, updateUser } = useAuth();
  const [userData, setUserData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user) {
      setUserData(state.user);
    }
  }, [state.user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    } as UserType);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (userData) {
        await updateUser(userData);
        toast.success('Usuário atualizado com sucesso!');
        navigate('/users'); // Navega para a página de lista de usuários após a edição
      }
    } catch (error) {
      toast.error('Falha ao atualizar usuário.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <MainContent>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Editar
          </Typography>
          <Divider sx={{ mb: 4 }} />
          {userData ? (
            <form onSubmit={handleSubmit}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Nome"
                  name="name"
                  value={userData.name || ''}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={userData.email || ''}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Função"
                  name="role"
                  value={userData.role || ''}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={24} /> : undefined}
              >
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </form>
          ) : (
            <Typography variant="body1">Carregando dados do usuário...</Typography>
          )}
        </Container>
      </MainContent>
    </MainLayout>
  );
};

export default User;
