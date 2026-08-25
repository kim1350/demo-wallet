import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { useTheme } from 'styled-components/native';
import { LogoProps } from './Logo.types';

// Abstract faceted prism mark — geometric, brand-neutral, no external asset.
export const LogoMark = ({ size = 40 }: LogoProps) => {
  const theme = useTheme();
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
    >
      <Defs>
        <LinearGradient
          id="prism"
          x1="0"
          y1="0"
          x2="48"
          y2="48"
        >
          <Stop
            offset="0"
            stopColor={theme.colors.primary}
          />
          <Stop
            offset="1"
            stopColor={theme.colors.accent}
          />
        </LinearGradient>
      </Defs>
      <Path
        d="M24 3 L43 15 V33 L24 45 L5 33 V15 Z"
        fill="url(#prism)"
        opacity={0.18}
      />
      <Path
        d="M24 3 L43 15 L24 24 L5 15 Z"
        fill="url(#prism)"
      />
      <Path
        d="M5 15 L24 24 V45 L5 33 Z"
        fill={theme.colors.primary}
        opacity={0.85}
      />
      <Path
        d="M43 15 L24 24 V45 L43 33 Z"
        fill={theme.colors.accent}
        opacity={0.7}
      />
    </Svg>
  );
};
