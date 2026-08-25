import { Asset } from '@entities/wallet';

export interface AssetPickerProps {
  assets: Asset[];
  selectedId: string;
  onSelect: (id: string) => void;
}
