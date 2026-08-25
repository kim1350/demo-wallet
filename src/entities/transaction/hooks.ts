import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { mockClient, queryKeys, SendRequest } from '@shared/api';

export const useTransactions = () =>
  useQuery({
    queryKey: queryKeys.transactions,
    queryFn: mockClient.getTransactions,
  });

export const useSendMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: SendRequest) => mockClient.sendTransaction(req),
    onSuccess: () => {
      // Balance, asset amounts and history all shift after a send — refresh them.
      queryClient.invalidateQueries({ queryKey: queryKeys.balance });
      queryClient.invalidateQueries({ queryKey: queryKeys.assets });
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions });
    },
  });
};
