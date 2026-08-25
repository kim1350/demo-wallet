import { observer } from 'mobx-react-lite';
import styled from 'styled-components/native';
import { useAssets } from 'src/entities/wallet';
import { uiSettingsStore } from 'src/entities/ui-settings';
import { Card, Skeleton, Text } from 'src/shared/ui';
import { formatAmount, formatFiat } from 'src/shared/lib/format';

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.space(3)}px;
  gap: ${({ theme }) => theme.space(3)}px;
`;

const Dot = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
`;

const Body = styled.View`
  flex: 1;
`;

const Right = styled.View`
  align-items: flex-end;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
`;

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
