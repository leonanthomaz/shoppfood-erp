import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, 
    DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, Skeleton, Typography, IconButton, 
    Divider} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAuth } from '../../contexts/AuthContext';
import MainLayout from '../../components/MainLayout';
import { MainContent } from '../../components/MainLayout/MainLayoutStyles';

const AdminPage: React.FC = () => {
  const { getAllUsers, deleteUserById } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openDetailsModal, setOpenDetailsModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersList = await getAllUsers();
        setUsers(usersList || []); 
      } catch (error) {
        console.error('Erro ao listar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [getAllUsers]);

  const handleOpenDetailsModal = (user: any) => {
    setSelectedUser(user);
    setOpenDetailsModal(true);
  };

  const handleOpenDeleteModal = (user: any) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  const handleDeleteUser = async () => {
    if (selectedUser) {
      try {
        await deleteUserById(selectedUser.id);
        setUsers(users.filter(user => user.id !== selectedUser.id));
        setOpenDeleteModal(false);
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    }
  };

  return (
    <MainLayout>
      <MainContent>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Administração de Usuários
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Box p={3}>

        {/* Skeleton de carregamento */}
        {loading ? (
            <Box>
            {[...Array(5)].map((_, index) => (
                <Skeleton key={index} variant="rectangular" height={50} style={{ marginBottom: '16px' }} />
            ))}
            </Box>
        ) : (
          <Table>
          <TableHead>
              <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ações</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
              {users.map(user => (
              <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.telephone}</TableCell>
                  <TableCell>
                  <IconButton onClick={() => handleOpenDetailsModal(user)} color="primary">
                      <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDeleteModal(user)} color="error">
                      <DeleteIcon />
                  </IconButton>
                  </TableCell>
              </TableRow>
              ))}
          </TableBody>
          </Table>
        )}

        {/* Modal de Detalhes do Usuário */}
        <Dialog open={openDetailsModal} onClose={() => setOpenDetailsModal(false)}>
            <DialogTitle>Detalhes do Usuário</DialogTitle>
            <DialogContent>
            {selectedUser && (
                <>
                <Typography><strong>Nome:</strong> {selectedUser.name}</Typography>
                <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
                <Typography><strong>Telefone:</strong> {selectedUser.telephone}</Typography>
                {/* Exibir mais detalhes do usuário conforme necessário */}
                </>
            )}
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setOpenDetailsModal(false)} color="primary">Fechar</Button>
            </DialogActions>
        </Dialog>

        {/* Modal de Exclusão do Usuário */}
        <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
            <DialogTitle>Excluir Usuário</DialogTitle>
            <DialogContent>
            <Typography>Tem certeza de que deseja excluir o usuário {selectedUser?.name}?</Typography>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setOpenDeleteModal(false)} color="primary">Cancelar</Button>
            <Button onClick={handleDeleteUser} color="error">Excluir</Button>
            </DialogActions>
        </Dialog>
        </Box>
      </MainContent>
    </MainLayout>
  );
};

export default AdminPage;
