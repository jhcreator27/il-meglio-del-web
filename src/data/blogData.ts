import { BlogPost } from '../types';

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'I segreti della cucina siciliana antica: ricette tramandate nei secoli',
    slug: 'segreti-cucina-siciliana-antica',
    excerpt: 'Un viaggio sensoriale tra i sapori dimenticati dell’isola, dalle mandorle di Avola alle spezie arabe.',
    content: `La cucina siciliana è molto più di una semplice raccolta di ricette: è un racconto millenario di dominazioni, tradizioni e amore per la terra. Dai mercati storici di Ballarò e Vucciria fino alle antiche cucine dei conventi barocchi, ogni piatto custodisce un segreto ineguagliabile.\n\n### Le origini arabe e normanne\nL'influenza araba ha introdotto in Sicilia agrumi, spezie e tecniche di conservazione straordinarie come il couscous di pesce trapanese. Successivamente, i Normanni e gli spagnoli hanno arricchito la tavola con carni e dolci barocchi.\n\n### L'importanza delle materie prime\nUsare ingredienti locali e di stagione come il pomodoro Siccagno di Valledolmo, i pistacchi di Bronte o il cappero di Pantelleria fa la differenza tra un piatto comune e un'opera d'arte culinaria.`,
    category: 'Cultura',
    author: 'Giulia Anzalone',
    date: '4 Ottobre 2026',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    views: 1420
  },
  {
    id: 'blog-2',
    title: 'Startup e innovazione digitale: come la Sicilia sta diventando la Silicon Valley del Mediterraneo',
    slug: 'startup-innovazione-digitale-sicilia',
    excerpt: 'Poli tecnologici, incubatori e giovani talenti che scelgono di rimanere e investire nell’isola.',
    content: `Negli ultimi anni, la Sicilia ha visto fiorire un ecosistema di startup e aziende tecnologiche di altissimo livello. Da Catania a Palermo, passando per Messina e Ragusa, i giovani ingegneri e creativi digitali stanno ridefinendo il futuro dell'economia isolana.\n\n### Centri di eccellenza\nLe università siciliane stanno stringendo forti collaborazioni con colossi tecnologici e acceleratori internazionali. L'intelligenza artificiale, la sostenibilità energetica e il turismo digitale sono i settori trainanti.\n\n### Perchè restare\nVivere in Sicilia godendo di un'alta qualità della vita e lavorando su progetti globali non è più un'utopia, ma una solida realtà per centinaia di professionisti.`,
    category: 'Tecnologia',
    author: 'Redazione MW',
    date: '2 Ottobre 2026',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    views: 980
  },
  {
    id: 'blog-3',
    title: 'I borghi più affascinanti della Sicilia che nessuno racconta abbastanza',
    slug: 'borghi-affascinanti-sicilia',
    excerpt: 'Da Petralia Sottana a Gangi, piccoli gioielli incastonati tra montagne e valli ricche di storia.',
    content: `Lontano dalle rotte turistiche di massa, l'entroterra siciliano custodisce borghi medievali perfettamente conservati, castelli arroccati e panorami mozzafiato.\n\n### Arte e pietra lavica\nCamminare per i vicoli di questi borghi è come fare un salto indietro nel tempo. Le botteghe artigiane e i prodotti tipici locali offrono un'esperienza autentica e indimenticabile per ogni viaggiatore.`,
    category: 'Cultura',
    author: 'Marco Vasta',
    date: '28 Settembre 2026',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    views: 2150
  }
];
