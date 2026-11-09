import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface MegaMenuItem {
  label: string;
  path: string;
}

interface MegaMenuProps {
  label: string;
  items: MegaMenuItem[];
  onClose: () => void;
}

export function MegaMenu({ label, items, onClose }: MegaMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <>
      <style>{styles}</style>
      <motion.div
        ref={ref}
        role="menu"
        aria-label={label}
        className="smm-menu"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
      >
        <div className="smm-head">{label}</div>
        <div className="smm-grid">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="smm-link"
              role="menuitem"
              onClick={onClose}
            >
              <span>{item.label}</span>
              <ArrowRight size={14} className="smm-arrow" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </motion.div>
    </>
  );
}

const styles = `
.smm-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 260px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  z-index: var(--z-dropdown);
}
.smm-head {
  padding: 14px 18px 8px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-tertiary);
}
.smm-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2px;
  padding: 4px 8px 8px;
}
.smm-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 44px;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  font-size: 0.938rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: background var(--transition-fast), color var(--transition-fast);
}
.smm-arrow {
  color: var(--color-primary);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}
.smm-link:hover {
  background: var(--color-primary-light);
  color: var(--color-primary);
}
.smm-link:hover .smm-arrow {
  opacity: 1;
  transform: translateX(0);
}
.smm-link:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: -2px;
}
@media (prefers-reduced-motion: reduce) {
  .smm-arrow { transition: none; }
}
`;
