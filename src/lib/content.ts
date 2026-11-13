/* ──────────────────────────────────────────────────────────────
   Tout le contenu du portfolio vit ici.
   Années = année de création du repo GitHub (sauf expériences hors code).
   Sélection : uniquement les projets suivis (plus d'un commit) et utiles.
   ────────────────────────────────────────────────────────────── */

export type IllustrationId =
  | "goreview"
  | "wasender"
  | "aurora"
  | "agency"
  | "crawler"
  | "globe"
  | "agent"
  | "inventory"
  | "hexgrid"
  | "apifinder"
  | "stockx"
  | "stage"
  | "convention";

export type RepoKind =
  | "tool"
  | "scraping"
  | "web"
  | "backend"
  | "api"
  | "automation"
  | "data"
  | "education"
  | "ai";

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  story: string[];
  stack: string[];
  tags: string[];
  illustration: IllustrationId;
  /** captures réelles du produit en ligne (la première sert de couverture) */
  shots?: Shot[];
  /** chiffres clés affichés en grand */
  figures?: Figure[];
  github?: string;
  link?: string;
}

export interface Shot {
  src: string;
  url: string;
  alt: string;
}

export interface Figure {
  value: string;
  label: string;
}

export interface Repo {
  name: string;
  kind: RepoKind;
  year: string;
  language: string;
  isPrivate: boolean;
  description: string;
  story: string;
  stack: string[];
  url: string;
}

export const profile = {
  name: "Eric Aellen",
  location: "Genève, Suisse",
  email: "eric@aellen.com",
  github: "https://github.com/airhick",
  githubHandle: "airhick",
  linkedin: "https://linkedin.com/in/eric-aellen",
};

export const hero = {
  kicker: "Genève · Portfolio",
  lead: "Je lance des produits qui font gagner du temps et des clients aux entreprises.",
  leadSecond: "De l'idée au premier client, et je code moi-même ce qu'il faut pour y arriver.",
};

/* ── Projets phares ─────────────────────────────────────────── */

