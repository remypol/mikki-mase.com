interface Props {
  points: number;
  completedLessons: number;
  totalLessons: number;
}

export default function PointsDisplay({ points, completedLessons, totalLessons }: Props) {
  const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div
      className="p-4 rounded-xl border"
      style={{ backgroundColor: '#1A1A1A', borderColor: '#2D2D2D' }}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-2xl font-black" style={{ color: '#CFB53B' }}>{points}</span>
          <span className="text-sm ml-1" style={{ color: '#9A9A9A' }}>XP</span>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-white">{completedLessons}/{totalLessons}</span>
          <span className="text-xs block" style={{ color: '#9A9A9A' }}>lessons</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#2D2D2D' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            background: 'linear-gradient(90deg, #CFB53B, #E5D068)',
          }}
        />
      </div>
      <div className="text-xs mt-1 text-right" style={{ color: '#6B6B6B' }}>
        {percentage}% complete
      </div>
    </div>
  );
}
