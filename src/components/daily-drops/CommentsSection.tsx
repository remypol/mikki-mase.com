/**
 * CommentsSection — Inline comments for a post
 *
 * Features:
 * - Auto-loads comments when expanded
 * - Instant submit with optimistic rendering
 * - Auto-resize textarea (grows as you type)
 * - Keyboard shortcut: Cmd+Enter / Ctrl+Enter to submit
 * - Smooth animations
 */

import { useState, useEffect, useRef, useCallback, type FormEvent, type KeyboardEvent } from 'react';
import type { Comment } from './types';

interface Props {
  postId: string;
  onCommentAdded: () => void;
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = now - date;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function CommentsSection({ postId, onCommentAdded }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  // Auto-load comments
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/daily-drops/comments?postId=${postId}`, {
          credentials: 'same-origin',
          cache: 'no-store',
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (mounted) setComments(data.comments);
      } catch {
        // Silently fail — comments are non-critical
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [postId]);

  // Auto-resize textarea
  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 200) + 'px';
  }, []);

  // Submit comment
  const handleSubmit = useCallback(async (e?: FormEvent) => {
    e?.preventDefault();
    if (!text.trim() || submitting) return;

    setSubmitting(true);
    const content = text.trim();
    setText('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    try {
      const res = await fetch('/api/daily-drops/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ postId, content }),
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      setComments(prev => [...prev, data.comment]);
      onCommentAdded();

      // Scroll to new comment
      setTimeout(() => commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch {
      // Restore text on failure
      setText(content);
    } finally {
      setSubmitting(false);
    }
  }, [text, submitting, postId, onCommentAdded]);

  // Cmd+Enter / Ctrl+Enter to submit
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  // Delete comment
  const handleDelete = useCallback(async (commentId: string) => {
    // Optimistic remove
    setComments(prev => prev.filter(c => c.id !== commentId));

    try {
      await fetch(`/api/daily-drops/comments?id=${commentId}`, {
        method: 'DELETE',
        credentials: 'same-origin',
      });
    } catch {
      // Refresh on failure
      const res = await fetch(`/api/daily-drops/comments?postId=${postId}`, { credentials: 'same-origin' });
      const data = await res.json();
      setComments(data.comments);
    }
  }, [postId]);

  return (
    <div className="px-5 py-4">
      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-2 py-4 justify-center">
          <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: '#CFB53B' }} />
          <span className="text-xs" style={{ color: '#6B6B6B' }}>Loading comments...</span>
        </div>
      )}

      {/* Comments list */}
      {!loading && comments.length > 0 && (
        <div className="space-y-3 mb-4 max-h-80 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#2D2D2D transparent' }}>
          {comments.map(comment => (
            <div key={comment.id} className="flex gap-2.5 group">
              {/* Avatar */}
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                style={{
                  background: comment.author.isAdmin ? 'linear-gradient(135deg, #CFB53B, #8B7A2B)' : '#2D2D2D',
                  color: comment.author.isAdmin ? '#000' : '#6B6B6B',
                }}
              >
                {comment.author.name[0]?.toUpperCase() || '?'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-white">{comment.author.name}</span>
                  {comment.author.isAdmin && (
                    <span className="text-[8px] font-bold px-1 py-0.5 rounded" style={{ background: '#CFB53B', color: '#000' }}>
                      TEAM
                    </span>
                  )}
                  <span className="text-[10px]" style={{ color: '#6B6B6B' }}>{timeAgo(comment.createdAt)}</span>
                  {comment.isOwn && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] hover:text-red-400 ml-auto"
                      style={{ color: '#6B6B6B' }}
                      title="Delete"
                    >
                      ×
                    </button>
                  )}
                </div>
                <p className="text-xs leading-relaxed mt-0.5 whitespace-pre-wrap" style={{ color: '#BEBEBE' }}>
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
          <div ref={commentsEndRef} />
        </div>
      )}

      {/* Empty state */}
      {!loading && comments.length === 0 && (
        <p className="text-center text-xs py-3" style={{ color: '#6B6B6B' }}>
          Be the first to comment
        </p>
      )}

      {/* Comment input */}
      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Share your thoughts..."
          rows={1}
          maxLength={2000}
          className="flex-1 resize-none rounded-lg px-3 py-2 text-sm text-white placeholder-[#6B6B6B] outline-none transition-colors focus:border-[#CFB53B]"
          style={{ background: '#1A1A1A', border: '1px solid #2D2D2D', minHeight: '36px', maxHeight: '200px' }}
        />
        <button
          type="submit"
          disabled={!text.trim() || submitting}
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:brightness-110 active:scale-95 disabled:opacity-30"
          style={{ background: '#CFB53B' }}
          title="Post comment (⌘+Enter)"
        >
          {submitting ? (
            <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </form>
      <p className="text-[10px] mt-1.5" style={{ color: '#4A4A4A' }}>
        Press ⌘+Enter to send
      </p>
    </div>
  );
}
