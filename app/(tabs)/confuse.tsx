import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const CELL_SIZE = 12;
const GRID_SIZE = 20;

type Coord = { x: number; y: number };

const getInitialSnake = (): Coord[] => [{ x: 10, y: 10 }];

const getRandomFoodPosition = (snake: Coord[]): Coord => {
  const freeSpaces: Coord[] = [];
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      if (!snake.some(s => s.x === x && s.y === y)) {
        freeSpaces.push({ x, y });
      }
    }
  }
  return freeSpaces[Math.floor(Math.random() * freeSpaces.length)];
};

const GlitchTitle = () => {
  const title = 'RETRO SNAKE';
  const animatedValues = useRef(
    Array.from({ length: title.length }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    animatedValues.forEach((anim, i) => {
      const loop = () => {
        Animated.sequence([
          Animated.timing(anim, {
            toValue: -3,
            duration: 100 + Math.random() * 200,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 3,
            duration: 100 + Math.random() * 200,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 100 + Math.random() * 200,
            useNativeDriver: true,
          }),
        ]).start(() => loop());
      };
      loop();
    });
  }, [animatedValues]);

  return (
    <View style={{ flexDirection: 'row' }}>
      {title.split('').map((char, i) => (
        <Animated.Text
          key={i}
          style={[
            styles.menuTitle,
            { transform: [{ translateY: animatedValues[i] }] },
          ]}
        >
          {char}
        </Animated.Text>
      ))}
    </View>
  );
};

