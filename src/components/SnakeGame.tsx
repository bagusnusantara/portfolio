"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from "next-themes";

const SnakeGame: React.FC = () => {
  const { theme } = useTheme();
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  
  const GRID_SIZE = 20;
  const GRID_COUNT = 20;
  const CANVAS_SIZE = GRID_SIZE * GRID_COUNT;
  const INITIAL_SNAKE = [{ x: 10, y: 10 }];
  const INITIAL_DIRECTION = 'RIGHT';

  const generateFood = useCallback((currentSnake: { x: number, y: number }[]) => {
    let newFood: { x: number, y: number };
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_COUNT),
        y: Math.floor(Math.random() * GRID_COUNT),
      };
      // Ensure food doesn't spawn on snake
      if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    const newFood = generateFood(INITIAL_SNAKE);
    setFood(newFood);
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || !isPlaying) return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };

      switch (direction) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_COUNT || head.y < 0 || head.y >= GRID_COUNT) {
        handleGameOver();
        return prevSnake;
      }

      // Check self collision
      if (prevSnake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)) {
        handleGameOver();
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, isPlaying, generateFood]);

  const handleGameOver = () => {
    setIsGameOver(true);
    setIsPlaying(false);
    if (score > highScore) {
      setHighScore(score);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying && !isGameOver && (e.key === ' ' || e.key === 'Enter')) {
        setIsPlaying(true);
        return;
      }
      
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
        case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
        case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
        case 'w': if (direction !== 'DOWN') setDirection('UP'); break;
        case 's': if (direction !== 'UP') setDirection('DOWN'); break;
        case 'a': if (direction !== 'RIGHT') setDirection('LEFT'); break;
        case 'd': if (direction !== 'LEFT') setDirection('RIGHT'); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, isPlaying, isGameOver]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 120);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const isDark = theme === 'dark';

    // Clear background
    ctx.fillStyle = isDark ? '#064e3b' : '#a7f3d0'; // Forest-800 : Emerald-200
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw grid lines
    ctx.strokeStyle = isDark ? '#065f46' : '#6ee7b7'; // Forest-700 : Emerald-300
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_COUNT; i++) {
      ctx.beginPath();
      ctx.moveTo(i * GRID_SIZE, 0);
      ctx.lineTo(i * GRID_SIZE, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * GRID_SIZE);
      ctx.lineTo(CANVAS_SIZE, i * GRID_SIZE);
      ctx.stroke();
    }

    // Draw snake (Vine/Path)
    ctx.shadowBlur = 10;
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#10b981' : '#059669'; // Emerald-500 : Emerald-600
      ctx.shadowColor = '#10b981';
      ctx.fillRect(segment.x * GRID_SIZE + 1, segment.y * GRID_SIZE + 1, GRID_SIZE - 2, GRID_SIZE - 2);
    });

    // Draw food (Wild Berries)
    ctx.fillStyle = '#ef4444'; // Red-500
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(
      food.x * GRID_SIZE + GRID_SIZE / 2,
      food.y * GRID_SIZE + GRID_SIZE / 2,
      GRID_SIZE / 3,
      0,
      Math.PI * 2
    );
    ctx.fill();

    ctx.shadowBlur = 0;
  }, [snake, food, theme]);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto py-12 px-6">
      <div className="flex justify-between w-full mb-6">
        <div className="text-slate-400 font-mono">
          BERRIES COLLECTED: <span className="text-emerald-400 font-bold">{score}</span>
        </div>
        <div className="text-slate-400 font-mono">
          WILDERNESS STREAK: <span className="text-amber-400 font-bold">{highScore}</span>
        </div>
      </div>

      <div className="relative border-4 border-emerald-900/50 dark:border-emerald-900/50 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-2xl">
        <canvas 
          ref={canvasRef} 
          width={CANVAS_SIZE} 
          height={CANVAS_SIZE} 
          className="max-w-full h-auto"
        />

        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 dark:bg-emerald-950/80 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 italic uppercase tracking-widest">Wilderness Monitor</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-center max-w-xs px-4">
              Navigate the dense forest. Collect wild berries to sustain your journey. Avoid the mountain edge!
            </p>
            <button
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold transition-all shadow-lg hover:scale-105"
              onClick={() => setIsPlaying(true)}
            >
              INITIALIZE TREK
            </button>
            <p className="mt-4 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Arrow Keys or WASD to navigate</p>
          </div>
        )}

        {isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/70 backdrop-blur-sm animate-fade-in">
            <h3 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter">Off the Trail!</h3>
            <p className="text-red-200 mb-6 font-mono text-sm">System recovery initiated...</p>
            <div className="text-5xl font-black text-white mb-8">{score}</div>
            <button
              className="px-8 py-3 bg-white text-red-900 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-xl"
              onClick={resetGame}
            >
              RESUME TREK
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-6 justify-center text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          Trek Path
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
          Wild Berries
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-[1px] bg-emerald-800"></div>
          Forest Grid
        </div>
      </div>
      
      {/* Mobile Controls */}
      <div className="mt-8 grid grid-cols-3 gap-2 md:hidden">
        <div />
        <button className="w-12 h-12 glass rounded-lg flex items-center justify-center text-xl text-emerald-400" onClick={() => direction !== 'DOWN' && setDirection('UP')}>↑</button>
        <div />
        <button className="w-12 h-12 glass rounded-lg flex items-center justify-center text-xl text-emerald-400" onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}>←</button>
        <button className="w-12 h-12 glass rounded-lg flex items-center justify-center text-xl text-emerald-400" onClick={() => direction !== 'UP' && setDirection('DOWN')}>↓</button>
        <button className="w-12 h-12 glass rounded-lg flex items-center justify-center text-xl text-emerald-400" onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}>→</button>
      </div>
    </div>
  );
};

export default SnakeGame;
