import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function LoadingPage() {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.spinnerContainer, { transform: [{ rotate }] }]}>
        <Svg width="120" height="120" viewBox="0 0 120 120">
          {/* Outer blue arc */}
          <Circle
            cx="60"
            cy="60"
            r="50"
            stroke="#1787A8"
            strokeWidth="8"
            fill="none"
            strokeDasharray="220, 314"
            strokeLinecap="round"
          />
          {/* Middle teal arc */}
          <Circle
            cx="60"
            cy="60"
            r="40"
            stroke="#2BA5C0"
            strokeWidth="8"
            fill="none"
            strokeDasharray="140, 251"
            strokeLinecap="round"
            rotation="-90"
            origin="60, 60"
          />
          {/* Inner yellow/gold arc */}
          <Circle
            cx="60"
            cy="60"
            r="30"
            stroke="#E8B744"
            strokeWidth="8"
            fill="none"
            strokeDasharray="100, 188"
            strokeLinecap="round"
            rotation="45"
            origin="60, 60"
          />
        </Svg>
      </Animated.View>
      
      <Text style={styles.title}>Processing your results</Text>
      <Text style={styles.subtitle}>This may take a few seconds.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  spinnerContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#7F8C8D',
    textAlign: 'center',
  },
});
