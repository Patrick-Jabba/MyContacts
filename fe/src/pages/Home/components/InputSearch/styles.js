import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  input {
    width: 100%;
    background: #fff;
    border: 1px solid ${({ theme }) => theme.colors.primary.main};
    border-radius: 25px;
    height: 50px;
    box-shadow: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.04));
    outline: 0;
    padding: 0 16px;

    &::placeholder{
      color: #444;
    }
  }
`;
