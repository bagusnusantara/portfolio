"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from "next-themes";

const PipelineRunner: React.FC = () => {
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(null);
  
  // Game constants
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 200;
  const JUMP_FORCE = -8;
  const GRAVITY = 0.4;
  const OBSTACLE_SPEED = 5;
  const OBSTACLE_INTERVAL = 1500; // ms

  // Game state refs (to avoid closure issues in animation frame)
  const gameState = useRef({
    player: {
      x: 50,
      y: 150,
      width: 30,
      height: 30,
      dy: 0,
      isJumping: false,
      color: '#10b981' // Emerald-500 (Trail Runner)
    },
    obstacles: [] as { x: number; y: number; width: number; height: number; color: string }[],
    lastObstacleTime: 0,
    currentScore: 0
  });

  const jump = () => {
    if (isGameOver) {
      restartGame();
      return;
    }
    if (!isPlaying) {
      setIsPlaying(true);
      return;
    }
    if (!gameState.current.player.isJumping) {
      gameState.current.player.dy = JUMP_FORCE;
      gameState.current.player.isJumping = true;
    }
  };

  const restartGame = () => {
    gameState.current.obstacles = [];
    gameState.current.player.y = 150;
    gameState.current.player.dy = 0;
    gameState.current.player.isJumping = false;
    gameState.current.lastObstacleTime = 0;
    gameState.current.currentScore = 0;
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  const update = (time: number) => {
    if (isGameOver || !isPlaying) return;

    const { player, obstacles } = gameState.current;

    // Apply gravity
    player.dy += GRAVITY;
    player.y += player.dy;

    // Ground collision
    if (player.y > 150) {
      player.y = 150;
      player.dy = 0;
      player.isJumping = false;
    }

    // Spawn obstacles
    if (time - gameState.current.lastObstacleTime > OBSTACLE_INTERVAL) {
      obstacles.push({
        x: CANVAS_WIDTH,
        y: 150,
        width: 25,
        height: 30,
        color: '#f59e0b' // Amber-500 (Rocks/Steep)
      });
      gameState.current.lastObstacleTime = time;
    }

    // Move obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].x -= OBSTACLE_SPEED;

      // Collision detection
      if (
        player.x < obstacles[i].x + obstacles[i].width &&
        player.x + player.width > obstacles[i].x &&
        player.y < obstacles[i].y + obstacles[i].height &&
        player.y + player.height > obstacles[i].y
      ) {
        setIsGameOver(true);
        setIsPlaying(false);
        if (gameState.current.currentScore > highScore) {
          setHighScore(gameState.current.currentScore);
        }
      }

      // Remove off-screen obstacles
      if (obstacles[i].x + obstacles[i].width < 0) {
        obstacles.splice(i, 1);
        gameState.current.currentScore += 10;
        setScore(gameState.current.currentScore);
      }
    }

    draw();
    requestRef.current = requestAnimationFrame(update);
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const isDark = theme === 'dark';

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw Mountains (Far Background)
    ctx.fillStyle = isDark ? '#1e293b' : '#cbd5e1'; // Slate-800 : Slate-300
    ctx.beginPath();
    ctx.moveTo(0, 180);
    ctx.lineTo(100, 100);
    ctx.lineTo(200, 180);
    ctx.lineTo(350, 80);
    ctx.lineTo(500, 180);
    ctx.lineTo(650, 120);
    ctx.lineTo(800, 180);
    ctx.fill();

    // Draw Trail (Floor)
    ctx.strokeStyle = isDark ? '#451a03' : '#78350f'; // Earth Brown : Red-900
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 180);
    for (let i = 0; i < CANVAS_WIDTH; i += 20) {
      ctx.lineTo(i, 180 + Math.sin(i * 0.05) * 2);
    }
    ctx.stroke();

    // Draw Player (Runner)
    const { player, obstacles } = gameState.current;
    
    // Shadow/Glow
    ctx.shadowBlur = 15;
    ctx.shadowColor = player.color;
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Label
    ctx.fillStyle = isDark ? '#fff' : '#0f172a';
    ctx.font = 'bold 9px Inter';
    ctx.fillText('PROCESS', player.x - 3, player.y - 10);

    // Draw Obstacles (Steep/Rocks)
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#f59e0b';
    obstacles.forEach(obs => {
      ctx.fillStyle = obs.color;
      // Draw as a rock/jagged
      ctx.beginPath();
      ctx.moveTo(obs.x, obs.y + obs.height);
      ctx.lineTo(obs.x + obs.width / 2, obs.y);
      ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
      ctx.fill();
      
      ctx.fillStyle = isDark ? '#fff' : '#0f172a';
      ctx.font = '8px Inter';
      ctx.fillText('INCIDENT', obs.x, obs.y - 5);
    });

    // Reset shadow
    ctx.shadowBlur = 0;
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, isGameOver]);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto py-12 px-6">
      <div className="flex justify-between w-full mb-6">
        <div className="text-slate-400 font-mono">
          UPTIME: <span className="text-emerald-400 font-bold">{score}s</span>
        </div>
        <div className="text-slate-400 font-mono">
          MAX UPTIME: <span className="text-amber-400 font-bold">{highScore}s</span>
        </div>
      </div>

      <div 
        className="relative w-full aspect-[4/1] bg-secondary/50 dark:bg-slate-900/50 rounded-2xl border border-border dark:border-slate-800 overflow-hidden cursor-pointer shadow-inner"
        onClick={jump}
      >
        <canvas 
          ref={canvasRef} 
          width={CANVAS_WIDTH} 
          height={CANVAS_HEIGHT}
          className="w-full h-full"
        />

        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 dark:bg-slate-950/80 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 italic uppercase tracking-tighter pt-8">
              <span className="text-emerald-600 dark:text-emerald-500">Pipeline</span> Navigator
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-center max-w-sm px-6">
              Maintain system stability! Navigate through pipeline stages and bypass operational incidents.
            </p>
            <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-xl hover:scale-105 active:scale-95">
              START PIPELINE
            </button>
            <p className="mt-4 text-[10px] text-muted-foreground uppercase tracking-widest">Jump to bypass incidents</p>
          </div>
        )}

        {isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-950/90 backdrop-blur-sm animate-fade-in">
            <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tighter">Pipeline Interrupted</h3>
            <p className="text-emerald-200 mb-6">Service stability maintained for {score} seconds.</p>
            <button 
              className="px-8 py-3 bg-white text-emerald-900 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-xl"
              onClick={(e) => { e.stopPropagation(); restartGame(); }}
            >
              RESTART SERVICE
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-6 flex flex-wrap gap-8 justify-center text-[10px] text-slate-500 uppercase tracking-[0.3em] font-bold">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          System Process
        </div>
        <div className="flex items-center gap-2">
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-b-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
          Incidents
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-[2px] bg-earth-brown"></div>
          Operational Baseline
        </div>
      </div>
    </div>
  );
};

export default PipelineRunner;
