import { useTheme } from 'styled-components/native';
import { Icon, Text } from '@shared/ui';
import { formatAmount, formatDate, shortenAddress } from '@shared/lib/format';
import { Transaction } from '@shared/api';
import { Amount, Badge, Body, Row } from './TransactionRow.styles';

export const TransactionRow = ({ tx }: { tx: Transaction }) => {
  const theme = useTheme();
  const incoming = tx.direction === 'in';
  const sign = incoming ? '+' : '−';

  return (
    <Row>
      <Badge>
        <Icon
          name={incoming ? 'arrowDown' : 'arrowUp'}
          size={20}
          color={incoming ? theme.colors.success : theme.colors.text}
        />
      </Badge>
      <Body>
        <Text variant="subtitle">{incoming ? 'Received' : 'Sent'}</Text>
        <Text
          variant="caption"
          color="textMuted"
        >
          {shortenAddress(tx.counterparty)} · {formatDate(tx.createdAt)}
        </Text>
      </Body>
      <Amount>
        <Text
          variant="subtitle"
          color={incoming ? 'success' : 'text'}
        >
          {sign}
          {formatAmount(tx.amount, tx.assetTicker)}
        </Text>
      </Amount>
    </Row>
  );
};
