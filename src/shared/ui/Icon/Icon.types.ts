export type IconName = 'home' | 'send' | 'settings' | 'arrowUp' | 'arrowDown' | 'check';

export interface IconProps {
  name: IconName;
  size?: number;
  color: string;
}
