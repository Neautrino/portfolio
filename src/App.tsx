import { About } from './components/About';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { FeaturedWork } from './components/FeaturedWork';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RunningCat } from './components/RunningCat';
import { SideRails } from './components/SideRails';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-bg text-text selection:bg-accent selection:text-accent-contrast">
      <Header />
      <SideRails />
      <main className="mx-auto max-w-page px-6 pb-14">
        <Hero />
        <FeaturedWork />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
      <RunningCat />
    </div>
  );
}
