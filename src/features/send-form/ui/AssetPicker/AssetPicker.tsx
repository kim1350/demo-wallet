import { Text } from 'src/shared/ui';
import { formatAmount } from 'src/shared/lib/format';
import { Chip, Row } from './AssetPicker.styles';
import { AssetPickerProps } from './AssetPicker.types';

export const AssetPicker = ({ assets, selectedId, onSelect }: AssetPickerProps) => (
  <Row>
    {assets.map((asset) => {
      const active = asset.id === selectedId;
      return (
        <Chip
          key={asset.id}
          active={active}
          onPress={() => onSelect(asset.id)}
        >
          <Text
            variant="subtitle"
            color={active ? 'primary' : 'text'}
          >
            {asset.ticker}
          </Text>
          <Text
            variant="caption"
            color="textMuted"
          >
            {formatAmount(asset.amount, asset.ticker)}
          </Text>
        </Chip>
      );
    })}
  </Row>
);
