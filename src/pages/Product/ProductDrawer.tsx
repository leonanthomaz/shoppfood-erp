import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CategoryIcon from '@mui/icons-material/Category';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Product } from '../../types/Product';
import { useProduct } from '../../contexts/ProductContext';

interface ProductDrawerProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onDelete: (product: Product) => void;
  onEdit: (product: Product) => void;
  onManageOptions: (productId: number) => void;
  onUploadImage: (productId: number, product: Product) => void;
  onManageCategories: (productId: number) => void;
  onDeleteOption: (productId: number, optionId: number) => void;
}

const ProductDrawer: React.FC<ProductDrawerProps> = ({
  open,
  product,
  onClose,
  onDelete,
  onEdit,
  onManageOptions,
  onUploadImage,
  onManageCategories,
  onDeleteOption,
}) => {
  const { getImageByFilename } = useProduct();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  useEffect(() => {
    const loadImage = async () => {
      if (product?.imageUrl) {
        try {
          const url = await getImageByFilename(product.imageUrl);
          setImageUrl(url);
        } catch (error) {
          console.error('Erro ao carregar a imagem:', error);
        }
      }
    };

    loadImage();
  }, [product]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: '50%',
          backgroundColor: '#ffffff',
          color: '#353535',
          padding: '30px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          borderRadius: '8px 0 0 8px',
          marginTop: '5rem',
        },
      }}
    >
      <Box sx={{ mb: 2 }}>
        {product ? (
          <>
            {/* Imagem do Produto */}
            <Box sx={{ width: '100px', height: '100px', mb: 2 }}>
              <img
                src={imageUrl || 'https://via.placeholder.com/200'}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginLeft: '10px',
                }}
              />
            </Box>

            {/* Título e Descrição do Produto com Ícone de Edição em Destaque */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, flexGrow: 1 }}>
                {product.name}
              </Typography>
              <Tooltip title="Editar Produto">
                <IconButton
                  color="primary"
                  onClick={() => onEdit(product)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    },
                    borderRadius: '50%',
                    marginLeft: '8px',
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
              {product.description}
            </Typography>

            {/* Detalhes do Produto */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                mb: 3,
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <Typography variant="body2" color="textPrimary">
                <strong>Preço:</strong> R$ {product.price}
              </Typography>
              <Typography variant="body2" color="textPrimary">
                <strong>Estoque:</strong> {product.stock}
              </Typography>
              <Typography variant="body2" color="textPrimary">
                <strong>Opções mínimas:</strong> {product.getMinimumRequiredOptions}
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Lista de Itens do Produto */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Itens do Produto
              </Typography>
              <List dense>
                {product.items.map((item) => (
                  <ListItem key={item.id} sx={{ px: 0, display: 'flex', alignItems: 'center' }}>
                    <ListItemText primary={`${item.name} - R$ ${item.additionalPrice}`} />
                    <Tooltip title="Editar Opção">
                      <IconButton
                        color="primary"
                        size="small"
                        sx={{ marginRight: '8px' }}
                        onClick={() => console.log('Editar Opção', item.id)} // Implementar funcionalidade
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir Opção">
                      <IconButton
                        color="error"
                        onClick={() => onDeleteOption(product.id, item.id)}
                        size="small"
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(255, 0, 0, 0.1)',
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Ações do Produto com Labels Visíveis */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Tooltip title="Atualizar Imagem">
                  <IconButton
                    color="primary"
                    onClick={() => onUploadImage(product.id, product)}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      },
                    }}
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                </Tooltip>
                <Typography variant="caption" display="block">
                  Atualizar Imagem
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Tooltip title="Gerenciar Categorias">
                  <IconButton
                    color="primary"
                    onClick={() => onManageCategories(product.id)}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      },
                    }}
                  >
                    <CategoryIcon />
                  </IconButton>
                </Tooltip>
                <Typography variant="caption" display="block">
                  Gerenciar Categorias
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Tooltip title="Editar Produto">
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(product)}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Typography variant="caption" display="block">
                  Editar Produto
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Tooltip title="Excluir Produto">
                  <IconButton
                    color="error"
                    onClick={() => onDelete(product)}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Typography variant="caption" display="block">
                  Excluir Produto
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Tooltip title="Gerenciar Itens">
                  <IconButton
                    color="success"
                    onClick={() => onManageOptions(product.id)}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                      },
                    }}
                  >
                    <ListAltIcon />
                  </IconButton>
                </Tooltip>
                <Typography variant="caption" display="block">
                  Gerenciar Itens
                </Typography>
              </Box>
            </Box>
          </>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Selecione um produto para editar
          </Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default ProductDrawer;
