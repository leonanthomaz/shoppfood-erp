import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Skeleton,
  Card,
  CardContent,
  Button,
  Modal,
} from '@mui/material';
import MainLayout from '../../components/MainLayout';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const ClientsPage: React.FC = () => {
  const { state } = useAuth();
  const [clientsData, setClientsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  useEffect(() => {
    const fetchClients = async () => {
      const merchantCode = state.user?.merchantCode;
      try {
        const response = await axios.get(`http://localhost:8080/users/find/merchant/${merchantCode}`);
        setClientsData(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [state.user]);

  const handleOpenModal = (client: any) => {
    setSelectedClient(client);
  };

  const handleCloseModal = () => {
    setSelectedClient(null);
  };

  return (
    <MainLayout>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Gestão de Clientes
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Lista de Clientes
          </Typography>
          {loading ? (
            <Skeleton variant="rectangular" height={300} />
          ) : (
            clientsData.map((client) => (
              <Card key={client.id} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h6">{client.name}</Typography>
                  <Typography variant="body1">Telefone: {client.telephone}</Typography>
                  <Typography variant="body1">Email: {client.email}</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleOpenModal(client)}
                    sx={{ mt: 2 }}
                  >
                    Detalhes
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </Box>

        <Modal
          open={Boolean(selectedClient)}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              width: 400,
              padding: 3,
              backgroundColor: 'white',
              borderRadius: 2,
              margin: 'auto',
              marginTop: '10%',
            }}
          >
            {selectedClient && (
              <>
                <Typography id="modal-title" variant="h6" component="h2">
                  Detalhes do Cliente
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  Nome: {selectedClient.name}
                </Typography>
                <Typography>Email: {selectedClient.email}</Typography>
                <Typography>Telefone: {selectedClient.telephone}</Typography>
                {/* Adicione mais informações do cliente aqui */}
              </>
            )}
          </Box>
        </Modal>
      </Box>
    </MainLayout>
  );
};

export default ClientsPage;
