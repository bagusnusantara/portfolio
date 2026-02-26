"use client";

import React, { useState, useEffect } from 'react';

const CicdAnimation: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { name: 'BUILD', icon: '⚙️', color: 'text-emerald-500', bg: 'bg-emerald-500/20', desc: 'Compiling source code & assets' },
    { name: 'DEPLOY', icon: '🪂', color: 'text-sky-500', bg: 'bg-sky-500/20', desc: 'Shipping artifacts to production' },
    { name: 'RUN', icon: '🏃', color: 'text-amber-500', bg: 'bg-amber-500/20', desc: 'Service status: OPTIMAL' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto py-12 px-6">
      <div className="relative w-full aspect-[4/1] bg-secondary/50 dark:bg-slate-900/50 rounded-2xl border border-border dark:border-slate-800 overflow-hidden flex items-center justify-around px-12 group shadow-inner">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-24 right-24 h-0.5 bg-border dark:bg-slate-800 -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-24 h-0.5 bg-emerald-500 transition-all duration-1000 -translate-y-1/2 z-0"
          style={{ width: `${(activeStep / (steps.length - 1)) * 60}%` }}
        />

        {steps.map((step, index) => (
          <div key={step.name} className="relative z-10 flex flex-col items-center gap-4">
            <div className={`
              w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-2xl md:text-3xl
              transition-all duration-500 border-2
              ${activeStep === index
                ? `${step.bg} border-emerald-500 scale-110 shadow-[0_0_30px_rgba(16,185,129,0.3)]`
                : 'bg-secondary dark:bg-slate-900 border-border dark:border-slate-800 grayscale opacity-40'}
            `}>
              {step.icon}
            </div>
            <div className="flex flex-col items-center">
              <span className={`text-[10px] font-black tracking-[0.2em] mb-1 ${activeStep === index ? step.color : 'text-muted-foreground'}`}>
                {step.name}
              </span>
              <div className={`h-1 w-1 rounded-full ${activeStep === index ? 'bg-emerald-500' : 'bg-border dark:bg-slate-800'}`} />
            </div>
          </div>
        ))}

        {/* Floating Description */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center animate-fade-in">
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.3em] h-4">
            {steps[activeStep].desc}
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-8 w-full">
        {steps.map((step, index) => (
          <div key={index} className={`p-4 rounded-xl border transition-all duration-500 ${activeStep === index ? 'bg-secondary/50 dark:bg-slate-900/50 border-emerald-500/50' : 'border-transparent opacity-50'}`}>
             <div className="text-[10px] font-mono text-muted-foreground mb-2">0{index + 1}</div>
             <div className="h-1 w-full bg-border dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-emerald-500 transition-all duration-[3000ms] ease-linear`}
                  style={{ width: activeStep === index ? '100%' : '0%' }}
                />
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CicdAnimation;
