import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

export default function App() {
  const [snake, setSnake] = useState(getInitialSnake());
  const [food, setFood] = useState(getRandomFoodPosition(getInitialSnake()));
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (gameOver || !started) return;

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
          setScore(prevScore => prevScore + 1);  // Här fixat med funktionell uppdatering
          setFood(getRandomFoodPosition(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [direction, food, gameOver, started]);

  const changeDirection = (newDir: typeof direction) => {
    if (
      (direction === 'UP' && newDir === 'DOWN') ||
      (direction === 'DOWN' && newDir === 'UP') ||
      (direction === 'LEFT' && newDir === 'RIGHT') ||
      (direction === 'RIGHT' && newDir === 'LEFT')
    ) return;
    setDirection(newDir);
  };

  const resetGame = () => {
    const initialSnake = getInitialSnake();
    setSnake(initialSnake);
    setFood(getRandomFoodPosition(initialSnake));
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setStarted(false);
  };

  const startGame = () => {
    resetGame();
    setStarted(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.menuTitle}>RETRO SNAKE</Text>

      {started && (
        <Text style={styles.score}>SCORE: {score}</Text>
      )}

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

      {/* D-pad controls */}
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

          {!started ? (
            <TouchableOpacity onPress={startGame} style={styles.playButton}>
              <Text style={styles.playButtonText}>PLAY</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.dpadButton} />
          )}

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

      {/* Game over modal */}
      <Modal visible={gameOver} transparent animationType="fade">
        <View style={styles.popup}>
          <View style={styles.popupContent}>
            <Text style={styles.popupText}>GAME OVER</Text>
            <Pressable onPress={resetGame} style={styles.restartButton}>
              <Text style={styles.closeText}>Restart</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
  score: {
    fontSize: 16,
    fontFamily: 'monospace',
    color: '#003300',
    marginBottom: 10,
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
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#003300',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    backgroundColor: '#a4c639',
  },
  playButtonText: {
    fontSize: 12,
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
    fontSize: 20,
    fontFamily: 'monospace',
    color: '#003300',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeText: {
    fontSize: 20,
    fontFamily: 'monospace',
    color: '#003300',
    textAlign: 'center',
  },
  restartButton: {
    borderWidth: 2,
    borderColor: '#003300',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#a4c639',
  },
});
