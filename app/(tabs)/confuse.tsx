import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Easing,
    Image,
    ImageBackground,
    StyleSheet,
} from 'react-native';

const QUESTION_COUNT = 500;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

type BalloonProps = {
  left: number;
  bottom: number;
  duration: number;
  onPop: () => void;
  id: number;
};

function Balloons({ left, bottom, duration, onPop, id }: BalloonProps) {
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: -SCREEN_HEIGHT,
      duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      Animated.parallel([
        Animated.timing(scale, { toValue: 2, duration: 300, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start(() => {
        onPop();
      });
    });
  }, []);

  return (
    <Animated.Text
      style={[
        styles.balloon,
        {
          left,
          bottom,
          transform: [{ translateY }, { scale }],
          opacity,
        },
      ]}
    >
      🎈
    </Animated.Text>
  );
}

export default function ConfuseScreen() {
  const [balloons, setBalloons] = useState<
    { id: number; left: number; bottom: number; duration: number }[]
  >([]);

  useEffect(() => {
    startBalloons();
  }, []);

  const startBalloons = () => {
    const newBalloons = Array.from({ length: QUESTION_COUNT }).map((_, i) => ({
      id: i,
      left: Math.random() * SCREEN_WIDTH,
      bottom: Math.random() * SCREEN_HEIGHT,
      duration: 3000 + Math.random() * 2000,
    }));
    setBalloons(newBalloons);
  };

  const handlePop = (id: number) => {
    setBalloons(prev => {
      const updated = prev.filter(b => b.id !== id);

      if (updated.length === 0) {
        setTimeout(startBalloons, 4000);
      }

      return updated;
    });
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://wallpapercat.com/w/full/0/c/7/50695-1536x2732-iphone-hd-up-cartoon-background.jpg',
      }}
       style={styles.container}
      resizeMode="cover"
    >
      <Image
        source={{
          uri: 'https://freepngimg.com/download/dvd/59983-movies-dvd-pixar-disc-carl-blu-ray-fredricksen.png',
        }}
        style={styles.centerImage}
        resizeMode="contain"
      />

      {balloons.map(({ id, left, bottom, duration }) => (
        <Balloons
          key={id}
          id={id}
          left={left}
          bottom={bottom}
          duration={duration}
          onPop={() => handlePop(id)}
        />
      ))}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  balloon: {
    position: 'absolute',
    fontSize: 28,
    fontWeight: 'bold',
    zIndex: 3,
  },
  centerImage: {
    position: 'absolute',
    top: '59.5%',
    left: '26%',
    width: 350,
    height: 350,
    marginLeft: -74,
    marginTop: -75,
    zIndex: 2,
  },
});
