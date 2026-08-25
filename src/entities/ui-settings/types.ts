import { ThemeMode } from 'src/shared/theme';

export type DisplayCurrency = 'USD' | 'EUR' | 'GBP';

export interface PersistedSettings {
  mode: ThemeMode;
  currency: DisplayCurrency;
}
