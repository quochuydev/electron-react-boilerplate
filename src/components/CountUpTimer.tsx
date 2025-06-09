import React, { useEffect, useState } from 'react';

const formatTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':');
};

function CountUpTimer({ onFinish }: { onFinish: (time: string) => void }) {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        setSeconds((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup
  }, [isRunning]);

  return (
    <div className="flex items-center gap-2">
      <button
        className="icon-btn"
        type="button"
        onClick={async () => {
          await onFinish(formatTime(seconds));
          setIsRunning(false);
          setSeconds(0);
        }}
      >
        ⏱️
      </button>
      <button
        className="icon-btn"
        type="button"
        onClick={() => setIsRunning((prev) => !prev)}
      >
        {isRunning ? '⏸️' : '▶️'}
      </button>
      <span style={{ fontFamily: 'monospace' }}>{formatTime(seconds)}</span>
    </div>
  );
}

export default CountUpTimer;
