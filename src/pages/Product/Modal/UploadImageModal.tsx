import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';

interface UploadImageModalProps {
  show: boolean;
  handleClose: () => void;
  handleImageUpload: () => void;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  refreshProducts: () => void;
}

const StyledInput = styled('input')({
  display: 'none',
});

const UploadImageModal: React.FC<UploadImageModalProps> = ({
  show,
  handleClose,
  handleImageUpload,
  setImageFile,
  refreshProducts
}) => {

  return (
    <Dialog open={show} onClose={handleClose} fullWidth>
      <DialogTitle>Inserir imagem</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Selecione uma imagem para o produto
        </Typography>
        <label htmlFor="file-input">
          <StyledInput 
            id="file-input" 
            type="file" 
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImageFile(e.target.files[0]);
              }
            }} 
          />
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<PhotoCameraIcon />}
            fullWidth
            sx={{ textTransform: 'none', mt: 2 }}
          >
            Escolha uma imagem
          </Button>
        </label>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button 
          onClick={async () => {
            await handleImageUpload();
            refreshProducts();
          }} 
          color="primary"
        >
          Upload da imagem
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadImageModal;
