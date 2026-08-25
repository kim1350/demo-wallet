import styled from 'styled-components/native';

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.space(3)}px;
  gap: ${({ theme }) => theme.space(3)}px;
`;

export const Dot = styled.View`
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

export const Right = styled.View`
  align-items: flex-end;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
`;
