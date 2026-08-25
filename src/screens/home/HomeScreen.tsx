import { useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import styled, { useTheme } from 'styled-components/native';
import { LogoMark, Screen, Text } from 'src/shared/ui';
import { AssetList, BalanceCard, TransactionList } from 'src/widgets/home';

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space(2.5)}px;
  margin-bottom: ${({ theme }) => theme.space(5)}px;
`;

const Gap = styled.View`
  height: ${({ theme }) => theme.space(4)}px;
`;

export const HomeScreen = () => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries();
    setRefreshing(false);
  };

  return (
    <Screen
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={theme.colors.primary}
        />
      }
    >
      <Header>
        <LogoMark size={32} />
        <Text
          variant="title"
          weight="700"
        >
          demo·wallet
        </Text>
      </Header>

      <BalanceCard />
      <Gap />
      <AssetList />
      <Gap />
      <TransactionList />
      <View />
    </Screen>
  );
};
