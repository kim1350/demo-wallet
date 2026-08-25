import { mockClient } from './mockClient';

describe('mockClient', () => {
  it('returns a balance equal to the sum of asset fiat values', async () => {
    const [balance, assets] = await Promise.all([
      mockClient.getBalance(),
      mockClient.getAssets(),
    ]);
    const sum = assets.reduce((acc, a) => acc + a.fiatValue, 0);
    expect(balance.totalFiat).toBeCloseTo(sum, 2);
  });

  it('sending debits the asset and prepends a transaction', async () => {
    const [asset] = await mockClient.getAssets();
    const before = asset.amount;

    const { transaction } = await mockClient.sendTransaction({
      assetId: asset.id,
      recipient: '0xrecipient000000',
      amount: 1,
    });

    const after = (await mockClient.getAssets()).find((a) => a.id === asset.id);
    const history = await mockClient.getTransactions();

    expect(after?.amount).toBeCloseTo(before - 1, 6);
    expect(transaction.direction).toBe('out');
    expect(history[0].id).toBe(transaction.id);
  });

  it('rejects sending more than the available balance', async () => {
    const [asset] = await mockClient.getAssets();
    await expect(
      mockClient.sendTransaction({
        assetId: asset.id,
        recipient: '0xrecipient000000',
        amount: asset.amount + 1000,
      }),
    ).rejects.toThrow('Insufficient balance');
  });
});
