import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Página Não Encontrada</h1>
      <p>Desculpe, a página que você está procurando não foi encontrada.</p>
      <Link to="/">Voltar para a Home</Link>
    </div>
  );
};

export default NotFoundPage;
