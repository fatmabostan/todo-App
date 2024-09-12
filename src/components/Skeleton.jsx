import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const SkeletonLoader = ({ width, height, position }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E0E0E0', '#F5F5F5'],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        { width: width, height: height, backgroundColor: backgroundColor, alignSelf: position},
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    borderRadius: 4,
    marginVertical: 8,
  },
});

export default SkeletonLoader;
