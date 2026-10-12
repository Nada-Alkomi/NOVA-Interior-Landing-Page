
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Furniture from "../components/Furniture/Furniture";
import Services from "../components/Services/Services";
import Projects from "../components/Projects/Project";
import Contact from "../components/Contact/Contact";

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Furniture limit={4} />
      <Services limit={4} />
      <Projects limit={3} />
      <Contact />
    </main>
  );
}

export default Home;
