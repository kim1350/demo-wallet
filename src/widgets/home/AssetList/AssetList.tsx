import { observer } from 'mobx-react-lite';
import { useAssets } from '@entities/wallet';
import { uiSettingsStore } from '@entities/ui-settings';
import { Card, Skeleton, Text } from '@shared/ui';
import { formatAmount, formatFiat } from '@shared/lib/format';
import { Body, Divider, Dot, Right, Row } from './AssetList.styles';

export const AssetList = observer(() => {
  const { data: assets, isLoading } = useAssets();
  const symbol = uiSettingsStore.currencySymbol;

  return (
    <Card>
      <Text
        variant="caption"
        color="textMuted"
      >
        ASSETS
      </Text>
      {isLoading || !assets
        ? [0, 1, 2].map((i) => (
            <Row key={i}>
              <Skeleton
                width={40}
                height={40}
                radius={20}
              />
              <Body>
                <Skeleton
                  height={16}
                  width="50%"
                />
              </Body>
            </Row>
          ))
        : assets.map((asset, index) => (
            <Body key={asset.id}>
              {index > 0 && <Divider />}
              <Row>
                <Dot>
                  <Text
                    variant="subtitle"
                    color="primary"
                  >
                    {asset.ticker[0]}
                  </Text>
                </Dot>
                <Body>
                  <Text variant="subtitle">{asset.name}</Text>
                  <Text
                    variant="caption"
                    color="textMuted"
                  >
                    {formatAmount(asset.amount, asset.ticker)}
                  </Text>
                </Body>
                <Right>
                  <Text variant="subtitle">{formatFiat(asset.fiatValue, symbol)}</Text>
                  <Text
                    variant="caption"
                    color={asset.changePct >= 0 ? 'success' : 'danger'}
                  >
                    {asset.changePct >= 0 ? '+' : ''}
                    {asset.changePct}%
                  </Text>
                </Right>
              </Row>
            </Body>
          ))}
    </Card>
  );
});
