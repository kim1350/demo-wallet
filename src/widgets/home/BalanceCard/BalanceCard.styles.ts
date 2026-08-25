import styled from 'styled-components/native';

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space(4)}px;
`;

export const Change = styled.View<{ positive: boolean }>`
  align-self: flex-start;
  padding-vertical: 4px;
  padding-horizontal: ${({ theme }) => theme.space(2.5)}px;
  border-radius: ${({ theme }) => theme.radius.pill}px;
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  margin-top: ${({ theme }) => theme.space(2)}px;
`;
