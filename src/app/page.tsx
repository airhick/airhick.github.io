import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeBar from "@/components/MarqueeBar";
import Projects from "@/components/Projects";
import GitHubRepos from "@/components/GitHubRepos";
import StackSection from "@/components/StackSection";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MarqueeBar />
      <Projects />
      <GitHubRepos />
      <MarqueeBar inverted />
      <StackSection />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
