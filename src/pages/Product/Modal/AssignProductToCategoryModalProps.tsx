import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { addProductToCategory, getCategories } from '../../../functions/Product';
import { getMerchantCode } from '../../../services/api';

interface AssignProductToCategoryModalProps {
  show: boolean;
  handleClose: () => void;
  productId: number;
  refreshProducts: () => void;
}

const AssignProductToCategoryModal: React.FC<AssignProductToCategoryModalProps> = ({
  show,
  handleClose,
  productId,
  refreshProducts
}) => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const merchantCode = getMerchantCode() || '';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleAssignCategory = async () => {
    if (selectedCategoryId !== null) {
      try {
        await addProductToCategory(productId, selectedCategoryId, merchantCode);
        refreshProducts(); // Atualiza os produtos após a associação
        handleClose(); // Fecha o modal
      } catch (error) {
        console.error('Erro ao vincular produto à categoria:', error);
      }
    }
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle>Vincular Produto à Categoria</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-select-label">Selecione uma Categoria</InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategoryId || ''}
            onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
            label="Selecione uma Categoria"
          >
            <MenuItem value="">
              <em>Selecione...</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleAssignCategory} color="primary">
          Vincular Categoria
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignProductToCategoryModal;
