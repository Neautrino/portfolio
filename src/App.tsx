import { About } from './components/About';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { FeaturedWork } from './components/FeaturedWork';
import { Header } from './components/Header';
import { Hero } from './components/Hero';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-bg text-text selection:bg-accent selection:text-accent-contrast">
      <Header />
      <main className="mx-auto max-w-page px-6 pb-14">
        <Hero />
        <FeaturedWork />
        <Experience />
        <About />
        <Contact />
      </main>
    </div>
  );
}
