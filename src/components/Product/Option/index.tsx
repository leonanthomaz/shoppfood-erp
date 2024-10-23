import React, { useState } from 'react';
import { Button, TextField, Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { ProductItemDTO } from '../../../types/Product';
import { getMerchantCode } from '../../../services/api';

interface ProductOptionsFormProps {
  productOptions: ProductItemDTO[];
  setProductOptions: (options: ProductItemDTO[]) => void;
}

const merchantCode = getMerchantCode();

const ProductOptionsForm: React.FC<ProductOptionsFormProps> = ({ productOptions = [], setProductOptions }) => {
  const [newOption, setNewOption] = useState<ProductItemDTO>({ name: '', merchantCode, additionalPrice: 0 });

  const handleAddOption = () => {
    if (newOption.name.trim() !== '' && newOption.additionalPrice >= 0) {
      setProductOptions([...productOptions, newOption]);
      setNewOption({ name: '', merchantCode, additionalPrice: 0 });
    }
  };

  return (
    <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Adicionar Opções ao Produto
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Nome da Opção"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newOption.name}
          onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
        />
        <TextField
          label="Preço Adicional"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newOption.additionalPrice}
          onChange={(e) => setNewOption({ ...newOption, additionalPrice: parseFloat(e.target.value) })}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddOption}
        sx={{ mb: 2 }}
      >
        Adicionar Opção
      </Button>
      <List>
        {productOptions && productOptions.length > 0 ? (
          productOptions.map((option, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={option.name}
                secondary={`Preço Adicional: R$ ${option.additionalPrice},00`}
              />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="Nenhuma opção adicionada" />
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default ProductOptionsForm;
