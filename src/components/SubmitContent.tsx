import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, Send, CheckCircle2, Upload, AlertCircle, X, CheckCircle, Trash2, Save, ArrowLeft, Copy, Search, ChevronDown, Check } from 'lucide-react';
import { PROVINCES_LIST } from '../data/mockData';

interface FormData {
  name: string;
  email: string;
  link: string;
  city: string;
  category: string;
  description: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  link?: string;
  city?: string;
  category?: string;
  file?: string;
  description?: string;
}

interface TouchedState {
  name?: boolean;
  email?: boolean;
  link?: boolean;
  city?: boolean;
  category?: boolean;
  file?: boolean;
  description?: boolean;
}

type FormStep = 'form' | 'review' | 'success';

const DRAFT_STORAGE_KEY = 'mw_submit_draft_advanced';

const RICH_CATEGORIES = [
  'Tecnologia',
  'News',
  'Intrattenimento',
  'Sport',
  'Cultura',
  'Musica',
  'Gaming',
  'Cinema',
  'Social Media',
  'Curiosità',
  'Lifestyle',
  'VIRALI',
  'Altro'
];

export const SubmitContent: React.FC = () => {
  const [step, setStep] = useState<FormStep>('form');
  
  const [formData, setFormData] = useState<FormData>(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          name: parsed.name || '',
          email: parsed.email || '',
          link: parsed.link || '',
          city: parsed.city || 'Palermo',
          category: parsed.category || 'Tecnologia',
          description: parsed.description || ''
        };
      }
    } catch {
      // ignore
    }
    return {
      name: '',
      email: '',
      link: '',
      city: 'Palermo',
      category: 'Tecnologia',
      description: ''
    };
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedState>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contributionCode, setContributionCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Autosave status state
  const [autosaveStatus, setAutosaveStatus] = useState<'Salvato automaticamente' | 'Salvataggio...' | ''>('Salvato automaticamente');
  const [isDragging, setIsDragging] = useState(false);

  // Category combobox search state
  const [categorySearch, setCategorySearch] = useState('');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  const saveTimeoutRef = useRef<any>(null);

  const triggerAutosave = useCallback((data: FormData) => {
    setAutosaveStatus('Salvataggio...');
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    
    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));
        setAutosaveStatus('Salvato automaticamente');
      } catch {
        setAutosaveStatus('Salvato automaticamente');
      }
    }, 500);
  }, []);

  // Close category dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target as Node)) {
        setCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Validate individual field
  const validateField = (field: string, value: any, fileVal: File | null = selectedFile): string | undefined => {
    switch (field) {
      case 'name':
        if (!value || !value.trim()) return 'Inserisci il tuo nome e cognome.';
        break;
      case 'email':
        if (!value || !value.trim()) return 'Inserisci il tuo indirizzo email.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Inserisci un indirizzo email valido.';
        break;
      case 'link':
        if (!value || !value.trim()) return 'Inserisci un link al contenuto.';
        break;
      case 'city':
        if (!value || !value.trim()) return 'Inserisci città o provincia.';
        break;
      case 'category':
        if (!value || !value.trim()) return 'Seleziona una categoria.';
        break;
      case 'file':
        if (!fileVal) return "Carica un'immagine o un video.";
        break;
      case 'description':
        if (!value || !value.trim()) return 'Inserisci una descrizione.';
        break;
      default:
        break;
    }
    return undefined;
  };

  // Validate entire form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const newTouched: TouchedState = {
      name: true,
      email: true,
      link: true,
      city: true,
      category: true,
      file: true,
      description: true
    };

    const nameErr = validateField('name', formData.name);
    const emailErr = validateField('email', formData.email);
    const linkErr = validateField('link', formData.link);
    const cityErr = validateField('city', formData.city);
    const catErr = validateField('category', formData.category);
    const fileErr = validateField('file', null, selectedFile);
    const descErr = validateField('description', formData.description);

    if (nameErr) newErrors.name = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (linkErr) newErrors.link = linkErr;
    if (cityErr) newErrors.city = cityErr;
    if (catErr) newErrors.category = catErr;
    if (fileErr) newErrors.file = fileErr;
    if (descErr) newErrors.description = descErr;

    setErrors(newErrors);
    setTouched(newTouched);

    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field: keyof FormData, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    triggerAutosave(updated);

    if (touched[field]) {
      const fieldError = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: fieldError }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const fieldError = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: fieldError }));
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setTouched(prev => ({ ...prev, file: true }));
    setErrors(prev => ({ ...prev, file: undefined }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setTouched(prev => ({ ...prev, file: true }));
    setErrors(prev => ({ ...prev, file: "Carica un'immagine o un video." }));
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleClearDraft = () => {
    if (window.confirm("Sei sicuro di voler cancellare i dati salvati?")) {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      setFormData({
        name: '',
        email: '',
        link: '',
        city: 'Palermo',
        category: 'Tecnologia',
        description: ''
      });
      setSelectedFile(null);
      setPreviewUrl(null);
      setErrors({});
      setTouched({});
      setAutosaveStatus('Salvato automaticamente');
    }
  };

  // Proceed to review step
  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      const firstErrorField = Object.keys(errors)[0];
      const el = document.getElementById(`field-${firstErrorField}`);
      if (el) el.focus();
      return;
    }
    setStep('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Final submit after review
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);

    // Generate unique contribution code e.g. WEB-2026-8F42K
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const generatedCode = `WEB-2026-${randomSuffix}`;

    const newContrib = {
      id: 'contrib-' + Date.now(),
      referenceCode: generatedCode,
      name: formData.name,
      email: formData.email,
      city: formData.city,
      category: formData.category,
      contentUrl: formData.link,
      mediaUrl: previewUrl || undefined,
      mediaType: selectedFile && selectedFile.type.includes('video') ? 'video' : 'image',
      description: formData.description,
      status: 'NEW' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        { date: new Date().toLocaleString('it-IT'), action: 'Contributo ricevuto', author: formData.name }
      ]
    };

    try {
      const existing = JSON.parse(localStorage.getItem('mw_admin_contributions') || '[]');
      localStorage.setItem('mw_admin_contributions', JSON.stringify([newContrib, ...existing]));
      window.dispatchEvent(new Event('mw_new_contribution'));
    } catch {
      // ignore
    }

    try {
      const targetUrl = localStorage.getItem('mw_formbold_url') || 'https://formbold.com/s/6707D';
      
      await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          contributionCode: generatedCode,
          fileName: selectedFile ? selectedFile.name : null,
          submittedAt: new Date().toISOString()
        })
      });

      // Clear draft
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      setContributionCode(generatedCode);
      setStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // Prototype fallback
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      setContributionCode(generatedCode);
      setStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      link: '',
      city: 'Palermo',
      category: 'Tecnologia',
      description: ''
    });
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrors({});
    setTouched({});
    setStep('form');
    setContributionCode('');
    setCopiedCode(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(contributionCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  // Calculate progress (out of 7 items)
  const completedFieldsCount = [
    Boolean(formData.name.trim()),
    Boolean(formData.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)),
    Boolean(formData.link.trim()),
    Boolean(formData.city.trim()),
    Boolean(formData.category.trim()),
    Boolean(selectedFile),
    Boolean(formData.description.trim())
  ].filter(Boolean).length;

  const progressPercentage = Math.round((completedFieldsCount / 7) * 100);

  // Filter categories for search
  const filteredCategories = RICH_CATEGORIES.filter(cat =>
    cat.toLowerCase().includes(categorySearch.toLowerCase())
  );

  // Helper for field class states
  const getFieldClass = (fieldName: keyof FormErrors) => {
    const isTouched = touched[fieldName as keyof TouchedState];
    const hasError = errors[fieldName];

    if (!isTouched) {
      return 'border-[#262626] focus:border-[#FFD400]';
    }
    if (hasError) {
      return 'border-[#C62828] focus:border-[#C62828] bg-[#C62828]/5';
    }
    return 'border-emerald-600/60 focus:border-emerald-500 bg-emerald-950/10';
  };

  return (
    <section id="segnala" className="py-24 bg-[#050505] relative overflow-hidden border-b border-[#1F1F1F]">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FFD400]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#141414] border border-[#262626] px-3.5 py-1 rounded-full text-xs font-syne font-bold uppercase tracking-wider text-[#FFD400] mb-4">
            <Sparkles className="w-4 h-4 text-[#C62828]" />
            <span>MEDIA HUB · SEGNALAZIONE VIRALE</span>
          </div>
          <h2 className="font-syne font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            HAI TROVATO QUALCOSA DI VIRALE?
          </h2>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto mb-4">
            Invia la tua segnalazione alla redazione. Compila i passaggi e ricevi il codice di monitoraggio.
          </p>

          {/* Autosave and Clear draft bar */}
          {step === 'form' && (
            <div className="inline-flex items-center gap-4 bg-[#111111] border border-[#222222] px-4 py-2 rounded-xl text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <Save className="w-3.5 h-3.5 text-[#FFD400]" />
                <span>{autosaveStatus}</span>
              </div>
              <span className="text-neutral-700">|</span>
              <button
                onClick={handleClearDraft}
                className="text-neutral-400 hover:text-red-400 transition-colors flex items-center gap-1"
                title="Cancella dati salvati"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Cancella dati salvati</span>
              </button>
            </div>
          )}
        </div>

        {/* STEP 1 & 2: FORM / EDITING */}
        {step === 'form' && (
          <div className="space-y-6">
            
            {/* Progress Indicator Card */}
            <div className="bg-[#111111] border border-[#222222] rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-syne font-bold text-xs uppercase tracking-wider text-neutral-300">
                  {completedFieldsCount} / 7 campi completati
                </span>
                <span className="font-syne font-extrabold text-xs text-[#FFD400]">
                  Contenuto completato — {progressPercentage}%
                </span>
              </div>
              <div className="w-full h-2 bg-[#1C1C1C] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#C62828] to-[#FFD400] transition-all duration-300 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleProceedToReview} noValidate className="bg-[#111111] border border-[#222222] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
              
              {/* 1. Informazioni */}
              <div className="space-y-4">
                <div className="border-b border-[#1C1C1C] pb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#FFD400]/10 text-[#FFD400] font-syne font-bold text-xs flex items-center justify-center border border-[#FFD400]/30">
                    1
                  </span>
                  <div>
                    <h3 className="font-syne font-extrabold text-sm uppercase tracking-wider text-white">
                      Informazioni personali
                    </h3>
                    <p className="text-xs text-neutral-400">Nome, email e provenienza del segnalatore.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                  
                  {/* Name */}
                  <div className="sm:col-span-1">
                    <label htmlFor="field-name" className="block text-xs font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Nome e Cognome <span className="text-[#C62828]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="field-name"
                        type="text"
                        placeholder="Es. Mario Rossi"
                        value={formData.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'error-name' : undefined}
                        className={`w-full bg-[#171717] border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${getFieldClass('name')}`}
                      />
                      {touched.name && !errors.name && (
                        <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                      )}
                    </div>
                    {touched.name && errors.name && (
                      <p id="error-name" className="mt-1.5 text-xs text-[#C62828] flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-1">
                    <label htmlFor="field-email" className="block text-xs font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Email <span className="text-[#C62828]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="field-email"
                        type="email"
                        placeholder="mario@email.com"
                        value={formData.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'error-email' : undefined}
                        className={`w-full bg-[#171717] border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${getFieldClass('email')}`}
                      />
                      {touched.email && !errors.email && (
                        <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                      )}
                    </div>
                    {touched.email && errors.email && (
                      <p id="error-email" className="mt-1.5 text-xs text-[#C62828] flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div className="sm:col-span-1">
                    <label htmlFor="field-city" className="block text-xs font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Città / Provincia <span className="text-[#C62828]">*</span>
                    </label>
                    <select
                      id="field-city"
                      value={formData.city}
                      onChange={(e) => handleFieldChange('city', e.target.value)}
                      onBlur={() => handleBlur('city')}
                      aria-invalid={!!errors.city}
                      aria-describedby={errors.city ? 'error-city' : undefined}
                      className={`w-full bg-[#171717] border rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors ${getFieldClass('city')}`}
                    >
                      {PROVINCES_LIST.filter(p => p !== 'Tutte').map((prov) => (
                        <option key={prov} value={prov}>{prov}</option>
                      ))}
                    </select>
                    {touched.city && errors.city && (
                      <p id="error-city" className="mt-1.5 text-xs text-[#C62828] flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.city}
                      </p>
                    )}
                  </div>

                </div>
              </div>

              {/* 2. Contenuto */}
              <div className="space-y-4 pt-4">
                <div className="border-b border-[#1C1C1C] pb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#FFD400]/10 text-[#FFD400] font-syne font-bold text-xs flex items-center justify-center border border-[#FFD400]/30">
                    2
                  </span>
                  <div>
                    <h3 className="font-syne font-extrabold text-sm uppercase tracking-wider text-white">
                      Contenuto & Media
                    </h3>
                    <p className="text-xs text-neutral-400">Link, categoria e file multimediali della segnalazione.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  
                  {/* Link */}
                  <div>
                    <label htmlFor="field-link" className="block text-xs font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Link al Contenuto <span className="text-[#C62828]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="field-link"
                        type="url"
                        placeholder="https://tiktok.com/@... o link web"
                        value={formData.link}
                        onChange={(e) => handleFieldChange('link', e.target.value)}
                        onBlur={() => handleBlur('link')}
                        aria-invalid={!!errors.link}
                        aria-describedby={errors.link ? 'error-link' : undefined}
                        className={`w-full bg-[#171717] border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${getFieldClass('link')}`}
                      />
                      {touched.link && !errors.link && (
                        <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                      )}
                    </div>
                    {touched.link && errors.link && (
                      <p id="error-link" className="mt-1.5 text-xs text-[#C62828] flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.link}
                      </p>
                    )}
                  </div>

                  {/* Searchable Category Combobox */}
                  <div className="relative" ref={categoryDropdownRef}>
                    <label htmlFor="field-category" className="block text-xs font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Categoria <span className="text-[#C62828]">*</span>
                    </label>
                    
                    <div
                      onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                      className={`w-full bg-[#171717] border rounded-xl px-4 py-3 text-sm text-white flex items-center justify-between cursor-pointer transition-colors ${getFieldClass('category')}`}
                    >
                      <span className={formData.category ? 'text-white' : 'text-neutral-500'}>
                        {formData.category || 'Seleziona una categoria...'}
                      </span>
                      <ChevronDown className="w-4 h-4 text-neutral-400" />
                    </div>

                    {categoryDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-[#141414] border border-[#2A2A2A] rounded-xl shadow-2xl z-30 p-3 space-y-2 animate-in fade-in">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                          <input
                            type="text"
                            placeholder="Cerca categoria..."
                            value={categorySearch}
                            onChange={(e) => setCategorySearch(e.target.value)}
                            className="w-full bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFD400]"
                            autoFocus
                          />
                        </div>

                        <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                          {filteredCategories.length > 0 ? (
                            filteredCategories.map((cat) => (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => {
                                  handleFieldChange('category', cat);
                                  setCategoryDropdownOpen(false);
                                  setCategorySearch('');
                                  setTouched(prev => ({ ...prev, category: true }));
                                  setErrors(prev => ({ ...prev, category: undefined }));
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                                  formData.category === cat ? 'bg-[#FFD400] text-black font-bold' : 'text-neutral-300 hover:bg-[#1E1E1E] hover:text-white'
                                }`}
                              >
                                <span>{cat}</span>
                                {formData.category === cat && <Check className="w-3.5 h-3.5" />}
                              </button>
                            ))
                          ) : (
                            <div className="py-4 text-center text-xs text-neutral-500">
                              Nessuna categoria trovata
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {touched.category && errors.category && (
                      <p id="error-category" className="mt-1.5 text-xs text-[#C62828] flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.category}
                      </p>
                    )}
                  </div>

                </div>

                {/* Drag & Drop Upload Zone */}
                <div>
                  <label className="block text-xs font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Upload Immagine / Video <span className="text-[#C62828]">*</span>
                  </label>
                  {previewUrl ? (
                    <div className="relative rounded-xl overflow-hidden border border-[#333333] h-32 bg-black flex items-center justify-center">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-85" />
                      <button
                        type="button"
                        onClick={removeFile}
                        className="absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors"
                        aria-label="Rimuovi file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all h-32 flex flex-col items-center justify-center ${
                        isDragging
                          ? 'border-[#FFD400] bg-[#FFD400]/10 scale-[1.01]'
                          : touched.file && errors.file
                          ? 'border-[#C62828] bg-[#C62828]/5'
                          : 'border-[#333333] hover:border-[#FFD400] bg-[#171717]'
                      }`}
                      onClick={() => {
                        const input = document.getElementById('hidden-file-input') as HTMLInputElement;
                        if (input) input.click();
                      }}
                    >
                      <Upload className={`w-5 h-5 mb-1 ${isDragging ? 'text-[#FFD400]' : 'text-neutral-400'}`} />
                      <span className="text-xs text-white font-syne font-bold">
                        {isDragging ? 'Rilascia il file per caricarlo' : 'Trascina qui il tuo file'}
                      </span>
                      <span className="text-[10px] text-neutral-400 mt-0.5">
                        oppure clicca per selezionarlo
                      </span>
                      <input
                        id="hidden-file-input"
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  )}
                  {touched.file && errors.file && (
                    <p id="error-file" className="mt-1.5 text-xs text-[#C62828] flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.file}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="field-description" className="block text-xs font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Descrizione <span className="text-[#C62828]">*</span>
                  </label>
                  <textarea
                    id="field-description"
                    rows={3}
                    placeholder="Raccontaci perché questo contenuto è interessante e dove è stato girato..."
                    value={formData.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    onBlur={() => handleBlur('description')}
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? 'error-description' : undefined}
                    className={`w-full bg-[#171717] border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${getFieldClass('description')}`}
                  ></textarea>
                  <div className="flex justify-between items-center mt-1.5">
                    {touched.description && errors.description ? (
                      <p id="error-description" className="text-xs text-[#C62828] flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.description}
                      </p>
                    ) : <span />}
                    <span className="text-[10px] text-neutral-500">{formData.description.length} caratteri</span>
                  </div>
                </div>

              </div>

              {/* Action Submit */}
              <div className="pt-4 border-t border-[#1C1C1C] flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  {completedFieldsCount === 7 ? '✓ Tutti i campi sono validi' : `Mancano ${7 - completedFieldsCount} campi`}
                </span>
                <button
                  type="submit"
                  className="px-8 py-4 bg-[#FFD400] hover:bg-[#ffc200] text-[#050505] font-syne font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-xl flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <span>Continua →</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* STEP 3: VERIFICA / RIEPILOGO */}
        {step === 'review' && (
          <div className="bg-[#111111] border border-[#222222] rounded-3xl p-6 sm:p-10 shadow-2xl animate-in fade-in space-y-8">
            
            <div className="border-b border-[#1C1C1C] pb-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-syne font-bold uppercase tracking-wider text-[#FFD400] block mb-1">
                  Passaggio 3 di 4
                </span>
                <h3 className="font-syne font-black text-2xl text-white">
                  Controlla il tuo contributo
                </h3>
              </div>
              <button
                onClick={() => setStep('form')}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white bg-[#1A1A1A] px-3.5 py-2 rounded-xl border border-[#262626] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Modifica</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Informazioni personali */}
              <div className="space-y-4 bg-[#171717] p-5 rounded-2xl border border-[#222222]">
                <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-[#FFD400]">
                  Informazioni personali
                </h4>
                <ul className="space-y-2 text-xs">
                  <li className="flex justify-between py-1 border-b border-[#222222]">
                    <span className="text-neutral-400">Nome:</span>
                    <span className="text-white font-medium">{formData.name}</span>
                  </li>
                  <li className="flex justify-between py-1 border-b border-[#222222]">
                    <span className="text-neutral-400">Email:</span>
                    <span className="text-white font-medium">{formData.email}</span>
                  </li>
                  <li className="flex justify-between py-1">
                    <span className="text-neutral-400">Città:</span>
                    <span className="text-white font-medium">{formData.city}</span>
                  </li>
                </ul>
              </div>

              {/* Contenuto */}
              <div className="space-y-4 bg-[#171717] p-5 rounded-2xl border border-[#222222]">
                <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-[#FFD400]">
                  Contenuto & Categoria
                </h4>
                <ul className="space-y-2 text-xs">
                  <li className="flex justify-between py-1 border-b border-[#222222]">
                    <span className="text-neutral-400">Categoria:</span>
                    <span className="text-white font-medium">{formData.category}</span>
                  </li>
                  <li className="flex justify-between py-1">
                    <span className="text-neutral-400">Link:</span>
                    <a href={formData.link} target="_blank" rel="noreferrer" className="text-[#FFD400] hover:underline truncate max-w-[200px]">
                      {formData.link}
                    </a>
                  </li>
                </ul>
              </div>

            </div>

            {/* Media Preview & Description */}
            <div className="space-y-4 bg-[#171717] p-5 rounded-2xl border border-[#222222]">
              <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-[#FFD400]">
                Media e Descrizione
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                {previewUrl && (
                  <div className="rounded-xl overflow-hidden h-32 bg-black border border-[#2A2A2A]">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className={`${previewUrl ? 'sm:col-span-2' : 'sm:col-span-3'} space-y-1`}>
                  <span className="text-[10px] uppercase font-bold text-neutral-500">Descrizione:</span>
                  <p className="text-xs text-neutral-300 leading-relaxed bg-[#111111] p-3 rounded-xl border border-[#222222]">
                    {formData.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="px-6 py-3.5 bg-[#1A1A1A] hover:bg-[#222222] text-white font-syne font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-[#262626] flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Modifica</span>
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinalSubmit}
                className="px-8 py-3.5 bg-[#FFD400] hover:bg-[#ffc200] text-[#050505] font-syne font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Invio in corso...</span>
                  </>
                ) : (
                  <>
                    <span>✓ Conferma e invia</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

        {/* STEP 4: PAGINA GRAZIE / SUCCESS */}
        {step === 'success' && (
          <div className="bg-[#111111] border border-[#222222] rounded-3xl p-8 sm:p-12 text-center shadow-2xl animate-in zoom-in-95 duration-300 space-y-6">
            
            <div className="w-20 h-20 rounded-full bg-[#FFD400]/10 text-[#FFD400] flex items-center justify-center mx-auto border border-[#FFD400]/30 shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-syne font-bold uppercase tracking-widest text-[#FFD400]">
                Passaggio 4 di 4 · Completato
              </span>
              <h3 className="font-syne font-black text-3xl sm:text-4xl text-white">
                ✓ Grazie per il tuo contributo!
              </h3>
              <p className="text-neutral-300 text-sm max-w-md mx-auto leading-relaxed">
                Abbiamo ricevuto correttamente il tuo contenuto. Il nostro team lo verificherà prima della pubblicazione.
              </p>
            </div>

            {/* Contribution Code Box */}
            <div className="max-w-xs mx-auto bg-[#171717] border border-[#2A2A2A] rounded-2xl p-5 space-y-3">
              <span className="text-[10px] font-syne font-bold uppercase tracking-wider text-neutral-400 block">
                Codice contributo
              </span>
              <div className="font-mono font-black text-lg text-[#FFD400] tracking-wider bg-black/60 py-2 rounded-xl border border-[#222222]">
                {contributionCode}
              </div>
              <button
                onClick={handleCopyCode}
                className="w-full py-2.5 bg-[#222222] hover:bg-[#2A2A2A] text-white font-syne font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Codice copiato!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#FFD400]" />
                    <span>Copia codice</span>
                  </>
                )}
              </button>
            </div>

            {/* Final Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#FFD400] hover:bg-[#ffc200] text-[#050505] font-syne font-black text-xs uppercase tracking-wider rounded-full shadow-lg transition-all"
              >
                Invia un altro contenuto
              </button>
              
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleReset();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#171717] hover:bg-[#222222] text-white font-syne font-bold text-xs uppercase tracking-wider rounded-full transition-all border border-[#262626]"
              >
                Torna alla home
              </a>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
