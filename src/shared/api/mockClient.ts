import { Asset, Balance, SendRequest, SendResult, Transaction } from './types';

// In-memory fake backend. No network, no external hosts — everything is generated
// locally so the app runs fully offline as a self-contained demo.

const LATENCY_MIN = 400;
const LATENCY_MAX = 800;

const delay = <T>(value: T): Promise<T> => {
  const ms = LATENCY_MIN + Math.random() * (LATENCY_MAX - LATENCY_MIN);
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
};

const randomHash = (): string => {
  const chars = '0123456789abcdef';
  let out = '0x';
  for (let i = 0; i < 40; i += 1) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
};

const randomAddress = (): string => randomHash();

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

let assets: Asset[] = [
  {
    id: 'aur',
    name: 'Aurora',
    ticker: 'AUR',
    amount: 128.4213,
    fiatValue: 4210.55,
    changePct: 2.4,
  },
  { id: 'nmb', name: 'Nimbus', ticker: 'NMB', amount: 940.12, fiatValue: 1880.24, changePct: -1.1 },
  { id: 'vtx', name: 'Vertex', ticker: 'VTX', amount: 12.005, fiatValue: 6002.5, changePct: 5.8 },
];

let transactions: Transaction[] = [
  {
    id: 't1',
    direction: 'in',
    status: 'confirmed',
    assetTicker: 'VTX',
    amount: 2.5,
    fiatValue: 1250.0,
    counterparty: randomAddress(),
    hash: randomHash(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: 't2',
    direction: 'out',
    status: 'confirmed',
    assetTicker: 'AUR',
    amount: 14.2,
    fiatValue: 465.6,
    counterparty: randomAddress(),
    hash: randomHash(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
  },
  {
    id: 't3',
    direction: 'in',
    status: 'confirmed',
    assetTicker: 'NMB',
    amount: 320,
    fiatValue: 640.0,
    counterparty: randomAddress(),
    hash: randomHash(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
];

const computeBalance = (): Balance => {
  const totalFiat = assets.reduce((sum, a) => sum + a.fiatValue, 0);
  const weighted = assets.reduce((sum, a) => sum + a.changePct * a.fiatValue, 0);
  const changePct = totalFiat > 0 ? weighted / totalFiat : 0;
  return { totalFiat, changePct: Number(changePct.toFixed(2)) };
};

export const mockClient = {
  getBalance: (): Promise<Balance> => delay(computeBalance()),

  getAssets: (): Promise<Asset[]> => delay(clone(assets)),

  getTransactions: (): Promise<Transaction[]> => delay(clone(transactions)),

  sendTransaction: async (req: SendRequest): Promise<SendResult> => {
    const asset = assets.find((a) => a.id === req.assetId);
    if (!asset) throw new Error('Unknown asset');
    if (req.amount <= 0) throw new Error('Amount must be positive');
    if (req.amount > asset.amount) throw new Error('Insufficient balance');

    const unitPrice = asset.fiatValue / asset.amount;

    assets = assets.map((a) =>
      a.id === asset.id
        ? { ...a, amount: a.amount - req.amount, fiatValue: (a.amount - req.amount) * unitPrice }
        : a,
    );

    const tx: Transaction = {
      id: `t${Date.now()}`,
      direction: 'out',
      status: 'confirmed',
      assetTicker: asset.ticker,
      amount: req.amount,
      fiatValue: Number((req.amount * unitPrice).toFixed(2)),
      counterparty: req.recipient,
      hash: randomHash(),
      createdAt: new Date().toISOString(),
    };
    transactions = [tx, ...transactions];

    return delay({ transaction: tx });
  },
};
