import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { BreakingTicker } from './components/BreakingTicker';
import { HeroEditorial } from './components/HeroEditorial';
import { TrendingOra } from './components/TrendingOra';
import { CitySelector } from './components/CitySelector';
import { FeedFilter } from './components/FeedFilter';
import { SearchOverlay } from './components/SearchOverlay';
import { SavedPage } from './components/SavedPage';
import { NewsGrid } from './components/NewsGrid';
import { VideoGrid } from './components/VideoGrid';
import { SiciliaSection } from './components/SiciliaSection';
import { BlogSection } from './components/BlogSection';
import { SubmitContent } from './components/SubmitContent';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';
import { ArticleModal } from './components/ArticleModal';
import { ShareModal } from './components/ShareModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { getStoredContent } from './utils/contentStore';
import { ContentItem, Category, Province, TimeFilter, FeedTab } from './types';

export default function App() {
  const [allContent, setAllContent] = useState<ContentItem[]>(() => getStoredContent());
  
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProvince, setSelectedProvince] = useState<Province>('Tutte');
  const [selectedCategory, setSelectedCategory] = useState<Category>('TUTTI');
  const [selectedTime, setSelectedTime] = useState<TimeFilter>('ULTIME 24H');
  const [feedTab, setFeedTab] = useState<FeedTab>(() => {
    return (localStorage.getItem('mw_feed_tab') as FeedTab) || 'ULTIME';
  });

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mw_saved_ids');
      return saved ? JSON.parse(saved) : ['story-1', 'story-2'];
    } catch {
      return ['story-1', 'story-2'];
    }
  });

  const [searchOpen, setSearchOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ContentItem | null>(null);
  const [shareItem, setShareItem] = useState<ContentItem | null>(null);

  // Sync content items from storage
  useEffect(() => {
    const handleContentUpdate = () => {
      setAllContent(getStoredContent());
    };
    window.addEventListener('mw_content_updated', handleContentUpdate);
    window.addEventListener('storage', handleContentUpdate);
    return () => {
      window.removeEventListener('mw_content_updated', handleContentUpdate);
      window.removeEventListener('storage', handleContentUpdate);
    };
  }, []);

  // Sync saved items to localStorage
  useEffect(() => {
    localStorage.setItem('mw_saved_ids', JSON.stringify(savedIds));
  }, [savedIds]);

  // Sync feed tab to localStorage
  useEffect(() => {
    localStorage.setItem('mw_feed_tab', feedTab);
  }, [feedTab]);

  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleRemoveSave = (id: string) => {
    setSavedIds(prev => prev.filter(item => item !== id));
  };

  const handleOpenShare = (item: ContentItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setShareItem(item);
  };

  // Filter items based on City, Category, FeedTab
  const filteredItems = allContent.filter(item => {
    const matchesProvince = selectedProvince === 'Tutte' || item.province === selectedProvince;
    const matchesCategory = selectedCategory === 'TUTTI' || item.category === selectedCategory;
    
    let matchesFeedTab = true;
    if (feedTab === 'VIRALI') {
      matchesFeedTab = item.category === 'VIRALI' || item.badge === 'VIRALE' || item.badge === 'TRENDING';
    } else if (feedTab === 'PER TE') {
      matchesFeedTab = item.views > 100000;
    }

    return matchesProvince && matchesCategory && matchesFeedTab;
  });

  const heroItem = allContent.find(i => i.isHeroFeature) || allContent[0];
  const secondaryItems = allContent.filter(i => i.id !== heroItem?.id);
  const savedItems = allContent.filter(i => savedIds.includes(i.id));

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#FFD400] selection:text-[#050505] pb-16 md:pb-0">
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenSaved={() => setSavedOpen(true)}
        onOpenSubmit={() => {
          document.getElementById('segnala')?.scrollIntoView({ behavior: 'smooth' });
        }}
        savedCount={savedIds.length}
      />

      {/* Breaking News Ticker */}
      <BreakingTicker />

      {/* Hero Editorial */}
      {heroItem && (
        <HeroEditorial
          heroItem={heroItem}
          secondaryItems={secondaryItems}
          onSelectContent={(item) => setSelectedArticle(item)}
          onToggleSave={handleToggleSave}
          savedIds={savedIds}
          onOpenShare={handleOpenShare}
        />
      )}

      {/* Trending Ora (01 to 05) */}
      <TrendingOra
        items={allContent}
        onSelectContent={(item) => setSelectedArticle(item)}
        onToggleSave={handleToggleSave}
        savedIds={savedIds}
        onOpenShare={handleOpenShare}
      />

      {/* City Selector ("Dalla tua Sicilia") */}
      <CitySelector
        selectedProvince={selectedProvince}
        onSelectProvince={setSelectedProvince}
      />

      {/* Feed Filters & Tabs */}
      <FeedFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedTime={selectedTime}
        onSelectTime={setSelectedTime}
        feedTab={feedTab}
        onSelectFeedTab={setFeedTab}
      />

      {/* News Grid (Ultime dalla Sicilia) */}
      <NewsGrid
        items={filteredItems}
        onSelectContent={(item) => setSelectedArticle(item)}
        onToggleSave={handleToggleSave}
        savedIds={savedIds}
        onOpenShare={handleOpenShare}
      />

      {/* Video Virali Grid */}
      <VideoGrid
        items={allContent}
        onSelectContent={(item) => setSelectedArticle(item)}
        onToggleSave={handleToggleSave}
        savedIds={savedIds}
        onOpenShare={handleOpenShare}
      />

      {/* Sicilia Section */}
      <SiciliaSection />

      {/* Blog Section */}
      <BlogSection />

      {/* Social Section */}
      <SocialSection />

      {/* Submit Content Section */}
      <SubmitContent />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} onOpenAdmin={() => setAdminOpen(true)} />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenSaved={() => setSavedOpen(true)}
        savedCount={savedIds.length}
      />

      {/* Search Overlay Modal */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        items={allContent}
        onSelectContent={(item) => setSelectedArticle(item)}
      />

      {/* Saved Items Page Modal */}
      <SavedPage
        isOpen={savedOpen}
        onClose={() => setSavedOpen(false)}
        savedItems={savedItems}
        onSelectContent={(item) => setSelectedArticle(item)}
        onRemoveSave={handleRemoveSave}
      />

      {/* Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

      {/* Article Detail Modal */}
      <ArticleModal
        item={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onToggleSave={handleToggleSave}
        savedIds={savedIds}
        onOpenShare={handleOpenShare}
        allItems={allContent}
        onSelectContent={(item) => setSelectedArticle(item)}
      />

      {/* Share Modal */}
      <ShareModal
        item={shareItem}
        isOpen={Boolean(shareItem)}
        onClose={() => setShareItem(null)}
      />

    </div>
  );
}
