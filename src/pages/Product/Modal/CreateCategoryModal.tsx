import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';
import { Category } from '../../../types/Category';
import { useProduct } from '../../../contexts/ProductContext';
import { getMerchantCode } from '../../../services/api';

interface CreateCategoryModalProps {
  show: boolean;
  handleClose: () => void;
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({ show, handleClose }) => {
  const { createNewCategory, loadProducts } = useProduct();
  const [refresh, setRefresh] = useState(false);

  const [category, setCategory] = useState<Category>({
    id: 0,
    name: '',
    merchantCode: getMerchantCode() || '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await createNewCategory(category);
      loadProducts();
      handleClose();
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
    }
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle>Criar Categoria</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Detalhes da Categoria</Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Nome"
          type="text"
          fullWidth
          variant="outlined"
          name="name"
          value={category.name}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Descrição"
          type="text"
          fullWidth
          variant="outlined"
          name="description"
          value={category.description}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancelar</Button>
        <Button onClick={handleSubmit} color="primary">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCategoryModal;
