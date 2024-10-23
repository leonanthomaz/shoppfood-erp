import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, title, message, onConfirm, onCancel }) => (
  <Dialog open={open} onClose={onCancel} aria-labelledby="confirm-dialog-title">
    <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <Typography variant="body1">{message}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="secondary">
        Cancelar
      </Button>
      <Button onClick={onConfirm} color="error">
        Confirmar
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmModal;
