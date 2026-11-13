import About from "@/components/About";
import Archive from "@/components/Archive";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/hero/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import RevealObserver from "@/components/RevealObserver";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Archive />
        <About />
        <Contact />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