const Confuse = (): React.ReactElement => {
  const [snake, setSnake] = useState<Coord[]>(getInitialSnake());
  const [food, setFood] = useState<Coord>(getRandomFoodPosition(getInitialSnake()));
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(10);
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const animatedBorder = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showMenu) {
      Animated.loop(
        Animated.timing(animatedBorder, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        })
      ).start();
    }
  }, [showMenu]);

  const animatedBorderColor = animatedBorder.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#99cc00', '#003300', '#99cc00'],
  });

  useEffect(() => {
    if (showMenu || gameOver) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setSnake(prev => {
        const head = prev[0];
        let newHead = { ...head };

        if (direction === 'UP') newHead.y -= 1;
        else if (direction === 'DOWN') newHead.y += 1;
        else if (direction === 'LEFT') newHead.x -= 1;
        else if (direction === 'RIGHT') newHead.x += 1;

        if (
          newHead.x < 0 || newHead.x >= GRID_SIZE ||
          newHead.y < 0 || newHead.y >= GRID_SIZE ||
          prev.some(seg => seg.x === newHead.x && seg.y === newHead.y)
        ) {
          setGameOver(true);
          return prev;
        }

        const ateFood = newHead.x === food.x && newHead.y === food.y;
        const newSnake = [newHead, ...prev];

        if (ateFood) {
          setScore(prevScore => prevScore + 1);
          setFood(getRandomFoodPosition(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [direction, food, gameOver, started, countdown, showMenu]);

  const changeDirection = (newDir: typeof direction): void => {
    if (
      (direction === 'UP' && newDir === 'DOWN') ||
      (direction === 'DOWN' && newDir === 'UP') ||
      (direction === 'LEFT' && newDir === 'RIGHT') ||
      (direction === 'RIGHT' && newDir === 'LEFT')
    ) return;
    setDirection(newDir);
  };

  const resetGame = (): void => {
    const initialSnake = getInitialSnake();
    setSnake(initialSnake);
    setFood(getRandomFoodPosition(initialSnake));
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setCountdown(10);
    setStarted(true);
    setShowMenu(false);
  };

  return (
    <View style={styles.container}>
      {!showMenu && countdown <= 0 && <Text style={styles.score}>SCORE: {score}</Text>}

      {showMenu ? (
        <>
          <GlitchTitle />
          <Animated.View style={[styles.playButton, { borderColor: animatedBorderColor }]}>
            <TouchableOpacity onPress={resetGame}>
              <Text style={styles.playButtonText}>PLAY</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      ) : countdown > 0 ? (
        <Text style={styles.countdown}>Starting in: {countdown}</Text>
      ) : (
        <>
          <View style={styles.grid}>
            {Array.from({ length: GRID_SIZE }).map((_, y) => (
              <View key={y} style={styles.row}>
                {Array.from({ length: GRID_SIZE }).map((_, x) => {
                  const isSnake = snake.some(seg => seg.x === x && seg.y === y);
                  const isHead = snake[0]?.x === x && snake[0]?.y === y;
                  const isFood = food.x === x && food.y === y;

                  return (
                    <View
                      key={x}
                      style={[
                        styles.cell,
                        isSnake && styles.snake,
                        isHead && styles.snakeHead,
                        isFood && styles.food,
                      ]}
                    />
                  );
                })}
              </View>
            ))}
          </View>

          <View style={styles.dpad}>
            <View style={styles.dpadRow}>
              <View style={styles.dpadEmpty} />
              <TouchableOpacity onPress={() => changeDirection('UP')} style={styles.dpadButton}>
                <Text style={styles.arrow}>↑</Text>
              </TouchableOpacity>
              <View style={styles.dpadEmpty} />
            </View>

            <View style={styles.dpadRow}>
              <TouchableOpacity onPress={() => changeDirection('LEFT')} style={styles.dpadButton}>
                <Text style={styles.arrow}>←</Text>
              </TouchableOpacity>
              <View style={styles.dpadButton} />
              <TouchableOpacity onPress={() => changeDirection('RIGHT')} style={styles.dpadButton}>
                <Text style={styles.arrow}>→</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dpadRow}>
              <View style={styles.dpadEmpty} />
              <TouchableOpacity onPress={() => changeDirection('DOWN')} style={styles.dpadButton}>
                <Text style={styles.arrow}>↓</Text>
              </TouchableOpacity>
              <View style={styles.dpadEmpty} />
            </View>
          </View>
        </>
      )}

      <Modal visible={gameOver} transparent animationType="fade">
        <View style={styles.popup}>
          <View style={styles.popupContent}>
            <Text style={styles.popupText}>YOU WIN</Text>
            <Pressable
              onPress={() => {
                setShowMenu(true);
                setGameOver(false);
              }}
              style={styles.restartButton}
            >
              <Text style={styles.closeText}>Restart</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a4c639',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 32,
    fontFamily: 'monospace',
    color: '#003300',
    textShadowColor: '#99cc00',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginBottom: 10,
  },
  score: {
    position: 'absolute',
    top: 175,
    marginRight: 170,
    fontSize: 16,
    fontFamily: 'monospace',
    color: '#003300',
  },
  countdown: {
    fontSize: 20,
    fontFamily: 'monospace',
    color: '#003300',
  },
  grid: {
    width: CELL_SIZE * GRID_SIZE,
    height: CELL_SIZE * GRID_SIZE,
    backgroundColor: '#a4c639',
    borderWidth: 2,
    borderColor: '#003300',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: '#a4c639',
  },
  snake: {
    backgroundColor: '#003300',
  },
  snakeHead: {
    backgroundColor: '#001a00',
  },
  food: {
    backgroundColor: '#336600',
  },
  dpad: {
    marginTop: 20,
    alignItems: 'center',
  },
  dpadRow: {
    flexDirection: 'row',
  },
  dpadButton: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#003300',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    backgroundColor: '#a4c639',
  },
  dpadEmpty: {
    width: 60,
    height: 60,
    margin: 4,
  },
  playButton: {
    width: 90,
    height: 30,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#a4c639',
  },
  playButtonText: {
    fontSize: 16,
    fontFamily: 'monospace',
    color: '#003300',
  },
  arrow: {
    fontSize: 24,
    fontFamily: 'monospace',
    color: '#003300',
  },
  popup: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContent: {
    backgroundColor: '#a4c639',
    padding: 30,
    borderWidth: 2,
    borderColor: '#003300',
    alignItems: 'center',
  },
  popupText: {
    fontSize: 30,
    fontWeight: 800,
    fontFamily: 'monospace',
    color: '#003300',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeText: {
    fontSize: 10.5,
    fontFamily: 'monospace',
    color: '#003300',
    textAlign: 'center',
  },
  restartButton: {
    width: 90,
    height: 35,
    borderWidth: 2,
    borderColor: '#003300',
    paddingVertical: 8,
    backgroundColor: '#a4c639',
  },
});

export default Confuse;
