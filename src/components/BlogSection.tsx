import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { BlogPost } from '../types';
import { INITIAL_BLOG_POSTS } from '../data/blogData';
import { BlogModal } from './BlogModal';

export const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('mw_blog_posts');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_BLOG_POSTS;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('TUTTI');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Listen to updates from admin dashboard
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('mw_blog_posts');
        if (saved) setPosts(JSON.parse(saved));
      } catch {
        // ignore
      }
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('mw_blog_updated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('mw_blog_updated', handleStorageChange);
    };
  }, []);

  const categories = ['TUTTI', ...Array.from(new Set(posts.map(p => p.category)))];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'TUTTI' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog" className="py-24 bg-[#080808] relative overflow-hidden border-b border-[#1F1F1F]">
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#FFD400]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#141414] border border-[#262626] px-3.5 py-1 rounded-full text-xs font-syne font-bold uppercase tracking-wider text-[#FFD400] mb-4">
              <BookOpen className="w-4 h-4 text-[#C62828]" />
              <span>EDITORIALE & ARTICOLI</span>
            </div>
            <h2 className="font-syne font-black text-3xl sm:text-5xl text-white tracking-tight">
              IL BLOG DI IL MEGLIO DEL WEB
            </h2>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl">
              Approfondimenti, storie, interviste e rubriche esclusive sulla cultura, la tecnologia e le tendenze in Sicilia.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Cerca articoli..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141414] border border-[#262626] rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFD400]"
            />
          </div>
        </div>

        {/* Categories Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-syne font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#FFD400] text-black shadow-lg'
                  : 'bg-[#141414] border border-[#262626] text-neutral-400 hover:text-white hover:border-[#333]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-[#111111] border border-[#222222] hover:border-[#FFD400]/50 rounded-3xl overflow-hidden shadow-xl group cursor-pointer transition-all transform hover:-translate-y-1 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-black">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-syne font-bold uppercase tracking-wider text-[#FFD400]">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[11px] text-neutral-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#FFD400]" />
                        <span>{post.date}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#FFD400]" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="font-syne font-bold text-lg text-white group-hover:text-[#FFD400] transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Author & Read More */}
                  <div className="pt-4 border-t border-[#1C1C1C] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#222] text-[#FFD400] flex items-center justify-center font-bold text-xs">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-neutral-300">{post.author}</span>
                    </div>

                    <span className="text-xs font-syne font-bold text-[#FFD400] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Leggi <span>→</span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-[#111111] border border-[#222222] rounded-3xl p-16 text-center text-neutral-500">
            <p className="font-syne font-bold text-sm">Nessun articolo trovato per i criteri di ricerca.</p>
          </div>
        )}

      </div>

      {/* Blog Article Modal */}
      <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </section>
  );
};
