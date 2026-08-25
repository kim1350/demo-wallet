import { DisplayCurrency } from './types';

export const STORAGE_KEY = 'demo-wallet:ui-settings';

export const CURRENCIES: { code: DisplayCurrency; symbol: string; label: string }[] = [
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
];