export const projects: Project[] = [
  {
    id: "goreview",
    title: "GoReview",
    category: "Startup · SaaS",
    year: "2025",
    description: "Une plaque NFC offerte aux commerces : un scan, un avis Google, et le contact du client récupéré.",
    figures: [
      { value: "88", label: "établissements équipés" },
      { value: "0 €", label: "pour le commerçant" },
      { value: "1", label: "scan pour laisser un avis" },
    ],
    shots: [
      { src: "/previews/goreview-map.jpg", url: "goreview.fr/map", alt: "Carte GoReview des 88 établissements équipés en France et en Suisse" },
      { src: "/previews/goreview-home.jpg", url: "goreview.fr", alt: "Page d'accueil de GoReview" },
    ],
    story: [
      "Les commerces locaux vivent de leurs avis Google, mais les demander reste gênant. GoReview leur offre une plaque NFC à poser sur le comptoir : le client scanne, laisse son avis, et le commerçant récupère son contact dans un dashboard.",
      "J'ai tout construit et lancé : site et boutique, configuration des plaques, dashboard, commandes et étiquettes d'expédition, emails automatiques. 88 établissements sont aujourd'hui équipés, visibles sur la carte publique.",
    ],
    stack: ["JavaScript", "Python", "FastAPI", "Supabase", "NFC"],
    tags: ["Startup", "SaaS", "Commerce local", "Acquisition"],
    illustration: "goreview",
    link: "https://goreview.fr/map",
  },
  {
    id: "wasender",
    title: "WAsender",
    category: "SaaS · Revendeurs",
    year: "2026",
    description: "Un bot WhatsApp par abonnement : les revendeurs publient une annonce dans tous leurs groupes en un message.",
    figures: [
      { value: "1", label: "message → tous les groupes" },
      { value: "72 h", label: "de messages fouillés par l'IA" },
      { value: "7 j", label: "d'essai, puis abonnement" },
    ],
    shots: [{ src: "/previews/wasender.jpg", url: "wasender2.onrender.com", alt: "Page d'accueil de WAsender" }],
    story: [
      "Les revendeurs de sneakers publient leurs annonces à la main dans des dizaines de groupes WhatsApp. Avec WAsender, ils envoient l'annonce au bot, choisissent leur liste de groupes, et elle part partout depuis leur propre numéro.",
      "La commande /wtb retrouve un article précis dans les 72 dernières heures de tous les groupes grâce à l'IA. Réécrit en Go pour la stabilité, avec essai gratuit, abonnement Stripe et codes promo.",
    ],
    stack: ["Go", "Supabase", "Stripe", "DeepSeek", "Render"],
    tags: ["SaaS", "WhatsApp", "Revente", "Abonnement"],
    illustration: "wasender",
    link: "https://wasender2.onrender.com",
  },
  {
    id: "aurora",
    title: "Aurora",
    category: "Startup · IA vocale",
    year: "2026",
    description: "Une réceptionniste téléphonique IA pour les PME suisses, qui apprend l'entreprise à partir de son site web.",
    figures: [
      { value: "24/7", label: "appels pris en charge" },
      { value: "1,2 s", label: "de latence de réponse" },
      { value: "25", label: "pros interrogés" },
    ],
    shots: [{ src: "/previews/aurora.jpg", url: "airhick.github.io/myaurora", alt: "Site vitrine d'Aurora" }],
    story: [
      "Une étude terrain (20 professionnels sondés, 5 entretiens) a montré que la peur n°1 était de perdre le contact humain. Aurora est donc pensée pour le contrôle : l'entreprise fixe ce que l'IA peut dire et reçoit chaque matin un débrief des appels.",
      "On donne l'adresse de son site : Aurora en extrait horaires, tarifs et FAQ, puis configure un agent vocal qui répond en environ 1,2 s. C'est aussi mon travail de Bachelor.",
    ],
    stack: ["Node.js", "ElevenLabs", "DeepSeek", "Supabase"],
    tags: ["Startup", "IA vocale", "PME", "Bachelor"],
    illustration: "aurora",
    link: "https://airhick.github.io/myaurora/",
  },
  {
    id: "agency",
    title: "Agence Mooo",
    category: "Agence web automatisée",
    year: "2026",
    description: "Une agence web qui repère les commerces, leur crée une maquette de site sur mesure et prépare l'email de contact.",
    figures: [
      { value: "253", label: "sites livrés" },
      { value: "6", label: "étapes automatisées" },
      { value: "50+", label: "avis Google par lead" },
    ],
    shots: [
      { src: "/previews/mooo-gallery.jpg", url: "agence.mooo.com/realisations", alt: "Galerie des 253 sites créés par Agence Mooo" },
      { src: "/previews/mooo.jpg", url: "agence.mooo.com", alt: "Page d'accueil d'Agence Mooo" },
    ],
    story: [
      "Plutôt qu'un démarchage générique, on montre directement au commerçant son futur site. Le pipeline sélectionne les commerces qualifiés (fiche Google active, 50 avis ou plus, email), étudie leur activité et leurs vraies photos, puis génère une maquette sur mesure.",
      "Chaque site est publié en ligne et un email personnalisé est préparé en brouillon, relu avant envoi. 253 sites sont visibles dans la galerie.",
    ],
    stack: ["Python", "Playwright", "DeepSeek", "OpenAI", "Gmail API"],
    tags: ["Agence", "Prospection", "IA", "Automatisation"],
    illustration: "agency",
    link: "https://agence.mooo.com/realisations.html",
  },
  {
    id: "inventory",
    title: "Inventory System",
    category: "Projet client",
    year: "2026",
    description: "Un système d'inventaire pour un client : scan de codes-barres à la caméra et synchronisation en temps réel entre postes.",
    story: [
      "Une v1 simple pour gérer les stocks, puis une v2 à la demande du client : intégration à son réseau RouterOS, scan de codes-barres directement par la caméra du navigateur, et synchronisation instantanée entre plusieurs postes via WebSockets.",
    ],
    stack: ["TypeScript", "Python", "PHP", "RouterOS", "WebSocket"],
    tags: ["Client", "Full-stack", "Temps réel"],
    illustration: "inventory",
    github: "https://github.com/airhick/inventory",
  },
  {
    id: "stockx",
    title: "StockX Monitor",
    category: "Data · Revente",
    year: "2026",
    description: "Le suivi des prix de tout le catalogue StockX, pour repérer les bonnes affaires sur le marché de la revente.",
    figures: [
      { value: "416 000", label: "références suivies" },
      { value: "30 min", label: "entre deux relevés" },
    ],
    story: [
      "L'outil interroge directement l'API interne de StockX, en passant la protection Cloudflare sans navigateur, et stocke l'historique des prix. Une alerte part dès qu'un prix passe sous un seuil.",
    ],
    stack: ["Python", "curl_cffi", "GraphQL", "SQLite"],
    tags: ["Sneakers", "Revente", "Monitoring"],
    illustration: "stockx",
    github: "https://github.com/airhick/stockx-price-monitoring",
  },
  {
    id: "mdcrawler",
    title: "MDCrawler",
    category: "Outil IA",
    year: "2025",
    description: "Transforme n'importe quel site en Markdown propre, prêt à alimenter une IA.",
    story: [
      "On donne une URL, il explore le site et exporte chaque page en Markdown. Il détecte seul les sites en JavaScript pour basculer sur un navigateur headless, et ne traite jamais deux fois la même page.",
    ],
    stack: ["Python", "FastAPI", "Playwright"],
    tags: ["Crawler", "LLM", "Async"],
    illustration: "crawler",
    github: "https://github.com/airhick/MDCrawler",
  },
  {
    id: "hexgrid",
    title: "Genève en hexagones",
    category: "Data géospatiale",
    year: "2025",
    description: "Genève découpée en hexagones de taille exacte, la base pour collecter des données business quartier par quartier.",
    story: [
      "Les hexagones sont calculés dans le système de coordonnées suisse en mètres pour éviter toute distorsion, puis reconvertis en coordonnées GPS. Le même script couvre les 20 plus grandes villes de France.",
    ],
    stack: ["Python", "GeoPandas", "Shapely"],
    tags: ["Géospatial", "Data"],
    illustration: "hexgrid",
    github: "https://github.com/airhick/gmaps-scrapper",
  },
  {
    id: "convention",
    title: "Convention Sneaker",
    category: "Événementiel",
    year: "2021",
    description: "Une convention sneaker organisée de A à Z, seul, pour mon travail de maturité.",
    story: [
      "Recherche de vendeurs et de marques partenaires, négociation, communication, billetterie, site web et logistique le jour J. Mon premier projet porté de bout en bout.",
    ],
    stack: ["Gestion de projet", "Partenariats", "Communication"],
    tags: ["Événement", "Sneakers"],
    illustration: "convention",
  },
  {
    id: "stage",
    title: "Stage en agence",
    category: "Expérience professionnelle",
    year: "2023",
    description: "Campagnes social media pour plusieurs clients, et un reporting automatisé qui a fait gagner des heures à l'équipe.",
    story: [
      "Calendriers éditoriaux, contenus et campagnes Meta Ads et Google Ads pour plusieurs clients. J'ai remplacé le reporting manuel par des dashboards Looker Studio connectés directement aux plateformes publicitaires.",
    ],
    stack: ["Meta Ads", "Google Ads", "Looker Studio", "Figma"],
    tags: ["Marketing digital", "Reporting"],
    illustration: "stage",
  },
];

