import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function IntroPage() {
  const router = useRouter();

  // Shared values for animations
  const logoScale = useSharedValue(1);
  const logoRotation = useSharedValue(0);
  const logoTranslateX = useSharedValue(0);
  const logoTranslateY = useSharedValue(0);

  const textTranslateY = useSharedValue(120);
  const textOpacity = useSharedValue(0);

  const udesignTranslateX = useSharedValue(0);  const udesignTranslateY = useSharedValue(0);  const bdesignTranslateX = useSharedValue(0);
  const bdesignTranslateY = useSharedValue(0);

  const fadeOutOpacity = useSharedValue(1);

  // Navigation function
  const navigateToNext = () => {
    router.replace('/(tabs)/get_started');
  };

  useEffect(() => {
    // Start animations after 2 seconds
    const startAnimations = () => {
      // Logo animation: rotate -360, scale down (stays in center)
      logoRotation.value = withTiming(-360, { duration: 1500 });
      logoScale.value = withTiming(0.6, { duration: 1500 });

      // Text animation: slide up and fade in after logo rotation (with delay)
      textTranslateY.value = withDelay(1500, withTiming(-20, { duration: 800 }));
      textOpacity.value = withDelay(1500, withTiming(1, { duration: 800 }));

      // Corner designs slide out horizontally (maintaining Y position)
      udesignTranslateX.value = withTiming(-width, { duration: 1200 });
      bdesignTranslateX.value = withTiming(width, { duration: 1200 });

      // Fade out after animations complete (1.5s animation + 0.5s delay)
      fadeOutOpacity.value = withDelay(
        2000,
        withTiming(0, { duration: 800 }, (finished) => {
          if (finished) {
            runOnJS(navigateToNext)();
          }
        })
      );
    };

    const timer = setTimeout(startAnimations, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Animated styles
  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: logoTranslateX.value },
      { translateY: logoTranslateY.value },
      { rotate: `${logoRotation.value}deg` },
      { scale: logoScale.value },
    ],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: textTranslateY.value }],
    opacity: textOpacity.value,
  }));

  const animatedUdesignStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: udesignTranslateX.value },
      { translateY: udesignTranslateY.value },
    ],
  }));

  const animatedBdesignStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: bdesignTranslateX.value },
      { translateY: bdesignTranslateY.value },
    ],
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: fadeOutOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      {/* Top Left Corner Design */}
      <Animated.View style={[styles.topLeftCorner, animatedUdesignStyle]}>
        <Image
          source={require('@/assets/images/Udesign.png')}
          style={styles.cornerImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Bottom Right Corner Design */}
      <Animated.View style={[styles.bottomRightCorner, animatedBdesignStyle]}>
        <Image
          source={require('@/assets/images/Bdesign.png')}
          style={styles.cornerImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Center Content */}
      <View style={styles.centerContent}>
        {/* Logo */}
        <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
          <Image
            source={require('@/assets/images/Intro_logo.webp')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Statera Text */}
        <Animated.View style={[styles.textContainer, animatedTextStyle]}>
          <Text style={styles.stateraText}>Statera</Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLeftCorner: {
    position: 'absolute',
    width: 250,
    height: 250,
    top: -70,
    left: -50,
  },
  bottomRightCorner: {
    position: 'absolute',
    width: 250,
    height: 250,
    bottom: -80,
    right: -70,
  },
  cornerImage: {
    width: '100%',
    height: '100%',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    marginTop: 20,
  },
  stateraText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    letterSpacing: 2,
  },
});
