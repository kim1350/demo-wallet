import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space(2.5)}px;
  padding-horizontal: ${({ theme }) => theme.space(5)}px;
  padding-bottom: ${({ theme }) => theme.space(3)}px;
  background-color: ${({ theme }) => theme.colors.bg};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const Titles = styled.View`
  flex: 1;
`;
