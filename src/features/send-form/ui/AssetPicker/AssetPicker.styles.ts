import styled from 'styled-components/native';

export const Row = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.space(2)}px;
`;

export const Chip = styled.Pressable<{ active: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.space(3)}px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  border-width: 1px;
  border-color: ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme, active }) => (active ? theme.colors.surfaceAlt : theme.colors.surface)};
  gap: 2px;
`;
