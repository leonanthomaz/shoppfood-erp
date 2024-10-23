import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { ProductItemDTO } from '../../../types/Product';
import { getMerchantCode } from '../../../services/api';

interface EditProductOptionsModalProps {
  show: boolean;
  handleClose: () => void;
  productId: number;
  optionId: number;
  refreshProducts: () => void;
  handleEditOption: (option: ProductItemDTO) => Promise<void>;
}

const EditProductOptionsModal: React.FC<EditProductOptionsModalProps> = ({
  show,
  handleClose,
  refreshProducts,
  handleEditOption,
}) => {
  const [option, setOption] = useState<ProductItemDTO>({
    name: '',
    additionalPrice: 0,
    merchantCode: getMerchantCode() || ''
  });

  const handleSaveOption = async () => {
    if (option.name.trim() === '' || option.additionalPrice < 0) {
      alert("Verifique os campos: Nome não pode ser vazio e Preço Adicional não pode ser negativo.");
      return;
    }

    try {
      await handleEditOption(option);
      refreshProducts();
      handleClose();
    } catch (error) {
      console.error('Erro ao atualizar a opção do produto:', error);
    }
  };

  return (
    <Dialog open={show} onClose={handleClose} fullWidth>
      <DialogTitle>Editar Opção do Produto</DialogTitle>
      <DialogContent>
        <TextField
          label="Nome da Opção"
          value={option.name}
          onChange={(e) => setOption({ ...option, name: e.target.value })}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Preço Adicional"
          type="number"
          value={option.additionalPrice}
          onChange={(e) => setOption({ ...option, additionalPrice: parseFloat(e.target.value) })}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSaveOption} color="primary">
          Salvar Alterações
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductOptionsModal;
