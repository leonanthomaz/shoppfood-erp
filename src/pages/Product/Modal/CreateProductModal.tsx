import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, Typography, Alert } from '@mui/material';
import { ProductDTO } from '../../../types/Product';
import { getCategoriesByMerchantCode } from '../../../functions/Product';
import { CategoryDTO } from '../../../types/Category';

interface CreateProductModalProps {
  show: boolean;
  handleClose: () => void;
  handleSaveProduct: () => void;
  productToCreate: ProductDTO;
  setProductToCreate: React.Dispatch<React.SetStateAction<ProductDTO>>;
  handleOpenCreateCategoryModal: () => void;
  refreshProducts: () => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({
  show,
  handleClose,
  handleSaveProduct,
  productToCreate,
  setProductToCreate,
  handleOpenCreateCategoryModal,
}) => {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoriesByMerchantCode();
        setCategories(data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategories();
  }, [show]);

  return (
    <Dialog open={show} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Criar Produto</DialogTitle>
      <DialogContent>
        {categories.length === 0 && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Não há categorias disponíveis. Você precisa criar uma categoria antes de criar um produto.
            <Button
              color="inherit"
              onClick={handleOpenCreateCategoryModal}
              sx={{ ml: 1 }}
            >
              Criar Categoria
            </Button>
          </Alert>
        )}
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          margin="normal"
          value={productToCreate.name}
          onChange={(e) => setProductToCreate({ ...productToCreate, name: e.target.value })}
        />
        <TextField
          label="Descrição"
          variant="outlined"
          fullWidth
          margin="normal"
          value={productToCreate.description}
          onChange={(e) => setProductToCreate({ ...productToCreate, description: e.target.value })}
        />
        <TextField
          label="Preço"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          value={productToCreate.price}
          onChange={(e) => setProductToCreate({ ...productToCreate, price: parseFloat(e.target.value) })}
        />
        <TextField
          label="Estoque"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          value={productToCreate.stock}
          onChange={(e) => setProductToCreate({ ...productToCreate, stock: parseInt(e.target.value) })}
        />
        <TextField
          label="Quantidade mínima (itens)"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          value={productToCreate.getMinimumRequiredOptions}
          onChange={(e) => setProductToCreate({ ...productToCreate, getMinimumRequiredOptions: parseInt(e.target.value) })}
          inputProps={{ min: 0 }}
        />
        <TextField
          label="Código de Barras"
          variant="outlined"
          fullWidth
          margin="normal"
          value={productToCreate.codeBar}
          onChange={(e) => setProductToCreate({ ...productToCreate, codeBar: e.target.value })}
        />
        <Select
          fullWidth
          variant="outlined"
          margin="normal"
          value={productToCreate.categoryId}
          onChange={(e) => setProductToCreate({ ...productToCreate, categoryId: parseInt(e.target.value) })}
        >
          <MenuItem value={0}>Selecione uma categoria</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Fechar</Button>
        <Button
          onClick={handleSaveProduct}
          color="primary"
          disabled={categories.length === 0} // Desabilitar o botão se não houver categorias
        >
          Criar Produto
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProductModal;
