import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FileText, Clock, CheckCircle2, XCircle, Archive, 
  ListOrdered, BarChart3, Settings, Search, Bell, User, LogOut, 
  Menu, X, Eye, Check, ChevronRight, ShieldCheck, Download, Trash2, 
  Play, Pause, Volume2, Maximize2, AlertCircle, Filter, Calendar
} from 'lucide-react';
import { ContributionItem, ContributionStatus, TimelineEvent } from '../types';

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
  },
  {
    id: 'contrib-2',
    referenceCode: 'WEB-2026-3A91B',
    name: 'Giulia Gialli',
    email: 'giulia@email.com',
    city: 'Catania',
    category: 'News',
    contentUrl: 'https://instagram.com/p/ct2918',
    mediaUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    description: 'Intervista esclusiva sul nuovo lungomare di Catania.',
    status: 'IN_REVIEW',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    reviewedBy: 'Admin Redazione',
    timeline: [
      { date: new Date(Date.now() - 3600000 * 5).toLocaleString('it-IT'), action: 'Contributo ricevuto', author: 'Giulia Gialli' },
      { date: new Date(Date.now() - 3600000 * 4).toLocaleString('it-IT'), action: 'Messo in revisione', author: 'Admin Redazione' }
    ]
  },
  {
    id: 'contrib-3',
    referenceCode: 'WEB-2026-9C21X',
    name: 'Alessandro Neri',
    email: 'alessandro@email.com',
    city: 'Messina',
    category: 'Sport',
    contentUrl: 'https://youtube.com/watch?v=xyz',
    mediaUrl: 'https://images.unsplash.com/photo-1517649763962-0c6232660102?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    description: 'Torneo internazionale di beach volley sullo Stretto di Messina.',
    status: 'APPROVED',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    reviewedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    reviewedBy: 'Direttore Responsabile',
    timeline: [
      { date: new Date(Date.now() - 3600000 * 24).toLocaleString('it-IT'), action: 'Contributo ricevuto', author: 'Alessandro Neri' },
      { date: new Date(Date.now() - 3600000 * 22).toLocaleString('it-IT'), action: 'Messo in revisione', author: 'Admin Redazione' },
      { date: new Date(Date.now() - 3600000 * 20).toLocaleString('it-IT'), action: 'Approvato', author: 'Direttore Responsabile' }
    ]
  }
];

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('giuliam.anzalone22@gmail.com');
  const [adminPassword, setAdminPassword] = useState('Palermo@26');
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

  const [selectedContribution, setSelectedContribution] = useState<ContributionItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Sync contributions to localStorage
  useEffect(() => {
    localStorage.setItem('mw_admin_contributions', JSON.stringify(contributions));
  }, [contributions]);

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
            <p className="text-xs text-neutral-400">Inserisci le credenziali di accesso per gestire i contributi di Il Meglio del Web.</p>
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
                placeholder="Qualsiasi password (es. admin123)"
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
    total: contributions.length
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

    const matchesCategory =
      categoryFilter === 'ALL' || item.category === categoryFilter;

    let matchesNav = true;
    if (activeNav === 'new') matchesNav = item.status === 'NEW';
    else if (activeNav === 'in_review') matchesNav = item.status === 'IN_REVIEW';
    else if (activeNav === 'approved') matchesNav = item.status === 'APPROVED';
    else if (activeNav === 'rejected') matchesNav = item.status === 'REJECTED';
    else if (activeNav === 'archived') matchesNav = item.status === 'ARCHIVED';

    return matchesSearch && matchesStatus && matchesCategory && matchesNav;
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

  // Bulk actions
  const handleBulkAction = (actionType: 'APPROVE' | 'REVIEW' | 'ARCHIVE' | 'EXPORT') => {
    if (selectedIds.length === 0) {
      showToast('Seleziona almeno un contributo.');
      return;
    }

    if (actionType === 'EXPORT') {
      const csvContent = "data:text/csv;charset=utf-8," + 
        ["Codice,Nome,Email,Città,Categoria,Stato,Data"].join(",") + "\n" +
        filteredContributions.filter(c => selectedIds.includes(c.id)).map(c => 
          [c.referenceCode, c.name, c.email, c.city, c.category, c.status, c.createdAt].join(",")
        ).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "contributi_ilmegliodelweb.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('✓ Contributi esportati in CSV.');
      return;
    }

    const targetStatus: ContributionStatus = 
      actionType === 'APPROVE' ? 'APPROVED' :
      actionType === 'REVIEW' ? 'IN_REVIEW' : 'ARCHIVED';

    setContributions(prev => prev.map(c => {
      if (selectedIds.includes(c.id)) {
        return {
          ...c,
          status: targetStatus,
          updatedAt: new Date().toISOString(),
          timeline: [{ date: new Date().toLocaleString('it-IT'), action: `Azione multipla: ${targetStatus}`, author: 'Admin Redazione' }, ...c.timeline]
        };
      }
      return c;
    }));

    showToast(`✓ Applicata azione multipla su ${selectedIds.length} elementi.`);
    setSelectedIds([]);
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
              <span className="text-[10px] text-neutral-400">Il Meglio del Web</span>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, count: null },
            { id: 'new', label: 'Nuovi contributi', icon: FileText, count: stats.new },
            { id: 'in_review', label: 'In revisione', icon: Clock, count: stats.inReview },
            { id: 'approved', label: 'Approvati', icon: CheckCircle2, count: stats.approved },
            { id: 'rejected', label: 'Rifiutati', icon: XCircle, count: stats.rejected },
            { id: 'archived', label: 'Archiviati', icon: Archive, count: stats.archived },
            { id: 'all', label: 'Tutti i contributi', icon: ListOrdered, count: stats.total },
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
                 activeNav === 'new' ? 'Nuovi Contributi' :
                 activeNav === 'in_review' ? 'Contributi in Revisione' :
                 activeNav === 'approved' ? 'Contributi Approvati' :
                 activeNav === 'rejected' ? 'Contributi Rifiutati' :
                 activeNav === 'archived' ? 'Contributi Archiviati' :
                 activeNav === 'all' ? 'Tutti i Contributi' :
                 activeNav === 'stats' ? 'Statistiche & Analisi' : 'Impostazioni Admin'}
              </h1>
              <p className="text-[11px] text-neutral-400">Gestione e moderazione contenuti editoriali</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            
            {/* Global Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Cerca contributi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#141414] border border-[#262626] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFD400] w-64"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center text-neutral-300 hover:text-white relative"
              >
                <Bell className="w-4 h-4" />
                {stats.new > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C62828] text-white text-[9px] font-black flex items-center justify-center">
                    {stats.new}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#111111] border border-[#262626] rounded-2xl shadow-2xl p-4 z-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#222222] pb-2">
                    <span className="font-syne font-bold text-xs uppercase text-white">Notifiche Admin</span>
                    <span className="text-[10px] text-[#FFD400]">{stats.new} nuove</span>
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {contributions.filter(c => c.status === 'NEW').slice(0, 5).map(c => (
                      <div key={c.id} onClick={() => { setSelectedContribution(c); setNotificationsOpen(false); }} className="bg-[#171717] hover:bg-[#1F1F1F] p-2.5 rounded-xl cursor-pointer transition-colors">
                        <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1">
                          <span className="text-[#FFD400] font-mono">{c.referenceCode}</span>
                          <span>{c.city}</span>
                        </div>
                        <p className="text-xs text-white font-medium truncate">Nuovo da {c.name} ({c.category})</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                {[
                  { label: 'Nuovi contributi', count: stats.new, color: 'text-amber-400', bg: 'bg-amber-950/20', border: 'border-amber-900/40', filter: 'new' },
                  { label: 'In revisione', count: stats.inReview, color: 'text-blue-400', bg: 'bg-blue-950/20', border: 'border-blue-900/40', filter: 'in_review' },
                  { label: 'Approvati', count: stats.approved, color: 'text-emerald-400', bg: 'bg-emerald-950/20', border: 'border-emerald-900/40', filter: 'approved' },
                  { label: 'Rifiutati', count: stats.rejected, color: 'text-red-400', bg: 'bg-red-950/20', border: 'border-red-900/40', filter: 'rejected' },
                  { label: 'Archiviati', count: stats.archived, color: 'text-neutral-400', bg: 'bg-neutral-900/40', border: 'border-neutral-800', filter: 'archived' },
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

              {/* Quick Actions & Recent */}
              <div className="bg-[#111111] border border-[#222222] rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-syne font-extrabold text-sm uppercase tracking-wider text-white">
                    Ultimi contributi ricevuti
                  </h3>
                  <button
                    onClick={() => setActiveNav('new')}
                    className="text-xs text-[#FFD400] hover:underline font-bold"
                  >
                    Vedi tutti →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#222222] text-[10px] font-syne font-bold uppercase tracking-widest text-neutral-400">
                        <th className="py-3 px-4">Codice</th>
                        <th className="py-3 px-4">Mittente</th>
                        <th className="py-3 px-4">Categoria</th>
                        <th className="py-3 px-4">Città</th>
                        <th className="py-3 px-4">Data</th>
                        <th className="py-3 px-4">Stato</th>
                        <th className="py-3 px-4 text-right">Azioni</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A1A1A] text-xs">
                      {contributions.slice(0, 5).map((item) => (
                        <tr key={item.id} className="hover:bg-[#161616] transition-colors">
                          <td className="py-4 px-4 font-mono font-bold text-[#FFD400]">{item.referenceCode}</td>
                          <td className="py-4 px-4">
                            <span className="font-bold text-white block">{item.name}</span>
                            <span className="text-[10px] text-neutral-500">{item.email}</span>
                          </td>
                          <td className="py-4 px-4"><span className="bg-[#1C1C1C] px-2.5 py-1 rounded-lg text-neutral-300">{item.category}</span></td>
                          <td className="py-4 px-4 text-neutral-300">{item.city}</td>
                          <td className="py-4 px-4 text-neutral-400">{new Date(item.createdAt).toLocaleDateString('it-IT')}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                              item.status === 'NEW' ? 'bg-amber-950/40 text-amber-400 border border-amber-800' :
                              item.status === 'IN_REVIEW' ? 'bg-blue-950/40 text-blue-400 border border-blue-800' :
                              item.status === 'APPROVED' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800' :
                              item.status === 'REJECTED' ? 'bg-red-950/40 text-red-400 border border-red-800' :
                              'bg-neutral-800 text-neutral-400'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => setSelectedContribution(item)}
                              className="px-3 py-1.5 bg-[#1F1F1F] hover:bg-[#FFD400] hover:text-black rounded-lg text-white font-bold transition-colors inline-flex items-center gap-1.5"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Esamina</span>
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

          {/* VIEW: CONTRIBUTIONS TABLE (NEW, IN_REVIEW, APPROVED, REJECTED, ARCHIVED, ALL) */}
          {(activeNav !== 'dashboard' && activeNav !== 'stats' && activeNav !== 'settings') && (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Filters & Bulk Toolbar */}
              <div className="bg-[#111111] border border-[#222222] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-grow sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Cerca per nome, email, città..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#171717] border border-[#262626] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFD400]"
                    />
                  </div>

                  {/* Status filter dropdown */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[#171717] border border-[#262626] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFD400]"
                  >
                    <option value="ALL">Tutti gli stati</option>
                    <option value="NEW">Nuovo</option>
                    <option value="IN_REVIEW">In revisione</option>
                    <option value="APPROVED">Approvato</option>
                    <option value="REJECTED">Rifiutato</option>
                    <option value="ARCHIVED">Archiviato</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {selectedIds.length > 0 && (
                    <>
                      <button
                        onClick={() => handleBulkAction('APPROVE')}
                        className="px-3 py-2 bg-emerald-950/40 border border-emerald-800 text-emerald-300 rounded-xl text-xs font-bold hover:bg-emerald-900/50"
                      >
                        Approva ({selectedIds.length})
                      </button>
                      <button
                        onClick={() => handleBulkAction('ARCHIVE')}
                        className="px-3 py-2 bg-[#1C1C1C] border border-[#333] text-neutral-300 rounded-xl text-xs font-bold hover:bg-[#262626]"
                      >
                        Archivia ({selectedIds.length})
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleBulkAction('EXPORT')}
                    className="px-4 py-2 bg-[#1C1C1C] hover:bg-[#262626] border border-[#2A2A2A] text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-[#FFD400]" />
                    <span>Esporta CSV</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-[#111111] border border-[#222222] rounded-3xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#222222] text-[10px] font-syne font-bold uppercase tracking-widest text-neutral-400 bg-[#0E0E0E]">
                        <th className="py-3 px-4 w-10">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) setSelectedIds(filteredContributions.map(c => c.id));
                              else setSelectedIds([]);
                            }}
                            checked={selectedIds.length === filteredContributions.length && filteredContributions.length > 0}
                            className="rounded bg-[#171717] border-[#333] text-[#FFD400] focus:ring-0"
                          />
                        </th>
                        <th className="py-3 px-4">Codice</th>
                        <th className="py-3 px-4">Mittente</th>
                        <th className="py-3 px-4">Categoria</th>
                        <th className="py-3 px-4">Città</th>
                        <th className="py-3 px-4">Data</th>
                        <th className="py-3 px-4">Stato</th>
                        <th className="py-3 px-4 text-right">Azioni</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A1A1A] text-xs">
                      {filteredContributions.length > 0 ? (
                        filteredContributions.map((item) => (
                          <tr key={item.id} className="hover:bg-[#161616] transition-colors">
                            <td className="py-4 px-4">
                              <input
                                type="checkbox"
                                checked={selectedIds.includes(item.id)}
                                onChange={(e) => {
                                  if (e.target.checked) setSelectedIds(prev => [...prev, item.id]);
                                  else setSelectedIds(prev => prev.filter(id => id !== item.id));
                                }}
                                className="rounded bg-[#171717] border-[#333] text-[#FFD400] focus:ring-0"
                              />
                            </td>
                            <td className="py-4 px-4 font-mono font-bold text-[#FFD400]">{item.referenceCode}</td>
                            <td className="py-4 px-4">
                              <span className="font-bold text-white block">{item.name}</span>
                              <span className="text-[10px] text-neutral-500">{item.email}</span>
                            </td>
                            <td className="py-4 px-4"><span className="bg-[#1C1C1C] px-2.5 py-1 rounded-lg text-neutral-300">{item.category}</span></td>
                            <td className="py-4 px-4 text-neutral-300">{item.city}</td>
                            <td className="py-4 px-4 text-neutral-400">{new Date(item.createdAt).toLocaleDateString('it-IT')}</td>
                            <td className="py-4 px-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                                item.status === 'NEW' ? 'bg-amber-950/40 text-amber-400 border border-amber-800' :
                                item.status === 'IN_REVIEW' ? 'bg-blue-950/40 text-blue-400 border border-blue-800' :
                                item.status === 'APPROVED' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800' :
                                item.status === 'REJECTED' ? 'bg-red-950/40 text-red-400 border border-red-800' :
                                'bg-neutral-800 text-neutral-400'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <button
                                onClick={() => setSelectedContribution(item)}
                                className="px-3 py-1.5 bg-[#1F1F1F] hover:bg-[#FFD400] hover:text-black rounded-lg text-white font-bold transition-colors inline-flex items-center gap-1.5"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Esamina</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-neutral-500">
                            Nessun contributo trovato in questa sezione.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* VIEW: STATISTICHE */}
          {activeNav === 'stats' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-[#111111] border border-[#222222] rounded-2xl p-5 shadow-xl">
                  <span className="text-xs font-syne font-bold uppercase text-neutral-400 block mb-1">Contributi Totali</span>
                  <span className="font-syne font-black text-3xl text-white">{stats.total}</span>
                </div>
                <div className="bg-[#111111] border border-[#222222] rounded-2xl p-5 shadow-xl">
                  <span className="text-xs font-syne font-bold uppercase text-neutral-400 block mb-1">Tasso di Approvazione</span>
                  <span className="font-syne font-black text-3xl text-emerald-400">
                    {stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}%
                  </span>
                </div>
                <div className="bg-[#111111] border border-[#222222] rounded-2xl p-5 shadow-xl">
                  <span className="text-xs font-syne font-bold uppercase text-neutral-400 block mb-1">In Attesa di Revisione</span>
                  <span className="font-syne font-black text-3xl text-amber-400">{stats.new + stats.inReview}</span>
                </div>
                <div className="bg-[#111111] border border-[#222222] rounded-2xl p-5 shadow-xl">
                  <span className="text-xs font-syne font-bold uppercase text-neutral-400 block mb-1">Contributi Rifiutati</span>
                  <span className="font-syne font-black text-3xl text-red-400">{stats.rejected}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#111111] border border-[#222222] rounded-3xl p-6 shadow-xl space-y-4">
                  <h3 className="font-syne font-bold text-sm uppercase text-white">Distribuzione per Stato</h3>
                  <div className="space-y-3 pt-2">
                    {[
                      { label: 'Approvati', count: stats.approved, color: 'bg-emerald-500' },
                      { label: 'Nuovi', count: stats.new, color: 'bg-amber-500' },
                      { label: 'In revisione', count: stats.inReview, color: 'bg-blue-500' },
                      { label: 'Rifiutati', count: stats.rejected, color: 'bg-red-500' },
                      { label: 'Archiviati', count: stats.archived, color: 'bg-neutral-600' },
                    ].map((st, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-neutral-300">{st.label}</span>
                          <span className="font-bold text-white">{st.count}</span>
                        </div>
                        <div className="w-full h-2 bg-[#1C1C1C] rounded-full overflow-hidden">
                          <div className={`h-full ${st.color}`} style={{ width: `${stats.total > 0 ? (st.count / stats.total) * 100 : 0}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#111111] border border-[#222222] rounded-3xl p-6 shadow-xl space-y-4">
                  <h3 className="font-syne font-bold text-sm uppercase text-white">Attività Recente</h3>
                  <div className="space-y-3">
                    {contributions.slice(0, 4).map(c => (
                      <div key={c.id} className="bg-[#171717] p-3 rounded-xl flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-white block">{c.name} ({c.category})</span>
                          <span className="text-[10px] text-neutral-400">{c.city} · {new Date(c.createdAt).toLocaleDateString('it-IT')}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#222] text-[#FFD400]">{c.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: IMPOSTAZIONI */}
          {activeNav === 'settings' && (
            <div className="bg-[#111111] border border-[#222222] rounded-3xl p-8 max-w-2xl space-y-6 animate-in fade-in">
              <h3 className="font-syne font-black text-xl text-white">Impostazioni Amministratore</h3>
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-400 mb-1">Email Amministratore</label>
                  <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-2.5 text-white" />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Notifiche Email</label>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded bg-[#171717] border-[#333] text-[#FFD400]" />
                    <span className="text-white">Invia email alla ricezione di un nuovo contributo</span>
                  </div>
                </div>
                <button onClick={() => showToast('✓ Impostazioni salvate correttamente.')} className="px-6 py-3 bg-[#FFD400] text-black font-syne font-bold uppercase rounded-xl">
                  Salva modifiche
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

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

            {/* Media preview */}
            {selectedContribution.mediaUrl && (
              <div className="space-y-2">
                <span className="text-xs font-syne font-bold uppercase text-neutral-400">Media allegato</span>
                <div className="rounded-2xl overflow-hidden bg-black border border-[#222] h-64 flex items-center justify-center">
                  <img src={selectedContribution.mediaUrl} alt="Media" className="w-full h-full object-contain" />
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <span className="text-xs font-syne font-bold uppercase text-neutral-400">Descrizione</span>
              <p className="text-xs text-neutral-200 bg-[#171717] p-4 rounded-2xl border border-[#222] leading-relaxed">
                {selectedContribution.description}
              </p>
            </div>

            {/* Timeline history */}
            <div className="space-y-3">
              <span className="text-xs font-syne font-bold uppercase text-neutral-400">Cronologia & Timeline</span>
              <div className="bg-[#171717] p-4 rounded-2xl border border-[#222] space-y-2 text-xs">
                {selectedContribution.timeline.map((evt, idx) => (
                  <div key={idx} className="flex items-start justify-between border-b border-[#222] pb-2 last:border-0 last:pb-0">
                    <div>
                      <span className="font-bold text-white block">{evt.action}</span>
                      {evt.note && <span className="text-neutral-400 text-[11px]">Motivo: {evt.note}</span>}
                    </div>
                    <span className="text-[10px] text-neutral-500 font-mono">{evt.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rejection input prompt if rejecting */}
            {rejectionModalOpen && (
              <div className="bg-red-950/20 border border-red-900/50 p-4 rounded-2xl space-y-3 animate-in fade-in">
                <span className="text-xs font-bold text-red-300 block">Specifica il motivo del rifiuto:</span>
                <input
                  type="text"
                  placeholder="Es. Contenuto non conforme o duplicato..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full bg-[#171717] border border-red-900 rounded-xl px-4 py-2 text-xs text-white"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      updateStatus(selectedContribution.id, 'REJECTED', rejectionReason || 'Non specificato');
                      setRejectionModalOpen(false);
                      setRejectionReason('');
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl"
                  >
                    Conferma Rifiuto
                  </button>
                  <button
                    onClick={() => setRejectionModalOpen(false)}
                    className="px-4 py-2 bg-[#222] text-neutral-300 text-xs rounded-xl"
                  >
                    Annulla
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#222] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateStatus(selectedContribution.id, 'IN_REVIEW')}
                  className="px-4 py-2.5 bg-blue-950/40 border border-blue-800 text-blue-300 rounded-xl text-xs font-bold hover:bg-blue-900/50"
                >
                  Metti in revisione
                </button>
                <button
                  onClick={() => updateStatus(selectedContribution.id, 'ARCHIVED')}
                  className="px-4 py-2.5 bg-[#1C1C1C] border border-[#333] text-neutral-300 rounded-xl text-xs font-bold hover:bg-[#262626]"
                >
                  Archivia
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setRejectionModalOpen(true)}
                  className="px-4 py-2.5 bg-red-950/40 border border-red-800 text-red-300 rounded-xl text-xs font-bold hover:bg-red-900/50"
                >
                  ✕ Rifiuta
                </button>
                <button
                  onClick={() => updateStatus(selectedContribution.id, 'APPROVED')}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-black font-syne font-black text-xs uppercase tracking-wider rounded-xl shadow-lg"
                >
                  ✓ Approva Contributo
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
