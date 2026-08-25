import { Fill, Shader, Skia } from '@shopify/react-native-skia';
import { useEffect, useMemo } from 'react';
import { AppState, useWindowDimensions } from 'react-native';
import { useDerivedValue, useFrameCallback, useSharedValue } from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import {
  ANIMATION_TIME_DIVIDER,
  FALLBACK_WARP_COLORS,
  MAX_FRAME_DELTA,
  RENDER_SCALE,
  TARGET_FRAME_INTERVAL,
  WARP_COLORS_BY_THEME,
} from './constants';
import { CanvasContainer } from './WarpBackground.styles';

const source = Skia.RuntimeEffect.Make(`
  uniform float u_time;
  uniform vec2 u_res;
  uniform vec4 u_color1;
  uniform vec4 u_color2;
  uniform vec4 u_color3;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 2; i++) {
      v += a * noise(p);
      p *= 3.0;
      a *= 0.5;
    }
    return v;
  }

  vec4 main(vec2 fragCoord) {
    if (u_res.x < 1.0 || u_res.y < 1.0) {
        return u_color1;
    }

    vec2 p = fragCoord.xy / max(u_res.x, u_res.y);
    float t = u_time * 0.45; 

    p *= 1.5; 

    vec2 q = vec2(
        fbm(p + t * 0.5),
        fbm(p + vec2(5.2, 1.3) + t * 0.2)
    );

    // Нормализация: 2 октавы fbm дают максимум ~0.75
    float f = fbm(p + 4.0 * q) / 0.75;

    float m1 = smoothstep(0.1, 0.9, f);
    float m2 = smoothstep(0.45, 1.0, f);

    vec4 color = mix(u_color1, u_color2, m1);
    vec4 finalColor = mix(color, u_color3, m2 * 0.7);

    return finalColor;
  }
`)!;

const hexToVec = (hex: string) => {
  const cleanHex = hex.replace('#', '');

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return [r / 255, g / 255, b / 255, 1.0];
};

export const WarpBackground = () => {
  const { width, height } = useWindowDimensions();
  const theme = useTheme();
  const animationTime = useSharedValue(0);
  const lastFrameTimestamp = useSharedValue(0);

  const frameCallback = useFrameCallback((frameInfo) => {
    'worklet';

    const delta = frameInfo.timestamp - lastFrameTimestamp.value;

    if (delta < TARGET_FRAME_INTERVAL) {
      return;
    }

    lastFrameTimestamp.value = frameInfo.timestamp;

    animationTime.value += Math.min(delta, MAX_FRAME_DELTA) / ANIMATION_TIME_DIVIDER;
  });

  useEffect(() => {
    const syncAnimationState = (state: typeof AppState.currentState) => {
      frameCallback.setActive(state === 'active');
    };

    syncAnimationState(AppState.currentState);
    const subscription = AppState.addEventListener('change', syncAnimationState);

    return () => subscription.remove();
  }, [frameCallback]);

  const canvasWidth = width / RENDER_SCALE;
  const canvasHeight = height / RENDER_SCALE;
  const canvasStyle = useMemo(
    () => ({
      width: canvasWidth,
      height: canvasHeight,
      left: (width - canvasWidth) / 2,
      top: (height - canvasHeight) / 2,
      transform: [{ scale: RENDER_SCALE }],
    }),
    [canvasHeight, canvasWidth, height, width],
  );

  const colors = useMemo(() => {
    const rawColors = WARP_COLORS_BY_THEME[theme.mode] || FALLBACK_WARP_COLORS;

    return {
      c1: hexToVec(rawColors[0]),
      c2: hexToVec(rawColors[1]),
      c3: hexToVec(rawColors[2]),
    };
  }, [theme.mode]);

  const uniforms = useDerivedValue(() => {
    return {
      u_time: animationTime.value,
      u_res: [canvasWidth, canvasHeight],
      u_color1: colors.c1,
      u_color2: colors.c2,
      u_color3: colors.c3,
    };
  }, [animationTime, canvasHeight, canvasWidth, colors]);

  return (
    <CanvasContainer
      pointerEvents="none"
      style={canvasStyle}
    >
      <Fill>
        <Shader
          source={source}
          uniforms={uniforms}
        />
      </Fill>
    </CanvasContainer>
  );
};
