export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  stack: string[];
  tags: string[];
  image: string;
  color: string;
  link?: string;
  github?: string;
  year: string;
  featured: boolean;
}

export interface GithubRepo {
  name: string;
  description: string;
  url: string;
  language: string;
  isPrivate: boolean;
  category: string;
}

export const projects: Project[] = [
  {
    id: "goreview",
    title: "GoReview",
    category: "SaaS / Product",
    description:
      "Plaques NFC/QR gratuites pour collecter des avis Google — solution clé en main pour les commerces locaux.",
    longDescription:
      "GoReview lets local businesses generate a custom QR/NFC plaque that redirects customers directly to their Google review form. Full-stack web app with HTML/JS/TypeScript frontend, NFC redirection backend, and print-on-demand integration.",
    stack: ["TypeScript", "HTML", "JavaScript", "Python", "CSS"],
    tags: ["SaaS", "NFC", "QR Code", "Google Reviews", "Local Business"],
    image: "/images/goreview.png",
    color: "#0057FF",
    github: "https://github.com/airhick/goreview",
    year: "2024–2026",
    featured: true,
  },
  {
    id: "gmaps-scraping",
    title: "Google Maps Scraper",
    category: "Automation / Scraping",
    description:
      "Pipeline automatisé pour extraire listings, avis et données de contact depuis Google Maps à grande échelle.",
    longDescription:
      "Uses Python and browser automation to extract structured data (name, address, phone, hours, reviews) from Google Maps at scale. Handles pagination and exports to CSV/JSON. 24MB+ of scraped data.",
    stack: ["Python", "HTML"],
    tags: ["Scraping", "Google Maps", "Automation", "Lead Gen", "Python"],
    image: "/images/gmaps-scraping.png",
    color: "#FF2D20",
    github: "https://github.com/airhick/gmaps-scrapper",
    year: "2023",
    featured: true,
  },
  {
    id: "web-crawler",
    title: "MDCrawler",
    category: "Dev Tool",
    description:
      "Web crawler qui traverse des sites et convertit le contenu en Markdown propre — parfait pour l'ingestion LLM.",
    longDescription:
      "Built to feed web content into LLMs and documentation systems. The crawler handles link discovery and outputs clean Markdown preserving headers, code blocks, and tables.",
    stack: ["Python"],
    tags: ["Crawler", "Markdown", "LLM", "Automation", "Python"],
    image: "/images/web-crawler.png",
    color: "#FFE600",
    github: "https://github.com/airhick/MDCrawler",
    year: "2024",
    featured: true,
  },
  {
    id: "minipalantir",
    title: "MiniPalantir",
    category: "Data Platform",
    description:
      "Plateforme de visualisation et d'analyse de données inspirée de Palantir — dashboards, pipelines, insights.",
    longDescription:
      "A full-stack TypeScript/Python data platform inspired by Palantir. Includes data ingestion, query interfaces, and dynamic dashboards. Built with TypeScript frontend and Python data backend.",
    stack: ["TypeScript", "Python", "JavaScript", "CSS", "HTML"],
    tags: ["Data", "Visualization", "Dashboard", "Analytics"],
    image: "/images/github-projects.png",
    color: "#0057FF",
    github: "https://github.com/airhick/minipalantir",
    year: "2024",
    featured: true,
  },
  {
    id: "inventory",
    title: "Inventory System",
    category: "Web App",
    description:
      "Système de gestion d'inventaire complet — v1 et v2 avec RouterOS, PHP, TypeScript, Python.",
    longDescription:
      "Full inventory management system built in two versions. V2 includes RouterOS script integration, PHP backend, TypeScript frontend, and advanced reporting. 1.5MB+ of TypeScript.",
    stack: ["TypeScript", "Python", "PHP", "RouterOS", "HTML", "CSS"],
    tags: ["Inventory", "Management", "Full-Stack", "ERP"],
    image: "/images/bachelor.png",
    color: "#0A0A0A",
    github: "https://github.com/airhick/inventairev2",
    year: "2023–2024",
    featured: true,
  },
  {
    id: "apifinder",
    title: "API Finder",
    category: "Tool / Scraping",
    description:
      "Outil massif de découverte d'APIs — 8MB+ de code Python pour trouver et tester des endpoints exposés.",
    longDescription:
      "Massive Python tool for discovering and probing API endpoints across the web. Includes PowerShell and Shell scripts for orchestration, plus a basic web interface. 8MB+ of Python code.",
    stack: ["Python", "Shell", "PowerShell", "JavaScript", "CSS", "HTML"],
    tags: ["API", "Discovery", "Security", "Python", "Automation"],
    image: "/images/gmaps-scraping.png",
    color: "#FF2D20",
    github: "https://github.com/airhick/apifinder",
    year: "2023",
    featured: true,
  },
  {
    id: "aiwebagent",
    title: "AI Web Agent",
    category: "AI / Automation",
    description:
      "Agent web autonome propulsé par IA — navigue, extrait, et interagit avec des sites web automatiquement.",
    longDescription:
      "An AI-powered web agent that autonomously navigates websites, extracts information, and performs actions. Built with Python and a web interface for configuration and monitoring.",
    stack: ["Python", "HTML"],
    tags: ["AI", "Agent", "Automation", "LLM", "Web"],
    image: "/images/web-crawler.png",
    color: "#FFE600",
    github: "https://github.com/airhick/AIwebagent",
    year: "2024",
    featured: true,
  },
  {
    id: "stockx-monitoring",
    title: "StockX Price Monitor",
    category: "Finance / Scraping",
    description:
      "Surveillance des prix StockX sur 416K produits — mises à jour toutes les 30 minutes en temps réel.",
    longDescription:
      "Monitors StockX prices across 416,000 sneaker/streetwear SKUs with 30-minute update intervals. Tracks price movements over time for market analysis and resale opportunity detection.",
    stack: ["Python"],
    tags: ["StockX", "Sneakers", "Price Monitoring", "Finance", "Scraping"],
    image: "/images/sneaker-convention.png",
    color: "#FFE600",
    github: "https://github.com/airhick/stockx-price-monitoring",
    year: "2023",
    featured: false,
  },
  {
    id: "wasender",
    title: "WAsender",
    category: "Automation",
    description:
      "Outil d'envoi automatique de messages WhatsApp via interface web — JavaScript/HTML avec Docker.",
    longDescription:
      "WhatsApp bulk messaging automation tool with a web interface. Supports message scheduling, contact lists, and media attachments. Dockerized for easy deployment.",
    stack: ["JavaScript", "HTML", "Dockerfile"],
    tags: ["WhatsApp", "Automation", "Messaging", "Docker"],
    image: "/images/stage.png",
    color: "#0057FF",
    github: "https://github.com/airhick/WAsender",
    year: "2023",
    featured: false,
  },
  {
    id: "passvileads",
    title: "PassviLeads",
    category: "Lead Generation",
    description:
      "Générateur de leads passifs — collecte automatique de contacts qualifiés via scraping web.",
    longDescription:
      "Passive lead generation tool that automatically collects qualified business contacts through web scraping. Python backend with HTML frontend and Heroku deployment.",
    stack: ["Python", "HTML", "Shell", "Batchfile"],
    tags: ["Leads", "Scraping", "Marketing", "Automation"],
    image: "/images/gmaps-scraping.png",
    color: "#0A0A0A",
    github: "https://github.com/airhick/passvileads",
    year: "2022",
    featured: false,
  },
  {
    id: "file-converter",
    title: "File Converter API",
    category: "API / Tool",
    description:
      "API REST de conversion de fichiers — convertit entre dizaines de formats via Docker.",
    longDescription:
      "REST API for file format conversion supporting dozens of formats. Dockerized Python backend with JavaScript interface. Handles document, image, and data format conversions.",
    stack: ["Python", "Docker", "JavaScript", "HTML", "Shell"],
    tags: ["API", "File Conversion", "Docker", "REST"],
    image: "/images/github-projects.png",
    color: "#FF2D20",
    github: "https://github.com/airhick/file-converter-API",
    year: "2022",
    featured: false,
  },
  {
    id: "myaurora",
    title: "My Aurora",
    category: "Web App",
    description:
      "Application web Aurora — interface HTML/CSS/JS complète avec design élaboré.",
    longDescription:
      "Full web application with a rich HTML/CSS/JS interface. 784KB of HTML, 88KB of CSS, and dynamic JavaScript interactions. Production-ready web application.",
    stack: ["HTML", "CSS", "JavaScript"],
    tags: ["Web App", "Frontend", "Design"],
    image: "/images/stage.png",
    color: "#0057FF",
    github: "https://github.com/airhick/myaurora",
    year: "2023",
    featured: false,
  },
  {
    id: "bachelor",
    title: "Travail de Bachelor",
    category: "Academic Research",
    description: "Mémoire de fin d'études au CREA — analyse data-driven avec visualisations.",
    longDescription:
      "Bachelor's research project at CREA Geneva. Data-driven approach with statistical analysis, visualizations, and recommendations for industry application.",
    stack: ["Python", "Jupyter", "Pandas", "Matplotlib", "LaTeX"],
    tags: ["Research", "Academic", "CREA", "Visualization"],
    image: "/images/bachelor.png",
    color: "#FFE600",
    year: "2024",
    featured: false,
  },
  {
    id: "sneaker-convention",
    title: "Convention Sneaker",
    category: "Event Management",
    description:
      "Organisation complète d'une convention sneaker — logistique, partenariats, communication (Maturité).",
    longDescription:
      "Final high school project at Collège de Candolle. Conceptualized and organized a sneaker convention from scratch: vendors, brand partnerships, promotional website, ticketing.",
    stack: ["Project Management", "Communication", "Web", "Event Planning"],
    tags: ["Event", "Sneakers", "Maturité", "Candolle"],
    image: "/images/sneaker-convention.png",
    color: "#FF2D20",
    year: "2021",
    featured: false,
  },
  {
    id: "stage",
    title: "Rapport de Stage",
    category: "Internship",
    description: "Stage en agence de communication — campagnes digitales, social media, production créative.",
    longDescription:
      "Internship at a full-service communication agency. Managed social media calendars, produced content, assisted in campaign strategy and performance reporting.",
    stack: ["Social Media", "Analytics", "Figma", "Adobe CC"],
    tags: ["Communication", "Marketing", "Agency", "Content"],
    image: "/images/stage.png",
    color: "#0057FF",
    year: "2023",
    featured: false,
  },
];

