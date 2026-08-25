import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useBalance } from '@entities/wallet';
import { uiSettingsStore } from '@entities/ui-settings';
import { Card, LogoMark, Skeleton, Text } from '@shared/ui';
import { formatFiat } from '@shared/lib/format';
import { Change, Header } from './BalanceCard.styles';

export const BalanceCard = observer(() => {
  const { data: balance, isLoading } = useBalance();
  const symbol = uiSettingsStore.currencySymbol;

  return (
    <Card>
      <Header>
        <Text
          variant="caption"
          color="textMuted"
        >
          TOTAL BALANCE
        </Text>
        <LogoMark size={28} />
      </Header>

      {isLoading || !balance ? (
        <Skeleton
          height={40}
          width="60%"
        />
      ) : (
        <>
          <Text variant="display">{formatFiat(balance.totalFiat, symbol)}</Text>
          <Change positive={balance.changePct >= 0}>
            <Text
              variant="caption"
              color={balance.changePct >= 0 ? 'success' : 'danger'}
            >
              {balance.changePct >= 0 ? '▲' : '▼'} {Math.abs(balance.changePct)}% today
            </Text>
          </Change>
        </>
      )}
      <View />
    </Card>
  );
});
