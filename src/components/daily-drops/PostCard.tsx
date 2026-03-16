/**
 * PostCard — Individual daily drop post
 *
 * Features:
 * - Expand/collapse for long content
 * - Optimistic reaction toggles (instant feedback)
 * - Inline comment drawer (buttery smooth)
 * - Time-ago formatting
 * - Admin badge + category tag
 */

import { useState, memo } from 'react';
import { REACTION_EMOJI, CATEGORY_EMOJI } from './types';
import { CommentsSection } from './CommentsSection';
import type { Post, Reaction } from './types';

interface Props {
  post: Post;
  onReaction: (postId: string, reaction: string) => void;
  onCommentAdded: (postId: string) => void;
}

const REACTIONS: Reaction[] = ['fire', 'brain', 'money', 'clap', 'goat'];

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = now - date;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export const PostCard = memo(function PostCard({ post, onReaction, onCommentAdded }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const isLong = post.content.length > 400;
  const displayContent = isLong && !expanded
    ? post.content.slice(0, 400) + '...'
    : post.content;

  const totalReactions = Object.values(post.reactions).reduce((a, b) => a + b, 0);

  return (
    <article
      className="rounded-xl overflow-hidden transition-all"
      style={{
        background: post.pinned
          ? 'linear-gradient(135deg, rgba(207, 181, 59, 0.08) 0%, #1A1A1A 100%)'
          : '#1A1A1A',
        border: `1px solid ${post.pinned ? 'rgba(207, 181, 59, 0.3)' : '#2D2D2D'}`,
      }}
    >
      <div className="p-5">
        {/* Header: Author + Time + Category */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{
                background: post.author.isAdmin ? 'linear-gradient(135deg, #CFB53B, #8B7A2B)' : '#2D2D2D',
                color: post.author.isAdmin ? '#000' : '#9A9A9A',
              }}
            >
              {post.author.avatar
                ? <img src={post.author.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                : post.author.name[0]?.toUpperCase() || 'M'
              }
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-white text-sm font-semibold">{post.author.name}</span>
                {post.author.isAdmin && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: '#CFB53B', color: '#000' }}>
                    TEAM
                  </span>
                )}
              </div>
              <span className="text-xs" style={{ color: '#6B6B6B' }}>{timeAgo(post.published_at)}</span>
            </div>
          </div>

          {/* Category + Pin */}
          <div className="flex items-center gap-1.5">
            {post.pinned && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(168, 0, 30, 0.2)', color: '#ff6b6b' }}>
                📌 PINNED
              </span>
            )}
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: '#0A0A0A', color: '#9A9A9A', border: '1px solid #2D2D2D' }}
            >
              {CATEGORY_EMOJI[post.category]} {post.category}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-base mb-2">{post.title}</h3>

        {/* Content */}
        <div className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: '#BEBEBE' }}>
          {displayContent}
        </div>

        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-medium mt-1 hover:underline"
            style={{ color: '#CFB53B' }}
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}

        {/* Reactions */}
        <div className="flex items-center gap-1.5 mt-4 flex-wrap">
          {REACTIONS.map(reaction => {
            const count = post.reactions[reaction] || 0;
            const active = post.userReactions.includes(reaction);
            return (
              <button
                key={reaction}
                onClick={() => onReaction(post.id, reaction)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all active:scale-95 ${
                  active ? 'ring-1' : ''
                }`}
                style={{
                  background: active ? 'rgba(207, 181, 59, 0.15)' : '#0A0A0A',
                  border: `1px solid ${active ? 'rgba(207, 181, 59, 0.4)' : '#2D2D2D'}`,
                  color: active ? '#CFB53B' : '#9A9A9A',
                }}
              >
                <span className="text-sm">{REACTION_EMOJI[reaction]}</span>
                {count > 0 && <span>{count}</span>}
              </button>
            );
          })}

          {/* Total reactions badge */}
          {totalReactions > 0 && (
            <span className="text-xs ml-1" style={{ color: '#6B6B6B' }}>
              {totalReactions} reaction{totalReactions !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Comment toggle */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 mt-3 text-xs font-medium transition-colors hover:text-white"
          style={{ color: showComments ? '#CFB53B' : '#9A9A9A' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>
            {post.commentCount > 0
              ? `${post.commentCount} comment${post.commentCount !== 1 ? 's' : ''}`
              : 'Comment'
            }
          </span>
          <svg
            className={`w-3 h-3 transition-transform ${showComments ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Comments section (expandable) */}
      {showComments && (
        <div style={{ background: '#111', borderTop: '1px solid #2D2D2D' }}>
          <CommentsSection
            postId={post.id}
            onCommentAdded={() => onCommentAdded(post.id)}
          />
        </div>
      )}
    </article>
  );
});
