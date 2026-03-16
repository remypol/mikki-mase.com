export type Category = 'insight' | 'strategy' | 'mindset' | 'story' | 'challenge' | 'qa';
export type Reaction = 'fire' | 'brain' | 'money' | 'clap' | 'goat';

export interface Post {
  id: string;
  title: string;
  content: string;
  category: Category;
  pinned: boolean;
  published_at: string;
  author: {
    name: string;
    avatar?: string;
    isAdmin: boolean;
  };
  reactions: Record<string, number>;
  userReactions: string[];
  commentCount: number;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  isOwn: boolean;
  author: {
    name: string;
    avatar?: string;
    isAdmin: boolean;
  };
}

export const REACTION_EMOJI: Record<Reaction, string> = {
  fire: '🔥',
  brain: '🧠',
  money: '💰',
  clap: '👏',
  goat: '🐐',
};

export const CATEGORY_EMOJI: Record<Category, string> = {
  insight: '💡',
  strategy: '♠️',
  mindset: '🧠',
  story: '🎲',
  challenge: '🏆',
  qa: '❓',
};