/* ── Archive : autres projets retenus ───────────────────────── */

export const repos: Repo[] = [
  {
    name: "minipalantir",
    kind: "data",
    year: "2026",
    language: "TypeScript",
    isPrivate: false,
    description: "Un globe 3D en temps réel qui agrège des dizaines d'API publiques.",
    story:
      "Un globe 3D (Cesium.js) qui superpose des couches de données en temps réel, toutes issues d'API gratuites : vols ADS-B, séismes de l'USGS, position de l'ISS, qualité de l'air, météo et lancements SpaceX. Clustering côté client et chargement des couches à la demande pour garder un rendu fluide, et un proxy Python pour les sources aux politiques CORS restrictives.",
    stack: ["TypeScript", "Cesium.js", "React", "Vite", "Python"],
    url: "https://github.com/airhick/minipalantir",
  },
  {
    name: "AIwebagent",
    kind: "ai",
    year: "2025",
    language: "Python",
    isPrivate: false,
    description: "Un agent qui transforme une consigne en langage naturel en actions web.",
    story:
      "Un agent Python qui reçoit une instruction en langage naturel, la découpe en actions (naviguer, chercher, cliquer, taper) et l'exécute via Playwright. Trois modules : planification, exécution et détection des éléments interactifs du DOM, avec une vérification active de l'état de la page après chaque action.",
    stack: ["Python", "Playwright", "FastAPI"],
    url: "https://github.com/airhick/AIwebagent",
  },
  {
    name: "apifinder",
    kind: "scraping",
    year: "2025",
    language: "Python",
    isPrivate: false,
    description: "Découvre les endpoints d'API exposés sur un domaine.",
    story:
      "Un outil qui teste des centaines de schémas d'URL courants sur un domaine, reconnaît les signatures d'API dans les réponses HTTP et classe chaque endpoint par type, version et niveau de protection apparent. Les scans tournent en parallèle via des scripts Shell et PowerShell.",
    stack: ["Python", "Shell", "PowerShell"],
    url: "https://github.com/airhick/apifinder",
  },
  {
    name: "shein_scrapper",
    kind: "scraping",
    year: "2026",
    language: "Python",
    isPrivate: false,
    description: "Un scraper open source de produits SHEIN, sans navigateur.",
    story:
      "Un scraper open source qui récupère titres et galeries d'images des produits SHEIN sans automatisation de navigateur : il lit la configuration du site mobile, génère localement les mêmes en-têtes signés que l'application, puis interroge directement l'API produit. Compatible avec tous les domaines régionaux, export texte, JSON ou téléchargement des images.",
    stack: ["Python", "Node.js", "curl_cffi"],
    url: "https://github.com/airhick/shein_scrapper",
  },
  {
    name: "passvileads",
    kind: "scraping",
    year: "2025",
    language: "Python",
    isPrivate: false,
    description: "Un générateur de leads qui collecte des contacts business qualifiés.",
    story:
      "PassviLeads collecte automatiquement des contacts business qualifiés : le scraper parcourt des sources web ciblées, extrait les coordonnées et les exporte en CSV. Déployé sur Render, avec un frontend HTML minimal.",
    stack: ["Python", "HTML", "Shell"],
    url: "https://github.com/airhick/passvileads",
  },  {
    name: "email_finder",
    kind: "scraping",
    year: "2025",
    language: "Python",
    isPrivate: false,
    description: "Retrouve les adresses email publiées sur un site ou un domaine.",
    story:
      "Email Finder parcourt des sites et des domaines pour en extraire des adresses email valides. Backend Python, interface HTML, export CSV avec dédoublonnage automatique. Prêt à déployer sur Render ou Heroku.",
    stack: ["Python", "HTML"],
    url: "https://github.com/airhick/email_finder",
  },  {
    name: "genevascrapper",
    kind: "data",
    year: "2025",
    language: "Python",
    isPrivate: false,
    description: "Genève couverte par 51 729 points espacés de 50 mètres.",
    story:
      "Une grille hexagonale qui couvre toute la ville de Genève : 51 729 points, chacun à exactement 50 mètres de ses six voisins, affichés sur une carte Leaflet interactive. C'est la base dont je me sers pour collecter des données business, point par point.",
    stack: ["Python", "Leaflet", "HTML"],
    url: "https://github.com/airhick/genevascrapper",
  },  {
    name: "csv_to_pdf",
    kind: "tool",
    year: "2025",
    language: "Python",
    isPrivate: false,
    description: "Transforme n'importe quel CSV en PDF proprement mis en page.",
    story:
      "J'avais souvent besoin de transformer des données CSV en rapports PDF propres. Ce projet Python génère des PDF formatés depuis n'importe quel CSV, avec des templates de mise en page personnalisables. Il existe en interface graphique et en API dockerisée, documentée avec des exemples n8n.",
    stack: ["Python", "Docker", "HTML"],
    url: "https://github.com/airhick/csv_to_pdf",
  },  {
    name: "file-converter-API",
    kind: "api",
    year: "2025",
    language: "Python",
    isPrivate: false,
    description: "Une API REST qui convertit des fichiers entre des dizaines de formats.",
    story:
      "Pour répondre à un besoin récurrent de conversion dans plusieurs projets, j'ai construit une API REST générique en Python, dockerisée : PDF, CSV, images, DXF et bien d'autres. Une interface JavaScript permet également de l'utiliser manuellement.",
    stack: ["Python", "Docker", "JavaScript", "HTML"],
    url: "https://github.com/airhick/file-converter-API",
  },  {
    name: "png_to_dxf",
    kind: "tool",
    year: "2024",
    language: "Python",
    isPrivate: false,
    description: "Convertit une image PNG en fichier DXF vectoriel, fond supprimé.",
    story:
      "Un convertisseur pour préparer des fichiers de découpe laser et de modélisation 3D : il transforme une image PNG en DXF vectoriel et supprime automatiquement l'arrière-plan. D'abord en ligne de commande, puis doté d'une interface web pour traiter plusieurs fichiers à la fois.",
    stack: ["Python", "HTML", "JavaScript"],
    url: "https://github.com/airhick/png_to_dxf",
  },
  {
    name: "lost_items",
    kind: "web",
    year: "2025",
    language: "JavaScript",
    isPrivate: false,
    description: "Une web app pour enregistrer les objets trouvés d'un centre commercial.",
    story:
      "Une application web pour enregistrer les objets perdus du centre commercial Glatt, à Zurich. On prend l'objet en photo avec la caméra (ou on importe une image), l'image part vers un webhook n8n, et les 20 derniers objets restent visibles dans une galerie. HTML, CSS et JavaScript, sans étape de build.",
    stack: ["JavaScript", "HTML", "CSS", "n8n"],
    url: "https://github.com/airhick/lost_items",
  },  {
    name: "mathstudy",
    kind: "education",
    year: "2026",
    language: "HTML",
    isPrivate: false,
    description: "Une application de révision de mathématiques avec exercices interactifs.",
    story:
      "Une application web de révision de mathématiques, conçue pour un élève en difficulté : exercices interactifs, interface claire et utilisable en autonomie.",
    stack: ["HTML"],
    url: "https://github.com/airhick/mathstudy",
  },];

