import { profile } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <span>
          © {year} {profile.name} · Genève, Suisse
        </span>
        <span>Conçu et développé avec Next.js et Three.js</span>
        <a href="#top">Retour en haut ↑</a>
      </div>
    </footer>
  );
}
