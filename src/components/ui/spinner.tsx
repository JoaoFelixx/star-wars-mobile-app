import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Path } from 'react-native-svg';

import { useColorScheme } from '@/hooks/use-color-scheme';

interface SpinnerProps {
  size?: number;
  color?: string;
}

export function Spinner({ size = 64, color = '#ffe81f' }: SpinnerProps) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 1400, easing: Easing.linear }), -1);
  }, [rotation]);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={[{ width: size, height: size }, ringStyle]}>
        <Svg width={size} height={size} viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r="44"
            stroke={color}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray="120 160"
            fill="none"
          />
        </Svg>
      </Animated.View>

      <View style={{ position: 'absolute' }}>
        <VaderHelmet size={size * 0.62} color={color} isDark={isDark} />
      </View>
    </View>
  );
}

function VaderHelmet({ size, color, isDark }: { size: number; color: string; isDark: boolean }) {
  const backdrop = isDark ? '#151515' : '#e5e5e5';
  const plate = isDark ? '#2b2b2e' : '#4b4b4e';
  const recess = isDark ? '#0a0a0a' : '#1c1c1e';
  const mouth = isDark ? '#111113' : '#2a2a2c';

  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Circle cx="32" cy="32" r="31" fill={backdrop} />
      <Path
        d="M32 6C21 6 13 13 12 23c-1 7 1 13 4 18l-3 2c-1 1-1 3 1 3h6l2 4c1 2 3 3 5 3h10c2 0 4-1 5-3l2-4h6c2 0 2-2 1-3l-3-2c3-5 5-11 4-18C51 13 43 6 32 6Z"
        fill={plate}
        stroke={color}
        strokeWidth={0.75}
      />
      <Path
        d="M21 27c0-4 2-7 5-8 2-1 4 0 4 2 0 3-2 3-3 5-1 2-1 5 0 7 1 2 0 4-2 4-3 0-4-6-4-10Z"
        fill={recess}
      />
      <Path
        d="M43 27c0-4-2-7-5-8-2-1-4 0-4 2 0 3 2 3 3 5 1 2 1 5 0 7-1 2 0 4 2 4 3 0 4-6 4-10Z"
        fill={recess}
      />
      <Path d="M26 37h12l-2 6h-8l-2-6Z" fill={mouth} />
    </Svg>
  );
}
