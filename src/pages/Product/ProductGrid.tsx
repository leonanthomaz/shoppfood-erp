import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { useProduct } from '../../contexts/ProductContext';
import { ProductLayoutSmall } from './ProductLayoutSmall';
import { ProductLayoutLarge } from './ProductLayoutLarge';
import ProductDrawer from './ProductDrawer';

interface ProductGridProps {
  products: Product[];
  onDelete: (product: Product) => void;
  onEdit: (product: Product) => void;
  onManageOptions: (productId: number) => void;
  onUploadImage: (productId: number, product: Product) => void;
  onManageCategories: (productId: number) => void;
  onDeleteOption: (productId: number, optionId: number) => void;
  onEditOption: (productId: number, optionId: number) => void;
  loading?: boolean;
  loadProducts: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onDelete,
  onEdit,
  onManageOptions,
  onUploadImage,
  onManageCategories,
  onDeleteOption,
  loading = false,
  loadProducts
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { activeProduct } = useProduct();
  const [productStatuses, setProductStatuses] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    // Inicializa os status dos produtos a partir da lista de produtos
    const initialStatuses = products.reduce((acc, product) => {
      acc[product.id] = product.active; 
      return acc;
    }, {} as { [key: number]: boolean });
    setProductStatuses(initialStatuses);
  }, [products]);

  const toggleDrawer = (open: boolean, product?: Product) => {
    setSelectedProduct(product || null);
    setDrawerOpen(open);
  };

   const handleChangeStatusProduct = async (productId: number, status: boolean) => {
    try {
      await activeProduct(productId, status);
      setProductStatuses((prev) => ({
        ...prev,
        [productId]: status,
      }));
    } catch (error) {
      console.error("ERRO AO ATUALIZAR STATUS!!!");
    }
  };

  const handleChange = (productId: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.checked;
    setProductStatuses((prev) => ({
      ...prev,
      [productId]: newStatus,
    }));
    handleChangeStatusProduct(productId, newStatus);
  };

  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: { xs: '1fr', md: '1fr' }, gap: 2, p: 2 
      }}>
      {loading ? (
        Array.from(new Array(5)).map((_, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2 }}>
            <Skeleton variant="rectangular" width={50} height={50} />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="20%" />
            <Skeleton variant="text" width="20%" />
            <Skeleton variant="circular" width={40} height={40} />
          </Box>
        ))
      ) : (
        products.map((product) => (
          <Box key={product.id}>
            {/** Layout para telas maiores */}
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
              }}
            >
             <ProductLayoutLarge 
              product={product} 
              toggleDrawer={toggleDrawer} 
              productStatuses={productStatuses} 
              handleChange={handleChange} 
              loadProducts={loadProducts}
            />
            </Box>
            
            {/** Layout para telas menores */}
            <Box
              sx={{
                display: { xs: 'block', md: 'none' },
                textAlign: 'center',
                p: 1,
              }}
            >
            <ProductLayoutSmall 
              product={product} 
              onDelete={onDelete} 
              onEdit={onEdit}
              onManageOptions={onManageOptions}
              onUploadImage={onUploadImage}
              onManageCategories={onManageCategories}
              onDeleteOption={onDeleteOption}
              productStatuses={productStatuses}
              handleChange={handleChange}
              loadProducts={loadProducts}
            />
            </Box>
          
          </Box>
        ))
      )}

      {/** Usa o ProductDrawer para o drawer lateral */}
      <Box>
        <ProductDrawer
          open={drawerOpen}
          product={selectedProduct}
          onClose={() => toggleDrawer(false)}
          onDelete={onDelete}
          onEdit={onEdit}
          onManageOptions={onManageOptions}
          onUploadImage={onUploadImage}
          onManageCategories={onManageCategories}
          onDeleteOption={onDeleteOption}
        />
      </Box>

    </Box>
  );
};

export default ProductGrid;
