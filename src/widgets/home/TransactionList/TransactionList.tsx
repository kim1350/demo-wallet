import { Fragment } from 'react';
import { TransactionRow, useTransactions } from '@entities/transaction';
import { Card, Skeleton, Text } from '@shared/ui';
import { Divider, Loading } from './TransactionList.styles';

const RECENT_LIMIT = 5;

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
