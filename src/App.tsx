import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { RunningCat } from './components/RunningCat';
import { ScrollToTop } from './components/ScrollToTop';
import { SideRails } from './components/SideRails';
import { Blog } from './pages/Blog';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { ProjectDetail } from './pages/ProjectDetail';
import { Projects } from './pages/Projects';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen overflow-x-clip bg-bg text-text selection:bg-accent selection:text-accent-contrast">
        <Header />
        <SideRails />
        <main className="mx-auto max-w-page px-6 pb-14">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <RunningCat />
      </div>
    </BrowserRouter>
  );
}
