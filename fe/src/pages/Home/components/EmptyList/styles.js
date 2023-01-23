import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    color: ${({ theme }) => theme.colors.gray[200]};
    margin-top: 8px;
    text-align: center;

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
  `;
