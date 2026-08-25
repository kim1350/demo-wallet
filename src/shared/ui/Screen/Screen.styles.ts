import styled from 'styled-components/native';

export const Root = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.bg};
`;

export const Scroll = styled.ScrollView`
  flex: 1;
`;
