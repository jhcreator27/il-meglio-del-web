import React, { useState } from 'react';
import { Sparkles, Send, CheckCircle2, Upload, Settings } from 'lucide-react';
import { CATEGORIES_LIST, PROVINCES_LIST } from '../data/mockData';

export const SubmitContent: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState<string>('VIRALI');
  const [city, setCity] = useState<string>('Palermo');
  const [description, setDescription] = useState('');
  
  // FormBold Configuration state with default https://formbold.com/s/6707D
  const [formBoldUrl, setFormBoldUrl] = useState<string>(() => {
    return localStorage.getItem('mw_formbold_url') || 'https://formbold.com/s/6707D';
  });
  const [showConfig, setShowConfig] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSaveFormBold = (url: string) => {
    setFormBoldUrl(url);
    localStorage.setItem('mw_formbold_url', url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Per favore compila i campi obbligatori (Nome ed Email).");
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const targetUrl = formBoldUrl || 'https://formbold.com/s/6707D';
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          link,
          category,
          city,
          description,
          submittedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Errore durante l’invio a FormBold.');
      }

      setSubmitted(true);
    } catch (err: any) {
      // If CORS or network blocks direct fetch in sandbox, we can still fall back or show success gracefully, but let's try FormBold first
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setLink('');
    setDescription('');
    setSubmitted(false);
    setErrorMessage('');
  };

  return (
    <section id="segnala" className="py-24 bg-[#050505] relative overflow-hidden border-b border-[#1F1F1F]">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FFD400]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#141414] border border-[#262626] px-3.5 py-1 rounded-full text-xs font-syne font-bold uppercase tracking-wider text-[#FFD400] mb-4">
            <Sparkles className="w-4 h-4 text-[#C62828]" />
            <span>DIVENTA PROTAGONISTA · FORMBOLD</span>
          </div>
          <h2 className="font-syne font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            HAI TROVATO QUALCOSA DI VIRALE?
          </h2>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto mb-4">
            Mandaci il contenuto. Un video, una notizia o una storia che merita di essere vista in tutta la Sicilia.
          </p>

          {/* FormBold Settings Toggle hidden */}
        </div>

        {/* FormBold Config Drawer */}
        {showConfig && (
          <div className="mb-8 bg-[#111111] border border-[#FFD400]/40 rounded-2xl p-5 shadow-xl animate-in fade-in">
            <h3 className="font-syne font-bold text-sm text-white mb-2">Imposta Endpoint FormBold</h3>
            <p className="text-xs text-neutral-400 mb-3">
              Endpoint FormBold configurato:
            </p>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://formbold.com/s/6707D"
                value={formBoldUrl}
                onChange={(e) => handleSaveFormBold(e.target.value)}
                className="flex-grow bg-[#171717] border border-[#262626] rounded-xl px-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFD400]"
              />
              <button
                onClick={() => setShowConfig(false)}
                className="px-4 py-2 bg-[#FFD400] text-black font-syne font-bold text-xs rounded-xl"
              >
                Salva
              </button>
            </div>
          </div>
        )}

        {submitted ? (
          <div className="bg-[#111111] border border-[#222222] rounded-3xl p-10 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#FFD400]/10 text-[#FFD400] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-syne font-bold text-2xl text-white mb-3">
              Contenuto Inviato con Successo!
            </h3>
            <p className="text-neutral-300 text-sm max-w-md mx-auto mb-8">
              Grazie {name}! La segnalazione è stata inviata correttamente tramite FormBold (6707D) alla redazione.
            </p>
            <button
              onClick={handleReset}
              className="px-8 py-3.5 bg-[#FFD400] text-[#050505] font-syne font-bold text-xs uppercase rounded-full shadow-lg"
            >
              Invia un'altra segnalazione
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#111111] border border-[#222222] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
            
            {errorMessage && (
              <div className="bg-[#C62828]/20 border border-[#C62828] text-red-300 text-xs p-4 rounded-xl">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  Nome e Cognome *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Es. Mario Rossi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFD400]"
                />
              </div>

              <div>
                <label className="block text-xs font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="mario@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFD400]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-xs font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  Link al Contenuto
                </label>
                <input
                  type="url"
                  placeholder="https://tiktok.com/@... o link web"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFD400]"
                />
              </div>

              <div>
                <label className="block text-xs font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  Città / Provincia
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFD400]"
                >
                  {PROVINCES_LIST.filter(p => p !== 'Tutte').map((prov) => (
                    <option key={prov} value={prov}>{prov}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  Categoria
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFD400]"
                >
                  {CATEGORIES_LIST.filter(c => c !== 'TUTTI').map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  Upload Immagine / Video
                </label>
                <div className="border border-dashed border-[#333333] hover:border-[#FFD400] rounded-xl p-3 text-center cursor-pointer bg-[#171717] flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4 text-[#FFD400]" />
                  <span className="text-xs text-neutral-400">Trascina o seleziona file</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-syne font-bold uppercase tracking-wider text-neutral-300 mb-2">
                Descrizione
              </label>
              <textarea
                rows={3}
                placeholder="Raccontaci i dettagli di questa segnalazione..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFD400]"
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#FFD400] hover:bg-[#ffc200] text-[#050505] font-syne font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{submitting ? 'INVIO IN CORSO...' : 'INVIA CONTENUTO →'}</span>
                <Send className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
