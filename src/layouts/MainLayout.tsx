import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';

export function MainLayout() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header />

      <main id="main-content">
        <Outlet />
      </main>

      <Footer />

      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="scroll-top"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </button>
      )}
    </>
  );
}
