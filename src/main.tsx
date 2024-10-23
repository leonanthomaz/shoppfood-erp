import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './styles/theme';

import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';

import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { muiTheme } from './styles/muiTheme';
import GlobalStyles from './styles/GlobalStyles';
import { GlobalProvider } from './contexts/GlobalContext';
import { StoreProvider } from './contexts/StoreContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MuiThemeProvider theme={muiTheme}>
    <CssBaseline />
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <GlobalProvider>
          <ProductProvider>
            <AuthProvider>
              <StoreProvider>
                <GoogleOAuthProvider clientId={import.meta.env.VITE_API_GOOGLE_ID_CLIENT}>
                  <App />
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                </GoogleOAuthProvider>
              </StoreProvider>
            </AuthProvider>
          </ProductProvider>
        </GlobalProvider>
      </Router>
    </StyledThemeProvider>
  </MuiThemeProvider>
);
