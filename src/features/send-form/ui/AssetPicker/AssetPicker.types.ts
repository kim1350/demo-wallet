import { Asset } from 'src/entities/wallet';

export interface AssetPickerProps {
  assets: Asset[];
  selectedId: string;
  onSelect: (id: string) => void;
}
