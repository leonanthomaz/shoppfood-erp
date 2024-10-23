import { useState, FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from '@mui/material';
import { useProduct } from '../../../contexts/ProductContext';
import { ProductItemDTO } from '../../../types/Product';
import { getMerchantCode } from '../../../services/api';

interface ProductOptionsModalProps {
  show: boolean;
  handleClose: () => void;
  productId: number;
  refreshProducts: () => void;
}

const ProductOptionsModal: FC<ProductOptionsModalProps> = ({
  show,
  handleClose,
  productId,
  refreshProducts,
}) => {
  const { createProductOption } = useProduct();
  const [option, setOption] = useState<ProductItemDTO>({
    name: '',
    additionalPrice: 0,
    merchantCode: getMerchantCode() || '',
  });

  const handleSaveOption = async () => {
    try {
      await createProductOption(productId, option);
      resetForm();
      handleClose();
      refreshProducts();
    } catch (error) {
      console.error('Erro ao salvar a opção do produto:', error);
    }
  };

  const resetForm = () => {
    setOption({
      name: '',
      additionalPrice: 0,
      merchantCode: getMerchantCode() || '',
    });
  };

  return (
    <Dialog open={show} onClose={handleClose} fullWidth>
      <DialogTitle>Adicionar Opção ao Produto</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Insira os detalhes da nova opção:
        </Typography>
        <TextField
          label="Nome"
          fullWidth
          margin="normal"
          value={option.name}
          onChange={(e) => setOption({ ...option, name: e.target.value })}
          required
        />
        <TextField
          label="Preço Adicional"
          type="number"
          fullWidth
          margin="normal"
          value={option.additionalPrice}
          onChange={(e) =>
            setOption({ ...option, additionalPrice: parseFloat(e.target.value) })
          }
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSaveOption} color="primary">
          Salvar Opção
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductOptionsModal;
