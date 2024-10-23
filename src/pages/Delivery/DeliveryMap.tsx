import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';
import { Box, TextField, Button, Typography, Skeleton, CircularProgress, Divider } from '@mui/material';
import MainLayout from '../../components/MainLayout';
import { MainContent } from '../../components/MainLayout/MainLayoutStyles';
import { api, getMerchantCode } from '../../services/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const DeliveryMap: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_API_GOOGLE_MAPS,
    libraries: ['places', 'geometry'],
  });

  const [cep, setCep] = useState<string>('');
  const [radius, setRadius] = useState<number | string>('');
  const [bairros, setBairros] = useState<{ nome: string; preco: number; lat: number; lng: number }[]>([]);
  const [novoBairro, setNovoBairro] = useState<string>('');
  const [preco, setPreco] = useState<number | string>('');
  const [precoPadrao, setPrecoPadrao] = useState<number | string>('');
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const buscarCoordenadas = async (cep: string) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: cep }, (results, status) => {
      if (status === 'OK' && results) {
        const location = results[0].geometry.location;
        setCenter({ lat: location.lat(), lng: location.lng() });
      } else {
        console.error('Geocode não foi bem-sucedido: ' + status);
      }
    });
  };

  const buscarDadosEntrega = async () => {
    const merchantCode = getMerchantCode();
    try {
      const response = await api.get(`/delivery/check/${merchantCode}`);
      const { cep, centralPointLat, centralPointLng, radius: savedRadius, zones, defaultDeliveryFee } = response.data;

      if (cep) setCep(cep);
      if (centralPointLat && centralPointLng) setCenter({ lat: centralPointLat, lng: centralPointLng });
      if (savedRadius) setRadius(savedRadius);
      if (zones) {
        setBairros(zones.map(zone => ({
          nome: zone.name,
          preco: zone.price,
          lat: zone.lat,
          lng: zone.lng,
        })));
      if(defaultDeliveryFee) setPrecoPadrao(defaultDeliveryFee)
      }
    } catch (error) {
      console.error('Erro ao buscar dados de entrega:', error);
    }
  };

  useEffect(() => {
    if (cep.length === 8) {
      buscarCoordenadas(cep);
    }
  }, [cep]);

  useEffect(() => {
    buscarDadosEntrega();
  }, []);

  const handleAddBairro = async () => {
    if (novoBairro && preco && center) {
      try {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: novoBairro }, (results, status) => {
          if (status === 'OK' && results) {
            const location = results[0].geometry.location;
            setBairros([...bairros, { nome: novoBairro, preco: parseFloat(preco as string), lat: location.lat(), lng: location.lng() }]);
            setNovoBairro('');
            setPreco('');
          }
        });
      } catch (error) {
        console.error('Erro ao adicionar bairro:', error);
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      cep,
      centralPoint: {
        lat: center?.lat || 0,
        lng: center?.lng || 0,
      },
      radius: parseFloat(radius as string),
      neighborhoods: bairros.map(bairro => ({
        name: bairro.nome,
        price: bairro.preco,
        lat: bairro.lat,
        lng: bairro.lng,
      })),
      defaultDeliveryFee: precoPadrao
    };

    console.log("DADOS", data)

    try {
      const merchantCode = getMerchantCode();
      await api.post(`/delivery/create-delivery-map/${merchantCode}`, data);
      // console.log('sucesso');
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <MainContent>
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Configuração de Área de Entrega
          </Typography>
          <Divider sx={{ mb: 4 }} />

          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <TextField label="CEP" value={cep} onChange={(e) => setCep(e.target.value)} fullWidth sx={{ mr: 2 }} />
            <TextField label="Raio de Entrega (km)" type="number" value={radius} onChange={(e) => setRadius(e.target.value)} fullWidth />
          </Box>

          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <TextField label="Valor Padrão" value={precoPadrao} onChange={(e) => setPrecoPadrao(e.target.value)} fullWidth sx={{ mr: 2 }} />
          </Box>

          {isLoaded ? (
            <GoogleMap mapContainerStyle={containerStyle} center={center || { lat: -22.9444, lng: -43.2902 }} zoom={12}>
              {center && (
                <Circle
                  center={center}
                  radius={(parseFloat(radius as string) || 0) * 1000}
                  options={{
                    fillColor: '#FF0000',
                    fillOpacity: 0.2,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                  }}
                />
              )}
              {bairros.map((bairro, index) => (
                <Marker key={index} position={{ lat: bairro.lat, lng: bairro.lng }} />
              ))}
            </GoogleMap>
          ) : (
            <Skeleton variant="rectangular" width="100%" height={400} />
          )}

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Cadastrar Bairros e Preços
            </Typography>

            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
              <TextField label="Nome do Bairro" value={novoBairro} onChange={(e) => setNovoBairro(e.target.value)} fullWidth sx={{ mr: 2 }} />
              <TextField label="Preço de Entrega" type="number" value={preco} onChange={(e) => setPreco(e.target.value)} fullWidth />
            </Box>

            <Button variant="outlined" onClick={handleAddBairro} sx={{ mb: 2 }}>
              Adicionar Bairro
            </Button>

            {bairros.length > 0 ? (
              <Box>
                <Typography variant="h6">Bairros Cadastrados:</Typography>
                <ul>
                  {bairros.map((bairro, index) => (
                    <li key={index}>
                      {bairro.nome} - R$ {bairro.preco.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </Box>
            ) : (
              <Typography variant="body1" color="textSecondary">
                Nenhum bairro cadastrado ainda.
              </Typography>
            )}

            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3 }}
              disabled={loading}
              startIcon={loading && <CircularProgress size={16} />}
            >
              {loading ? 'Salvando...' : 'Salvar Configurações'}
            </Button>
          </Box>
        </Box>
      </MainContent>
    </MainLayout>
  );
};

export default DeliveryMap;