export const kindLabel: Record<RepoKind, string> = {
  tool: "Outil",
  scraping: "Scraping",
  web: "Web app",
  backend: "Backend",
  api: "API",
  automation: "Automatisation",
  data: "Data",
  education: "Éducation",
  ai: "IA",
};

export const repoFilters: { id: string; label: string; kinds: RepoKind[] }[] = [
  { id: "all", label: "Tout", kinds: [] },
  { id: "tools", label: "Outils", kinds: ["tool", "api"] },
  { id: "scraping", label: "Scraping", kinds: ["scraping", "ai"] },
  { id: "web", label: "Web", kinds: ["web", "backend"] },
  { id: "data", label: "Data & études", kinds: ["data", "education"] },
];

/* ── Parcours ───────────────────────────────────────────────── */

export const about = {
  intro: [
    "Je suis Eric Aellen, entrepreneur à Genève. Je construis des produits de A à Z, de l'idée jusqu'aux premiers clients : GoReview aide les commerces locaux à récolter des avis Google, WAsender fait gagner des heures aux revendeurs sur WhatsApp, et Aurora répond au téléphone pour les PME suisses.",
    "Après une formation en communication et marketing digital, j'étudie désormais l'informatique à l'EPFL. Je combine vision produit, sens commercial et technique, et je développe moi-même les outils dont mes projets ont besoin.",
  ],
  facts: ["Genève, CH", "3 produits lancés", "Informatique · EPFL", "Produit & marketing"],
};

