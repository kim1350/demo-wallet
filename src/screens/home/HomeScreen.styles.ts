import styled from 'styled-components/native';

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space(2.5)}px;
  margin-bottom: ${({ theme }) => theme.space(5)}px;
`;

export const Gap = styled.View`
  height: ${({ theme }) => theme.space(4)}px;
`;
