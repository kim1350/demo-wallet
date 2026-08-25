import styled from 'styled-components/native';

export const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
`;

export const Loading = styled.View`
  gap: ${({ theme }) => theme.space(3)}px;
  margin-top: ${({ theme }) => theme.space(3)}px;
`;
