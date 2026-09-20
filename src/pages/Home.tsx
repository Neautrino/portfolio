import { useEffect } from 'react';
import { About } from '../components/About';
import { Contact } from '../components/Contact';
import { Experience } from '../components/Experience';
import { FeaturedWork } from '../components/FeaturedWork';
import { Hero } from '../components/Hero';

export function Home() {
  useEffect(() => {
    // Arriving from another page with a section hash (e.g. Header's section
    // nav linking `/#work` while on `/projects`) — scroll there once mounted.
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    target?.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, []);

  return (
    <>
      <Hero />
      <FeaturedWork />
      <Experience />
      <About />
      <Contact />
    </>
  );
}
