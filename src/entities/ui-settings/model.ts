import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable, runInAction } from 'mobx';
import { ThemeMode } from 'src/shared/theme';
import { CURRENCIES, STORAGE_KEY } from './constants';
import { DisplayCurrency, PersistedSettings } from './types';

class UiSettingsStore {
  mode: ThemeMode = 'dark';
  currency: DisplayCurrency = 'USD';
  hydrated = false;

  constructor() {
    makeAutoObservable(this);
  }

  get currencySymbol(): string {
    return CURRENCIES.find((c) => c.code === this.currency)?.symbol ?? '$';
  }

  async init() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<PersistedSettings>;
        runInAction(() => {
          if (saved.mode) this.mode = saved.mode;
          if (saved.currency) this.currency = saved.currency;
        });
      }
    } catch {
      // corrupted or empty storage — fall back to defaults
    } finally {
      runInAction(() => {
        this.hydrated = true;
      });
    }
  }

  toggleMode() {
    this.setMode(this.mode === 'dark' ? 'light' : 'dark');
  }

  setMode(mode: ThemeMode) {
    this.mode = mode;
    this.persist();
  }

  setCurrency(currency: DisplayCurrency) {
    this.currency = currency;
    this.persist();
  }

  private persist() {
    const payload: PersistedSettings = { mode: this.mode, currency: this.currency };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payload)).catch(() => undefined);
  }
}

export const uiSettingsStore = new UiSettingsStore();
