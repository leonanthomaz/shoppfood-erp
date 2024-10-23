/* ProductStyles.js */
import styled from 'styled-components';

const ProductStyles = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};

  .header-buttons {
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    button {
      margin-right: ${({ theme }) => theme.spacing(1)};
    }
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: ${({ theme }) => theme.spacing(2)};
  }

  .product-card {
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: ${({ theme }) => theme.boxShadow};
    overflow: hidden;
    padding: ${({ theme }) => theme.spacing(2)};
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: ${({ theme }) => theme.boxShadowHover};
    }

    .product-image {
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    .product-details {
      margin-top: ${({ theme }) => theme.spacing(1)};
      
      h3 {
        margin: 0;
        font-size: ${({ theme }) => theme.fontSize.medium};
      }

      p {
        margin: ${({ theme }) => theme.spacing(0.5)} 0;
      }

      .product-options {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: ${({ theme }) => theme.fontSize.small};
      }
    }

    .product-actions {
      display: flex;
      flex-wrap: wrap;
      gap: ${({ theme }) => theme.spacing(1)};
      margin-top: ${({ theme }) => theme.spacing(2)};
      
      button {
        flex: 1;
      }
    }
  }

  .modal-header {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
  }
`;

export default ProductStyles;
