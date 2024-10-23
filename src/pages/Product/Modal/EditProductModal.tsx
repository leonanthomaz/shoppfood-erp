import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { ProductDTO } from '../../../types/Product';

interface EditProductModalProps {
  show: boolean;
  handleClose: () => void;
  handleUpdateProduct: () => void;
  productToEdit: ProductDTO;
  setProductToEdit: React.Dispatch<React.SetStateAction<ProductDTO>>;
  refreshProducts: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  show,
  handleClose,
  handleUpdateProduct,
  productToEdit,
  setProductToEdit,
  refreshProducts,
}) => {
  const [validated, setValidated] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductToEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      handleUpdateProduct();
      refreshProducts();
      handleClose();
    }
    setValidated(true);
  };

  return (
    <Dialog open={show} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Produto</DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            name="name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={productToEdit.name}
            onChange={handleInputChange}
            required
            error={validated && !productToEdit.name}
            helperText={validated && !productToEdit.name ? 'Por favor, insira o nome do produto.' : ''}
          />
          <TextField
            label="Descrição"
            name="description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={productToEdit.description}
            onChange={handleInputChange}
            required
            error={validated && !productToEdit.description}
            helperText={validated && !productToEdit.description ? 'Por favor, insira uma descrição.' : ''}
          />
          <TextField
            label="Preço"
            name="price"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={productToEdit.price}
            onChange={handleInputChange}
            required
            inputProps={{ step: 0.01, min: 0 }}
            error={validated && (productToEdit.price === undefined || productToEdit.price < 0)}
            helperText={validated && (productToEdit.price === undefined || productToEdit.price < 0) ? 'Por favor, insira um preço válido.' : ''}
          />
          <TextField
            label="Estoque"
            name="stock"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={productToEdit.stock}
            onChange={handleInputChange}
            required
            inputProps={{ min: 0 }}
            error={validated && (productToEdit.stock === undefined || productToEdit.stock < 0)}
            helperText={validated && (productToEdit.stock === undefined || productToEdit.stock < 0) ? 'Por favor, insira uma quantidade válida.' : ''}
          />
          <TextField
            label="Código de Barras"
            name="codeBar"
            variant="outlined"
            fullWidth
            margin="normal"
            value={productToEdit.codeBar}
            onChange={handleInputChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
        >
          Salvar Alterações
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductModal;
