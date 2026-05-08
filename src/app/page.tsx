import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import GitHubRepos from "@/components/GitHubRepos";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Projects />
      <GitHubRepos />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
