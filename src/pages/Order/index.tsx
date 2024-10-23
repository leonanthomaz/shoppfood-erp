import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Modal,
  Switch,
  Skeleton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';
import { MainContent } from '../../components/MainLayout/MainLayoutStyles';
import axios from 'axios';
import MainLayout from '../../components/MainLayout';
import { useAuth } from '../../contexts/AuthContext';

const statusTranslations: { [key: string]: string } = {
  ACCEPTED: 'Aceito',
  PREPARING: 'Preparando',
  AWAITING_PAYMENT: 'Aguardando pagamento',
  OUT_FOR_DELIVERY: 'Partiu!',
  DELIVERED: 'Entregue',
  CANCELED: 'Cancelado',
};

const OrdersPage: React.FC = () => {
  const { state } = useAuth();
  const [ordersData, setOrdersData] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderStatuses, setOrderStatuses] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6; // Número de itens por página

  useEffect(() => {
    const fetchOrders = async () => {
      const merchantCode = state.user?.merchantCode;
      try {
        const response = await axios.get(`http://localhost:8090/orders/find/merchant/${merchantCode}`);
        setOrdersData(response.data);
        setFilteredOrders(response.data); // Armazenar pedidos não filtrados inicialmente
        
        // Inicializa os status dos pedidos
        const initialStatuses = response.data.reduce((acc: any, order: any) => {
          acc[order.id] = order.status === 'ACEITO';
          return acc;
        }, {});
        setOrderStatuses(initialStatuses);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [state.user]);

  useEffect(() => {
    // Filtra os pedidos sempre que o searchTerm ou statusFilter mudar
    const filtered = ordersData.filter((order) => {
      const matchesSearchTerm = order.user.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter ? order.status === statusFilter : true;
      return matchesSearchTerm && matchesStatus;
    });
    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, ordersData]);

  const handleChange = (orderId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderStatuses({ ...orderStatuses, [orderId]: event.target.checked });
  };

  const handleOpenModal = (order: any) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  return (
    <MainLayout>
      <MainContent>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Pedidos
        </Typography>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
          <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2, width: '270px', marginBottom: '10px', marginRight: { md: 2 } }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Filtros</Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Pesquisar por cliente"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="ACEITO">Aceito</MenuItem>
                <MenuItem value="REJEITADO">Rejeitado</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box flexGrow={1}>
            {loading ? (
              <Skeleton variant="rectangular" height={118} sx={{ marginBottom: 2 }} />
            ) : (
              <>
                <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                  {currentOrders.map((order) => (
                    <Box key={order.id} sx={{ width: { xs: '100%', sm: '48%', md: '30%' }, mb: 2 }}>
                      <Card sx={{ padding: 2 }}>
                        <CardContent>
                          <Typography variant="h6">Nome: {order.user.name}</Typography>
                          <Typography variant="body1">Telefone: {order.user.phone}</Typography>
                          <Typography variant="body1">Total: R$ {order.total.toFixed(2)}</Typography>
                          <Typography variant="body1">Status: {statusTranslations[order.status]}</Typography>
                          <Box display="flex" alignItems="center" mt={2}>
                            <Typography variant="body1" sx={{ mr: 1 }}>
                              {orderStatuses[order.id] ? 'Aceito' : 'Rejeitado'}
                            </Typography>
                            <Switch
                              checked={orderStatuses[order.id] || false}
                              onChange={handleChange(order.id)}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </Box>
                          <Button variant="outlined" onClick={() => handleOpenModal(order)} sx={{ mt: 2 }}>
                            Detalhes
                          </Button>
                        </CardContent>
                      </Card>
                    </Box>
                  ))}
                </Box>
                <Pagination
                  count={Math.ceil(filteredOrders.length / itemsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                  sx={{ mt: 2 }}
                />
              </>
            )}
          </Box>
        </Box>

        <Modal
          open={Boolean(selectedOrder)}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              width: 300,
              padding: 3,
              backgroundColor: 'white',
              borderRadius: 2,
              margin: 'auto',
              marginTop: '10%',
            }}
          >
            {selectedOrder && (
              <>
                <Typography id="modal-title" variant="h6" component="h2">
                  Detalhes do Pedido
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>
                  Nome: {selectedOrder.user.name}
                </Typography>
                <Typography>Telefone: {selectedOrder.user.phone}</Typography>
                <Typography>Total: R$ {selectedOrder.total.toFixed(2)}</Typography>
                <Typography>Status: {statusTranslations[selectedOrder.status]}</Typography>
                {/* Adicione mais informações do pedido aqui */}
              </>
            )}
          </Box>
        </Modal>
      </MainContent>
    </MainLayout>
  );
};

export default OrdersPage;
