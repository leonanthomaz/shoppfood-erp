import styled from 'styled-components';

export const DashboardContent = styled.div`
  margin-top: 80px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 200px;
  text-align: center;
`;

export const CardTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const CardValue = styled.p`
  font-size: ${({ theme }) => theme.fontSize.large};
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 10px;
`;

export const ChartContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    margin-bottom: 20px;
    color: ${({ theme }) => theme.colors.text};
  }
`;
