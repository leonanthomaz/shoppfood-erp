import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import MainLayout from '../../components/MainLayout';
import { Grid, Typography, Card, CardContent, Box, Container, Divider } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MainContent } from '../../components/MainLayout/MainLayoutStyles';
import axios from 'axios';

// Dados fictícios para gráficos (substituir pelos dados reais)
// const data = [
//   { name: 'Jan', sales: 4000, orders: 2400, revenue: 2400 },
//   { name: 'Fev', sales: 3000, orders: 1398, revenue: 2210 },
//   { name: 'Mar', sales: 2000, orders: 9800, revenue: 2290 },
//   { name: 'Abril', sales: 2780, orders: 3908, revenue: 2000 },
//   { name: 'Maio', sales: 1890, orders: 4800, revenue: 2181 },
//   { name: 'Junho', sales: 2390, orders: 3800, revenue: 2500 },
//   { name: 'Julho', sales: 3490, orders: 4300, revenue: 2100 },
// ];

const DashboardPage: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [ordersData, setOrdersData] = useState<any>([]);
  const { state } = useAuth();

  useEffect(() => {
    if (state.user) {
      setUserData(state.user);
    }
  }, [state.user]);

  useEffect(() => {
    const loadOrders = async () => {
      const merchantCode = state.user?.merchantCode;
      try {
        const response = await axios.get(`http://localhost:8090/orders/find/merchant/${merchantCode}`);
        setOrdersData(response.data);
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
      }
    };
    loadOrders();
  }, [state.user]);

  // Cálculo de vendas, pedidos e faturamento
  const totalSales = ordersData.reduce((acc, order) => acc + (order.total || 0), 0);
  const totalOrders = ordersData.length;

  // Para o gráfico, você pode usar a data de criação
  const salesData = ordersData.map(order => ({
    name: new Date(order.createdAt).toLocaleDateString(), // Converte para string de data
    total: order.total,
  }));

  return (
    <MainLayout>
      <MainContent>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Dashboard
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Container maxWidth="lg">
          <Box my={4}>
            {userData ? (
              <>
                <Box mt={2}>
                  <Typography variant="h5">Olá, {userData.name}!</Typography>
                  <Typography variant="body1">Email: {userData.email}</Typography>
                  <Typography variant="body1">Código de Comerciante: {userData.merchantCode}</Typography>
                </Box>
                <Grid container spacing={3} mt={2}>
                  <Grid item xs={12} sm={4}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">Vendas</Typography>
                        <Typography variant="h4" color="primary">
                          R$ {totalSales.toFixed(2)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">Pedidos</Typography>
                        <Typography variant="h4" color="primary">
                          {totalOrders}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">Faturamento</Typography>
                        <Typography variant="h4" color="primary">
                          R$ {totalSales.toFixed(2)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Box mt={4} width="100%">
                  <Typography variant="h6" gutterBottom>
                    Vendas e Faturamento
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="total" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </>
            ) : (
              <Typography variant="body1">Carregando dados...</Typography>
            )}
          </Box>
        </Container>
      </MainContent>
    </MainLayout>
  );
};

export default DashboardPage;
