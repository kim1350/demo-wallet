import { ReactNode } from 'react';
import { ScrollViewProps } from 'react-native';

export interface ScreenProps extends ScrollViewProps {
  children: ReactNode;
  scroll?: boolean;
}
