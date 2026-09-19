import { Hero } from './components/Hero';

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text selection:bg-accent selection:text-accent-contrast">
      <main>
        <Hero />
      </main>
    </div>
  );
}
