import React, { useState, useEffect, ChangeEvent } from 'react';
import { TextField, Button, Typography, Box, Avatar, Divider, Tooltip, IconButton } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { api, getMerchantCode } from '../../services/api';
import MainLayout from '../../components/MainLayout';
import { MainContent } from '../../components/MainLayout/MainLayoutStyles';
import { getStoreByMerchantCode } from '../../functions/Store';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';

const StoreEditForm: React.FC<{ merchantCode: string }> = ({ merchantCode }) => {
  const { state } = useAuth();
  const { store, getPrimaryByFilename, getSecondaryByFilename } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    merchantCode: getMerchantCode(),
    phoneNumber: '',
    deliveryTime: 0,
    logoImageUrl: '',
    headerImage: '',
    openingHours: '',
    minimumValue: 0,
    primaryColor: '#000000',
    address: {
      cep: '',
      state: '',
      city: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: ''
    },
    user: {
      name: '',
      email: ''
    }
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [headerFile, setHeaderFile] = useState<File | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [logoImageUrl, setLogoImageUrl] = useState<string | null>(null);
  const [headerImageUrl, setHeaderImageUrl] = useState<string | null>(null);
  const [ color, setColor ] = useState<string | null>(null);

  // Função para preencher o endereço ao alterar o CEP
  useEffect(() => {
  const fetchAddressByCep = async (cep: string) => {
    if (cep.length === 8) {  // Verificar se o CEP tem o tamanho correto
      try {
        const response = await api.get(`/address/${cep}`);
        const addressData = response.data;
        
        // Atualizar os campos de endereço com os dados da API
        setFormData(prev => ({
          ...prev,
          address: {
            ...prev.address,
            state: addressData.state || '',
            city: addressData.city || '',
            street: addressData.street || '',
            neighborhood: addressData.neighborhood || ''
          }
        }));
      } catch (error) {
        console.error("Erro ao buscar o endereço pelo CEP", error);
      }
    }
  };
  fetchAddressByCep(formData.address.cep);
  }, [formData.address.cep]); // Dispara o efeito quando o CEP mudar

  //pega as imagens
  useEffect(() => {
    const loadImage = async () => {
      if (store?.logoImage) {
        try {
          const url = await getPrimaryByFilename(store.logoImage);
          setLogoImageUrl(url);
        } catch (error) {
          console.error('Erro ao carregar a imagem da logo:', error);
        }
      }
      if (store?.headerImage) {
        try {
          const url = await getSecondaryByFilename(store.headerImage);
          setHeaderImageUrl(url);
        } catch (error) {
          console.error('Erro ao carregar a imagem do cabeçalho:', error);
        }
      }
    };

    loadImage();
  }, [store]);

  //pega a loja
  useEffect(() => {
    const fetchData = async () => {
      try {
        const merchantCode = localStorage.getItem("MERCHANT_CODE");
        const response = await getStoreByMerchantCode(merchantCode);
        setFormData(prev => ({
          ...prev,
          name: response.name || '',
          merchantCode: response.merchantCode || getMerchantCode(),
          phoneNumber: response.phoneNumber || '',
          deliveryTime: response.deliveryTime || 0,
          logoImage: response.logoImage || '',
          headerImage: response.headerImage || '',
          openingHours: response.openingHours || '',
          minimumValue: response.minimumValue || 0,
          color: response.color || '',
          address: {
            cep: response.address?.cep || '',
            state: response.address?.state || '',
            city: response.address?.city || '',
            street: response.address?.street || '',
            number: response.address?.number || '',
            complement: response.address?.complement || '',
            neighborhood: response.address?.neighborhood || ''
          },
          user: {
            name: state.user?.name || '',
            email: state.user?.email || ''
          }
        }));
      } catch (error) {
        console.error('Erro ao buscar os dados da loja:', error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [merchantCode, state.user]);

  //altera o valor dos inputs
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  //altera o valor dos inputs - endereço
  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [name]: value }
    }));
  };

  //altera a logo
  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Apenas arquivos PNG');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('O arquivo deve ser menor que 2MB.');
        return;
      }
      setLogoFile(file);
    }
  };

  //altera o header
  const handleHeaderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg'];
      if (!allowedTypes.includes(file.type)) {
        alert('Apenas arquivos JPEG');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('O arquivo deve ser menor que 2MB.');
        return;
      }
      setHeaderFile(file);
    }
  };

  //envia
  const handleSubmit = async () => {
    try {
      await api.put(`/store/edit`, formData);
      console.log('Loja atualizada com sucesso:', formData);

      if (logoFile) {
        const logoFormData = new FormData();
        logoFormData.append('file', logoFile);
        logoFormData.append('merchantCode', formData.merchantCode);

        await api.post(`/store/upload-logo`, logoFormData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log('Logo atualizada com sucesso');
      }

      if (headerFile) {
        const headerFormData = new FormData();
        headerFormData.append('file', headerFile);
        headerFormData.append('merchantCode', formData.merchantCode);

        await api.post(`/store/upload-header`, headerFormData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log('Imagem de cabeçalho atualizada com sucesso');
      }
    } catch (error) {
      console.error('Erro ao atualizar a loja:', error);
    }
  };

  // Função para capturar a cor escolhida
  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedColor = event.target.value;
    setFormData(prev => ({ ...prev, primaryColor: selectedColor }));
    console.log("Cor primária selecionada:", selectedColor); // Exibe a cor no console
    setColor(selectedColor)
  };
  

  if (loadingData) {
    return (
      <Box sx={{ marginTop: 10 }}>
        <Skeleton variant="text" width={210} height={40} />
        <Skeleton variant="rectangular" width="100%" height={300} />
      </Box>
    );
  }

  return (
    <MainLayout>
      <MainContent>
        <Box sx={{ p: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Editar Loja
          </Typography>
          <Divider sx={{ mb: 4 }} />

          <Box sx={{ 
              p: 3, 
              borderRadius: 1, 
              border: '1px dashed grey', 
              backgroundImage: `url(${headerFile ? URL.createObjectURL(headerFile) : headerImageUrl || 'https://placehold.co/600x400'})`, 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              textAlign: 'center',
              mb: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}>
              {/* Botão para editar a imagem de cabeçalho */}
              <IconButton 
                color="primary" 
                sx={{ position: 'absolute', top: 10, right: 10 }}
                component="label"
              >
                <Box 
                display='flex' gap={1} 
                color='#fff' 
                border='2px solid #fff' 
                padding={1}
                sx={{ backgroundColor: '#125394', borderRadius: '10px'}}
                >
                  <EditIcon />
                  <Typography>Atualizar Fundo</Typography>
                </Box>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="header-file"
                  type="file"
                  onChange={handleHeaderChange}
                />
              </IconButton>

              <Avatar
                src={logoFile ? URL.createObjectURL(logoFile) : logoImageUrl || 'https://placehold.co/800@3x.png'}
                sx={{ width: 150, height: 150, mb: 1, 
                  border: '3px solid white',
                  backgroundColor: store?.primaryColor
                }}
              />
              <label htmlFor="logo-file">
                <IconButton 
                  color="primary" 
                  sx={{ mt: 1 }} // Adicionado um margin-top para espaçamento
                  component="span"
                >
                <Box 
                  display='flex' 
                  gap={1} 
                  color='#fff' 
                  border='2px solid #fff' 
                  padding={1}
                  sx={{ backgroundColor: '#125394', borderRadius: '10px'}}
                  >
                  <PhotoCameraIcon />
                  <Typography>Atualizar Logo</Typography>
                </Box>

                </IconButton>
              </label>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="logo-file"
                type="file"
                onChange={handleLogoChange}
              />
          </Box>

          <Box sx={{ width: '200px'}}>
            {/* Paleta de cores */}
            <TextField
              label="Cor Primária da Loja"
              name="primaryColor"
              value={formData.primaryColor}
              onChange={handleColorChange}
              fullWidth
              margin="normal"
              type="color" // Campo de seleção de cor
            />
          </Box>

          {/* Removido o segundo Box para a imagem de cabeçalho, pois agora é parte do cabeçalho */}

          <TextField
            label="Nome da Loja"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Telefone"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tempo de Entrega (min)"
            name="deliveryTime"
            value={formData.deliveryTime}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Valor mínimo"
            name="minimumValue"
            value={formData.minimumValue}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Horário de Funcionamento"
            name="openingHours"
            value={formData.openingHours}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Endereço
          </Typography>
          <TextField
            label="CEP"
            name="cep"
            value={formData.address.cep}
            onChange={handleAddressChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Estado"
            name="state"
            value={formData.address.state}
            onChange={handleAddressChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cidade"
            name="city"
            value={formData.address.city}
            onChange={handleAddressChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Rua"
            name="street"
            value={formData.address.street}
            onChange={handleAddressChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Número"
            name="number"
            value={formData.address.number}
            onChange={handleAddressChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Complemento"
            name="complement"
            value={formData.address.complement}
            onChange={handleAddressChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Bairro"
            name="neighborhood"
            value={formData.address.neighborhood}
            onChange={handleAddressChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 3 }}
          >
            Salvar
          </Button>
        </Box>
      </MainContent>
    </MainLayout>
  );
};

export default StoreEditForm;
