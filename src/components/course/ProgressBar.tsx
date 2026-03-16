import { useEffect, useState } from 'react';

interface Props {
  percentage: number;
}

export default function ProgressBar({ percentage }: Props) {
  const [width, setWidth] = useState(0);

  // Animate on mount
  useEffect(() => {
    const timer = setTimeout(() => setWidth(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/80">
      <div
        className="h-full transition-all duration-700 ease-out"
        style={{
          width: `${width}%`,
          background: 'linear-gradient(90deg, #CFB53B 0%, #e5cc5a 100%)',
        }}
      />
      {/* Percentage label — only visible on hover / focus */}
      <div
        className="absolute right-3 top-1.5 text-[10px] font-bold tracking-wide select-none opacity-0 hover:opacity-100 transition-opacity duration-200"
        style={{ color: '#CFB53B' }}
      >
        {Math.round(percentage)}% complete
      </div>
    </div>
  );
}
