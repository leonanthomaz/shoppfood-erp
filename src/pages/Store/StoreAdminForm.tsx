import React, { useState, ChangeEvent } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import MainLayout from '../../components/MainLayout';
import { MainContent } from '../../components/MainLayout/MainLayoutStyles';
import { useStore } from '../../contexts/StoreContext';
import { useGlobal } from '../../contexts/GlobalContext'; // Importando o contexto global
import { toast } from 'react-toastify';

const StoreAdminForm: React.FC = () => {
  const { createNewStore } = useStore();
  const { setLoading } = useGlobal(); // Utilizando o setLoading global

  const [formData, setFormData] = useState({
    name: '',
    user: {
      name: '',
      email: '',
    },
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUserChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      user: {
        ...formData.user,
        [name]: value,
      },
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createNewStore(formData);
      toast.success('Loja criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar a loja:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <MainContent>
        <Box sx={{ p: 3, maxWidth: '800px', margin: '0 auto' }}>
          <Box component="form" noValidate autoComplete="off">
            <Typography variant="h6" gutterBottom>
              Criar Nova Loja
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Nome da Loja */}
              <TextField
                label="Nome da Loja"
                name="name"
                fullWidth
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              {/* Informações do Usuário */}
              <Typography variant="subtitle1">Informações do Usuário</Typography>

              <Box sx={{ display: 'flex', gap: 2 }}>
                {/* Nome do Usuário */}
                <TextField
                  label="Nome do Usuário"
                  name="name"
                  fullWidth
                  value={formData.user.name}
                  onChange={handleUserChange}
                  required
                />

                {/* Email do Usuário */}
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  value={formData.user.email}
                  onChange={handleUserChange}
                  required
                />
              </Box>

              {/* Botão de Submit */}
              <Button variant="contained" color="primary" 
              onClick={handleSubmit} sx={{ maxWidth: '200px'}}>
                Criar Loja
              </Button>
            </Box>
          </Box>
        </Box>
      </MainContent>
    </MainLayout>
  );
};

export default StoreAdminForm;
