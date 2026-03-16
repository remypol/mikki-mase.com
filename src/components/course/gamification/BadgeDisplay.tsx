import { badges, getBadgeById } from '../../../config/course/badges';

interface Props {
  earnedBadgeIds: string[];
}

export default function BadgeDisplay({ earnedBadgeIds }: Props) {
  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-4">Your Badges</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {badges.map((badge) => {
          const earned = earnedBadgeIds.includes(badge.id);
          return (
            <div
              key={badge.id}
              className="flex flex-col items-center p-3 rounded-xl text-center transition-all duration-200"
              style={{
                backgroundColor: earned ? 'rgba(207, 181, 59, 0.1)' : '#1A1A1A',
                border: `1px solid ${earned ? '#CFB53B' : '#2D2D2D'}`,
                opacity: earned ? 1 : 0.4,
              }}
            >
              <span className="text-2xl mb-1" style={{ filter: earned ? 'none' : 'grayscale(1)' }}>
                {badge.icon}
              </span>
              <span className="text-xs font-bold text-white leading-tight">{badge.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
