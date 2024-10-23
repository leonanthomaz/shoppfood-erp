import React, { ChangeEvent } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';

interface UploadImageFormProps {
  setImageFile: (file: File) => void;
}

const UploadImageForm: React.FC<UploadImageFormProps> = ({ setImageFile }) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 1,
        border: '1px dashed grey',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Upload de Imagem
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component="label"
        startIcon={<PhotoCameraIcon />}
      >
        Selecionar Imagem
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
      </Button>
    </Box>
  );
};

export default UploadImageForm;
