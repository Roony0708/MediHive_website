import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Sun, Moon, HeartPulse } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { navigation } from '../utils/data';

interface NavItem {
  label: string;
  path: string;
  children?: { label: string; path: string }[];
}

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const { isDark, toggle } = useTheme();
  const [expanded, setExpanded] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  const toggleExpand = (label: string) => {
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <>
      <style>{styles}</style>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="smd-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              aria-hidden="true"
            />
            <motion.aside
              className="smd-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
               <div className="smd-header">
                <Link to="/" className="smd-brand" onClick={onClose} aria-label="MediHive - Home">
                  <span className="smd-brand-mark"><HeartPulse size={20} aria-hidden="true" /></span>
                  <span className="smd-title">MediHive</span>
                </Link>
                <div className="smd-header-actions">
                  <button
                    onClick={toggle}
                    className="smd-theme-btn"
                    aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                  >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                  <button
                    onClick={onClose}
                    className="smd-close"
                    aria-label="Close navigation menu"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <nav className="smd-nav">
                {navigation.map((item: NavItem) => (
                  <div key={item.path} className="smd-group">
                    {item.children ? (
                      <>
                        <button
                          onClick={() => toggleExpand(item.label)}
                          className="smd-parent"
                          aria-expanded={expanded.includes(item.label)}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            size={18}
                            style={{
                              transform: expanded.includes(item.label) ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform var(--transition-base)',
                            }}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded.includes(item.label) && (
                            <motion.div
                              className="smd-children"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.path}
                                  to={child.path}
                                  className="smd-child-link"
                                  onClick={onClose}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => `smd-link${isActive ? ' active' : ''}`}
                        onClick={onClose}
                        end={item.path === '/'}
                      >
                        {item.label}
                      </NavLink>
                    )}
                  </div>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

const styles = `
.smd-overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}
.smd-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 61;
  width: min(320px, 85vw);
  background: var(--color-bg);
  border-left: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.smd-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border);
}
.smd-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.smd-brand-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--color-primary) 0%, oklch(0.45 0.10 170) 100%);
  color: var(--color-primary-foreground);
}
.smd-brand:focus-visible .smd-title {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
  border-radius: var(--radius-sm);
}
.smd-title {
  font-size: 1.125rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-text);
}
.smd-header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}
.smd-theme-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  border: none;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
  transition: background var(--transition-fast);
}
.smd-theme-btn::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: inherit;
}
.smd-theme-btn:hover {
  background: var(--color-bg-tertiary);
}
.smd-close {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  border: none;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
  transition: background var(--transition-fast);
}
.smd-close::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: inherit;
}
.smd-close:hover {
  background: var(--color-bg-tertiary);
}
.smd-close:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
.smd-nav {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.smd-group {
  display: flex;
  flex-direction: column;
}
.smd-link,
.smd-parent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-radius: var(--radius-sm);
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  border: none;
  background: transparent;
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-family: inherit;
  transition: background var(--transition-fast), color var(--transition-fast);
}
.smd-link:hover,
.smd-parent:hover {
  background: var(--color-bg-tertiary);
}
.smd-link.active {
  color: var(--color-primary);
  background: var(--color-primary-light);
}
.smd-link:focus-visible,
.smd-parent:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: -2px;
}
.smd-parent span {
  flex: 1;
}
.smd-children {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: 16px;
}
.smd-child-link {
  display: block;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: background var(--transition-fast), color var(--transition-fast);
}
.smd-child-link:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-primary);
}
.smd-child-link:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: -2px;
}
`;
