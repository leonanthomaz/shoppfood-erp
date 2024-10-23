import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Switch } from '@mui/material';
import { useProduct } from '../../contexts/ProductContext';

interface ProductLayoutLargeProps {
  product: Product;
  toggleDrawer: (open: boolean, product?: Product) => void;
  productStatuses: { [key: number]: boolean };
  handleChange: (productId: number) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadProducts: () => void;
}

export const ProductLayoutLarge: React.FC<ProductLayoutLargeProps> = ({
  product,
  toggleDrawer,
  productStatuses,
  handleChange,
  loadProducts
}) => {
  const { getImageByFilename } = useProduct();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  useEffect(() => {
    const loadImage = async () => {
      if (product.imageUrl) {
        try {
          const url = await getImageByFilename(product.imageUrl);
          setImageUrl(url);
          loadProducts()
        } catch (error) {
          console.error('Erro ao carregar a imagem:', error);
        }
      }
    };

    loadImage();
  }, [product.imageUrl]);

  return (
    <Box
      display="flex"
      sx={{
        border: '1px solid grey',
        borderRadius: 1,
        padding: 2,
        transition: '0.3s',
        '&:hover': {
          cursor: 'pointer',
          boxShadow: 2,
        },
        alignItems: 'center',
        gap: 3,
      }}
    >
      {/* Seção da Imagem */}
      <Box sx={{ width: '100px', height: '100px' }}>
        <img
          src={imageUrl || 'https://via.placeholder.com/200'}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '4px',
            marginLeft: '10px'
          }}
        />
      </Box>
      
      {/* Seção do Nome e Preço */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{product.name}</Typography>
        <Typography variant="body2">Preço: R$ {product.price}</Typography>
      </Box>
      
      {/* Seção do Botão de Ativação e Ações */}
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="body1" sx={{ mr: 1 }}>
            {productStatuses[product.id] ? 'Ativo' : 'Inativo'}
          </Typography>
          <Switch
            checked={productStatuses[product.id] || false}
            onChange={handleChange(product.id)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>
      </Box>

      <Box>
        <Tooltip title="Ações">
          <IconButton onClick={() => toggleDrawer(true, product)}>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
    </Box>
  );
};
