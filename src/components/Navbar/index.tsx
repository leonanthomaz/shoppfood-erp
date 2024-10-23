import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  ListItemIcon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { useAuth } from '../../contexts/AuthContext';
import logo from '@/assets/imgs/logo-sf-white.png';

const Navbar: React.FC = () => {
  const { state, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { label: 'DASHBOARD', link: '/dashboard', icon: <DashboardIcon /> },
    { label: 'LOJA', link: '/store', icon: <StoreIcon /> },
    { label: 'PRODUTOS', link: '/products', icon: <ShoppingCartIcon /> },
    { label: 'CLIENTES', link: '/clients', icon: <PeopleIcon /> },
    { label: 'DELIVERY', link: '/delivery', icon: <DeliveryDiningIcon /> },
    { label: 'FINANCEIRO', link: '/finance', icon: <AttachMoneyIcon /> },
    // { label: 'CONFIGURAÇÕES', link: '/settings', icon: <SettingsIcon /> },
  ];

  const menuItemsAdmin = [
    { label: 'CRIAR LOJA', link: '/create-store', icon: <AddBusinessIcon /> },
  ];

  return (
    <AppBar position="fixed">
      <Toolbar>
        {/* Logo */}
        <Box display="flex" alignItems="center" flexGrow={1}>
          <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '20px' }} />
          <Typography variant="h6" noWrap component="div">
            {state.user?.accessLevel === 'SYSTEM_ADMIN' ? 'ADMIN' : 'EMPRESA'}
          </Typography>
        </Box>

        {/* Links para desktop */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '15px' }}>
          {state.user?.accessLevel === 'SYSTEM_ADMIN'
            ? menuItemsAdmin.map((item, index) => (
                <Button
                  key={index}
                  component={Link}
                  to={item.link}
                  color="inherit"
                  startIcon={item.icon}
                >
                  {item.label}
                </Button>
              ))
            : menuItems.map((item, index) => (
                <Button
                  key={index}
                  component={Link}
                  to={item.link}
                  color="inherit"
                  startIcon={item.icon}
                >
                  {item.label}
                </Button>
              ))}
          <Button color="inherit" onClick={logout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Box>

        {/* Ícone de Menu para mobile */}
        <IconButton
          color="inherit"
          edge="end"
          onClick={toggleDrawer}
          sx={{ display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Drawer para mobile */}
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
          <List>
            {state.user?.accessLevel === 'SYSTEM_ADMIN'
              ? menuItemsAdmin.map((item, index) => (
                  <ListItem button component={Link} to={item.link} key={index}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))
              : menuItems.map((item, index) => (
                  <ListItem button component={Link} to={item.link} key={index}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
            <ListItem button onClick={logout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
