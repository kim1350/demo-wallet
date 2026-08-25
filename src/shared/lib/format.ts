export const formatFiat = (value: number, symbol = '$'): string => {
  const formatted = value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formatted}`;
};

export const formatAmount = (value: number, ticker: string): string => {
  const formatted = value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  });
  return `${formatted} ${ticker}`;
};

export const shortenAddress = (address: string, lead = 6, tail = 4): string => {
  if (address.length <= lead + tail) return address;
  return `${address.slice(0, lead)}…${address.slice(-tail)}`;
};

export const formatDate = (iso: string): string => {
  const date = new Date(iso);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
