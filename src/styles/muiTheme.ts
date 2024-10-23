import { createTheme } from '@mui/material/styles';

// Tema personalizado do Material-UI
export const muiTheme = createTheme({
  typography: {
    fontWeightBold: 700,
    fontFamily: "'Poppins', sans-serif",
  },
  palette: {
    primary: {
      main: "#1976d2", // Azul primário
    },
    secondary: {
      main: "#9e9e9e", // Cinza secundário
    },
    background: {
      default: "#f5f5f5", // Cor de fundo clara
    },
    text: {
      primary: "#212121", // Texto principal
      secondary: "#757575", // Texto secundário
    },
  },
});
