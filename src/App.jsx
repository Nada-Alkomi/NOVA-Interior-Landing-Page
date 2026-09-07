import Navbar from "./components/Navbar/Nav";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Contact from "./components/Contact/Contact";
import Furniture from "./components/Furniture/Furniture";
import Projects from "./components/Projects/Project";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="min-h-screen bg-[#fceec9] text-[#243033]">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Furniture />
        <Services />
        <Projects />
        <Contact />
        
      </main>

      <Footer />
    </div>
  );
}

export default App;