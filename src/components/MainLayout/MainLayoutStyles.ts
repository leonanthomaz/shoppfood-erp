import { Box } from '@mui/material';
import styled from 'styled-components';

export const LayoutContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column; /* Para que o Navbar e o conteúdo fiquem em coluna */
`;

export const MainContent = styled(Box)`
  flex: 1;
  padding: 1rem;
  transition: 0.3s ease-in-out;
  background-color: #f5f5f5;
  border-radius: 8px; /* Borda arredondada para um visual mais moderno */
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
`;
