import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

// Centro do mapa (pode ser ajustado para centralizar entre as lojas, por exemplo)
const center = {
  // lat: -22.9711,  // Coordenadas do Rio de Janeiro (pode ajustar se necessário)
  // lng: -43.1822,
  lat: -22.9444,
  lng: -43.2902,
};

// Lista de lojas (franquias) com seus respectivos endereços e coordenadas
const stores = [
  {
    name: 'Loja Alto da Boa Vista',
    address: 'Rua Antonio Nunes, 1B, Alto da Boa Vista, Rio de Janeiro, RJ',
    cep: '20531402',
    coordinates: { lat: -22.9444, lng: -43.2902 },
  },
  // Você pode adicionar mais lojas aqui
  // {
  //   name: 'Loja Copacabana',
  //   address: 'Avenida Atlântica, Rio de Janeiro, RJ',
  //   cep: '22021000',
  //   coordinates: { lat: -22.9711, lng: -43.1822 },
  // },
];

// Função para obter o bairro a partir do endereço ou CEP
const getBairroFromAddress = async (address) => {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${import.meta.env.VITE_API_GOOGLE_MAPS}`);
  const data = await response.json();

  if (data.results.length > 0) {
    const bairro = data.results[0].address_components.find(
      component => component.types.includes('sublocality') || component.types.includes('political')
    );
    return bairro ? bairro.long_name : null;
  }
  return null;
};

const deliveryPrices = {
  'Alto da Boa Vista': 15.00,
  'Copacabana': 20.00,
  // Outros bairros com seus respectivos preços
};

const calculateDeliveryPrice = (bairro) => {
  return deliveryPrices[bairro] || 0; // Retorna o preço do bairro ou 0 se não encontrado
};


function DeliveryMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_API_GOOGLE_MAPS, // Substitua com sua chave de API
    libraries: ['places', 'geometry'],
  });

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      {/* Adiciona marcadores para todas as lojas */}
      {stores.map((store, index) => (
        <Marker
          key={index}
          position={store.coordinates}
          title={store.name}
        />
      ))}
    </GoogleMap>
  ) : (
    <div>Carregando mapa...</div>
  );
}

export default React.memo(DeliveryMap);
