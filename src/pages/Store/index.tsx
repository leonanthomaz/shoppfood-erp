import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Skeleton, Divider, Switch } from '@mui/material';
import MainLayout from '../../components/MainLayout';
import { MainContent } from '../../components/MainLayout/MainLayoutStyles';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';
import axios from 'axios';
import { User } from '../../types/User';
import { Store } from '../../types/Store';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const StorePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [storeData, setStoreData] = useState<Store | null>(null);
  const { state } = useAuth();
  const { activeStore } = useStore();

  console.log("PIROCA", storeData?.open)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (state.user) {
      setUserData(state.user);
    }
  }, [state.user]);

  useEffect(() => {
    const loadStore = async () => {
      const merchantCode = localStorage.getItem("MERCHANT_CODE");
      if (!merchantCode || !state.user) return;

      try {
        const response = await axios.get(`http://localhost:8080/store/find`, { params: { merchantCode } });
        setStoreData(response.data);
      } catch (error) {
        console.error("Erro ao carregar loja do comerciante:", error);
      }
    };
    loadStore();
  }, [state.user]);

  const handleSwitchChange = async () => {
    if (storeData) {
      try {
        await activeStore(!storeData.open);
        setStoreData(prevState => ({
          ...prevState,
          open: !prevState?.open,
        }));
        const condition = !storeData?.open ? 'Aberta' : 'Fechada';
        toast.success(`Loja ${condition}!`)
      } catch (error) {
        console.error('Erro ao alterar o status da loja:', error);
      }
    }
  };
  

  return (
    <MainLayout>
      <MainContent>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Sua Loja
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <Paper elevation={2} sx={{ padding: 3, marginBottom: 3 }}>
          {loading ? (
            <>
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="rectangular" height={118} sx={{ marginY: 2 }} />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="80%" />
            </>
          ) : (
            <Box>
              <Typography variant="h6">{storeData?.name}</Typography>
              <Typography variant="body1">Cód. Comerciante: {storeData?.merchantCode}</Typography>
              {storeData?.address ? (
                <Typography variant="body1">
                  Endereço: {storeData.address.street}, {storeData.address.number}, {storeData.address.neighborhood}, {storeData.address.city} - {storeData.address.state}
                </Typography>
              ) : (
                <Typography variant="body1">Endereço: Não disponível</Typography>
              )}
              <Typography variant="body1">Contato: {storeData?.phoneNumber || "Não disponível"}</Typography>
              <Typography variant="body1">Status da Loja: {storeData?.active ? "Ativa" : "Inativa"}</Typography>
              <Typography variant="body1">Data de Criação: {new Date(storeData?.createdAt).toLocaleString()}</Typography>

              {/* Seção do Botão de Ativação e Ações */}
              <Box display="flex" flexDirection="column" alignItems="flex-start" sx={{ mt: 2 }}>
                <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="body1" sx={{ mr: 1 }}>
                    {storeData?.open ? 'Aberto' : 'Fechado'}
                  </Typography>
                  <Switch
                    checked={storeData?.open || false}
                    onChange={handleSwitchChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Box>
              </Box>
              <Button
                component={Link}
                to="/edit-store"
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
              >
                Atualizar Loja
              </Button>
            </Box>
          )}
        </Paper>

        <Typography variant="h5" gutterBottom>
          Configurações do Comerciante
        </Typography>

        <Paper elevation={2} sx={{ padding: 3 }}>
          {loading ? (
            <Skeleton variant="rectangular" height={118} />
          ) : (
            <Box>
              <Typography variant="body1">Nome do Comerciante: {userData?.name}</Typography>
              <Typography variant="body1">Email: {userData?.email}</Typography>
              <Typography variant="body1">Nível de Acesso: {userData?.accessLevel}</Typography>
              <Typography variant="body1">Telefone: {userData?.telephone || "Não disponível"}</Typography>
              <Button
                component={Link}
                to="/edit-user"
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
              >
                Atualizar Informações
              </Button>
            </Box>
          )}
        </Paper>
      </MainContent>
    </MainLayout>
  );
};

export default StorePage;
