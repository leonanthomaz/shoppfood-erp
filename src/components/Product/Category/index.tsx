import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useProduct } from '../../../contexts/ProductContext';
import { CategoryDTO } from '../../../types/Category';
import { toast } from 'react-toastify';
import { getMerchantCode } from '../../../services/api';

interface CreateCategoryFormProps {
  onSave: () => void;
}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({ onSave }) => {
  const { createNewCategory, loadProducts } = useProduct();
  const [category, setCategory] = useState<CategoryDTO>({
    id: 0,
    name: '',
    merchantCode: getMerchantCode() || '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    toast.success(`Categoria ${name} selecionada!`)
    setCategory(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await createNewCategory(category);
      onSave();
      loadProducts()
      toast.success("Categoria adicionada com sucesso!")
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
    }
  };

  return (
    <Box sx={{ p: 3, borderRadius: 1, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>
        Criar Categoria
      </Typography>
      <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Nome"
          placeholder="Digite o nome da categoria"
          name="name"
          value={category.name}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Descrição"
          placeholder="Digite a descrição da categoria"
          name="description"
          value={category.description}
          onChange={handleInputChange}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Adicionar Categoria
        </Button>
      </Box>
    </Box>
  );
};

export default CreateCategoryForm;
