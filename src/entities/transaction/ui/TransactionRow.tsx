import styled, { useTheme } from 'styled-components/native';
import { Icon, Text } from 'src/shared/ui';
import { formatAmount, formatDate, shortenAddress } from 'src/shared/lib/format';
import { Transaction } from 'src/shared/api';

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.space(3)}px;
  gap: ${({ theme }) => theme.space(3)}px;
`;

const Badge = styled.View`
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

const Amount = styled.View`
  align-items: flex-end;
`;

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
