import React from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';
import { Category } from '../../types/Category';

interface HeaderButtonsProps {
  categories: Category[];
  onCreateProduct: () => void;
  onCreateCategory: () => void;
}


const HeaderButtons: React.FC<HeaderButtonsProps> = ({ categories, onCreateProduct, onCreateCategory }) => {
  return (
    <div className="header-buttons">
     <Box
     sx={{ 
      display: 'flex',
      margin: '10px',
      flexDirection: '',
      borderRadius: 1, 
      alignItems: 'center',
    }}
     >
      <Tooltip title="Criar Categoria">
      
      <Button
        variant="contained"
        color="primary"
        startIcon={<CategoryIcon />}
        onClick={onCreateCategory}
      >
        Criar Categoria
      </Button>
    
    </Tooltip>

     <Tooltip title="Criar Produto">
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onCreateProduct}
          disabled={categories.length === 0}
          >
          Criar Produto
        </Button>

      </Tooltip>
     
     </Box>
    </div>
  );
};

export default HeaderButtons;
