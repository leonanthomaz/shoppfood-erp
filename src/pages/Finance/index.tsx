import React from 'react';
import { Box, Typography, Divider, Skeleton } from '@mui/material';
import MainLayout from '../../components/MainLayout';
import { FinanceStyles } from './FinanceStyles';

const FinancePage: React.FC = () => {
  return (
    <MainLayout>
      <FinanceStyles>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Finanças
          </Typography>
          <Divider sx={{ mb: 4 }} />

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Resumo Financeiro
            </Typography>
            <Skeleton variant="rectangular" height={200} />
          </Box>

          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Últimas Transações
            </Typography>
            <Skeleton variant="rectangular" height={100} />
            <Skeleton variant="rectangular" height={100} sx={{ mt: 2 }} />
            <Skeleton variant="rectangular" height={100} sx={{ mt: 2 }} />
          </Box>
        </Box>
      </FinanceStyles>
    </MainLayout>
  );
};

export default FinancePage;
