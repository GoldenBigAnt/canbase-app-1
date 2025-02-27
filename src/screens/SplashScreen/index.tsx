import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import Svg, { Circle, Path } from 'react-native-svg';
import { useRouter } from 'expo-router'; // Import useRouter from expo-router

const splashImage = require("@/assets/images/adaptive-icon.png");

const SplashScreen: React.FC = () => {
  const rotateAnimation = useSharedValue(0);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    rotateAnimation.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.linear }), // Changed duration to 10 seconds
      -1,
      false
    );

    const timeout = setTimeout(() => {
      router.replace('/(main)/home/app'); // Use router to navigate
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [router, rotateAnimation]);

  const rotateInterpolate = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotateAnimation.value * 360}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <Image source={splashImage} style={styles.image} />
      <View style={styles.circle}>
        <Svg height="100" width="100">
          {/* Original Circle Border */}
          <Circle
            cx="50"
            cy="50"
            r="45" // Adjust radius for border thickness
            fill="none"
            stroke="#efefef" // Gray color for the circle border
            strokeWidth={5} // Border width
          />
          {/* Rotating Arc Border in green */}
          <Animated.View style={[styles.sliceContainer, rotateInterpolate]}>
            <Svg height="100" width="100">
              <Path
                d="
                  M50,5
                  A45,45 0 0,1 95,50
                "
                fill="none"
                stroke="#00c978" // Arc color
                strokeWidth={5} // Arc border width
              />
            </Svg>
          </Animated.View>
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Match your splash background color
  },
  image: {
    width: 100, // Adjust as needed
    height: 100, // Adjust as needed
    position: 'absolute',
  },
  circle: {
    width: 100, // Outer circle size
    height: 100, // Outer circle size
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Center the circle
    overflow: 'hidden', // Hide inner part
  },
  sliceContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100, // Match the size of the SVG
    height: 100, // Match the size of the SVG
  },
});

export default SplashScreen;
