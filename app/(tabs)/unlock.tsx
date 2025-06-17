import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import LogoutButton from '@/components/Buttons/Logout/Logout';

const birdUri = "https://www.pngall.com/wp-content/uploads/15/Flappy-Bird-PNG-Free-Image.png";
const UNLOCK_COUNT = 20;

const UnlockScreen = (): React.ReactElement => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;

  const [pressCount, setPressCount] = useState<number>(0);
  const birdTranslateY = useRef(new Animated.Value(0)).current;
  const birdOpacity = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(bounceAnim, {
            toValue: -30,
            duration: 80,
            useNativeDriver: false,
          }),
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 80,
            useNativeDriver: false,
          }),
        ]),
        Animated.parallel([
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 80,
            useNativeDriver: false,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 80,
            useNativeDriver: false,
          }),
        ]),
      ])
    );

    bounceAnimation.start();

    return () => bounceAnimation.stop();
  }, []);

  useEffect(() => {
    const colorLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
        Animated.timing(colorAnim, {
          toValue: 2,
          duration: 100,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
        Animated.timing(colorAnim, {
          toValue: 3,
          duration: 100,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
        Animated.timing(colorAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
      ])
    );

    colorLoop.start();

    return () => colorLoop.stop();
  }, []);

  useEffect(() => {
    if (pressCount >= UNLOCK_COUNT) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [pressCount]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const neonColor = colorAnim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ['#39FF14', '#FF00FF', '#00FFFF', '#FFFB00'],
  });

  const handleBirdPress = (): void => {
    if (pressCount >= UNLOCK_COUNT) return;

    Animated.sequence([
      Animated.parallel([
        Animated.timing(birdTranslateY, {
          toValue: -150,
          duration: 500,
          useNativeDriver: false,
          easing: Easing.out(Easing.quad),
        }),
        Animated.timing(birdOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
      ]),
      Animated.parallel([
        Animated.timing(birdTranslateY, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
        Animated.timing(birdOpacity, {
          toValue: 1,
          duration: 0,
          useNativeDriver: false,
        }),
      ]),
    ]).start();

    setPressCount(prev => prev + 1);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.gameContainer}>
        <Text style={styles.instruction}>Tap the bird {UNLOCK_COUNT} times to unlock the logout button</Text>

        <View style={styles.birdWrapper}>
          <TouchableOpacity activeOpacity={0.7} onPress={handleBirdPress} style={styles.birdTouchable}>
            <Animated.Image
              source={{ uri: birdUri }}
              style={[
                styles.birdImage,
                {
                  transform: [{ translateY: birdTranslateY }],
                  opacity: birdOpacity,
                },
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {pressCount >= UNLOCK_COUNT && (
            <Animated.View style={[styles.popupLogout, { opacity: fadeAnim }]}>
              <LogoutButton />
            </Animated.View>
          )}
        </View>

        {pressCount < UNLOCK_COUNT && (
          <Text style={styles.counterText}>
            {pressCount} / {UNLOCK_COUNT}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#a0d8ef',
    alignItems: 'center',
    paddingVertical: 60,
  },
  gameContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: 240,
  },
  instruction: {
    color: 'white',
    fontSize: 13,
    marginBottom: 80,
    textAlign: 'center',
    fontFamily: 'PressStart2P_800Regular',
  },
  birdWrapper: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  birdTouchable: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  birdImage: {
    width: 80,
    height: 80,
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
  counterText: {
    color: 'white',
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'PressStart2P_800Regular',
  },
  popupLogout: {
    position: 'absolute',
    top: '5%',
    zIndex: 10,
  },
});

export default UnlockScreen;