import { Fragment } from 'react';
import styled from 'styled-components/native';
import { TransactionRow, useTransactions } from 'src/entities/transaction';
import { Card, Skeleton, Text } from 'src/shared/ui';

const RECENT_LIMIT = 5;

const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
`;

const Loading = styled.View`
  gap: ${({ theme }) => theme.space(3)}px;
  margin-top: ${({ theme }) => theme.space(3)}px;
`;

export const TransactionList = () => {
  const { data: transactions, isLoading } = useTransactions();
  const recent = transactions?.slice(0, RECENT_LIMIT) ?? [];

  return (
    <Card>
      <Text
        variant="caption"
        color="textMuted"
      >
        RECENT ACTIVITY
      </Text>
      {isLoading || !transactions ? (
        <Loading>
          {[0, 1, 2].map((i) => (
            <Skeleton
              key={i}
              height={40}
            />
          ))}
        </Loading>
      ) : (
        recent.map((tx, index) => (
          <Fragment key={tx.id}>
            {index > 0 && <Divider />}
            <TransactionRow tx={tx} />
          </Fragment>
        ))
      )}
    </Card>
  );
};
