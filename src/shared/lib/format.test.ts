import { formatAmount, formatFiat, shortenAddress } from './format';

describe('format', () => {
  it('formats fiat with symbol and two decimals', () => {
    expect(formatFiat(1234.5, '$')).toBe('$1,234.50');
    expect(formatFiat(0, '€')).toBe('€0.00');
  });

  it('formats an asset amount with its ticker', () => {
    expect(formatAmount(12.5, 'AUR')).toBe('12.5 AUR');
  });

  it('shortens long addresses and leaves short ones intact', () => {
    expect(shortenAddress('0x1234567890abcdef', 6, 4)).toBe('0x1234…cdef');
    expect(shortenAddress('0x1234')).toBe('0x1234');
  });
});
