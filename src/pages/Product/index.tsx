import React, { useState } from 'react';
import { useProduct } from '../../contexts/ProductContext';
import MainLayout from '../../components/MainLayout';
import {
  Box,
  Typography,
  Divider,
} from '@mui/material';
import ProductGrid from './ProductGrid';
import CreateProductModal from './Modal/CreateProductModal';
import UploadImageModal from './Modal/UploadImageModal';
import EditProductModal from './Modal/EditProductModal';
import CreateCategoryModal from './Modal/CreateCategoryModal';
import ProductOptionsModal from './Modal/ProductOptionsModal';
import ConfirmModal from './ConfirmModal';
import { Product, ProductDTO, ProductItemDTO } from '../../types/Product';
import HeaderButtons from './HeaderButtonsProps';
import AssignProductToCategoryModal from './Modal/AssignProductToCategoryModalProps';
import CategoryIcon from '@mui/icons-material/Category';
import EditProductOptionsModal from './Modal/EditProductOptionsModal';
import { MainContent } from '../../components/MainLayout/MainLayoutStyles';
import { getMerchantCode } from '../../services/api';

const ProductPage: React.FC = () => {
  const {
    categories,
    loadProducts,
    createNewProduct,
    updateExistingProduct,
    removeProduct,
    uploadProductImage,
    deleteOption,
    editOption
  } = useProduct();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedProductItemId, setSelectedProductItemId] = useState<number | null>(null);
  const [showEditProductOptionsModal, setShowEditProductOptionsModal] = useState(false);

  const [productToCreate, setProductToCreate] = useState<ProductDTO>({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    codeBar: '',
    stock: 0,
    categoryId: 0,
    getMinimumRequiredOptions: 0,
    merchantCode: getMerchantCode() || ''
  });

  const [productToEdit, setProductToEdit] = useState<ProductDTO>({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    codeBar: '',
    stock: 0,
    categoryId: 0,
    getMinimumRequiredOptions: 0,
    merchantCode: getMerchantCode() || ''
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleManageOptions = (productId: number) => {
    setSelectedProductId(productId);
    setShowOptionsModal(true);
  };

  const handleEditProductOption = (productId: number, optionId: number) => {
    setSelectedProductId(productId);
    setSelectedProductItemId(optionId);
    setShowEditProductOptionsModal(true);
  };

  const handleCreateCategory = () => {
    setShowCreateCategoryModal(true);
  };

  const handleCreateNewProduct = () => {
    setProductToCreate({
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      codeBar: '',
      stock: 0,
      categoryId: 0,
      getMinimumRequiredOptions: 0,
      merchantCode: getMerchantCode() || ''
    });
    setShowCreateModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setProductToEdit({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl || '',
      codeBar: product.codeBar,
      stock: product.stock,
      categoryId: product.category?.id || 0,
      getMinimumRequiredOptions: product.getMinimumRequiredOptions,
      merchantCode: product.merchantCode
    });
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleSaveNewProduct = async () => {
    try {
      await createNewProduct(productToCreate);
      setShowCreateModal(false);
      await loadProducts();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const handleUpdateExistingProduct = async () => {
    if (selectedProduct) {
      try {
        await updateExistingProduct(selectedProduct.id, productToEdit);
        setShowEditModal(false);
        await loadProducts();
      } catch (error) {
        console.error('Erro ao atualizar produto:', error);
      }
    }
  };

  const handleImageUpload = async () => {
    if (selectedProductId && imageFile) {
      try {
        await uploadProductImage(selectedProductId, imageFile);
        setShowImageUploadModal(false);
        await loadProducts();
      } catch (error) {
        console.error('Erro ao atualizar a imagem do produto', error);
      }
    }
  };

  const handleDeleteProduct = async () => {
    if (selectedProduct) {
      try {
        await removeProduct(selectedProduct.id);
        setShowDeleteModal(false);
        await loadProducts();
      } catch (error) {
        console.error('Erro ao excluir o produto:', error);
      }
    }
  };

  const handleDeleteOption = async () => {
    if (selectedProductId && selectedProductItemId) {
      try {
        await deleteOption(selectedProductId, selectedProductItemId);
        setShowDeleteModal(false);
        await loadProducts();
      } catch (error) {
        console.error('Erro ao excluir a opção:', error);
      }
    }
  };

  const handleEditOption = async (option: ProductItemDTO) => {
    if (selectedProductId && selectedProductItemId) {
      try {
        await editOption(selectedProductId, selectedProductItemId, option);
        setShowOptionsModal(false);
        await loadProducts();
      } catch (error) {
        console.error('Erro ao editar a opção:', error);
      }
    }
  };

  const handleManageProductCategories = (categoryId: number) => {
    setShowCategoryModal(true);
  };

  const confirmDelete = () => {
    if (selectedProductItemId) {
      handleDeleteOption();
    } else {
      handleDeleteProduct();
    }
  };

  return (
    <MainLayout>
      <MainContent>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Produtos
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <HeaderButtons 
          categories={categories}
          onCreateProduct={handleCreateNewProduct}
          onCreateCategory={handleCreateCategory}
        />

        {categories.map((category, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
              <CategoryIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" sx={{ fontWeight: '700' }}>
                {category.name}
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <ProductGrid
              products={category.products}
              
              onDelete={(product) => {
                setSelectedProduct(product);
                setSelectedProductItemId(null);
                setShowDeleteModal(true);
              }}
              
              onEdit={handleEditProduct}
              onManageOptions={handleManageOptions}
              onEditOption={handleEditProductOption}
              
              onUploadImage={(productId) => {
                setSelectedProductId(productId);
                setShowImageUploadModal(true);
              }}
              
              onManageCategories={() => handleManageProductCategories(category.id)}
              
              onDeleteOption={(productId, optionId) => {
                setSelectedProductId(productId);
                setSelectedProductItemId(optionId);
                setShowDeleteModal(true);
              }}
              
              loadProducts={loadProducts}
            />
          </Box>
        ))}

        <CreateProductModal
          show={showCreateModal}
          handleClose={() => setShowCreateModal(false)}
          handleSaveProduct={handleSaveNewProduct}
          productToCreate={productToCreate}
          setProductToCreate={setProductToCreate}
          refreshProducts={loadProducts}
          handleOpenCreateCategoryModal={handleCreateCategory}
        />

        <UploadImageModal
          show={showImageUploadModal}
          handleClose={() => setShowImageUploadModal(false)}
          handleImageUpload={handleImageUpload}
          setImageFile={setImageFile}
          refreshProducts={loadProducts}
        />

        <EditProductModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          handleUpdateProduct={handleUpdateExistingProduct}
          productToEdit={productToEdit}
          setProductToEdit={setProductToEdit}
          refreshProducts={loadProducts}
        />

        <CreateCategoryModal
          show={showCreateCategoryModal}
          handleClose={() => setShowCreateCategoryModal(false)}
          refreshProducts={loadProducts}
        />

        <ProductOptionsModal
          show={showOptionsModal}
          handleClose={() => setShowOptionsModal(false)}
          productId={selectedProductId || 0}
          refreshProducts={loadProducts}
        />

        <AssignProductToCategoryModal
          show={showCategoryModal}
          handleClose={() => setShowCategoryModal(false)}
          productId={selectedProductId || 0}
          refreshProducts={loadProducts}
        />

        <EditProductOptionsModal
          show={showEditProductOptionsModal}
          handleClose={() => setShowEditProductOptionsModal(false)}
          productId={selectedProductId || 0}
          optionId={selectedProductItemId || 0}
          refreshProducts={loadProducts}
          handleEditOption={handleEditOption}
        />

        <ConfirmModal
          open={showDeleteModal}
          title={selectedProductItemId ? "Excluir Opção" : "Excluir Produto"}
          message={
            selectedProductItemId
              ? "Você tem certeza que deseja excluir esta opção?"
              : `Você tem certeza que deseja excluir o produto ${selectedProduct?.name}?`
          }
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      </MainContent>
    </MainLayout>
  );
};

export default ProductPage;
