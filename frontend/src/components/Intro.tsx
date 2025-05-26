'use client'

import { useState, useEffect, useRef } from "react";

interface CountUpProps {
  readonly end: number;
  readonly duration?: number;
}

function CountUp({ end, duration = 2000 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const start = useRef<number | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    function step(timestamp: number): void {
      if (!start.current) start.current = timestamp;
      const progress = timestamp - start.current;
      const progressRatio = Math.min(progress / duration, 1);
      setCount(Math.floor(progressRatio * end));
      if (progress < duration) {
        animationFrameId = requestAnimationFrame(step);
      }
    }

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return <>{count.toLocaleString()}</>;
}

export default function Intro() {
  return (
    <main className="w-full flex items-center justify-center p-6 pry-ff bg-transparent min-h-screen">
      <section className="flex flex-col justify-start items-start gap-4 w-full max-w-[700px]">
        <h2 className="text-sm tracking-widest uppercase font-thin text-[var(--txt-clr)]">/ Larks podcast</h2>
        <h1 className="text-4xl font-semibold leading-snug text-[var(--txt-clr)]">
          Podcast that inspire to grow
        </h1>
        <p className="font-light text-sm leading-relaxed text-[var(--txt-clr)]">
          Dive into insightful conversations, stories, and interviews with our host and special guests.
        </p>

        <div className="flex items-center gap-4">
          <button className="bg-[var(--acc-clr)] text-[var(--txt-clr)] px-4 py-2 rounded-lg cursor-pointer capitalize">
            start listening
          </button>
          <button className="border border-[var(--sec-clr)] bg-[var(--txt-clr)] px-4 py-2 rounded-lg cursor-pointer capitalize text-[var(--acc-clr)]">
            explore channels
          </button>
        </div>

        {/* Milestone Section - Responsive Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-4 p-1 sm:p-1 bg-transparent text-[var(--bg-clr)] pry-ff rounded-lg mt-8 w-full">
          <div className="flex flex-col items-center p-4 sm:p-6 bg-[var(--txt-clr)] text-[var(--acc-clr)] rounded-lg shadow-md w-full">
            <h3 className="text-2xl sm:text-3xl font-bold">
              <CountUp end={1000} />+
            </h3>
            <p className="text-xs uppercase tracking-widest">Downloads</p>
          </div>
          <div className="flex flex-col items-center p-4 sm:p-6 bg-[var(--txt-clr)] text-[var(--acc-clr)] rounded-lg shadow-md w-full">
            <h3 className="text-2xl sm:text-3xl font-bold">
              <CountUp end={500} />+
            </h3>
            <p className="text-xs uppercase tracking-widest">Subscribers</p>
          </div>
          <div className="flex flex-col items-center p-4 sm:p-6 bg-[var(--txt-clr)] text-[var(--acc-clr)] rounded-lg shadow-md w-full">
            <h3 className="text-2xl sm:text-3xl font-bold">
              <CountUp end={100} />+
            </h3>
            <p className="text-xs uppercase tracking-widest">Episodes</p>
          </div>
        </section>
      </section>
    </main>
  );
}