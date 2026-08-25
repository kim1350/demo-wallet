import styled from 'styled-components/native';

export const Gap = styled.View`
  height: ${({ theme }) => theme.space(4)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: ${({ theme }) => theme.space(2)}px;
`;

export const Chips = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.space(2)}px;
  margin-top: ${({ theme }) => theme.space(3)}px;
`;

export const Chip = styled.Pressable<{ active: boolean }>`
  flex: 1;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.space(3)}px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  border-width: 1px;
  border-color: ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme, active }) => (active ? theme.colors.surfaceAlt : theme.colors.surface)};
`;
