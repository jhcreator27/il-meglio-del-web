import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FileText, Clock, CheckCircle2, XCircle, Archive, 
  ListOrdered, BarChart3, Settings, Search, Bell, User, LogOut, 
  Menu, X, Eye, Check, ChevronRight, ShieldCheck, Download, Trash2, 
  Play, Pause, Volume2, Maximize2, AlertCircle, Filter, Calendar,
  BookOpen, Plus, Edit, Globe
} from 'lucide-react';
import { ContributionItem, ContributionStatus, TimelineEvent, BlogPost, ContentItem, Category, Province } from '../types';
import { INITIAL_BLOG_POSTS } from '../data/blogData';
import { getStoredContent, saveStoredContent } from '../utils/contentStore';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_CONTRIBUTIONS: ContributionItem[] = [
  {
    id: 'contrib-1',
    referenceCode: 'WEB-2026-8F42K',
    name: 'Mario Rossi',
    email: 'mario.rossi@email.com',
    city: 'Palermo',
    category: 'Tecnologia',
    contentUrl: 'https://tiktok.com/@mariorossi/video/12345',
    mediaUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    description: 'Straordinaria scoperta tecnologica al polo universitario di Palermo.',
    status: 'NEW',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    timeline: [
      { date: new Date(Date.now() - 3600000 * 2).toLocaleString('it-IT'), action: 'Contributo ricevuto', author: 'Mario Rossi' }
    ]
  }
];

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeNav, setActiveNav] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Contributions state
  const [contributions, setContributions] = useState<ContributionItem[]>(() => {
    try {
      const saved = localStorage.getItem('mw_admin_contributions');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_CONTRIBUTIONS;
  });

  // Blog posts state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('mw_blog_posts');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_BLOG_POSTS;
  });

  // Website Editorial Content state
  const [contentItems, setContentItems] = useState<ContentItem[]>(() => getStoredContent());

  // Modals state
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Cultura',
    author: 'Redazione MW',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    excerpt: '',
    content: ''
  });

  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [editingContentId, setEditingContentId] = useState<string | null>(null);
  const [contentForm, setContentForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'VIRALI' as Category,
    province: 'Palermo' as Province,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    author: 'Redazione MW',
    badge: 'VIRALE' as any,
    platform: 'Web' as any
  });

  const [selectedContribution, setSelectedContribution] = useState<ContributionItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Sync contributions to localStorage
  useEffect(() => {
    localStorage.setItem('mw_admin_contributions', JSON.stringify(contributions));
  }, [contributions]);

  // Sync blog posts to localStorage
  useEffect(() => {
    localStorage.setItem('mw_blog_posts', JSON.stringify(blogPosts));
    window.dispatchEvent(new Event('mw_blog_updated'));
  }, [blogPosts]);

  // Sync content items to localStorage
  useEffect(() => {
    saveStoredContent(contentItems);
  }, [contentItems]);

  // Listen to new submissions from SubmitContent
  useEffect(() => {
    const handleNewContrib = () => {
      try {
        const saved = localStorage.getItem('mw_admin_contributions');
        if (saved) setContributions(JSON.parse(saved));
      } catch {
        // ignore
      }
    };
    window.addEventListener('mw_new_contribution', handleNewContrib);
    return () => window.removeEventListener('mw_new_contribution', handleNewContrib);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  if (!isOpen) return null;

  // Login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-[#111111] border border-[#222222] rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
          <button onClick={onClose} className="absolute top-6 right-6 text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-[#FFD400]/10 text-[#FFD400] flex items-center justify-center mx-auto mb-4 border border-[#FFD400]/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-syne font-black text-2xl text-white mb-2">Area Amministrativa</h3>
            <p className="text-xs text-neutral-400">Pannello di controllo universale per modificare qualsiasi contenuto del sito.</p>
          </div>

          {loginError && (
            <div className="mb-4 bg-red-950/40 border border-red-800 text-red-300 text-xs p-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={(e) => {
            e.preventDefault();
            if (adminEmail.trim().toLowerCase() === 'giuliam.anzalone22@gmail.com' && adminPassword === 'Palermo@26') {
              setIsAuthenticated(true);
              setLoginError('');
            } else {
              setLoginError('Credenziali non valide. Usa giuliam.anzalone22@gmail.com e Palermo@26');
            }
          }} className="space-y-4">
            <div>
              <label className="block text-xs font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">Email Admin</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFD400]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">Password</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFD400]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-[#FFD400] hover:bg-[#ffc200] text-black font-syne font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl"
            >
              Accedi alla Dashboard →
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Stats calculations
  const stats = {
    new: contributions.filter(c => c.status === 'NEW').length,
    inReview: contributions.filter(c => c.status === 'IN_REVIEW').length,
    approved: contributions.filter(c => c.status === 'APPROVED').length,
    rejected: contributions.filter(c => c.status === 'REJECTED').length,
    archived: contributions.filter(c => c.status === 'ARCHIVED').length,
    total: contributions.length,
    blogCount: blogPosts.length,
    contentCount: contentItems.length
  };

  // Filter contributions for table
  const filteredContributions = contributions.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.referenceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contentUrl.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      statusFilter === 'ALL' || item.status === statusFilter;

    let matchesNav = true;
    if (activeNav === 'new') matchesNav = item.status === 'NEW';
    else if (activeNav === 'in_review') matchesNav = item.status === 'IN_REVIEW';
    else if (activeNav === 'approved') matchesNav = item.status === 'APPROVED';
    else if (activeNav === 'rejected') matchesNav = item.status === 'REJECTED';
    else if (activeNav === 'archived') matchesNav = item.status === 'ARCHIVED';

    return matchesSearch && matchesStatus && matchesNav;
  });

  // Moderation actions
  const updateStatus = (id: string, newStatus: ContributionStatus, reason?: string) => {
    const now = new Date().toLocaleString('it-IT');
    setContributions(prev => prev.map(c => {
      if (c.id === id) {
        const actionName = 
          newStatus === 'APPROVED' ? 'Approvato' :
          newStatus === 'REJECTED' ? 'Rifiutato' :
          newStatus === 'ARCHIVED' ? 'Archiviato' :
          newStatus === 'IN_REVIEW' ? 'Messo in revisione' : 'Aggiornato';

        const newTimelineEvent: TimelineEvent = {
          date: now,
          action: actionName,
          author: 'Admin Redazione',
          note: reason
        };

        return {
          ...c,
          status: newStatus,
          updatedAt: new Date().toISOString(),
          reviewedAt: newStatus === 'APPROVED' || newStatus === 'REJECTED' ? new Date().toISOString() : c.reviewedAt,
          reviewedBy: 'Admin Redazione',
          rejectionReason: reason || c.rejectionReason,
          timeline: [newTimelineEvent, ...c.timeline]
        };
      }
      return c;
    }));

    showToast(`✓ Contributo ${newStatus === 'APPROVED' ? 'approvato' : newStatus === 'REJECTED' ? 'rifiutato' : 'aggiornato'}.`);
    if (selectedContribution && selectedContribution.id === id) {
      setSelectedContribution(null);
    }
  };

  // Blog post handlers
  const handleSaveBlogPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.content) {
      showToast('Compila titolo e contenuto del blog.');
      return;
    }

    if (editingBlogId) {
      setBlogPosts(prev => prev.map(p => p.id === editingBlogId ? {
        ...p,
        ...blogForm,
        slug: blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      } : p));
      showToast('✓ Articolo blog aggiornato.');
    } else {
      const newPost: BlogPost = {
        id: 'blog-' + Date.now(),
        title: blogForm.title,
        slug: blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        excerpt: blogForm.excerpt || blogForm.content.substring(0, 120) + '...',
        content: blogForm.content,
        category: blogForm.category,
        author: blogForm.author,
        date: new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }),
        readTime: blogForm.readTime,
        image: blogForm.image,
        views: 1
      };
      setBlogPosts(prev => [newPost, ...prev]);
      showToast('✓ Nuovo articolo blog pubblicato.');
    }

    setBlogModalOpen(false);
    setEditingBlogId(null);
  };

  const handleDeleteBlogPost = (id: string) => {
    if (window.confirm('Eliminare questo articolo del blog?')) {
      setBlogPosts(prev => prev.filter(p => p.id !== id));
      showToast('✓ Articolo eliminato.');
    }
  };

  // Website Content Item handlers
  const handleSaveContentItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentForm.title || !contentForm.content) {
      showToast('Compila titolo e contenuto.');
      return;
    }

    if (editingContentId) {
      setContentItems(prev => prev.map(item => item.id === editingContentId ? {
        ...item,
        ...contentForm
      } : item));
      showToast('✓ Contenuto del sito aggiornato con successo.');
    } else {
      const newItem: ContentItem = {
        id: 'story-' + Date.now(),
        title: contentForm.title,
        excerpt: contentForm.excerpt || contentForm.content.substring(0, 120) + '...',
        content: contentForm.content,
        category: contentForm.category,
        province: contentForm.province,
        image: contentForm.image,
        date: new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }),
        timestamp: 'Ora',
        views: 12000,
        viewsFormatted: '12K',
        platform: contentForm.platform,
        badge: contentForm.badge,
        author: contentForm.author,
        originalSource: { name: 'Il Meglio del Web', url: '#' }
      };
      setContentItems(prev => [newItem, ...prev]);
      showToast('✓ Nuovo contenuto pubblicato sul sito.');
    }

    setContentModalOpen(false);
    setEditingContentId(null);
  };

  const handleDeleteContentItem = (id: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo articolo dal sito?')) {
      setContentItems(prev => prev.filter(i => i.id !== id));
      showToast('✓ Articolo rimosso dal sito.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] flex overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] text-white animate-in fade-in duration-200">
      
      {/* Toast feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111111] border-2 border-[#FFD400] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-[#FFD400]" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0A0A0A] border-r border-[#1F1F1F] flex flex-col transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-[#1F1F1F] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FFD400] flex items-center justify-center font-black text-black text-xs">
              MW
            </div>
            <div>
              <span className="font-syne font-black text-sm tracking-wider block">ADMIN HUB</span>
              <span className="text-[10px] text-neutral-400">Controllo Totale</span>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, count: null },
            { id: 'content_mgmt', label: 'Gestione Contenuti', icon: Globe, count: stats.contentCount },
            { id: 'blog_mgmt', label: 'Gestione Blog', icon: BookOpen, count: stats.blogCount },
            { id: 'new', label: 'Nuovi contributi', icon: FileText, count: stats.new },
            { id: 'in_review', label: 'In revisione', icon: Clock, count: stats.inReview },
            { id: 'approved', label: 'Approvati', icon: CheckCircle2, count: stats.approved },
            { id: 'rejected', label: 'Rifiutati', icon: XCircle, count: stats.rejected },
            { id: 'archived', label: 'Archiviati', icon: Archive, count: stats.archived },
            { id: 'stats', label: 'Statistiche', icon: BarChart3, count: null },
            { id: 'settings', label: 'Impostazioni', icon: Settings, count: null },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-syne font-bold transition-all ${
                  isActive ? 'bg-[#FFD400] text-black shadow-lg' : 'text-neutral-400 hover:text-white hover:bg-[#141414]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.count !== null && item.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${isActive ? 'bg-black text-[#FFD400]' : 'bg-[#1C1C1C] text-[#FFD400]'}`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#1F1F1F]">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-syne font-bold text-red-400 hover:bg-red-950/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Disconnetti</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col md:pl-64 overflow-hidden">
        
        {/* HEADER */}
        <header className="h-20 bg-[#0A0A0A] border-b border-[#1F1F1F] px-6 flex items-center justify-between z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-neutral-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="font-syne font-black text-lg text-white capitalize">
                {activeNav === 'dashboard' ? 'Panoramica Generale' :
                 activeNav === 'content_mgmt' ? 'Gestione Contenuti del Sito' :
                 activeNav === 'blog_mgmt' ? 'Gestione Articoli Blog' :
                 activeNav === 'new' ? 'Nuovi Contributi' :
                 activeNav === 'in_review' ? 'Contributi in Revisione' :
                 activeNav === 'approved' ? 'Contributi Approvati' :
                 activeNav === 'rejected' ? 'Contributi Rifiutati' :
                 activeNav === 'archived' ? 'Contributi Archiviati' :
                 activeNav === 'stats' ? 'Statistiche & Analisi' : 'Impostazioni Admin'}
              </h1>
              <p className="text-[11px] text-neutral-400">Pannello di controllo globale di Il Meglio del Web</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            
            {/* Admin Profile */}
            <div className="flex items-center gap-3 bg-[#141414] border border-[#262626] px-3.5 py-2 rounded-xl">
              <div className="w-7 h-7 rounded-full bg-[#FFD400] text-black font-black text-xs flex items-center justify-center">
                A
              </div>
              <div className="hidden lg:block text-left">
                <span className="text-xs font-bold text-white block">Redazione MW</span>
                <span className="text-[10px] text-neutral-400">{adminEmail}</span>
              </div>
            </div>

            {/* Close Admin Dashboard */}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-red-950/30 border border-red-900 text-red-400 hover:bg-red-900/50 flex items-center justify-center"
              title="Esci dalla Dashboard Admin"
            >
              <X className="w-5 h-5" />
            </button>

          </div>
        </header>

        {/* CONTENT AREA */}
        <main className="flex-grow overflow-y-auto p-6 bg-[#050505]">
          
          {/* VIEW: DASHBOARD OVERVIEW */}
          {activeNav === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: 'Contenuti Sito', count: stats.contentCount, color: 'text-emerald-400', bg: 'bg-emerald-950/20', border: 'border-emerald-900/40', filter: 'content_mgmt' },
                  { label: 'Articoli Blog', count: stats.blogCount, color: 'text-[#FFD400]', bg: 'bg-yellow-950/20', border: 'border-yellow-900/40', filter: 'blog_mgmt' },
                  { label: 'Nuovi contributi', count: stats.new, color: 'text-amber-400', bg: 'bg-amber-950/20', border: 'border-amber-900/40', filter: 'new' },
                  { label: 'Approvati', count: stats.approved, color: 'text-blue-400', bg: 'bg-blue-950/20', border: 'border-blue-900/40', filter: 'approved' },
                ].map((card, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveNav(card.filter)}
                    className={`${card.bg} border ${card.border} rounded-2xl p-5 cursor-pointer hover:scale-[1.02] transition-transform shadow-xl`}
                  >
                    <span className="text-xs font-syne font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                      {card.label}
                    </span>
                    <span className={`font-syne font-black text-3xl ${card.color}`}>
                      {card.count}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-[#111111] border border-[#222222] rounded-3xl p-6 shadow-xl flex flex-wrap gap-4 items-center justify-between">
                <div>
                  <h3 className="font-syne font-extrabold text-sm uppercase tracking-wider text-white mb-1">
                    Modifica rapida contenuti del sito
                  </h3>
                  <p className="text-xs text-neutral-400">Aggiungi o modifica qualsiasi notizia, video o articolo pubblicato sulla home.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingContentId(null);
                    setContentForm({
                      title: '',
                      excerpt: '',
                      content: '',
                      category: 'VIRALI',
                      province: 'Palermo',
                      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
                      author: 'Redazione MW',
                      badge: 'VIRALE',
                      platform: 'Web'
                    });
                    setContentModalOpen(true);
                  }}
                  className="px-6 py-3 bg-[#FFD400] text-black font-syne font-black text-xs uppercase rounded-xl shadow-lg"
                >
                  + Aggiungi Contenuto al Sito
                </button>
              </div>

            </div>
          )}

          {/* VIEW: WEBSITE CONTENT MANAGEMENT */}
          {activeNav === 'content_mgmt' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-syne font-black text-xl text-white">Contenuti Editoriali del Sito</h3>
                  <p className="text-xs text-neutral-400">Modifica, aggiungi o elimina qualsiasi notizia, video o card visibile in home page.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingContentId(null);
                    setContentForm({
                      title: '',
                      excerpt: '',
                      content: '',
                      category: 'VIRALI',
                      province: 'Palermo',
                      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
                      author: 'Redazione MW',
                      badge: 'VIRALE',
                      platform: 'Web'
                    });
                    setContentModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-[#FFD400] hover:bg-[#ffc200] text-black font-syne font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuovo Contenuto</span>
                </button>
              </div>

              <div className="bg-[#111111] border border-[#222222] rounded-3xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#222222] text-[10px] font-syne font-bold uppercase tracking-widest text-neutral-400 bg-[#0E0E0E]">
                        <th className="py-3 px-4">Titolo</th>
                        <th className="py-3 px-4">Categoria</th>
                        <th className="py-3 px-4">Provincia</th>
                        <th className="py-3 px-4">Autore</th>
                        <th className="py-3 px-4">Visualizzazioni</th>
                        <th className="py-3 px-4 text-right">Azioni</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A1A1A] text-xs">
                      {contentItems.map((item) => (
                        <tr key={item.id} className="hover:bg-[#161616] transition-colors">
                          <td className="py-4 px-4 flex items-center gap-3">
                            <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                            <span className="font-bold text-white line-clamp-1">{item.title}</span>
                          </td>
                          <td className="py-4 px-4"><span className="bg-[#1C1C1C] px-2.5 py-1 rounded-lg text-neutral-300">{item.category}</span></td>
                          <td className="py-4 px-4 text-neutral-300">{item.province}</td>
                          <td className="py-4 px-4 text-neutral-300">{item.author}</td>
                          <td className="py-4 px-4 text-[#FFD400] font-mono">{item.viewsFormatted}</td>
                          <td className="py-4 px-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                setEditingContentId(item.id);
                                setContentForm({
                                  title: item.title,
                                  excerpt: item.excerpt,
                                  content: item.content,
                                  category: item.category,
                                  province: item.province,
                                  image: item.image,
                                  author: item.author,
                                  badge: item.badge || 'VIRALE',
                                  platform: item.platform || 'Web'
                                });
                                setContentModalOpen(true);
                              }}
                              className="px-3 py-1.5 bg-[#1F1F1F] hover:bg-[#FFD400] hover:text-black rounded-lg text-white font-bold transition-colors inline-flex items-center gap-1"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Modifica</span>
                            </button>
                            <button
                              onClick={() => handleDeleteContentItem(item.id)}
                              className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900 border border-red-900 text-red-300 rounded-lg font-bold transition-colors inline-flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Elimina</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: BLOG MANAGEMENT */}
          {activeNav === 'blog_mgmt' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-syne font-black text-xl text-white">Articoli del Blog</h3>
                  <p className="text-xs text-neutral-400">Crea, modifica ed elimina gli articoli editoriali pubblicati sul sito.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingBlogId(null);
                    setBlogForm({
                      title: '',
                      category: 'Cultura',
                      author: 'Redazione MW',
                      readTime: '5 min',
                      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
                      excerpt: '',
                      content: ''
                    });
                    setBlogModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-[#FFD400] hover:bg-[#ffc200] text-black font-syne font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuovo Articolo Blog</span>
                </button>
              </div>

              <div className="bg-[#111111] border border-[#222222] rounded-3xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#222222] text-[10px] font-syne font-bold uppercase tracking-widest text-neutral-400 bg-[#0E0E0E]">
                        <th className="py-3 px-4">Titolo</th>
                        <th className="py-3 px-4">Categoria</th>
                        <th className="py-3 px-4">Autore</th>
                        <th className="py-3 px-4">Data</th>
                        <th className="py-3 px-4 text-right">Azioni</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A1A1A] text-xs">
                      {blogPosts.map((post) => (
                        <tr key={post.id} className="hover:bg-[#161616] transition-colors">
                          <td className="py-4 px-4 flex items-center gap-3">
                            <img src={post.image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                            <span className="font-bold text-white line-clamp-1">{post.title}</span>
                          </td>
                          <td className="py-4 px-4"><span className="bg-[#1C1C1C] px-2.5 py-1 rounded-lg text-neutral-300">{post.category}</span></td>
                          <td className="py-4 px-4 text-neutral-300">{post.author}</td>
                          <td className="py-4 px-4 text-neutral-400">{post.date}</td>
                          <td className="py-4 px-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                setEditingBlogId(post.id);
                                setBlogForm({
                                  title: post.title,
                                  category: post.category,
                                  author: post.author,
                                  readTime: post.readTime,
                                  image: post.image,
                                  excerpt: post.excerpt,
                                  content: post.content
                                });
                                setBlogModalOpen(true);
                              }}
                              className="px-3 py-1.5 bg-[#1F1F1F] hover:bg-[#FFD400] hover:text-black rounded-lg text-white font-bold transition-colors inline-flex items-center gap-1"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Modifica</span>
                            </button>
                            <button
                              onClick={() => handleDeleteBlogPost(post.id)}
                              className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900 border border-red-900 text-red-300 rounded-lg font-bold transition-colors inline-flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Elimina</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: CONTRIBUTIONS */}
          {(activeNav !== 'dashboard' && activeNav !== 'content_mgmt' && activeNav !== 'blog_mgmt' && activeNav !== 'stats' && activeNav !== 'settings') && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-[#111111] border border-[#222222] rounded-3xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#222222] text-[10px] font-syne font-bold uppercase tracking-widest text-neutral-400 bg-[#0E0E0E]">
                        <th className="py-3 px-4">Codice</th>
                        <th className="py-3 px-4">Mittente</th>
                        <th className="py-3 px-4">Categoria</th>
                        <th className="py-3 px-4">Città</th>
                        <th className="py-3 px-4">Stato</th>
                        <th className="py-3 px-4 text-right">Azioni</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A1A1A] text-xs">
                      {filteredContributions.map((item) => (
                        <tr key={item.id} className="hover:bg-[#161616] transition-colors">
                          <td className="py-4 px-4 font-mono font-bold text-[#FFD400]">{item.referenceCode}</td>
                          <td className="py-4 px-4"><span className="font-bold text-white block">{item.name}</span></td>
                          <td className="py-4 px-4">{item.category}</td>
                          <td className="py-4 px-4">{item.city}</td>
                          <td className="py-4 px-4"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-800 text-neutral-300">{item.status}</span></td>
                          <td className="py-4 px-4 text-right">
                            <button onClick={() => setSelectedContribution(item)} className="px-3 py-1.5 bg-[#1F1F1F] hover:bg-[#FFD400] hover:text-black rounded-lg text-white font-bold">
                              Esamina
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: STATS */}
          {activeNav === 'stats' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-[#111111] border border-[#222222] rounded-2xl p-5 shadow-xl">
                  <span className="text-xs font-syne font-bold uppercase text-neutral-400 block mb-1">Contenuti Sito</span>
                  <span className="font-syne font-black text-3xl text-emerald-400">{stats.contentCount}</span>
                </div>
                <div className="bg-[#111111] border border-[#222222] rounded-2xl p-5 shadow-xl">
                  <span className="text-xs font-syne font-bold uppercase text-neutral-400 block mb-1">Articoli Blog</span>
                  <span className="font-syne font-black text-3xl text-[#FFD400]">{stats.blogCount}</span>
                </div>
                <div className="bg-[#111111] border border-[#222222] rounded-2xl p-5 shadow-xl">
                  <span className="text-xs font-syne font-bold uppercase text-neutral-400 block mb-1">Contributi Utenti</span>
                  <span className="font-syne font-black text-3xl text-white">{stats.total}</span>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: SETTINGS */}
          {activeNav === 'settings' && (
            <div className="bg-[#111111] border border-[#222222] rounded-3xl p-8 max-w-2xl space-y-6 animate-in fade-in">
              <h3 className="font-syne font-black text-xl text-white">Impostazioni Amministratore</h3>
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-400 mb-1">Email Amministratore</label>
                  <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-2.5 text-white" />
                </div>
                <button onClick={() => showToast('✓ Impostazioni salvate correttamente.')} className="px-6 py-3 bg-[#FFD400] text-black font-syne font-bold uppercase rounded-xl">
                  Salva modifiche
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* WEBSITE CONTENT ITEM CREATE / EDIT MODAL */}
      {contentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111111] border border-[#262626] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setContentModalOpen(false)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white bg-[#1A1A1A] p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-syne font-black text-2xl text-white">
              {editingContentId ? 'Modifica Contenuto del Sito' : 'Nuovo Contenuto per il Sito'}
            </h3>

            <form onSubmit={handleSaveContentItem} className="space-y-4 text-xs">
              <div>
                <label className="block font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">Titolo Notizia / Video *</label>
                <input
                  type="text"
                  required
                  placeholder="Es. Straordinaria scoperta..."
                  value={contentForm.title}
                  onChange={(e) => setContentForm({ ...contentForm, title: e.target.value })}
                  className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFD400]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">Categoria</label>
                  <select
                    value={contentForm.category}
                    onChange={(e) => setContentForm({ ...contentForm, category: e.target.value as Category })}
                    className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD400]"
                  >
                    <option value="VIRALI">VIRALI</option>
                    <option value="NEWS">NEWS</option>
                    <option value="VIDEO">VIDEO</option>
                    <option value="CULTURA">CULTURA</option>
                    <option value="SPORT">SPORT</option>
                  </select>
                </div>

                <div>
                  <label className="block font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">Provincia</label>
                  <select
                    value={contentForm.province}
                    onChange={(e) => setContentForm({ ...contentForm, province: e.target.value as Province })}
                    className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD400]"
                  >
                    <option value="Palermo">Palermo</option>
                    <option value="Catania">Catania</option>
                    <option value="Messina">Messina</option>
                    <option value="Siracusa">Siracusa</option>
                    <option value="Ragusa">Ragusa</option>
                    <option value="Trapani">Trapani</option>
                    <option value="Agrigento">Agrigento</option>
                  </select>
                </div>

                <div>
                  <label className="block font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">Badge</label>
                  <select
                    value={contentForm.badge}
                    onChange={(e) => setContentForm({ ...contentForm, badge: e.target.value as any })}
                    className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD400]"
                  >
                    <option value="VIRALE">VIRALE</option>
                    <option value="TRENDING">TRENDING</option>
                    <option value="VIDEO">VIDEO</option>
                    <option value="NEWS">NEWS</option>
                    <option value="NUOVO">NUOVO</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">URL Immagine</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={contentForm.image}
                  onChange={(e) => setContentForm({ ...contentForm, image: e.target.value })}
                  className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD400]"
                />
              </div>

              <div>
                <label className="block font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">Estratto</label>
                <textarea
                  rows={2}
                  placeholder="Breve sintesi..."
                  value={contentForm.excerpt}
                  onChange={(e) => setContentForm({ ...contentForm, excerpt: e.target.value })}
                  className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD400]"
                ></textarea>
              </div>

              <div>
                <label className="block font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">Contenuto Principale *</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Testo completo dell'articolo..."
                  value={contentForm.content}
                  onChange={(e) => setContentForm({ ...contentForm, content: e.target.value })}
                  className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD400]"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setContentModalOpen(false)}
                  className="px-5 py-3 bg-[#1C1C1C] hover:bg-[#262626] text-neutral-300 font-bold rounded-xl"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#FFD400] hover:bg-[#ffc200] text-black font-syne font-black uppercase rounded-xl shadow-lg"
                >
                  {editingContentId ? 'Salva Modifiche' : 'Pubblica sul Sito'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BLOG POST CREATE / EDIT MODAL */}
      {blogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111111] border border-[#262626] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setBlogModalOpen(false)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white bg-[#1A1A1A] p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-syne font-black text-2xl text-white">
              {editingBlogId ? 'Modifica Articolo Blog' : 'Nuovo Articolo Blog'}
            </h3>

            <form onSubmit={handleSaveBlogPost} className="space-y-4 text-xs">
              <div>
                <label className="block font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">Titolo Articolo *</label>
                <input
                  type="text"
                  required
                  placeholder="Es. I segreti della cucina..."
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFD400]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">Categoria</label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD400]"
                  >
                    <option value="Cultura">Cultura</option>
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="News">News</option>
                    <option value="Sport">Sport</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>
                </div>

                <div>
                  <label className="block font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">Autore</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD400]"
                  />
                </div>

                <div>
                  <label className="block font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">Tempo Lettura</label>
                  <input
                    type="text"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD400]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">URL Immagine</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={blogForm.image}
                  onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                  className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD400]"
                />
              </div>

              <div>
                <label className="block font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">Estratto</label>
                <textarea
                  rows={2}
                  placeholder="Sommario..."
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD400]"
                ></textarea>
              </div>

              <div>
                <label className="block font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">Contenuto *</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Testo dell'articolo..."
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD400]"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setBlogModalOpen(false)}
                  className="px-5 py-3 bg-[#1C1C1C] hover:bg-[#262626] text-neutral-300 font-bold rounded-xl"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#FFD400] hover:bg-[#ffc200] text-black font-syne font-black uppercase rounded-xl shadow-lg"
                >
                  {editingBlogId ? 'Salva Modifiche' : 'Pubblica Articolo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL MODAL FOR EXAMINATION */}
      {selectedContribution && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111111] border border-[#262626] rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto space-y-6">
            
            <button
              onClick={() => setSelectedContribution(null)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white bg-[#1A1A1A] p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between border-b border-[#222222] pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#FFD400] block mb-1">{selectedContribution.referenceCode}</span>
                <h3 className="font-syne font-black text-2xl text-white">Dettaglio Contributo</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                selectedContribution.status === 'NEW' ? 'bg-amber-950/40 text-amber-400 border border-amber-800' :
                selectedContribution.status === 'IN_REVIEW' ? 'bg-blue-950/40 text-blue-400 border border-blue-800' :
                selectedContribution.status === 'APPROVED' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800' :
                'bg-red-950/40 text-red-400 border border-red-800'
              }`}>
                {selectedContribution.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="bg-[#171717] p-4 rounded-2xl border border-[#222] space-y-2">
                <span className="text-[10px] font-bold uppercase text-neutral-500 block">Mittente</span>
                <p className="text-white font-bold text-sm">{selectedContribution.name}</p>
                <p className="text-neutral-300">{selectedContribution.email}</p>
                <p className="text-neutral-400">Città: {selectedContribution.city}</p>
              </div>

              <div className="bg-[#171717] p-4 rounded-2xl border border-[#222] space-y-2">
                <span className="text-[10px] font-bold uppercase text-neutral-500 block">Contenuto</span>
                <p className="text-white font-bold">Categoria: {selectedContribution.category}</p>
                <a href={selectedContribution.contentUrl} target="_blank" rel="noreferrer" className="text-[#FFD400] hover:underline truncate block">
                  {selectedContribution.contentUrl}
                </a>
                <p className="text-neutral-400">Data: {new Date(selectedContribution.createdAt).toLocaleString('it-IT')}</p>
              </div>
            </div>

            {selectedContribution.mediaUrl && (
              <div className="space-y-2">
                <span className="text-xs font-syne font-bold uppercase text-neutral-400">Media allegato</span>
                <div className="rounded-2xl overflow-hidden bg-black border border-[#222] h-64 flex items-center justify-center">
                  <img src={selectedContribution.mediaUrl} alt="Media" className="w-full h-full object-contain" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <span className="text-xs font-syne font-bold uppercase text-neutral-400">Descrizione</span>
              <p className="text-xs text-neutral-200 bg-[#171717] p-4 rounded-2xl border border-[#222] leading-relaxed">
                {selectedContribution.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#222] flex justify-end gap-3">
              <button
                onClick={() => updateStatus(selectedContribution.id, 'APPROVED')}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-black font-syne font-black text-xs uppercase rounded-xl shadow-lg"
              >
                ✓ Approva Contributo
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
