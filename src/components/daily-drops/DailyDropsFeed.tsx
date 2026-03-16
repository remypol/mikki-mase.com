/**
 * DailyDropsFeed — Main community feed component
 *
 * Infinite scroll, optimistic reactions, inline comments
 * Designed to feel buttery smooth — instant feedback on every interaction
 *
 * GPT 5.4 + 5.3 Codex reviewed: fixed stale request races, duplicate fetches,
 * reaction rollback, comment count sync, and deduplication.
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

  // Refs for preventing stale requests and duplicate fetches
  const abortRef = useRef<AbortController | null>(null);
  const fetchingMoreRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const fetchPosts = useCallback(async (pageNum: number, cat: string, append = false) => {
    // Abort any in-flight request (prevents stale category data)
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      const params = new URLSearchParams({ page: String(pageNum), limit: '10' });
      if (cat !== 'all') params.set('category', cat);

      const res = await fetch(`/api/daily-drops?${params}`, {
        credentials: 'same-origin',
        cache: 'no-store',
        signal: controller.signal,
      });

      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();

      if (!mountedRef.current) return;

      // Deduplicate when appending (prevents duplicates from shifting data)
      if (append) {
        setPosts(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const newPosts = data.posts.filter((p: Post) => !existingIds.has(p.id));
          return [...prev, ...newPosts];
        });
      } else {
        setPosts(data.posts);
      }
      setHasMore(data.hasMore);
      setError(null);
    } catch (err: any) {
      if (err?.name === 'AbortError') return; // Intentional abort, ignore
      if (mountedRef.current) setError('Could not load posts. Try refreshing.');
    } finally {
      if (mountedRef.current) {
        setLoading(false);
        setLoadingMore(false);
        fetchingMoreRef.current = false;
      }
    }
  }, []);

  // Initial load & category change
  useEffect(() => {
    setPage(1);
    fetchPosts(1, category);
  }, [category, fetchPosts]);

  // Infinite scroll with ref-based lock to prevent duplicate fetches
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loadingMore && !fetchingMoreRef.current) {
          fetchingMoreRef.current = true;
          setPage(prev => {
            const nextPage = prev + 1;
            fetchPosts(nextPage, category, true);
            return nextPage;
          });
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [hasMore, loadingMore, category, fetchPosts]);

  // Optimistic reaction toggle with proper snapshot rollback
  const handleReaction = useCallback(async (postId: string, reaction: string) => {
    // Capture pre-mutation snapshot for rollback
    const snapshot = posts.find(p => p.id === postId);
    if (!snapshot) return;

    // Optimistic update
    const hasReaction = snapshot.userReactions.includes(reaction);
    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post;
      return {
        ...post,
        userReactions: hasReaction
          ? post.userReactions.filter(r => r !== reaction)
          : [...post.userReactions, reaction],
        reactions: {
          ...post.reactions,
          [reaction]: Math.max(0, (post.reactions[reaction] || 0) + (hasReaction ? -1 : 1)),
        },
      };
    }));

    // Fire request and check result
    try {
      const res = await fetch('/api/daily-drops/react', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ postId, reaction }),
      });

      if (!res.ok) throw new Error('Server rejected reaction');
    } catch {
      // Revert to snapshot on ANY failure (network or HTTP error)
      setPosts(prev => prev.map(post => {
        if (post.id !== postId) return post;
        return {
          ...post,
          userReactions: [...snapshot.userReactions],
          reactions: { ...snapshot.reactions },
        };
      }));
    }
  }, [posts]);

  // Update comment count after posting
  const handleCommentAdded = useCallback((postId: string) => {
    setPosts(prev => prev.map(post =>
      post.id === postId ? { ...post, commentCount: post.commentCount + 1 } : post
    ));
  }, []);

  // Decrement comment count after deleting
  const handleCommentDeleted = useCallback((postId: string) => {
    setPosts(prev => prev.map(post =>
      post.id === postId ? { ...post, commentCount: Math.max(0, post.commentCount - 1) } : post
    ));
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#CFB53B]/40">
            <img src="/images/mikki-avatar.jpg" alt="Mikki Mase" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">The Inner Circle</h1>
            <p className="text-xs" style={{ color: '#9A9A9A' }}>
              Members-only insights from Mikki Mase
            </p>
          </div>
        </div>
        <div className="h-px mt-4" style={{ background: 'linear-gradient(to right, #CFB53B, transparent)' }} />
      </div>

      {/* Category filter — horizontal scroll on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide" role="tablist" aria-label="Filter by category" style={{ WebkitOverflowScrolling: 'touch' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            role="tab"
            aria-selected={category === cat.value}
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
            <span aria-hidden="true">{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-xl p-4 mb-6 text-center" role="alert" style={{ background: 'rgba(168, 0, 30, 0.1)', border: '1px solid rgba(168, 0, 30, 0.2)' }}>
          <p className="text-red-300 text-sm">{error}</p>
          <button onClick={() => fetchPosts(1, category)} className="text-sm mt-2 hover:underline" style={{ color: '#CFB53B' }}>
            Try again
          </button>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-4" aria-busy="true" aria-label="Loading posts">
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
          <div className="text-4xl mb-4" aria-hidden="true">🎰</div>
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
              onCommentDeleted={handleCommentDeleted}
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