export const education = [
  {
    institution: "EPFL",
    degree: "Section Informatique",
    location: "Lausanne",
    years: "Depuis sept. 2026",
  },
  {
    institution: "CREA",
    degree: "Bachelor en communication & marketing digital",
    location: "Genève",
    years: "2023 – 2026",
  },
  {
    institution: "Collège de Candolle",
    degree: "Maturité gymnasiale",
    location: "Chêne-Bourg, Genève",
    years: "2017 – 2021",
  },
];

export const timeline = [
  { year: "2026", text: "Bachelor CREA terminé · entrée à l'EPFL en Informatique (sept.) · WAsender, Aurora, Agence Mooo" },
  { year: "2025", text: "Création de GoReview, MDCrawler, Genève en hexagones" },
  { year: "2024", text: "Premiers outils publiés sur GitHub" },
  { year: "2023", text: "Début du Bachelor au CREA · stage en agence de communication" },
  { year: "2021", text: "Convention Sneaker, travail de maturité" },
  { year: "2020", text: "Premiers projets web et Python" },
];

export const skills: { label: string; items: string[] }[] = [
  { label: "Langages", items: ["Python", "TypeScript", "JavaScript", "Go", "SQL"] },
  { label: "Frameworks", items: ["Next.js", "React", "FastAPI", "Node.js", "Playwright"] },
  { label: "Outils & infra", items: ["Docker", "Git", "PostgreSQL", "Supabase", "Stripe", "Figma"] },
  { label: "Spécialités", items: ["Création de produit", "Acquisition & growth", "Automatisation", "IA appliquée", "Web scraping"] },
];
