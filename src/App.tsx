import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { CursorGlow } from './components/CursorGlow';
import { ScrollProgress } from './components/ScrollProgress';

function App() {
  return (
    <div className="relative min-h-screen bg-dark text-foreground">
      <ScrollProgress />
      <CursorGlow />
      <Navigation />
      
      <main className="lg:pl-48">
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
