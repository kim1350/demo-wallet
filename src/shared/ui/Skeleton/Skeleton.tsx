import { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { useTheme } from 'styled-components/native';
import { SkeletonProps } from './Skeleton.types';

export const Skeleton = ({ width = '100%', height = 16, radius = 8 }: SkeletonProps) => {
  const theme = useTheme();
  const [opacity] = useState(() => new Animated.Value(0.4));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={{
        width,
        height,
        borderRadius: radius,
        backgroundColor: theme.colors.skeleton,
        opacity,
      }}
    />
  );
};
