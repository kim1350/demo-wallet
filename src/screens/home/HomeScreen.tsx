import { useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { useTheme } from 'styled-components/native';
import { Screen } from 'src/shared/ui';
import { AssetList, BalanceCard, TransactionList } from 'src/widgets/home';
import { Gap } from './HomeScreen.styles';

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
      <BalanceCard />
      <Gap />
      <AssetList />
      <Gap />
      <TransactionList />
      <View />
    </Screen>
  );
};
