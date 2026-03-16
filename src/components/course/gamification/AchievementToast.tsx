import { useEffect, useState } from 'react';

interface Props {
  badgeName: string;
  badgeIcon: string;
  show: boolean;
  onClose: () => void;
}

export default function AchievementToast({ badgeName, badgeIcon, show, onClose }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show && !visible) return null;

  return (
    <div
      className="fixed top-6 right-6 z-50 flex items-center gap-4 p-4 rounded-xl shadow-2xl transition-all duration-300"
      style={{
        backgroundColor: '#1A1A1A',
        border: '2px solid #CFB53B',
        boxShadow: '0 0 40px rgba(207, 181, 59, 0.3)',
        transform: visible ? 'translateX(0)' : 'translateX(120%)',
        opacity: visible ? 1 : 0,
      }}
    >
      <span className="text-3xl">{badgeIcon}</span>
      <div>
        <span className="text-xs font-semibold uppercase tracking-widest block" style={{ color: '#CFB53B' }}>
          Badge Earned!
        </span>
        <span className="text-white font-bold">{badgeName}</span>
      </div>
    </div>
  );
}
