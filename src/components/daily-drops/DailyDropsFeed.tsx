/**
 * DailyDropsFeed — Main community feed component
 *
 * Infinite scroll, optimistic reactions, inline comments
 * Designed to feel buttery smooth — instant feedback on every interaction
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { PostCard } from './PostCard';
import type { Post, Category } from './types';

const CATEGORIES: { value: Category | 'all'; label: string; emoji: string }[] = [
  { value: 'all', label: 'All', emoji: '🎰' },
  { value: 'insight', label: 'Insights', emoji: '💡' },
  { value: 'strategy', label: 'Strategy', emoji: '♠️' },
  { value: 'mindset', label: 'Mindset', emoji: '🧠' },
  { value: 'story', label: 'Stories', emoji: '🎲' },
  { value: 'challenge', label: 'Challenges', emoji: '🏆' },
  { value: 'qa', label: 'Q&A', emoji: '❓' },
];

export function DailyDropsFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [error, setError] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchPosts = useCallback(async (pageNum: number, cat: string, append = false) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      const params = new URLSearchParams({ page: String(pageNum), limit: '10' });
      if (cat !== 'all') params.set('category', cat);

      const res = await fetch(`/api/daily-drops?${params}`, {
        credentials: 'same-origin',
        cache: 'no-store',
      });

      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();

      setPosts(prev => append ? [...prev, ...data.posts] : data.posts);
      setHasMore(data.hasMore);
      setError(null);
    } catch {
      setError('Could not load posts. Try refreshing.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // Initial load & category change
  useEffect(() => {
    setPage(1);
    fetchPosts(1, category);
  }, [category, fetchPosts]);

  // Infinite scroll
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loadingMore) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchPosts(nextPage, category, true);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [hasMore, loadingMore, page, category, fetchPosts]);

  // Optimistic reaction toggle
  const handleReaction = useCallback(async (postId: string, reaction: string) => {
    // Optimistic update
    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post;
      const hasReaction = post.userReactions.includes(reaction);
      return {
        ...post,
        userReactions: hasReaction
          ? post.userReactions.filter(r => r !== reaction)
          : [...post.userReactions, reaction],
        reactions: {
          ...post.reactions,
          [reaction]: (post.reactions[reaction] || 0) + (hasReaction ? -1 : 1),
        },
      };
    }));

    // Fire and forget — no need to wait
    fetch('/api/daily-drops/react', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ postId, reaction }),
    }).catch(() => {
      // Revert on failure
      setPosts(prev => prev.map(post => {
        if (post.id !== postId) return post;
        const hadReaction = post.userReactions.includes(reaction);
        return {
          ...post,
          userReactions: hadReaction
            ? post.userReactions.filter(r => r !== reaction)
            : [...post.userReactions, reaction],
          reactions: {
            ...post.reactions,
            [reaction]: (post.reactions[reaction] || 0) + (hadReaction ? -1 : 1),
          },
        };
      }));
    });
  }, []);

  // Update comment count after posting
  const handleCommentAdded = useCallback((postId: string) => {
    setPosts(prev => prev.map(post =>
      post.id === postId ? { ...post, commentCount: post.commentCount + 1 } : post
    ));
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white mb-1">Daily Drops</h1>
        <p className="text-sm" style={{ color: '#9A9A9A' }}>
          Knowledge bombs from Mikki Mase — fresh insights every day
        </p>
      </div>

      {/* Category filter — horizontal scroll on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              category === cat.value
                ? 'text-black'
                : 'text-[#9A9A9A] hover:text-white'
            }`}
            style={{
              backgroundColor: category === cat.value ? '#CFB53B' : '#1A1A1A',
              border: `1px solid ${category === cat.value ? '#CFB53B' : '#2D2D2D'}`,
            }}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-xl p-4 mb-6 text-center" style={{ background: 'rgba(168, 0, 30, 0.1)', border: '1px solid rgba(168, 0, 30, 0.2)' }}>
          <p className="text-red-300 text-sm">{error}</p>
          <button onClick={() => fetchPosts(1, category)} className="text-sm mt-2 hover:underline" style={{ color: '#CFB53B' }}>
            Try again
          </button>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="rounded-xl p-5 animate-pulse" style={{ background: '#1A1A1A', border: '1px solid #2D2D2D' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full" style={{ background: '#2D2D2D' }} />
                <div className="h-3 w-24 rounded" style={{ background: '#2D2D2D' }} />
              </div>
              <div className="h-4 w-3/4 rounded mb-2" style={{ background: '#2D2D2D' }} />
              <div className="h-3 w-full rounded mb-1" style={{ background: '#2D2D2D' }} />
              <div className="h-3 w-2/3 rounded" style={{ background: '#2D2D2D' }} />
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && posts.length === 0 && !error && (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">🎰</div>
          <h3 className="text-white font-bold text-lg mb-2">No drops yet</h3>
          <p className="text-sm" style={{ color: '#9A9A9A' }}>
            {category === 'all'
              ? 'The first knowledge bomb is coming soon.'
              : `No ${category} posts yet. Check back soon.`
            }
          </p>
        </div>
      )}

      {/* Posts feed */}
      {!loading && (
        <div className="space-y-4">
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onReaction={handleReaction}
              onCommentAdded={handleCommentAdded}
            />
          ))}
        </div>
      )}

      {/* Load more trigger */}
      {hasMore && !loading && (
        <div ref={loadMoreRef} className="py-8 text-center">
          {loadingMore && (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 rounded-full animate-pulse" style={{ background: '#CFB53B' }} />
              <span className="text-sm" style={{ color: '#9A9A9A' }}>Loading more...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
