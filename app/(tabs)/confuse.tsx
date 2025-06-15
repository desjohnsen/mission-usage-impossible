import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CELL_SIZE = 20;
const GRID_SIZE = 15;

type Coord = { x: number; y: number };

const getInitialSnake = (): Coord[] => [
  { x: 7, y: 7 }
];

const getRandomFoodPosition = (snake: Coord[]): Coord => {
  while (true) {
    const position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    const collision = snake.some(s => s.x === position.x && s.y === position.y);
    if (!collision) return position;
  }
};

export default function App() {
  const [snake, setSnake] = useState(getInitialSnake());
  const [food, setFood] = useState(getRandomFoodPosition(getInitialSnake()));
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake(prev => {
        const head = prev[0];
        let newHead = { ...head };

        if (direction === 'UP') newHead.y -= 1;
        else if (direction === 'DOWN') newHead.y += 1;
        else if (direction === 'LEFT') newHead.x -= 1;
        else if (direction === 'RIGHT') newHead.x += 1;

        // Check bounds
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setGameOver(true);
          return prev;
        }
        // Check self collision
        if (prev.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
          setGameOver(true);
          return prev;
        }

        const ateFood = newHead.x === food.x && newHead.y === food.y;
        const newSnake = [newHead, ...prev];
        if (!ateFood) {
          newSnake.pop();
        } else {
          setFood(getRandomFoodPosition(newSnake));
        }
        return newSnake;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [direction, food, gameOver]);

  const changeDirection = (newDir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {Array.from({ length: GRID_SIZE }).map((_, y) => (
          <View key={y} style={styles.row}>
            {Array.from({ length: GRID_SIZE }).map((_, x) => {
              const isSnake = snake.some(seg => seg.x === x && seg.y === y);
              const isHead = snake[0].x === x && snake[0].y === y;
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

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => changeDirection('UP')} style={styles.button}><Text>↑</Text></TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => changeDirection('LEFT')} style={styles.button}><Text>←</Text></TouchableOpacity>
          <TouchableOpacity onPress={resetGame} style={styles.button}><Text>Start</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => changeDirection('RIGHT')} style={styles.button}><Text>→</Text></TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => changeDirection('DOWN')} style={styles.button}><Text>↓</Text></TouchableOpacity>
      </View>

      {gameOver && <Text style={{ color: 'red', fontSize: 20, marginTop: 20 }}>Game Over!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
    alignItems: 'center',
  },
  grid: {
    width: CELL_SIZE * GRID_SIZE,
    height: CELL_SIZE * GRID_SIZE,
    backgroundColor: '#222',
    borderWidth: 2,
    borderColor: '#555',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#111',
  },
  snake: {
    backgroundColor: 'limegreen',
  },
  snakeHead: {
    backgroundColor: 'green',
  },
  food: {
    backgroundColor: 'red',
  },
  controls: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#555',
    margin: 5,
    padding: 15,
    borderRadius: 5,
  },
});
