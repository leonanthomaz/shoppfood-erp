import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Toolbar, IconButton, Typography, useMediaQuery, Button, ListItemIcon, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import { MainContent } from '../../components/MainLayout/MainLayoutStyles';

import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';

// Largura do drawer (menu lateral)
const drawerWidth = 240;

const Settings = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Conteúdo do menu lateral
  const drawerContent = (
    <div>
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/dashboard" onClick={handleDrawerToggle}>
          <ListItemIcon sx={{ color: '#fff' }}><DashboardIcon /></ListItemIcon>
          <ListItemText primary="DASHBOARD" />
        </ListItem>
        <ListItem button component={Link} to="/products" onClick={handleDrawerToggle}>
          <ListItemIcon sx={{ color: '#fff' }}><InventoryIcon /></ListItemIcon>
          <ListItemText primary="PRODUTOS" />
        </ListItem>
        <ListItem button component={Link} to="/edit-store" onClick={handleDrawerToggle}>
          <ListItemIcon sx={{ color: '#fff' }}><StoreIcon /></ListItemIcon>
          <ListItemText primary="EDITAR LOJA" />
        </ListItem>
        <ListItem button component={Link} to="/delivery" onClick={handleDrawerToggle}>
          <ListItemIcon sx={{ color: '#fff' }}><LocalShippingIcon /></ListItemIcon>
          <ListItemText primary="DELIVERY" />
        </ListItem>
        <ListItem button component={Link} to="/finance" onClick={handleDrawerToggle}>
          <ListItemIcon sx={{ color: '#fff' }}><AttachMoneyIcon /></ListItemIcon>
          <ListItemText primary="FINANCEIRO" />
        </ListItem>
        <ListItem button component={Link} to="/clients" onClick={handleDrawerToggle}>
          <ListItemIcon sx={{ color: '#fff' }}><GroupIcon /></ListItemIcon>
          <ListItemText primary="CLIENTES" />
        </ListItem>
        <ListItem button component={Link} to="/settings" onClick={handleDrawerToggle}>
          <ListItemIcon sx={{ color: '#fff' }}><SettingsIcon /></ListItemIcon>
          <ListItemText primary="CONFIGURAÇÕES" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <MainLayout>
      <MainContent>
       <Box>
       
       <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Configuração de Área de Entrega
        </Typography>
        <Divider sx={{ mb: 0 }} />

        <Box sx={{ display: 'flex' }}>
          {/* Botão de engrenagem para abrir o menu lateral */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              position: 'fixed',
              top: '0px', // Posição do botão
              right: '0px', // Alinhamento à direita
              zIndex: theme.zIndex.drawer + 1,
            }}
          >
          <SettingsIcon sx={{ marginTop: '95px', marginRight: '25px', backgroundColor: 'red', width: '50px' }}/> {/* Ícone de engrenagem */}
          
          </IconButton>

          {/* Drawer (Menu lateral) */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }} // Melhora a performance em telas móveis
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                height: '100%', // Ajuste para ocupar 100% da altura
                backgroundColor: '#67778e',
                color: '#fff',
              },
            }}
          >
            {drawerContent}
          </Drawer>

          {/* Conteúdo Principal */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
            }}
          >
            <Toolbar />
            <Typography variant="h4">Configurações da Loja</Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 3,
                  flexWrap: 'wrap',
                }}
              >
                <Link to="/create-product" style={{ textDecoration: 'none' }}>
                  <Box sx={{ width: '300px', height: '150px', backgroundColor: '#f5f5f5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography>Criar Produto</Typography>
                  </Box>
                </Link>
                <Link to="/manage-products" style={{ textDecoration: 'none' }}>
                  <Box sx={{ width: '300px', height: '150px', backgroundColor: '#f5f5f5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography>Gerenciar Produtos</Typography>
                  </Box>
                </Link>
                <Link to="/delivery" style={{ textDecoration: 'none' }}>
                  <Box sx={{ width: '300px', height: '150px', backgroundColor: '#f5f5f5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography>Entrega</Typography>
                  </Box>
                </Link>
                <Link to="/payments" style={{ textDecoration: 'none' }}>
                  <Box sx={{ width: '300px', height: '150px', backgroundColor: '#f5f5f5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography>Pagamentos</Typography>
                  </Box>
                </Link>
              </Box>
          </Box>

        </Box>
       
       </Box>
      </MainContent>
    </MainLayout>
  );
};

export default Settings;