export const githubRepos: GithubRepo[] = [
  { name: "goreview", description: "Google Review NFC/QR plaques — SaaS complet", url: "https://github.com/airhick/goreview", language: "TypeScript", isPrivate: true, category: "Web App" },
  { name: "gmaps-scrapper", description: "Google Maps scraper — 24MB+ de données", url: "https://github.com/airhick/gmaps-scrapper", language: "Python", isPrivate: false, category: "Scraping" },
  { name: "MDCrawler", description: "Web crawler → Markdown pour LLMs", url: "https://github.com/airhick/MDCrawler", language: "Python", isPrivate: false, category: "Tool" },
  { name: "minipalantir", description: "Plateforme data inspirée de Palantir", url: "https://github.com/airhick/minipalantir", language: "TypeScript", isPrivate: false, category: "Data" },
  { name: "inventairev2", description: "Système d'inventaire complet v2", url: "https://github.com/airhick/inventairev2", language: "TypeScript", isPrivate: true, category: "Web App" },
  { name: "inventory", description: "Gestion d'inventaire TypeScript/Python", url: "https://github.com/airhick/inventory", language: "TypeScript", isPrivate: false, category: "Web App" },
  { name: "apifinder", description: "Découverte d'APIs — 8MB Python", url: "https://github.com/airhick/apifinder", language: "Python", isPrivate: false, category: "Scraping" },
  { name: "AIwebagent", description: "Agent web autonome propulsé par IA", url: "https://github.com/airhick/AIwebagent", language: "Python", isPrivate: false, category: "AI" },
  { name: "stockx-price-monitoring", description: "416K SKUs StockX — updates toutes les 30min", url: "https://github.com/airhick/stockx-price-monitoring", language: "Python", isPrivate: false, category: "Scraping" },
  { name: "WAsender", description: "Envoi automatique WhatsApp via interface web", url: "https://github.com/airhick/WAsender", language: "JavaScript", isPrivate: true, category: "Automation" },
  { name: "passvileads", description: "Générateur de leads passifs via scraping", url: "https://github.com/airhick/passvileads", language: "Python", isPrivate: false, category: "Scraping" },
  { name: "email_finder", description: "Outil de découverte d'emails", url: "https://github.com/airhick/email_finder", language: "Python", isPrivate: false, category: "Scraping" },
  { name: "file-converter-API", description: "API REST de conversion de fichiers — Docker", url: "https://github.com/airhick/file-converter-API", language: "Python", isPrivate: false, category: "API" },
  { name: "myaurora", description: "Application web Aurora", url: "https://github.com/airhick/myaurora", language: "HTML", isPrivate: false, category: "Web App" },
  { name: "auroraDB", description: "Base de données Aurora avec TypeScript/SQL", url: "https://github.com/airhick/auroraDB", language: "TypeScript", isPrivate: true, category: "Backend" },
  { name: "emailsender", description: "Service d'envoi d'emails TypeScript", url: "https://github.com/airhick/emailsender", language: "TypeScript", isPrivate: true, category: "Tool" },
  { name: "anku", description: "App TypeScript", url: "https://github.com/airhick/anku", language: "TypeScript", isPrivate: true, category: "Web App" },
  { name: "genevascrapper", description: "Scraper de données genevoises", url: "https://github.com/airhick/genevascrapper", language: "Python", isPrivate: false, category: "Scraping" },
  { name: "google_review_generator", description: "Générateur d'avis Google", url: "https://github.com/airhick/google_review_generator", language: "Python", isPrivate: false, category: "Tool" },
  { name: "go2pro", description: "Outil Python go2pro", url: "https://github.com/airhick/go2pro", language: "Python", isPrivate: false, category: "Tool" },
  { name: "csv_to_pdf", description: "Conversion CSV → PDF avec Python", url: "https://github.com/airhick/csv_to_pdf", language: "Python", isPrivate: false, category: "Tool" },
  { name: "converter", description: "Convertisseur Python multi-format", url: "https://github.com/airhick/converter", language: "Python", isPrivate: false, category: "Tool" },
  { name: "png_to_dxf", description: "PNG → DXF, suppression d'arrière-plan", url: "https://github.com/airhick/png_to_dxf", language: "Python", isPrivate: false, category: "Tool" },
  { name: "PNG-TO-DXF", description: "Conversion PNG vers DXF", url: "https://github.com/airhick/PNG-TO-DXF", language: "Python", isPrivate: false, category: "Tool" },
  { name: "png-to-ddn", description: "PNG → DDN/DXT pour modélisation 3D", url: "https://github.com/airhick/png-to-ddn", language: "Python", isPrivate: false, category: "Tool" },
  { name: "crawl4ai", description: "Fork: LLM-friendly web crawler open-source", url: "https://github.com/airhick/crawl4ai", language: "Python", isPrivate: false, category: "AI" },
  { name: "lost_items", description: "Tracker d'objets perdus", url: "https://github.com/airhick/lost_items", language: "JavaScript", isPrivate: false, category: "Web App" },
  { name: "mathstudy", description: "App pour apprendre les maths (pour ma sœur)", url: "https://github.com/airhick/mathstudy", language: "HTML", isPrivate: false, category: "Web App" },
  { name: "EPFL_math", description: "Ressources mathématiques EPFL", url: "https://github.com/airhick/EPFL_math", language: "HTML", isPrivate: false, category: "Education" },
  { name: "flightwacker", description: "Surveillance de prix de vols", url: "https://github.com/airhick/flightwacker", language: "Python", isPrivate: true, category: "Scraping" },
  { name: "celinedionscalper", description: "Scalper de billets de concert Python", url: "https://github.com/airhick/celinedionscalper", language: "Python", isPrivate: true, category: "Automation" },
  { name: "France-mapped-with-H3-Uber-s-Hexagonal", description: "France cartographiée avec H3 hexagonal d'Uber", url: "https://github.com/airhick/France-mapped-with-H3-Uber-s-Hexagonal", language: "—", isPrivate: false, category: "Data" },
  { name: "crawler-interface", description: "Interface web pour crawler", url: "https://github.com/airhick/crawler-interface", language: "HTML", isPrivate: false, category: "Tool" },
  { name: "gvinvoice", description: "Outil de facturation", url: "https://github.com/airhick/gvinvoice", language: "—", isPrivate: false, category: "Tool" },
  { name: "png_dxf", description: "Conversion PNG/DXF — Python + HTML", url: "https://github.com/airhick/png_dxf", language: "Python", isPrivate: false, category: "Tool" },
];

export const skills = {
  languages: ["Python", "TypeScript", "JavaScript", "SQL", "Bash"],
  frameworks: ["Next.js", "React", "FastAPI", "Node.js", "Playwright"],
  tools: ["Docker", "Git", "PostgreSQL", "Vercel", "Supabase", "Figma"],
  specialties: ["Web Scraping", "Automation", "LLMs", "Data Pipelines", "API Design"],
};

export const education = [
  {
    institution: "CREA",
    degree: "Bachelor",
    location: "Genève, Suisse",
    year: "2021–2024",
    description: "Bachelor en Communication & Marketing Digital",
  },
  {
    institution: "Collège de Candolle",
    degree: "Maturité",
    location: "Chêne-Bourg, Genève",
    year: "2017–2021",
    description: "Maturité gymnasiale — travail de maturité sur la convention Sneaker",
  },
];

export const profile = {
  name: "Eric Aellen",
  location: "Genève, Suisse",
  email: "eric.aellen000@gmail.com",
  phone: "00 33 7 800 101 20",
  github: "https://github.com/airhick",
  linkedin: "https://linkedin.com/in/eric-aellen",
};
