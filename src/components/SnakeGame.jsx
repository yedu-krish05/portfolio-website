import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 }; // Moving up

// Helper to generate food not on the snake
const generateFood = (snake) => {
  let newFood;
  while (true) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    // eslint-disable-next-line no-loop-func
    if (!snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
      break;
    }
  }
  return newFood;
};

export default function SnakeGame({ onClose }) {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
  };

  const handleKeyPress = useCallback((e) => {
    if (gameOver) return;
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        setDirection((prev) => prev.y === 1 ? prev : { x: 0, y: -1 });
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        setDirection((prev) => prev.y === -1 ? prev : { x: 0, y: 1 });
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        setDirection((prev) => prev.x === 1 ? prev : { x: -1, y: 0 });
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        setDirection((prev) => prev.x === -1 ? prev : { x: 1, y: 0 });
        break;
      case ' ':
        setIsPaused(p => !p);
        break;
      default:
        break;
    }
  }, [gameOver]);

  // Mobile D-Pad controller
  const handleDPad = (dir) => {
    if (gameOver) return;
    if (dir === 'UP') setDirection((prev) => prev.y === 1 ? prev : { x: 0, y: -1 });
    if (dir === 'DOWN') setDirection((prev) => prev.y === -1 ? prev : { x: 0, y: 1 });
    if (dir === 'LEFT') setDirection((prev) => prev.x === 1 ? prev : { x: -1, y: 0 });
    if (dir === 'RIGHT') setDirection((prev) => prev.x === -1 ? prev : { x: 1, y: 0 });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + direction.x,
          y: head.y + direction.y,
        };

        // Check wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop(); // Remove tail if no food eaten
        }

        return newSnake;
      });
    };

    // Game loop speed decreases (gets faster) as score increases
    const speed = Math.max(80, 150 - (Math.floor(score / 50) * 10));
    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [direction, food, gameOver, isPaused, score]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md bg-white/[0.05] border border-white/20 rounded-3xl p-6 shadow-2xl flex flex-col items-center">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold font-mono text-cyan-400 mb-2 uppercase tracking-widest">
          Snake
        </h2>
        
        <div className="w-full flex justify-between items-center mb-4 text-white/70 font-mono text-sm">
          <span>Score: <strong className="text-white">{score}</strong></span>
          <span className="text-[10px] uppercase tracking-widest">{isPaused ? 'PAUSED' : 'PLAYING'}</span>
        </div>

        {/* Game Board */}
        <div 
          className="relative bg-black/50 border border-white/10 rounded-xl overflow-hidden shadow-inner"
          style={{
            width: '100%',
            aspectRatio: '1/1',
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          }}
        >
          {/* Render Snake */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`rounded-sm ${index === 0 ? 'bg-cyan-300' : 'bg-cyan-500/80'}`}
              style={{
                gridColumnStart: segment.x + 1,
                gridRowStart: segment.y + 1,
                margin: '1px'
              }}
            />
          ))}

          {/* Render Food */}
          <div
            className="bg-purple-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]"
            style={{
              gridColumnStart: food.x + 1,
              gridRowStart: food.y + 1,
              margin: '2px'
            }}
          />

          {/* Game Over Overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-red-500 mb-2 font-mono uppercase">Game Over</h3>
              <p className="text-white/70 mb-6 font-mono text-sm">Final Score: {score}</p>
              <button
                onClick={resetGame}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white transition-all hover:scale-105 active:scale-95 font-mono text-sm uppercase tracking-widest"
              >
                <RotateCcw size={16} /> Play Again
              </button>
            </div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="mt-8 grid grid-cols-3 gap-2 md:hidden">
          <div />
          <button 
            onClick={() => handleDPad('UP')}
            className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/50 active:bg-white/20"
          >
            <ArrowUp size={24} />
          </button>
          <div />
          <button 
            onClick={() => handleDPad('LEFT')}
            className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/50 active:bg-white/20"
          >
            <ArrowLeft size={24} />
          </button>
          <button 
            onClick={() => handleDPad('DOWN')}
            className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/50 active:bg-white/20"
          >
            <ArrowDown size={24} />
          </button>
          <button 
            onClick={() => handleDPad('RIGHT')}
            className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/50 active:bg-white/20"
          >
            <ArrowRight size={24} />
          </button>
        </div>

        <p className="mt-6 text-[10px] text-white/30 uppercase tracking-[0.2em] text-center hidden md:block">
          Use WASD or Arrow Keys to move.<br/>Space to pause.
        </p>
      </div>
    </motion.div>
  );
}
