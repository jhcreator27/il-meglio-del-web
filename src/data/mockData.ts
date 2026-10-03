import { ContentItem } from '../types';

export const BREAKING_NEWS = [
  "🔴 Straordinaria eruzione dell'Etna nella notte: spettacolare fontana di lava visibile da tutta la Sicilia orientale",
  "🎬 Palermo si conferma capitale del cinema: ciak per la nuova serie internazionale nel cuore della Vucciria",
  "🌊 Taormina premiata come meta turistica digitale più condivisa d'Europa per il terzo anno consecutivo",
  "⚽ Emozioni al Barbera: gol all'ultimo minuto fa esplodere i tifosi rosanero"
];

export const MOCK_CONTENT: ContentItem[] = [
  {
    id: 'story-1',
    title: "Quando Palermo diventa un set cinematografico a cielo aperto",
    excerpt: "Le riprese della nuova produzione internazionale trasformano Ballarò in un palcoscenico hollywoodiano tra carretti storici e attori.",
    content: "Nelle ultime 48 ore, i vicoli storici del mercato di Ballarò e Piazza Pretoria sono stati blindati per le riprese di un kolossal internazionale. Centinaia di curiosi e creator digitali si sono radunati per catturare il backstage, tra carretti storici restaurati e attori in costumi d'epoca. Un mix perfetto di tradizione e cinema che sta spopolando su tutti i social network.",
    category: 'VIRALI',
    province: 'Palermo',
    image: '/src/assets/images/trending_palermo_set_1791018841213.jpg',
    date: '3 Ottobre 2026',
    timestamp: '15 min fa',
    views: 142500,
    viewsFormatted: '142K',
    platform: 'Instagram',
    badge: 'VIRALE',
    author: 'Giuseppe Frazzica',
    originalSource: {
      name: 'Palermo Web News',
      url: 'https://instagram.com'
    },
    isHeroFeature: true
  },
  {
    id: 'story-2',
    title: "Il tramonto più spettacolare della settimana sopra il Teatro Greco",
    excerpt: "Colori infuocati e vista mozzafiato: lo scatto da Taormina che ha conquistato 80mila like in poche ore.",
    content: "Un cielo infuocato di tonalità porpora e oro ha incorniciato il Teatro Greco di Taormina, con l'Etna sullo sfondo leggermente fumante. Lo scatto, condiviso da un fotografo locale, è diventato virale su Instagram e TikTok, raccogliendo commenti da tutto il mondo e celebrando la bellezza senza tempo della Sicilia.",
    category: 'CULTURA',
    province: 'Messina',
    image: '/src/assets/images/trending_sunset_taormina_1791018851376.jpg',
    date: '2 Ottobre 2026',
    timestamp: '2 ore fa',
    views: 215800,
    viewsFormatted: '216K',
    platform: 'TikTok',
    badge: 'TRENDING',
    author: 'Marta Cannizzaro',
    originalSource: {
      name: 'Taormina Social Club',
      url: 'https://tiktok.com'
    }
  },
  {
    id: 'story-3',
    title: "Il momento che ha fatto sorridere TikTok: flashmob spontaneo a Ortigia",
    excerpt: "Musica popolare e balli tra i vicoli di Siracusa: il video tormentone della settimana che unisce turisti e residenti.",
    content: "Improvvisamente, in un angolo soleggiato di Ortigia, un gruppo di musicisti di strada ha attaccato un ritmo di tarantella siciliana rivisitata in chiave moderna. Turisti e residenti si sono uniti in un cerchio spontaneo, dando vita a una festa collettiva che ha totalizzato oltre un milione di visualizzazioni.",
    category: 'VIRALI',
    province: 'Siracusa',
    image: '/src/assets/images/trending_tiktok_dance_1791018863001.jpg',
    date: '2 Ottobre 2026',
    timestamp: '4 ore fa',
    views: 320100,
    viewsFormatted: '320K',
    platform: 'TikTok',
    badge: 'NUOVO',
    author: 'Salvatore Rinaudo',
    originalSource: {
      name: 'Sicilia Viral Feed',
      url: 'https://tiktok.com'
    }
  },
  {
    id: 'story-4',
    title: "Spettacolare attività stromboliana sull'Etna: lo show notturno incanta la Sicilia",
    excerpt: "Nuovo parossismo dal cratere di sudest. Fontane di lava alte oltre 300 metri immortalate da migliaia di utenti online.",
    content: "L'Etna è tornata a dare spettacolo nella notte con una vigorosa attività esplosiva dal cratere di sudest. Fontane di lava incandescenti si sono innalzate nel cielo nero, creando un contrasto straordinario visibile chiaramente da Catania, Taormina e persino dalle coste calabre.",
    category: 'NEWS',
    province: 'Catania',
    image: '/src/assets/images/news_etna_erruption_1791018874115.jpg',
    date: '3 Ottobre 2026',
    timestamp: '1 ora fa',
    views: 89300,
    viewsFormatted: '89K',
    platform: 'Web',
    badge: 'NEWS',
    author: 'Redazione Web',
    originalSource: {
      name: 'Etna News 24',
      url: 'https://etnanews.it'
    }
  },
  {
    id: 'story-5',
    title: "La nonna siciliana spiega la ricetta segreta della pasta alla norma su TikTok",
    excerpt: "Un tutorial casalingo spontaneo che unisce ironia, dialetto stretto e sapori inconfondibili.",
    content: "Nonna Rosa non ha peli sulla lingua quando spiega perché la melanzana va fritta rigorosamente con olio buono e ricotta salata stagionata. Il video ha superato i 2 milioni di visualizzazioni in 48 ore.",
    category: 'VIDEO',
    province: 'Catania',
    image: '/src/assets/images/trending_tiktok_dance_1791018863001.jpg',
    date: '1 Ottobre 2026',
    timestamp: 'Ieri',
    views: 450200,
    viewsFormatted: '450K',
    platform: 'TikTok',
    duration: '01:24',
    badge: 'VIRALE',
    author: 'Rosa Spampinato'
  },
  {
    id: 'story-6',
    title: "Street art e antichi cortili: la rivoluzione visiva dei quartieri storici",
    excerpt: "Murals giganti dedicati ai miti di Sicilia trasformano le facciate dei palazzi in un museo a cielo aperto.",
    content: "Da San Berillo a Via Plebiscito, Catania si conferma hub internazionale della street art mediterranea. Artisti di fama mondiale hanno reinterpretato figure mitologiche come Colapesce e Aci e Galatea.",
    category: 'CULTURA',
    province: 'Catania',
    image: '/src/assets/images/hero_sicilia_magazine_1791018828683.jpg',
    date: '1 Ottobre 2026',
    timestamp: 'Ieri',
    views: 45200,
    viewsFormatted: '45K',
    platform: 'Web',
    badge: 'TRENDING',
    author: 'Alessia Vasta'
  },
  {
    id: 'story-7',
    title: "Volo acrobatico in parapendio sopra la Riserva dello Zingaro",
    excerpt: "Acque cristalline viste dall'alto e scogliere mozzafiato: il reel che fa sognare l'estate siciliana.",
    content: "Un'immersione totale nel blu di San Vito Lo Capo e della Riserva dello Zingaro ripresa con telecamera FPV in 4K. Un'esperienza visiva straordinaria.",
    category: 'VIDEO',
    province: 'Trapani',
    image: '/src/assets/images/trending_sunset_taormina_1791018851376.jpg',
    date: '30 Settembre 2026',
    timestamp: '2 giorni fa',
    views: 189500,
    viewsFormatted: '189K',
    platform: 'Instagram',
    duration: '00:58',
    badge: 'VIDEO',
    author: 'Fabio Bonanno'
  },
  {
    id: 'story-8',
    title: "Trapani capitale del kitesurf e degli sport d'acqua: record di presenze",
    excerpt: "Le spiagge dello Stagnone accolgono atleti da tutto il pianeta per la tappa mondiale di hydrofoil.",
    content: "La laguna dello Stagnone a Marsala offre condizioni di vento uniche al mondo, consacrandosi come il paradiso europeo degli sport acquatici. Quest'anno si registra un +40% di presenze.",
    category: 'SPORT',
    province: 'Trapani',
    image: '/src/assets/images/trending_sunset_taormina_1791018851376.jpg',
    date: '30 Settembre 2026',
    timestamp: '2 giorni fa',
    views: 54700,
    viewsFormatted: '55K',
    platform: 'Web',
    badge: 'NEWS',
    author: 'Giorgio Lombardo'
  },
  {
    id: 'story-9',
    title: "Agrigento Capitale della Cultura: boom di contenuti digitali virali tra i templi",
    excerpt: "Installazioni di luce immersiva e ologrammi storici alla Valle dei Templi conquistano la Gen Z.",
    content: "La Valle dei Templi di Agrigento sperimenta nuove frontiere di fruizione culturale con percorsi multimediali notturni. I video dei templi illuminati sotto la luna accompagnati da sonorità ambient hanno superato i 5 milioni di interazioni online.",
    category: 'CULTURA',
    province: 'Agrigento',
    image: '/src/assets/images/trending_palermo_set_1791018841213.jpg',
    date: '29 Settembre 2026',
    timestamp: '3 giorni fa',
    views: 78900,
    viewsFormatted: '79K',
    platform: 'TikTok',
    badge: 'VIRALE',
    author: 'Valeria Giammanco'
  },
  {
    id: 'story-10',
    title: "Ragusa Ibla e il barocco risplendente nelle stories di food & travel influencer",
    excerpt: "Itinerari tra cioccolato di Modica, antiche scalinate e scorci cinematografici.",
    content: "I vicoli barocchi di Ragusa Ibla continuano a fare tendenza sui canali social globali. Tra botteghe artigiane di ricotta fresca e dimore storiche trasformate in boutique hotel, il turismo esperienziale siciliano vive una stagione d'oro.",
    category: 'CURIOSITÀ',
    province: 'Ragusa',
    image: '/src/assets/images/trending_tiktok_dance_1791018863001.jpg',
    date: '28 Settembre 2026',
    timestamp: '4 giorni fa',
    views: 62100,
    viewsFormatted: '62K',
    platform: 'Instagram',
    badge: 'TRENDING',
    author: 'Marco Poidomani'
  }
];

export const PROVINCES_LIST = [
  'Tutte',
  'Palermo',
  'Catania',
  'Messina',
  'Siracusa',
  'Ragusa',
  'Trapani',
  'Agrigento',
  'Enna',
  'Caltanissetta'
] as const;

export const CATEGORIES_LIST = [
  'TUTTI',
  'VIRALI',
  'NEWS',
  'VIDEO',
  'CULTURA',
  'SPORT',
  'SPETTACOLO',
  'CURIOSITÀ'
] as const;
