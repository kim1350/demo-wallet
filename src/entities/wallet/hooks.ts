import { useQuery } from '@tanstack/react-query';
import { mockClient, queryKeys } from '@shared/api';

export const useBalance = () =>
  useQuery({
    queryKey: queryKeys.balance,
    queryFn: mockClient.getBalance,
  });

export const useAssets = () =>
  useQuery({
    queryKey: queryKeys.assets,
    queryFn: mockClient.getAssets,
  });
