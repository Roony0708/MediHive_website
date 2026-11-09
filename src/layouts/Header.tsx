import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HeartPulse, Search, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { label: 'Doctors', path: '/doctors' },
  { label: 'Services', path: '/services' },
  { label: 'Specialties', path: '/specialties' },
  { label: 'Hospitals', path: '/hospitals' },
  { label: 'Health Packages', path: '/health-packages' },
  { label: 'About', path: '/about' },
];

const allLinks = [
  { label: 'Home', path: '/' },
  { label: 'Doctors', path: '/doctors' },
  { label: 'Services', path: '/services' },
  { label: 'Specialties', path: '/specialties' },
  { label: 'Hospitals', path: '/hospitals' },
  { label: 'Health Packages', path: '/health-packages' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
  { label: 'FAQ', path: '/faq' },
];

export function Header() {
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    navigate(q ? `/doctors?q=${encodeURIComponent(q)}` : '/doctors');
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header className="site-header" role="banner">
      <div className="container site-header__inner">
        <Link to="/" className="wordmark" aria-label="MediHive home">
          <HeartPulse size={26} aria-hidden="true" />
          <span>MediHive</span>
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-tools">
          <a href="tel:+9118001234567" className="header-phone">+91 1800 123 4567</a>
          <button
            type="button"
            onClick={() => setSearchOpen((prev) => !prev)}
            className="icon-button"
            aria-label={searchOpen ? 'Close search' : 'Open search'}
            aria-expanded={searchOpen}
          >
            {searchOpen ? <X size={20} aria-hidden="true" /> : <Search size={20} aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={toggle}
            className="icon-button"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
          </button>
          <Link to="/book-appointment" className="btn btn--primary btn--sm header-book">Book an appointment</Link>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="icon-button nav-toggle"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="search-panel">
          <div className="container">
            <form role="search" onSubmit={submitSearch}>
              <label className="visually-hidden" htmlFor="site-search">Search doctors, services and specialties</label>
              <input
                id="site-search"
                className="input"
                type="search"
                placeholder="Search doctors, services, specialties"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="btn btn--primary">Search</button>
            </form>
          </div>
        </div>
      )}

      {mobileOpen && (
        <nav id="mobile-navigation" className="container mobile-nav" aria-label="Mobile navigation">
          {allLinks.map((item) => (
            <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link to="/book-appointment" className="btn btn--primary" onClick={() => setMobileOpen(false)}>
            Book an appointment
          </Link>
          <a href="tel:+9118001234567" className="btn">Call +91 1800 123 4567</a>
        </nav>
      )}
    </header>
  );
}
