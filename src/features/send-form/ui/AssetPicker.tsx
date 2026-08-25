import styled from 'styled-components/native';
import { Asset } from 'src/entities/wallet';
import { Text } from 'src/shared/ui';
import { formatAmount } from 'src/shared/lib/format';

interface AssetPickerProps {
  assets: Asset[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const Row = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.space(2)}px;
`;

const Chip = styled.Pressable<{ active: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.space(3)}px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  border-width: 1px;
  border-color: ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme, active }) => (active ? theme.colors.surfaceAlt : theme.colors.surface)};
  gap: 2px;
`;

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
