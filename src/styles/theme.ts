export const theme = {
  colors: {
    primary: '#125394',      // Azul escuro para ações principais
    secondary: '#4B5563',    // Cinza escuro para navegação e textos secundários
    background: '#F4F6F9',   // Fundo claro, quase branco
    text: '#2D3748',         // Cinza escuro para facilitar a leitura
    white: '#FFFFFF',        // Branco puro para contrastes
    lightGray: '#E2E8F0',    // Cinza claro para fundos de áreas secundárias
    darkGray: '#2D3748',     // Cinza escuro para textos principais
    danger: '#E53E3E',       // Vermelho para estados de erro
    success: '#38A169',      // Verde para mensagens de sucesso
    border: '#CBD5E0',       // Cinza suave para bordas de inputs e componentes
    placeholder: '#A0AEC0',  // Cinza médio para placeholders de inputs
    buttonBackground: '#125394', // Azul escuro para botões principais
    buttonText: '#FFFFFF',   // Texto branco para botões
    buttonBackgroundHover: '#1C7ED6', // Azul mais escuro ao passar o mouse
    terms_disabled: '#E53E3E', // Vermelho para indicar erro ou estado desativado
    navbar: "#125394", // Vermelho para a navbar
    navbarText: "#ffffff", // Texto claro para a navbar
  },
  fontFamily: "'Poppins', sans-serif", // Mantive o Poppins para uma tipografia mais moderna
  fontSize: {
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
    xLarge: '1.5rem',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
  mediaQueries: {
    mobile: `(max-width: 768px)`,
    tablet: `(max-width: 1024px)`,
    desktop: `(min-width: 1200px)`,
  },
  spacing: (factor: number) => `${factor * 8}px`,
  borderRadius: '6px', // Um leve arredondamento para suavizar os elementos
};
