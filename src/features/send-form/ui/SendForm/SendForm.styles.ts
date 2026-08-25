import styled from 'styled-components/native';

export const Group = styled.View`
  gap: ${({ theme }) => theme.space(2)}px;
  margin-bottom: ${({ theme }) => theme.space(4)}px;
`;

export const Input = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.surface};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md}px;
  padding: ${({ theme }) => theme.space(3.5)}px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 15px;
`;

export const SuccessIcon = styled.View`
  align-self: center;
  width: 64px;
  height: 64px;
  border-radius: 32px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  margin-bottom: ${({ theme }) => theme.space(3)}px;
`;
