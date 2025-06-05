import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Text, ImageBackground } from "react-native";

interface TankAnimationProps {
  progress: number;
}

const PoteAnimation: React.FC<TankAnimationProps> = ({ progress }) => {
  const animatedValue1 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue1, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const heightInterpolate1 = animatedValue1.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.progressBackground}>
        <Animated.View style={[styles.progressFill1, { height: heightInterpolate1 }]}>
          <ImageBackground
            source={require('@/assets/images/racaocerta.png')}
            style={styles.imageFill}
            resizeMode="cover"
          />
        </Animated.View>
         {/* <Text style={styles.textprogress}>{progress}%</Text>*/}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 10,
    marginBottom: 10,
  },
  progressBackground: {
    width: 242,
    height: 190,
    backgroundColor: "transparent",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill1: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  imageFill: {
    width: "100%",
    height: "100%",
  },
  textprogress: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default PoteAnimation;
