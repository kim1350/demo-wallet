import styled from 'styled-components/native';

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.space(3)}px;
  gap: ${({ theme }) => theme.space(3)}px;
`;

export const Badge = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
`;

export const Body = styled.View`
  flex: 1;
`;

export const Amount = styled.View`
  align-items: flex-end;
`;
