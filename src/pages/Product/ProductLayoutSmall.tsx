import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Switch
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CategoryIcon from '@mui/icons-material/Category';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useProduct } from '../../contexts/ProductContext';

interface ProductLayoutSmallProps {
  product: Product;
  onDelete: (product: Product) => void;
  onEdit: (product: Product) => void;
  onManageOptions: (productId: number) => void;
  onUploadImage: (productId: number, product: Product) => void;
  onManageCategories: (productId: number) => void;
  onDeleteOption: (productId: number, optionId: number) => void;
  productStatuses: { [key: number]: boolean };
  handleChange: (productId: number) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadProducts: () => void;
}

export const ProductLayoutSmall: React.FC<ProductLayoutSmallProps> = ({
  product,
  onDelete,
  onEdit,
  onManageOptions,
  onUploadImage,
  onManageCategories,
  onDeleteOption,
  productStatuses,
  handleChange,
  loadProducts
}) => {
    const { getImageByFilename } = useProduct()
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
    <Box sx={{ border: '1px solid grey', padding: 2, borderRadius: 1, marginBottom: 2 }}>
        {imageUrl ? (
            <img src={imageUrl} alt={product.name} style={{ maxWidth: '100%' }} />
        ) : (
            <img src='https://via.placeholder.com/150' alt='Sem imagem disponível' style={{ maxWidth: '100%' }} />
        )}
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2">{product.description}</Typography>
        <Typography variant="body2">Preço: R$ {product.price}</Typography>
        <Typography variant="body2">Estoque: {product.stock}</Typography>

        <List dense>
            {product.items.map((item) => (
            <ListItem key={item.id}>           
                <ListItemText primary={`${item.name} - R$ ${item.additionalPrice}`} />
                <IconButton color="error" onClick={() => onDeleteOption(product.id, item.id)}>
                <DeleteIcon />
                </IconButton>
            </ListItem>
            ))}
        </List>

        <Box>
            <p>Ativar</p>
            <Tooltip title="Ativar/Desativar">
            <Switch
            checked={productStatuses[product.id]}
            onChange={handleChange(product.id)}
            />
            </Tooltip>
        </Box>
        <Box>
            <IconButton color="primary" onClick={() => onEdit(product)}>
            <EditIcon />
            </IconButton>
            <IconButton color="primary" onClick={() => onUploadImage(product.id, product)}>
            <PhotoCameraIcon />
            </IconButton>
            <IconButton color="primary" onClick={() => onManageCategories(product.id)}>
            <CategoryIcon />
            </IconButton>
            <IconButton color="primary" onClick={() => onManageOptions(product.id)}>
            <ListAltIcon />
            </IconButton>
            <IconButton color="error" onClick={() => onDelete(product)}>
            <DeleteIcon />
            </IconButton>
        </Box>
    </Box>
  );
};
